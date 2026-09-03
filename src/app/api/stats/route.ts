import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [totalTournaments, activeTournaments, totalPlayers, totalMatches] = await Promise.all([
      prisma.tournament.count(),
      prisma.tournament.count({ where: { status: "active" } }),
      prisma.user.count(),
      prisma.match.count({ where: { status: "completed" } }),
    ]);

    return NextResponse.json({
      totalTournaments,
      activeTournaments,
      totalPlayers,
      totalMatches,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
