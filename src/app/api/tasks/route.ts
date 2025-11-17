import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { addXP } from "@/lib/level";

export async function POST(req: Request) {
  try {
    const { userId, taskKey } = await req.json();

    if (!userId || !taskKey) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    // جلب المهمة من قاعدة البيانات
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

    // ****** 1) فحص limitPerDay ********
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const count = await prisma.taskLog.count({
      where: {
        userId,
        // نربط اللوق بنفس المفتاح عن طريق خزن المفتاح في taskName
        taskName: taskKey,
        // الحقل الصحيح في الموديل هو date بدل createdAt
        date: { gte: start, lte: end },
      },
    });

    if (count >= task.limitPerDay) {
      return NextResponse.json(
        { success: false, message: "limit_reached" },
        { status: 400 }
      );
    }

    // ****** 2) فحص cooldown ********
    if (task.cooldownHours > 0) {
      const last = await prisma.taskLog.findFirst({
        where: {
          userId,
          taskName: taskKey,
        },
        // ترتيب على حسب الحقل date
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

    // ****** 3) حساب الأرباح حسب الإيداع ********
    let depositBonus = 0;

    // نفترض أن user.balance هو مجموع الإيداعات
    if (user.balance >= 100 && user.balance < 500) depositBonus = 0.5;
    if (user.balance >= 500 && user.balance < 1000) depositBonus = 1.0;
    if (user.balance >= 1000) depositBonus = 2.0;

    // ****** 4) حساب الجائزة ********
    let finalReward = task.rewardBase + depositBonus;

    // Lucky Box (مكافأة عشوائية)
    if (taskKey === "lucky_box") {
      finalReward = Math.random() * (2.5 - 0.3) + 0.3; // من 0.3 إلى 2.5
      finalReward = Number(finalReward.toFixed(2));
    }

    // ****** 5) XP & Level ********
    const oldXP = user.xp ?? 0;
    const { newXP, newLevel } = addXP(oldXP, task.rewardXP);

    // تحديث المستخدم
    await prisma.user.update({
      where: { id: userId },
      data: { xp: newXP, level: newLevel },
    });

    // ****** 6) إضافة الرصيد إلى المحفظة ********
    await prisma.wallet.upsert({
      where: { userId },
      create: { userId, balance: finalReward },
      update: { balance: { increment: finalReward } },
    });

    // ****** 7) تسجيل المهمة في TaskLog ********
    await prisma.taskLog.create({
      data: {
        userId,
        // نخزن المفتاح في taskName عشان نقدر نتحقق منه لاحقاً
        taskName: taskKey,
        // الحقل الصحيح في الموديل reward
        reward: finalReward,
        // نخزن التاريخ الحالي في date
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
