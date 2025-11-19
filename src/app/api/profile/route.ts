import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "bad_request" },
        { status: 400 }
      );
    }

    // جلب المستخدم مع المحفظة
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { wallet: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "user_not_found" },
        { status: 404 }
      );
    }

    // قيم أساسية من جدول user + wallet
    const balance = user.wallet?.balance ?? 0;
    const xp = user.xp ?? 0;
    const level = user.level ?? 1;

    // نرجع بيانات عامة للبروفايل
    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        name: (user as any).name ?? null, // لو عندك حقل name
        email: (user as any).email ?? null,
        balance,
        xp,
        level,
        // حقول إضافية ممكن تستخدمها في الواجهة
        lastRewardAt: null,
        lastTaskAt: null,
      },
    });
  } catch (e) {
    console.error("PROFILE ERROR:", e);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
