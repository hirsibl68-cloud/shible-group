import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, xp: true, level: true },
      // أحياناً TS يبقى كاش قديم؛ الكاست يحله مؤقتاً
      orderBy: [{ xp: "desc" as any }, { level: "desc" as any }],
      take: 100,
    });
    return NextResponse.json(users);
  } catch (e) {
    console.error("LEADERBOARD API ERROR:", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
