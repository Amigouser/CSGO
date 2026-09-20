import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import {
  generateSingleElimination,
  generateDoubleElimination,
} from "@/lib/bracket";

/**
 * POST /api/tournaments/[id]/seed
 * Body: { participantIds: string[] }  — ordered seed list
 * Admin only. Generates bracket matches from the seed order.
 * Allowed when tournament status is "upcoming" or "registration".
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const tournament = await prisma.tournament.findUnique({
    where: { id },
    include: { participants: true },
  });

  if (!tournament) {
    return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
  }

  if (tournament.status === "active" || tournament.status === "completed") {
    return NextResponse.json(
      { error: "Нельзя пересидировать активный или завершённый турнир" },
      { status: 400 },
    );
  }

  const body = await request.json();
  const participantIds: string[] = body.participantIds;

  if (!Array.isArray(participantIds) || participantIds.length < 2) {
    return NextResponse.json(
      { error: "Нужно минимум 2 участника" },
      { status: 400 },
    );
  }

  // Validate all IDs are approved participants
  const approved = tournament.participants.filter(
    (p) => p.status === "approved",
  );
  const approvedIds = new Set(approved.map((p) => p.userId));
  for (const pid of participantIds) {
    if (!approvedIds.has(pid)) {
      return NextResponse.json(
        { error: `Участник ${pid} не одобрен или не существует` },
        { status: 400 },
      );
    }
  }

  // Generate bracket
  const bracket =
    tournament.format === "double_elim"
      ? generateDoubleElimination(participantIds)
      : generateSingleElimination(participantIds);

  // Delete existing matches for this tournament (re-seed)
  await prisma.match.deleteMany({ where: { tournamentId: id } });

  // Save new matches
  const created = await prisma.match.createMany({
    data: bracket.map((m) => ({
      tournamentId: id,
      round: m.round,
      matchNumber: m.matchNumber,
      homePlayerId: m.homePlayerId,
      awayPlayerId: m.awayPlayerId,
    })),
  });

  return NextResponse.json({ matchesCreated: created.count }, { status: 201 });
}
