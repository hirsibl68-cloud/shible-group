"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // لاحقاً منقدر نوصلها بـ API حقيقي
    setTimeout(() => {
      alert("تم إرسال بيانات تسجيل الدخول (نقوم بتفعيل النظام لاحقاً).");
      setLoading(false);
    }, 800);
  }

  return (
    <div className="min-h-screen bg-black text-yellow-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* بطاقة */}
        <div className="mb-6 text-center space-y-2">
          <p className="text-[10px] tracking-[0.35em] text-yellow-500/80 uppercase">
            BİPCOIN • VIP ACCESS
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-300">
            تسجيل الدخول إلى لوحة المستثمر
          </h1>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            أدخل بياناتك للوصول إلى المهام اليومية، الألعاب الاستثمارية، ولوحة
            الإحصاءات الخاصة بك في{" "}
            <span className="text-yellow-300 font-semibold">BİPCOIN</span>.
          </p>
        </div>

        <div className="rounded-3xl border border-yellow-500/30 bg-black/80 shadow-[0_0_40px_rgba(250,204,21,0.18)] p-6 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* البريد أو الـ ID */}
            <div className="space-y-1.5">
              <label className="text-xs text-gray-300">البريد الإلكتروني</label>
              <input
                type="email"
                required
                className="w-full rounded-2xl bg-black border border-yellow-500/30 px-3 py-2 text-sm text-yellow-50 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/60"
                placeholder="example@mail.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-300">كلمة المرور</label>
              <input
                type="password"
                required
                className="w-full rounded-2xl bg-black border border-yellow-500/30 px-3 py-2 text-sm text-yellow-50 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/60"
                placeholder="••••••••"
              />
            </div>

            {/* خيار تذكرني */}
            <div className="flex items-center justify-between text-[11px] text-gray-400">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-3 w-3 rounded border-yellow-500/40 bg-black text-yellow-500"
                />
                <span>تذكّرني على هذا الجهاز</span>
              </label>
              <button
                type="button"
                className="text-yellow-400 hover:text-yellow-300"
              >
                نسيت كلمة المرور؟
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold text-sm py-2.5 mt-1 shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "جار التحقق من البيانات..." : "تسجيل الدخول الآن"}
            </button>
          </form>

          {/* خط فاصل صغير */}
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <div className="h-px flex-1 bg-yellow-500/20" />
            <span>حساب جديد</span>
            <div className="h-px flex-1 bg-yellow-500/20" />
          </div>

          <div className="text-center text-xs text-gray-300">
            لا تملك حساباً بعد؟{" "}
            <Link
              href="/signup"
              className="text-yellow-300 font-semibold hover:text-yellow-200"
            >
              إنشاء حساب مستثمر جديد
            </Link>
          </div>
        </div>

        {/* ملاحظة أمنية */}
        <p className="mt-4 text-[10px] text-gray-500 text-center max-w-sm mx-auto">
          الرجاء عدم مشاركة بيانات الدخول مع أي شخص. فريق{" "}
          <span className="text-yellow-300 font-semibold">BİPCOIN</span> لن
          يطلب منك كلمة المرور أبداً.
        </p>
      </div>
    </div>
  );
}
