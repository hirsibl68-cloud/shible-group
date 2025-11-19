import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name, country } = await req.json();

    // تحقق إذا البريد مستخدم
    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      return NextResponse.json({ success: false, error: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // إنشاء المستخدم + محفظته مباشرة
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        country,
        wallet: { create: {} }, // محفظة فارغة تلقائي
      },
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (e) {
    console.error("SIGNUP ERROR:", e);
    return NextResponse.json({ success: false, error: "server_error" }, { status: 500 });
  }
}
