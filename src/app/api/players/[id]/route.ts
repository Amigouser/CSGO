import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const player = await prisma.user.findUnique({
      where: { id },
      include: {
        tournaments: { include: { tournament: true } },
        matchesHome: {
          include: { awayPlayer: true, tournament: true },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        matchesAway: {
          include: { homePlayer: true, tournament: true },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    return NextResponse.json(player);
  } catch {
    return NextResponse.json({ error: "Failed to fetch player" }, { status: 500 });
  }
}
