import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "missing_userId" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        wallet: true,
        rewards: { orderBy: { lastClaim: "desc" }, take: 1 },
        tasksLog: { orderBy: { createdAt: "desc" }, take: 1 },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "user_not_found" }, { status: 404 });
    }

    const lastReward = user.rewards[0];
    const lastTask = user.tasksLog[0];

    return NextResponse.json({
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      xp: user.xp,
      level: user.level,
      balance: user.wallet?.balance ?? user.balance ?? 0,
      createdAt: user.createdAt,
      stats: {
        streak: lastReward?.streak ?? 0,
        lastRewardAt: lastReward?.lastClaim ?? null,
        lastTaskAt: lastTask?.createdAt ?? null,
      },
    });
  } catch (e) {
    console.error("PROFILE_API_ERROR", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
