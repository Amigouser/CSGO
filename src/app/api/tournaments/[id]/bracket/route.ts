import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSingleElimination } from "@/lib/bracket";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const tournament = await prisma.tournament.findUnique({
      where: { id },
      include: { participants: true },
    });

    if (!tournament) {
      return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
    }

    const playerIds = tournament.participants.map((p) => p.userId);
    const bracket = generateSingleElimination(playerIds);

    const matches = await prisma.match.createMany({
      data: bracket.map((m) => ({
        tournamentId: id,
        round: m.round,
        matchNumber: m.matchNumber,
        homePlayerId: m.homePlayerId,
        awayPlayerId: m.awayPlayerId,
      })),
    });

    await prisma.tournament.update({
      where: { id },
      data: { status: "active" },
    });

    return NextResponse.json({ matchesCreated: matches.count }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to generate bracket" }, { status: 500 });
  }
}
