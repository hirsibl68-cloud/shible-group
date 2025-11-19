import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "missing_userId" },
        { status: 400 }
      );
    }

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

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        name: (user as any).name ?? null,
        email: (user as any).email ?? null,
        balance: user.wallet?.balance ?? 0,
        xp: user.xp ?? 0,
        level: user.level ?? 1,

        // مافي ولا استعمال لـ date هنا
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
