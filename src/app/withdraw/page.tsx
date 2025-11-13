"use client";

import { useState } from "react";

const USER_ID = "nu1";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function submitWithdraw() {
    setLoading(true);
    setMsg(null);
    setErr(null);

    try {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, amount: Number(amount) }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "failed");

      setMsg(`✓ تم إرسال طلب السحب بقيمة ${amount}$ بنجاح`);
      setAmount("");
    } catch (e) {
      setErr("تعذّر إنشاء طلب السحب، حاول لاحقًا.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f8ff] py-8 px-5">
      <div className="max-w-lg mx-auto">
        {/* العنوان */}
        <h1 className="text-3xl font-extrabold text-[#0b1a2e] text-center">
          طلب سحب الأموال
        </h1>

        <p className="text-center text-[#5b6f85] text-sm mt-2">
          اسحب رصيدك مباشرة إلى حسابك البنكي أو محفظة الدفع الخاصة بك.
        </p>

        {/* بطاقة الرصيد */}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-[0_6px_20px_rgba(15,35,95,0.06)] border border-[#dce9ff]">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-[#8aa2c1]">رصيدك الحالي</div>
              <div className="text-3xl font-bold text-[#0b1a2e]">$150.35</div>
            </div>
            <div className="text-4xl">💳</div>
          </div>
        </div>

        {/* صندوق السحب */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-[0_6px_20px_rgba(15,35,95,0.05)] border border-[#dce9ff] space-y-5">

          {/* إدخال المبلغ */}
          <div>
            <label className="text-sm text-[#3c4a5e] mb-2 block">قيمة السحب ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-xl border border-[#d6e3fa] bg-[#f8fbff] focus:outline-none focus:border-[#2aa1ff] text-[#0b1a2e] text-lg shadow-sm transition"
            />
          </div>

          {/* طرق السحب */}
          <div>
            <label className="text-sm text-[#3c4a5e] mb-2 block">
              اختر طريقة السحب
            </label>

            <div className="grid grid-cols-2 gap-3">
              <WithdrawMethod icon="🏦" label="حساب بنكي" />
              <WithdrawMethod icon="💳" label="فيزا/ماستر" />
              <WithdrawMethod icon="📱" label="محفظة رقمية" />
              <WithdrawMethod icon="💰" label="PayPal" />
            </div>
          </div>

          {/* الرسالة */}
          {msg && (
            <div className="rounded-xl p-4 text-green-700 bg-green-100 border border-green-300 text-sm">
              {msg}
            </div>
          )}

          {err && (
            <div className="rounded-xl p-4 text-red-700 bg-red-100 border border-red-300 text-sm">
              {err}
            </div>
          )}

          {/* الزر */}
          <button
            disabled={loading || !amount}
            onClick={submitWithdraw}
            className={`w-full py-3 text-center rounded-xl font-bold text-white text-lg shadow-md transition
              ${
                loading || !amount
                  ? "bg-[#bcd6f9] cursor-not-allowed"
                  : "bg-[#2aa1ff] hover:bg-[#1b8aea]"
              }`}
          >
            {loading ? "جارٍ الإرسال..." : "إرسال طلب السحب"}
          </button>

          <p className="text-xs text-[#8aa2c1] text-center mt-1">
            قد تستغرق عملية السحب بين 24–48 ساعة حسب الطريقة المختارة.
          </p>
        </div>

        {/* رابط تاريخ السحب */}
        <div className="text-center mt-6">
          <a
            href="/withdraw/history"
            className="text-[#2aa1ff] font-semibold hover:underline"
          >
            عرض سجل السحوبات →
          </a>
        </div>
      </div>
    </div>
  );
}

function WithdrawMethod({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      className="
        w-full p-3 rounded-xl border border-[#dce9ff] 
        bg-[#f8fbff] hover:bg-white
        shadow-sm text-[#0b1a2e] 
        flex flex-col items-center gap-1 transition
      "
    >
      <div className="text-2xl">{icon}</div>
      <div className="text-sm font-medium">{label}</div>
    </button>
  );
}
