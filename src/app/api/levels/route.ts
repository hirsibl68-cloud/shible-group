import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// حساب التقدّم داخل المستوى (كل مستوى 50 XP مثلاً)
function computeProgress(xp: number, level: number) {
  const step = 50;
  const baseXP = (level - 1) * step;
  const nextLevelXP = baseXP + step;
  const progress = Math.max(0, Math.min(1, (xp - baseXP) / step));
  return { progress, nextLevelXP };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "missing_userId" },
        { status: 400 }
      );
    }

    // جلب المستخدم من قاعدة البيانات
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // لو ما في مستخدم بهذا ال id → رجّع بيانات افتراضية بدل error
    if (!user) {
      return NextResponse.json({
        userId,
        xp: 0,
        level: 1,
        progress: 0,
        nextLevelXP: 50,
        mock: true, // فقط للتوضيح (اختياري)
      });
    }

    const xp = user.xp ?? 0;
    const level = user.level ?? 1;
    const { progress, nextLevelXP } = computeProgress(xp, level);

    return NextResponse.json({
      userId: user.id,
      xp,
      level,
      progress,
      nextLevelXP,
    });
  } catch (e) {
    console.error("LEVELS API ERROR:", e);
    return NextResponse.json(
      { error: "server_error" },
      { status: 500 }
    );
  }
}
