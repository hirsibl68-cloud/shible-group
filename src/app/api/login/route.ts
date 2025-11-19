import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
      include: { wallet: true },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json({ success: false, error: "Wrong password" });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        walletBalance: user.wallet?.balance || 0,
      },
    });
  } catch (e) {
    console.error("LOGIN ERROR:", e);
    return NextResponse.json({ success: false, error: "server_error" }, { status: 500 });
  }
}
