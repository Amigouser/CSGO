import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getFaceitPlayer } from "@/lib/faceit";

export async function POST() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const apiKey = process.env.FACEIT_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "FACEIT_API_KEY not configured" }, { status: 500 });
  }

  const faceit = await getFaceitPlayer(user.steamId);
  if (!faceit) {
    return NextResponse.json({
      updated: false,
      message: "FACEIT account not found for this Steam ID",
    });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      faceitId: faceit.faceitId,
      faceitLevel: faceit.level,
      faceitElo: faceit.elo,
    },
  });

  return NextResponse.json({
    updated: true,
    faceitLevel: faceit.level,
    faceitElo: faceit.elo,
  });
}
