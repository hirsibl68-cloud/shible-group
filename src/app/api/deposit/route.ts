import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, amount } = await req.json();

    if (!userId || !amount || amount <= 0) {
      return NextResponse.json(
        { error: "بيانات غير صالحة." },
        { status: 400 }
      );
    }

    // تحديث أو إنشاء محفظة المستخدم
    const wallet = await prisma.wallet.upsert({
      where: { userId },
      update: { balance: { increment: amount } },
      create: { userId, balance: amount },
    });

    return NextResponse.json({ success: true, wallet });
  } catch (err) {
    console.error("DEPOSIT ERROR:", err);
    return NextResponse.json(
      { error: "حدث خطأ أثناء الإيداع" },
      { status: 500 }
    );
  }
}
