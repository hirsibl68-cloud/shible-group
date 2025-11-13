import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("userId"));
  if (!userId) return NextResponse.json({});

  const record = await prisma.dailyReward.findFirst({ where: { userId } });
  if (!record) return NextResponse.json({ streak: 0, claimedToday: false });

  const last = new Date(record.lastClaim);
  const today = new Date();
  last.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return NextResponse.json({
    streak: record.streak,
    claimedToday: last.getTime() === today.getTime(),
  });
}
