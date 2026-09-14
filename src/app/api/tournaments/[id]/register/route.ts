import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const tournament = await prisma.tournament.findUnique({
    where: { id },
    include: { _count: { where: { status: "approved" } } },
  });

  if (!tournament) {
    return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
  }

  if (tournament.status !== "registration") {
    return NextResponse.json({ error: "Registration is closed" }, { status: 400 });
  }

  if (tournament._count.participants >= tournament.maxTeams) {
    return NextResponse.json({ error: "Tournament is full" }, { status: 400 });
  }

  const existing = await prisma.tournamentParticipant.findUnique({
    where: {
      userId_tournamentId: { userId: user.id, tournamentId: id },
    },
  });

  if (existing) {
    if (existing.status === "rejected") {
      const updated = await prisma.tournamentParticipant.update({
        where: { id: existing.id },
        data: { status: "pending" },
      });
      return NextResponse.json(updated, { status: 200 });
    }
    return NextResponse.json({ error: "Already registered or pending" }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));
  const participant = await prisma.tournamentParticipant.create({
    data: {
      userId: user.id,
      tournamentId: id,
      teamName: body.teamName || null,
      status: "pending",
    },
  });

  return NextResponse.json(participant, { status: 201 });
}
