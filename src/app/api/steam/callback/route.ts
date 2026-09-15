import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import crypto from "crypto";
import { getFaceitPlayer } from "@/lib/faceit";

const STEAM_OPENID_URL = "https://steamcommunity.com/openid/login";

function extractSteamId(claimedId: string): string | null {
  const match = claimedId.match(/\/openid\/id\/(\d+)$/);
  return match ? match[1] : null;
}

async function fetchSteamProfile(steamId: string) {
  const apiKey = process.env.STEAM_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`
    );
    const data = await res.json();
    const player = data?.response?.players?.[0];
    if (!player) return null;

    return {
      nickname: player.personaname || `Player_${steamId.slice(-6)}`,
      avatar: player.avatarfull || player.avatar || null,
      profileUrl: player.profileurl || `https://steamcommunity.com/profiles/${steamId}`,
    };
  } catch {
    return null;
  }
}

async function verifySteamResponse(params: URLSearchParams): Promise<boolean> {
  const verifyParams = new URLSearchParams();
  for (const [key, value] of params.entries()) {
    if (key.startsWith("openid.")) {
      verifyParams.set(key, value);
    }
  }
  verifyParams.set("openid.mode", "check_authentication");

  const res = await fetch(STEAM_OPENID_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: verifyParams.toString(),
  });
  const text = await res.text();
  return text.includes("is_valid:true");
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  if (params.get("openid.mode") !== "id_res") {
    return NextResponse.redirect(new URL("/login?error=steam_denied", request.url));
  }

  const isValid = await verifySteamResponse(params);
  if (!isValid) {
    return NextResponse.redirect(new URL("/login?error=steam_invalid", request.url));
  }

  const claimedId = params.get("openid.claimed_id");
  if (!claimedId) {
    return NextResponse.redirect(new URL("/login?error=no_steam_id", request.url));
  }

  const steamId = extractSteamId(claimedId);
  if (!steamId) {
    return NextResponse.redirect(new URL("/login?error=bad_steam_id", request.url));
  }

  const steamProfile = await fetchSteamProfile(steamId);
  const nickname = steamProfile?.nickname || `Player_${steamId.slice(-6)}`;
  const avatar = steamProfile?.avatar || null;
  const profileUrl = steamProfile?.profileUrl || `https://steamcommunity.com/profiles/${steamId}`;

  const adminIds = (process.env.ADMIN_STEAM_IDS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const isAdmin = adminIds.includes(steamId);

  const faceit = await getFaceitPlayer(steamId);

  let user = await prisma.user.findUnique({ where: { steamId } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        steamId, nickname, avatar, profileUrl, isAdmin,
        faceitId: faceit?.faceitId ?? null,
        faceitLevel: faceit?.level ?? 0,
        faceitElo: faceit?.elo ?? 0,
      },
    });
  } else {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        nickname, avatar, profileUrl, isAdmin,
        faceitId: faceit?.faceitId ?? user.faceitId,
        faceitLevel: faceit?.level ?? user.faceitLevel,
        faceitElo: faceit?.elo ?? user.faceitElo,
      },
    });
  }

  const sessionToken = crypto.randomUUID();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: { sessionToken, userId: user.id, expires },
  });

  const cookieStore = await cookies();
  cookieStore.set("authjs.session-token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });

  return NextResponse.redirect(new URL(`/profile/${steamId}`, request.url));
}
