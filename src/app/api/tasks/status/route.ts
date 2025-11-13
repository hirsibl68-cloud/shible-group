import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return NextResponse.json({ error: "no_user" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { xp: true, level: true },
    });

    if (!user) return NextResponse.json({ error: "user_not_found" });

    const start = new Date(); start.setHours(0,0,0,0);
    const end = new Date(); end.setHours(23,59,59,999);

    const logs = await prisma.taskLog.findMany({
      where: { userId, date: { gte: start, lte: end } },
      select: { taskName: true }
    });

    return NextResponse.json({
      doneToday: logs.map((t) => t.taskName),
      xp: user.xp,
      level: user.level
    });

  } catch (e) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
