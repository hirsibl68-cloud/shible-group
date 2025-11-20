import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, amount, method, address } = await req.json();

    if (!userId || !amount || !method || !address) {
      return NextResponse.json(
        { success: false, error: "bad_request" },
        { status: 400 }
      );
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      return NextResponse.json(
        { success: false, error: "wallet_not_found" },
        { status: 404 }
      );
    }

    if (wallet.balance < amount) {
      return NextResponse.json(
        { success: false, error: "insufficient_balance" },
        { status: 400 }
      );
    }

    // 1) تسجيل طلب السحب
    await prisma.withdraw.create({
      data: {
        userId,
        amount,
        method,  // "USDT-TRC20" إلخ
        address, // عنوان المحفظة
      },
    });

    // 2) تخفيض رصيد المحفظة
    const updatedWallet = await prisma.wallet.update({
      where: { userId },
      data: {
        balance: { decrement: amount },
      },
    });

    return NextResponse.json({
      success: true,
      newBalance: updatedWallet.balance,
    });
  } catch (e) {
    console.error("WITHDRAW ERROR:", e);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
