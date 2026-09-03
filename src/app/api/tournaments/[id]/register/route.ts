import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const tournament = await prisma.tournament.findUnique({
      where: { id },
      include: { _count: { select: { participants: true } } },
    });

    if (!tournament) {
      return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
    }

    if (tournament._count.participants >= tournament.maxTeams) {
      return NextResponse.json({ error: "Tournament is full" }, { status: 400 });
    }

    const existing = await prisma.tournamentParticipant.findUnique({
      where: {
        userId_tournamentId: { userId: body.userId, tournamentId: id },
      },
    });

    if (existing) {
      return NextResponse.json({ error: "Already registered" }, { status: 400 });
    }

    const participant = await prisma.tournamentParticipant.create({
      data: {
        userId: body.userId,
        tournamentId: id,
        teamName: body.teamName,
      },
    });

    return NextResponse.json(participant, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}
