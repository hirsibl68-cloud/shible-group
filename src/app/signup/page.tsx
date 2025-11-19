"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // لاحقاً نربطها مع API حقيقي لإنشاء الحساب
    setTimeout(() => {
      alert("تم إرسال بيانات إنشاء الحساب (سيتم تفعيل النظام لاحقاً).");
      setLoading(false);
    }, 900);
  }

  return (
    <div className="min-h-screen bg-black text-yellow-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* HEADER */}
        <div className="mb-6 text-center space-y-2">
          <p className="text-[10px] tracking-[0.35em] text-yellow-500/80 uppercase">
            BİPCOIN • NEW INVESTOR
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-300">
            إنشاء حساب مستثمر جديد
          </h1>
          <p className="text-xs text-gray-400 max-w-lg mx-auto">
            سجّل الآن للوصول إلى المهام اليومية، ضربة الحظ، الألعاب الاستثمارية،
            ولوحة الإحصاءات الذهبية الخاصة بك داخل{" "}
            <span className="text-yellow-300 font-semibold">BİPCOIN</span>.
          </p>
        </div>

        <div className="rounded-3xl border border-yellow-500/30 bg-black/80 shadow-[0_0_40px_rgba(250,204,21,0.18)] p-6 md:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            {/* الاسم الكامل */}
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-xs text-gray-300">الاسم الكامل</label>
              <input
                type="text"
                required
                className="w-full rounded-2xl bg-black border border-yellow-500/30 px-3 py-2 text-sm text-yellow-50 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/60"
                placeholder="مثال: أحمد علي"
              />
            </div>

            {/* البريد */}
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-xs text-gray-300">البريد الإلكتروني</label>
              <input
                type="email"
                required
                className="w-full rounded-2xl bg-black border border-yellow-500/30 px-3 py-2 text-sm text-yellow-50 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/60"
                placeholder="example@mail.com"
              />
            </div>

            {/* الدولة */}
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-xs text-gray-300">الدولة</label>
              <select
                className="w-full rounded-2xl bg-black border border-yellow-500/30 px-3 py-2 text-sm text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500/60"
                defaultValue="turkey"
              >
                <option value="turkey">تركيا</option>
                <option value="syria">سوريا</option>
                <option value="saudi">السعودية</option>
                <option value="iraq">العراق</option>
                <option value="uae">الإمارات</option>
                <option value="other">دولة أخرى</option>
              </select>
            </div>

            {/* مستوى الاستثمار المفضل */}
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-xs text-gray-300">
                مستوى الاستثمار المبدئي
              </label>
              <select
                className="w-full rounded-2xl bg-black border border-yellow-500/30 px-3 py-2 text-sm text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500/60"
                defaultValue="starter"
              >
                <option value="starter">بداية (100$ – 500$)</option>
                <option value="investor">مستثمر (500$ – 3000$)</option>
                <option value="vip">VIP (3000$ – 15000$)</option>
                <option value="elite">Elite (15000$+)</option>
              </select>
            </div>

            {/* كلمة المرور */}
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-xs text-gray-300">كلمة المرور</label>
              <input
                type="password"
                required
                className="w-full rounded-2xl bg-black border border-yellow-500/30 px-3 py-2 text-sm text-yellow-50 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/60"
                placeholder="••••••••"
              />
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-xs text-gray-300">
                تأكيد كلمة المرور
              </label>
              <input
                type="password"
                required
                className="w-full rounded-2xl bg-black border border-yellow-500/30 px-3 py-2 text-sm text-yellow-50 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/60"
                placeholder="••••••••"
              />
            </div>

            {/* الشروط */}
            <div className="md:col-span-2 flex flex-col gap-2 text-[11px] text-gray-400">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  required
                  className="h-3 w-3 rounded border-yellow-500/40 bg-black text-yellow-500"
                />
                <span>
                  أوافق على شروط الاستخدام وسياسة المخاطر الخاصة بمنصة{" "}
                  <span className="text-yellow-300 font-semibold">
                    BİPCOIN
                  </span>
                  .
                </span>
              </label>
              <p>
                منصّة استثمارية رقمية بنظام VIP، الأرباح ليست مضمونة 100% ويتم
                احتسابها حسب أداء الخطط الاستثمارية والذكاء الاصطناعي.
              </p>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold text-sm py-2.5 mt-1 shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {loading ? "جار إنشاء الحساب..." : "إنشاء حساب مستثمر الآن"}
              </button>
            </div>
          </form>

          <div className="text-center text-xs text-gray-300">
            لديك حساب مسبقاً؟{" "}
            <Link
              href="/login"
              className="text-yellow-300 font-semibold hover:text-yellow-200"
            >
              تسجيل الدخول إلى حسابك
            </Link>
          </div>
        </div>

        {/* ملاحظة صغيرة */}
        <p className="mt-4 text-[10px] text-gray-500 text-center max-w-lg mx-auto">
          بعد تفعيل نظام الدخول، سيتم ربط حسابك بمحفظة BİPCOIN، المهام اليومية،
          الألعاب الاستثمارية، وضربة الحظ كل 3 أيام بشكل تلقائي.
        </p>
      </div>
    </div>
  );
}
