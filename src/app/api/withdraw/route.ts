import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, amount, method, address } = await req.json();

    // جلب المحفظة
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      return NextResponse.json({ success: false, error: "Wallet not found" });
    }

    if (wallet.balance < amount) {
      return NextResponse.json({ success: false, error: "Insufficient balance" });
    }

    // خصم الرصيد
    await prisma.wallet.update({
      where: { userId },
      data: { balance: { decrement: amount } },
    });

    // حفظ عملية السحب
    await prisma.withdraw.create({
      data: {
        userId,
        amount,
        method,
        address,
      },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("WITHDRAW ERROR:", e);
    return NextResponse.json({ success: false, error: "server_error" }, { status: 500 });
  }
}
