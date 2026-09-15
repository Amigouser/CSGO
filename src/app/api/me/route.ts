import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json(null);

  return NextResponse.json({
    id: user.id,
    steamId: user.steamId,
    nickname: user.nickname,
    avatar: user.avatar,
    mmr: user.mmr,
    rank: user.rank,
    isAdmin: user.isAdmin,
    faceitLevel: user.faceitLevel,
    faceitElo: user.faceitElo,
  });
}
