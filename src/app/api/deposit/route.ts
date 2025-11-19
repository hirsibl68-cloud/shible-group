import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, amount, method } = await req.json();

    // تحقق بسيط من البيانات
    if (!userId || !amount || !method) {
      return NextResponse.json(
        { success: false, error: "bad_request" },
        { status: 400 }
      );
    }

    // تأكيد أن للمستخدم محفظة
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      return NextResponse.json(
        { success: false, error: "wallet_not_found" },
        { status: 404 }
      );
    }

    // تسجيل عملية الإيداع في جدول Deposit
    await prisma.deposit.create({
      data: {
        userId,
        amount,
        method, // مثل: "USDT-TRC20" أو "BINANCE PAY"
      },
    });

    // زيادة رصيد المحفظة
    await prisma.wallet.update({
      where: { userId },
      data: {
        balance: { increment: amount },
      },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DEPOSIT ERROR:", e);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
