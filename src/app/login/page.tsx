"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("+90");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; code?: string; password?: string }>({});

  function validate() {
    const e: typeof errors = {};
    if (!phone || phone.trim().length < 6) e.phone = "رقم غير صحيح";
    if (!code || code.trim().length < 2) e.code = "أدخل كود الدولة";
    if (!password || password.length < 8) e.password = "كلمة المرور 8 أحرف على الأقل";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ phone, code, password }),
      });
      if (res.ok) window.location.href = "/me";
      else alert("بيانات تسجيل الدخول غير صحيحة");
    } catch {
      alert("حدث خطأ، حاول لاحقًا");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 border border-[#dce9ff]">
        {/* Logo + Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <div className="w-14 h-14 rounded-full bg-[#2aa1ff] flex items-center justify-center text-white text-2xl font-bold shadow-md">
              AI
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#003366]">Money AI</h1>
          <p className="text-sm text-[#345067]">تسجيل الدخول إلى حسابك</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* رقم الهاتف */}
          <div className="space-y-1">
            <label className="text-sm text-[#345067]">رقم الهاتف</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="05xxxxxxxx"
              className="w-full rounded-xl border border-[#dce9ff] bg-white px-3 py-2 outline-none"
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* كود الدولة */}
          <div className="space-y-1">
            <label className="text-sm text-[#345067]">كود الدولة</label>
            <select
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-xl border border-[#dce9ff] bg-white px-3 py-2 outline-none"
            >
              <option value="+90">+90</option>
              <option value="+971">+971</option>
              <option value="+966">+966</option>
              <option value="+20">+20</option>
            </select>
            {errors.code && <p className="text-xs text-red-500">{errors.code}</p>}
          </div>

          {/* كلمة المرور */}
          <div className="space-y-1">
            <label className="text-sm text-[#345067]">كلمة المرور</label>
            <div className="flex gap-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={show ? "text" : "password"}
                placeholder="********"
                className="flex-1 rounded-xl border border-[#dce9ff] bg-white px-3 py-2 outline-none"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="rounded-xl border border-[#dce9ff] bg-white px-3 py-2 text-sm"
              >
                {show ? "إخفاء" : "إظهار"}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>

          <div className="text-right text-sm text-[#345067]">
            <Link href="/forgot">نسيت كلمة المرور؟</Link>
          </div>

          {/* زر الإرسال */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full rounded-xl py-3 font-semibold transition ${
              submitting
                ? "bg-[#e7eef9] text-[#7b8fa6] cursor-not-allowed"
                : "bg-[#2aa1ff] hover:bg-[#1b8aea] text-white"
            }`}
          >
            {submitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="text-center text-sm text-[#345067] mt-4">
          ليس لديك حساب؟{" "}
          <Link href="/signup" className="text-[#1a73e8] font-semibold">
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  );
}
