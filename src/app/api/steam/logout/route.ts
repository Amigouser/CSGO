import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("authjs.session-token")?.value;

  if (sessionToken) {
    await prisma.session.deleteMany({ where: { sessionToken } });
    cookieStore.delete("authjs.session-token");
  }

  return NextResponse.redirect(new URL("/", request.url));
}
