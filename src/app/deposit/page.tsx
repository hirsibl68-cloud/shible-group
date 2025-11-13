"use client";

import { useState } from "react";
import Link from "next/link";

const presets = [50, 100, 250, 500, 1000];

export default function DepositPage() {
  const [amount, setAmount] = useState<string>("");
  const [method, setMethod] = useState<"usdt" | "card" | "bank">("usdt");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(amount);
    if (!n || n <= 0) return alert("أدخل مبلغًا صالحًا");

    const userId = localStorage.getItem("userId");
    if (!userId) return alert("الرجاء تسجيل الدخول أولاً");

    setLoading(true);
    try {
      const res = await fetch("/api/deposit", {
        method: "POST",
        body: JSON.stringify({ userId, amount: n, method }),
      });
      if (res.ok) {
        alert("تم الإيداع بنجاح ✅");
        setAmount("");
      } else {
        alert("تعذر تنفيذ الإيداع ❌");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef6ff] via-white to-[#f7fbff] p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0b1a2e]">إيداع الأموال</h1>
            <p className="text-sm text-[#517694]">أضف رصيدك بأمان وسهولة</p>
          </div>
          <Link href="/wallet" className="text-[#1b6fe0] text-sm">← العودة للمحفظة</Link>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-[#dce9ff] bg-white shadow-sm overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-2 w-full bg-gradient-to-r from-[#2aa1ff] via-[#00d1ff] to-[#77e4ff]" />

          <form onSubmit={onSubmit} className="p-6 md:p-8 space-y-6">
            {/* Methods */}
            <div>
              <p className="text-sm text-[#345067] mb-2">طريقة الإيداع</p>
              <div className="grid grid-cols-3 gap-2">
                <Tab selected={method === "usdt"} onClick={() => setMethod("usdt")} label="USDT (TRC20)" emoji="🟢" />
                <Tab selected={method === "card"} onClick={() => setMethod("card")} label="بطاقة مصرفية" emoji="💳" />
                <Tab selected={method === "bank"} onClick={() => setMethod("bank")} label="تحويل بنكي" emoji="🏦" />
              </div>
            </div>

            {/* Amount */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-[#345067]">المبلغ</label>
                <span className="text-xs text-[#7b8fa6]">الحد الأدنى 10 USDT</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 rounded-2xl border border-[#dce9ff] px-4 py-3">
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="مثال: 100.00"
                    className="w-full outline-none text-[#0b1a2e] placeholder-[#9bb3c9] bg-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setAmount("")}
                  className="rounded-xl border border-[#dce9ff] px-4 py-3 text-sm"
                >
                  مسح
                </button>
              </div>

              {/* Presets */}
              <div className="mt-3 flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setAmount(String(p))}
                    className="rounded-xl px-4 py-2 text-sm border border-[#dce9ff] hover:border-[#2aa1ff] hover:text-[#0b1a2e] bg-white"
                  >
                    {p.toLocaleString()} USDT
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="grid md:grid-cols-3 gap-3">
              <SummaryItem title="المبلغ الصافي" value={`${Number(amount || 0).toLocaleString()} USDT`} />
              <SummaryItem
                title="الرسوم التقديرية"
                value={
                  method === "usdt" ? "0.0" : method === "card" ? "1.8%" : "0.5%"
                }
              />
              <SummaryItem
                title="سيتم إضافة"
                value={`${calcReceive(Number(amount || 0), method)}`}
              />
            </div>

            {/* Action */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-2xl py-3 font-semibold transition ${
                loading
                  ? "bg-[#e7eef9] text-[#7b8fa6] cursor-not-allowed"
                  : "bg-[#2aa1ff] hover:bg-[#1b8aea] text-white"
              }`}
            >
              {loading ? "جارٍ المعالجة…" : "تأكيد الإيداع"}
            </button>

            {/* Help box */}
            <div className="rounded-2xl border border-[#e9f2ff] bg-[#f7fbff] p-4">
              <p className="text-sm text-[#345067]">
                لمساعدتك: بعد اختيار <b>USDT</b> سنعرض عنوان التحويل. لبطاقة/بنك قد تحتاج
                لتأكيد إضافي من مزوّد الدفع.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------- UI atoms ---------- */
function Tab({
  selected,
  label,
  emoji,
  onClick,
}: {
  selected: boolean;
  label: string;
  emoji: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-sm text-left ${
        selected
          ? "border-[#2aa1ff] bg-[#f0f7ff] text-[#0b1a2e]"
          : "border-[#dce9ff] bg-white text-[#345067] hover:border-[#bcd6ff]"
      }`}
    >
      <span className="mr-1">{emoji}</span>
      {label}
    </button>
  );
}

function SummaryItem({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#dce9ff] bg-white p-4">
      <p className="text-xs text-[#7b8fa6]">{title}</p>
      <p className="text-lg font-semibold text-[#0b1a2e] mt-0.5">{value}</p>
    </div>
  );
}

/* ---------- helpers ---------- */
function calcReceive(a: number, method: "usdt" | "card" | "bank") {
  if (!a) return "0 USDT";
  let fee = 0;
  if (method === "card") fee = a * 0.018;
  if (method === "bank") fee = a * 0.005;
  const net = Math.max(a - fee, 0);
  return `${net.toFixed(2)} USDT`;
}
