import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, code, phone, email, password, refCode } = body;

    if (!name || !phone || !code || !password) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    const exist = await prisma.user.findFirst({
      where: { phone },
    });

    if (exist) {
      return NextResponse.json({ error: "user_exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    // إنشاء كود إحالة خاص بالمستخدم
    const myCode = "U" + Math.floor(100000 + Math.random() * 900000);

    const user = await prisma.user.create({
      data: {
        name,
        code,
        phone,
        email,
        password: hashed,
        myCode,
        refCode: refCode || null,
      },
    });

    // إنشاء محفظة للمستخدم تلقائياً
    await prisma.wallet.create({
      data: {
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.log("REGISTER ERROR:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
