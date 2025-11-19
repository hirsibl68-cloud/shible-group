import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { addXP } from "@/lib/level";

export async function POST(req: Request) {
  try {
    const { userId, taskKey } = await req.json();

    if (!userId || !taskKey) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    // جلب تعريف المهمة
    const task = await prisma.task.findUnique({
      where: { key: taskKey },
    });

    if (!task) {
      return NextResponse.json({ error: "task_not_found" }, { status: 404 });
    }

    // جلب المستخدم
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { wallet: true },
    });

    if (!user) {
      return NextResponse.json({ error: "user_not_found" }, { status: 404 });
    }

    const now = new Date();

    // ------------------------------
    // A) فحص limit per day
    // ------------------------------
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const countToday = await prisma.taskLog.count({
      where: {
        userId,
        taskName: taskKey,
        date: { gte: start, lte: end },
      },
    });

    if (countToday >= task.limitPerDay) {
      return NextResponse.json(
        { success: false, message: "limit_reached" },
        { status: 400 }
      );
    }

    // ------------------------------
    // B) فحص Cooldown
    // ------------------------------
    if (task.cooldownHours > 0) {
      const last = await prisma.taskLog.findFirst({
        where: { userId, taskName: taskKey },
        orderBy: { date: "desc" },
      });

      if (last) {
        const diffHours =
          (now.getTime() - last.date.getTime()) / (1000 * 60 * 60);

        if (diffHours < task.cooldownHours) {
          return NextResponse.json(
            {
              success: false,
              message: "cooldown",
              waitHours: task.cooldownHours - diffHours,
            },
            { status: 400 }
          );
        }
      }
    }

    // ------------------------------
    // C) حساب الرصيد النهائي
    // ------------------------------
    let finalReward = task.rewardBase;
    const balance = user.balance ?? 0;

    // ضربة الحظ
    if (taskKey === "lucky_spin") {
      const min = 2;
      const max = 20;
      finalReward = Number(
        (Math.random() * (max - min) + min).toFixed(2)
      );
    }

    // الألعاب اليومية حسب رأس المال
    else if (taskKey === "daily_game_easy" || taskKey === "daily_game_pro") {
      let multiplier = 1;

      if (balance >= 50 && balance < 200) multiplier = 1.2;
      else if (balance >= 200 && balance < 500) multiplier = 1.5;
      else if (balance >= 500 && balance < 1000) multiplier = 2;
      else if (balance >= 1000) multiplier = 3;

      if (taskKey === "daily_game_pro") multiplier += 0.3;

      finalReward = Number((task.rewardBase * multiplier).toFixed(2));
    }

    // دعوة صديق
    else if (taskKey === "invite_friend") {
      finalReward = Number(task.rewardBase.toFixed(2));
    }

    // باقي المهام اليومية
    else {
      let bonus = 0;

      if (balance >= 100 && balance < 500) bonus = 0.5;
      else if (balance >= 500 && balance < 1000) bonus = 1;
      else if (balance >= 1000) bonus = 2;

      finalReward = Number((task.rewardBase + bonus).toFixed(2));
    }

    // ------------------------------
    // D) تحديث XP & Level
    // ------------------------------
    const oldXP = user.xp ?? 0;
    const { newXP, newLevel } = addXP(oldXP, task.rewardXP);

    await prisma.user.update({
      where: { id: userId },
      data: { xp: newXP, level: newLevel },
    });

    // ------------------------------
    // E) تحديث المحفظة
    // ------------------------------
    await prisma.wallet.upsert({
      where: { userId },
      create: { userId, balance: finalReward },
      update: { balance: { increment: finalReward } },
    });

    // ------------------------------
    // F) تسجيل اللوج
    // ------------------------------
    await prisma.taskLog.create({
      data: {
        userId,
        taskName: taskKey,
        reward: finalReward,
        date: now,
      },
    });

    return NextResponse.json({
      success: true,
      task: taskKey,
      rewardUSD: finalReward,
      rewardXP: task.rewardXP,
      xp: newXP,
      level: newLevel,
    });
  } catch (e) {
    console.error("TASK ERROR:", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
