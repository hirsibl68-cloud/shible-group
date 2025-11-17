import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, amount, method, account } = await req.json();

    // نتحقق من الحقول اللي جاية من الفرونت
    if (!userId || !amount || !method || !account) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    if (amount <= 0) {
      return NextResponse.json({ error: "invalid_amount" }, { status: 400 });
    }

    // احصل على المحفظة الحالية
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      return NextResponse.json({ error: "wallet_not_found" }, { status: 404 });
    }

    if (wallet.balance < amount) {
      return NextResponse.json(
        { error: "insufficient_balance" },
        { status: 400 }
      );
    }

    // سحب من الرصيد
    await prisma.wallet.update({
      where: { userId },
      data: { balance: { decrement: amount } },
    });

    // إنشاء طلب السحب
    // ⚠️ هنا نخزن فقط الحقول الموجودة في Prisma model
    const w = await prisma.withdraw.create({
      data: {
        userId,
        amount,
        status: "pending",
        // لا نرسل method ولا account لأنهم غير موجودين في الـ schema
      },
    });

    // مع ذلك نرجعهم في الـ response لو حابب تعرضهم في الواجهة (ما في مشكلة)
    return NextResponse.json({
      success: true,
      withdraw: w,
      meta: {
        method,
        account,
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const userId = new URL(req.url).searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "missing_userId" }, { status: 400 });
  }

  const list = await prisma.withdraw.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, list });
}
