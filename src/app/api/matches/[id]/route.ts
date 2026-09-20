import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

/**
 * GET /api/matches/[id]
 * Returns match details. serverLink is included ONLY for admin or match participants.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const match = await prisma.match.findUnique({
    where: { id },
    include: {
      homePlayer: { select: { id: true, nickname: true, avatar: true, faceitLevel: true, faceitElo: true } },
      awayPlayer: { select: { id: true, nickname: true, avatar: true, faceitLevel: true, faceitElo: true } },
      tournament: { select: { id: true, name: true, gameMode: true, format: true } },
    },
  });

  if (!match) {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }

  const currentUser = await getCurrentUser();
  const isAdmin = currentUser?.isAdmin === true;

  // Check if current user is a participant of this match
  let isParticipant = false;
  if (currentUser) {
    if (match.homePlayerId === currentUser.id || match.awayPlayerId === currentUser.id) {
      isParticipant = true;
    } else if (match.tournament.gameMode !== "1v1") {
      // For team modes: check if user belongs to a TournamentParticipant that is home/away
      const participation = await prisma.tournamentParticipant.findFirst({
        where: {
          tournamentId: match.tournamentId,
          userId: currentUser.id,
          status: "approved",
        },
      });
      if (participation) {
        // Check if this participant's userId is referenced by home or away
        // In team modes homePlayerId/awayPlayerId point to the captain's User.id
        if (participation.userId === match.homePlayerId || participation.userId === match.awayPlayerId) {
          isParticipant = true;
        }
      }
    }
  }

  const canSeeLink = isAdmin || isParticipant;

  return NextResponse.json({
    id: match.id,
    tournamentId: match.tournamentId,
    round: match.round,
    matchNumber: match.matchNumber,
    homePlayerId: match.homePlayerId,
    awayPlayerId: match.awayPlayerId,
    homePlayer: match.homePlayer,
    awayPlayer: match.awayPlayer,
    homeScore: match.homeScore,
    awayScore: match.awayScore,
    winner: match.winner,
    status: match.status,
    scheduledAt: match.scheduledAt,
    tournament: match.tournament,
    // Only include serverLink for authorized users
    serverLink: canSeeLink ? match.serverLink : undefined,
  });
}

/**
 * PATCH /api/matches/[id]
 * Admin only. Update match score, status, scheduledAt, serverLink.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();

  const data: Record<string, unknown> = {};
  if (body.homeScore !== undefined) data.homeScore = body.homeScore;
  if (body.awayScore !== undefined) data.awayScore = body.awayScore;
  if (body.winner !== undefined) data.winner = body.winner;
  if (body.status !== undefined) data.status = body.status;
  if (body.scheduledAt !== undefined) data.scheduledAt = body.scheduledAt ? new Date(body.scheduledAt) : null;
  if (body.serverLink !== undefined) data.serverLink = body.serverLink || null;

  try {
    const match = await prisma.match.update({ where: { id }, data });
    return NextResponse.json(match);
  } catch {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }
}
