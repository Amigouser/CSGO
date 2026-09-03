import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tournament = await prisma.tournament.findUnique({
      where: { id },
      include: {
        participants: { include: { user: true } },
        matches: {
          include: { homePlayer: true, awayPlayer: true },
          orderBy: [{ round: "asc" }, { matchNumber: "asc" }],
        },
      },
    });

    if (!tournament) {
      return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
    }

    return NextResponse.json(tournament);
  } catch {
    return NextResponse.json({ error: "Failed to fetch tournament" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const tournament = await prisma.tournament.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(tournament);
  } catch {
    return NextResponse.json({ error: "Failed to update tournament" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.tournament.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete tournament" }, { status: 500 });
  }
}
