import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // نحاول نجيب أول مستخدم
    let user = await prisma.user.findFirst({
      include: { wallet: true },
      orderBy: { createdAt: "asc" },
    });

    // لو ما في ولا واحد، ننشئ واحد تجريبي
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "مستخدم تجريبي",
          code: "963",
          phone: "0999999999",
          email: "demo@example.com",
          password: "123456",
          myCode: "demo123",
          // balance, xp, level, createdAt كلهم لهم قيم افتراضية من الـ schema
        },
        include: { wallet: true },
      });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      balance: user.wallet?.balance ?? 0,
      xp: user.xp,
      level: user.level,
    });
  } catch (e) {
    console.error("ME-API ERROR:", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
