import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "bad_request" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { wallet: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "user_not_found" },
        { status: 404 }
      );
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json(
        { success: false, error: "wrong_password" },
        { status: 401 }
      );
    }

    // حالياً نرجّع بيانات بسيطة (من غير JWT)
    return NextResponse.json({
      success: true,
      userId: user.id,
      name: user.name,
      balance: user.wallet?.balance ?? 0,
    });
  } catch (e) {
    console.error("LOGIN ERROR:", e);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
