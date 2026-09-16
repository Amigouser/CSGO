import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const players = await prisma.user.findMany({
      orderBy: { faceitElo: "desc" },
      take: limit,
      skip: offset,
      select: {
        id: true,
        nickname: true,
        avatar: true,
        faceitLevel: true,
        faceitElo: true,
        wins: true,
        losses: true,
      },
    });

    return NextResponse.json(players);
  } catch {
    return NextResponse.json({ error: "Failed to fetch players" }, { status: 500 });
  }
}
