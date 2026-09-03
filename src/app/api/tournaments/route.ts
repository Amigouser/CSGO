import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const game = searchParams.get("game");
    const status = searchParams.get("status");

    const where: Record<string, string> = {};
    if (game) where.game = game;
    if (status) where.status = status;

    const tournaments = await prisma.tournament.findMany({
      where,
      include: { _count: { select: { participants: true } } },
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json(tournaments);
  } catch {
    return NextResponse.json({ error: "Failed to fetch tournaments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tournament = await prisma.tournament.create({
      data: {
        name: body.name,
        game: body.game,
        format: body.format,
        maxTeams: body.maxTeams,
        teamSize: body.teamSize || 5,
        description: body.description,
        startDate: new Date(body.startDate),
        prizePool: body.prizePool,
      },
    });
    return NextResponse.json(tournament, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create tournament" }, { status: 500 });
  }
}
