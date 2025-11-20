import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, country } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "bad_request" },
        { status: 400 }
      );
    }

    // تأكد ما في مستخدم بنفس الإيميل
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "email_exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    // إنشاء المستخدم + المحفظة
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        country: country || "غير محدد",
        wallet: {
          create: {
            balance: 0,
          },
        },
      },
      include: { wallet: true },
    });

    return NextResponse.json({
      success: true,
      userId: user.id,
      walletId: user.wallet?.id ?? null,
    });
  } catch (e) {
    console.error("SIGNUP ERROR:", e);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
