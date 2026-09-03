import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const matches = await prisma.match.findMany({
      where: { status: "completed" },
      include: { homePlayer: true, awayPlayer: true, tournament: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json(matches);
  } catch {
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const match = await prisma.match.update({
      where: { id: body.id },
      data: {
        homeScore: body.homeScore,
        awayScore: body.awayScore,
        winner: body.winner,
        status: "completed",
      },
    });
    return NextResponse.json(match);
  } catch {
    return NextResponse.json({ error: "Failed to update match" }, { status: 500 });
  }
}
