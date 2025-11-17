import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const REWARD_USD = 1.5;
const WEEKLY_BONUS_USD = 3;
const WEEKLY_EVERY = 7;

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "missing_userId" }, { status: 400 });
    }

    const userIdStr = String(userId);

    // تأكيد وجود المستخدم
    const user = await prisma.user.findUnique({
      where: { id: userIdStr },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "user_not_found" }, { status: 404 });
    }

    // احضر/أنشئ سجل المكافأة اليومية
    let daily = await prisma.dailyReward.findFirst({
      where: { userId: userIdStr },
    });

    if (!daily) {
      daily = await prisma.dailyReward.create({
        data: { userId: userIdStr, streak: 0 },
      });
    }

    const today = new Date();
    const canClaim =
      !daily.lastClaim || !isSameDay(new Date(daily.lastClaim), today);

    return NextResponse.json({
      userId: userIdStr,
      canClaim,
      lastClaim: daily.lastClaim ? daily.lastClaim.toISOString() : null,
      streak: daily.streak,
      rewardUSD: REWARD_USD,
      weeklyBonusUSD: WEEKLY_BONUS_USD,
      weeklyEvery: WEEKLY_EVERY,
    });
  } catch (e) {
    console.error("DAILY-GET ERROR:", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json({ error: "missing_userId" }, { status: 400 });
    }

    const userIdStr = String(userId);

    const user = await prisma.user.findUnique({
      where: { id: userIdStr },
    });
    if (!user) {
      return NextResponse.json({ error: "user_not_found" }, { status: 404 });
    }

    let daily = await prisma.dailyReward.findFirst({
      where: { userId: userIdStr },
    });

    if (!daily) {
      daily = await prisma.dailyReward.create({
        data: { userId: userIdStr, streak: 0 },
      });
    }

    const today = new Date();
    if (daily.lastClaim && isSameDay(new Date(daily.lastClaim), today)) {
      return NextResponse.json(
        { success: false, message: "already_claimed" },
        { status: 400 }
      );
    }

    // حساب الستريك
    let newStreak = daily.streak ?? 0;
    if (daily.lastClaim) {
      const last = new Date(daily.lastClaim);
      const diffDays = Math.floor(
        (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
      );
      newStreak = diffDays === 1 ? newStreak + 1 : 1;
    } else {
      newStreak = 1;
    }

    // هل فيه بونص أسبوعي؟
    const isWeeklyBonus = newStreak > 0 && newStreak % WEEKLY_EVERY === 0;
    const bonusUSD = isWeeklyBonus ? WEEKLY_BONUS_USD : 0;
    const totalUSD = REWARD_USD + bonusUSD;

    // تحديث سجل الديلي
    await prisma.dailyReward.updateMany({
      where: { userId: userIdStr },
      data: {
        lastClaim: today,
        streak: newStreak,
      },
    });

    // تحديث المحفظة
    await prisma.wallet.upsert({
      where: { userId: userIdStr },
      create: { userId: userIdStr, balance: totalUSD },
      update: { balance: { increment: totalUSD } },
    });

    return NextResponse.json({
      success: true,
      rewardUSD: REWARD_USD,
      bonusUSD,
      totalUSD,
      streak: newStreak,
      lastClaim: today.toISOString(),
    });
  } catch (e) {
    console.error("DAILY-POST ERROR:", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
