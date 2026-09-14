import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { name, game, format, maxTeams, teamSize, description, startDate, prizePool } = body;

  if (!name || !format || !maxTeams || !startDate) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const tournament = await prisma.tournament.create({
    data: {
      name,
      game: game || "cs2",
      format,
      status: "registration",
      maxTeams: Number(maxTeams),
      teamSize: Number(teamSize) || 5,
      description: description || null,
      startDate: new Date(startDate),
      prizePool: prizePool || null,
    },
  });

  return NextResponse.json(tournament);
}
