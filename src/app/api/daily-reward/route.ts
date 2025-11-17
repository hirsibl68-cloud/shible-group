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

    // تأكيد وجود المستخدم (اختياري بس أفضل)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "user_not_found" }, { status: 404 });
    }

    // احضر/أنشئ سجل المكافأة اليومية
    let daily = await prisma.dailyReward.findUnique({ where: { userId } });
    if (!daily) {
      daily = await prisma.dailyReward.create({
        data: { userId, streak: 0 },
      });
    }

    const today = new Date();
    const canClaim =
      !daily.lastClaim || !isSameDay(new Date(daily.lastClaim), today);

    return NextResponse.json({
      userId,
      canClaim,
      // 🟢 أهم تعديل: لا نرجّع Date مباشرة
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
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "missing_userId" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "user_not_found" }, { status: 404 });
    }

    let daily = await prisma.dailyReward.findUnique({ where: { userId } });
    if (!daily) {
      daily = await prisma.dailyReward.create({
        data: { userId, streak: 0 },
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
    const updatedDaily = await prisma.dailyReward.update({
      where: { userId },
      data: {
        lastClaim: today,
        streak: newStreak,
      },
    });

    // تحديث المحفظة
    await prisma.wallet.upsert({
      where: { userId },
      create: { userId, balance: totalUSD },
      update: { balance: { increment: totalUSD } },
    });

    return NextResponse.json({
      success: true,
      rewardUSD: REWARD_USD,
      bonusUSD,
      totalUSD,
      streak: newStreak,
      // 🟢 كمان هون نخليها string
      lastClaim: updatedDaily.lastClaim
        ? updatedDaily.lastClaim.toISOString()
        : null,
    });
  } catch (e) {
    console.error("DAILY-POST ERROR:", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
