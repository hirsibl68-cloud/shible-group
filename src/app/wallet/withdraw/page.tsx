"use client";

import { useState } from "react";

const USER_ID = "nu1"; // مؤقتًا نفس المستخدم التجريبي

type State = {
  amount: string;
  method: "bank" | "crypto" | "wallet";
  iban: string;
  address: string;
  note: string;
  loading: boolean;
  msg?: string;
  err?: string;
};

export default function WithdrawPage() {
  const [s, setS] = useState<State>({
    amount: "",
    method: "bank",
    iban: "",
    address: "",
    note: "",
    loading: false,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setS((p) => ({ ...p, msg: undefined, err: undefined }));

    const amountNum = Number(s.amount);
    if (!amountNum || amountNum <= 0) {
      setS((p) => ({ ...p, err: "اكتب مبلغًا صحيحًا للسحب." }));
      return;
    }

    try {
      setS((p) => ({ ...p, loading: true }));
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: USER_ID,
          amount: amountNum,
          method: s.method,
          iban: s.iban || null,
          address: s.address || null,
          note: s.note || null,
        }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "error");
      }

      setS((p) => ({
        ...p,
        loading: false,
        msg:
          "تم إرسال طلب السحب بنجاح، سيتم مراجعته من قبل الإدارة خلال وقت قصير.",
        err: undefined,
      }));
    } catch {
      setS((p) => ({
        ...p,
        loading: false,
        err: "تعذّر إرسال طلب السحب، حاول مرة أخرى.",
      }));
    }
  }

  const min = 5; // حد أدنى شكلي
  const fastPresets = [10, 25, 50, 100];

  return (
    <div className="min-h-screen bg-[#eef3ff]">
      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        {/* رأس الصفحة */}
        <header className="flex items-center justify-between">
          <div>
            <div className="text-xs text-[#7b8ba5]">إدارة الأرباح</div>
            <h1 className="text-lg font-semibold text-[#10172a]">
              طلب سحب الرصيد
            </h1>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#fee2e2] grid place-items-center text-xl">
            💸
          </div>
        </header>

        {/* تنبيه بسيط */}
        <section className="rounded-2xl bg-[#fef3c7] border border-[#fde68a] px-4 py-3 text-[12px] text-[#713f12]">
          تأكد من صحة بيانات الحساب البنكي أو المحفظة الرقمية قبل إرسال طلب السحب،
          فالتحويل سيتم عليها مباشرة.
        </section>

        {/* نموذج السحب */}
        <section className="rounded-3xl bg-white border border-[#e1e7ff] p-4 shadow-sm space-y-4">
          <form onSubmit={submit} className="space-y-4">
            {/* المبلغ */}
            <div className="space-y-1">
              <label className="text-xs text-[#6b7280]">مبلغ السحب (بالدولار)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={min}
                  step="0.01"
                  value={s.amount}
                  onChange={(e) =>
                    setS((p) => ({ ...p, amount: e.target.value }))
                  }
                  className="flex-1 rounded-2xl border border-[#d1d9ff] bg-[#f9fbff] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563eb]/40"
                  placeholder={`الحد الأدنى ${min}$`}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {fastPresets.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() =>
                      setS((p) => ({ ...p, amount: String(v) }))
                    }
                    className="px-3 py-1 rounded-full border border-[#e5edff] bg-[#f3f6ff] text-[11px] text-[#1d4ed8] hover:bg-[#e0e7ff] transition"
                  >
                    {v}$
                  </button>
                ))}
              </div>
            </div>

            {/* طريقة السحب */}
            <div className="space-y-1">
              <label className="text-xs text-[#6b7280]">طريقة السحب</label>
              <div className="grid grid-cols-3 gap-2 text-[12px]">
                <MethodChip
                  label="حساب بنكي"
                  value="bank"
                  icon="🏦"
                  active={s.method === "bank"}
                  onClick={() =>
                    setS((p) => ({ ...p, method: "bank" as const }))
                  }
                />
                <MethodChip
                  label="عملات رقمية"
                  value="crypto"
                  icon="🪙"
                  active={s.method === "crypto"}
                  onClick={() =>
                    setS((p) => ({ ...p, method: "crypto" as const }))
                  }
                />
                <MethodChip
                  label="محفظة أخرى"
                  value="wallet"
                  icon="👛"
                  active={s.method === "wallet"}
                  onClick={() =>
                    setS((p) => ({ ...p, method: "wallet" as const }))
                  }
                />
              </div>
            </div>

            {/* الحقول حسب الطريقة */}
            {s.method === "bank" && (
              <div className="space-y-1">
                <label className="text-xs text-[#6b7280]">
                  رقم الآيبان / الحساب البنكي
                </label>
                <input
                  value={s.iban}
                  onChange={(e) =>
                    setS((p) => ({ ...p, iban: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-[#d1d9ff] bg-[#f9fbff] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563eb]/40"
                  placeholder="مثال: TRxx xxxx xxxx xxxx"
                />
              </div>
            )}

            {s.method === "crypto" && (
              <div className="space-y-1">
                <label className="text-xs text-[#6b7280]">
                  عنوان المحفظة (USDT / BTC / غيره)
                </label>
                <input
                  value={s.address}
                  onChange={(e) =>
                    setS((p) => ({ ...p, address: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-[#d1d9ff] bg-[#f9fbff] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563eb]/40"
                  placeholder="الصق عنوان محفظتك هنا"
                />
              </div>
            )}

            {s.method === "wallet" && (
              <div className="space-y-1">
                <label className="text-xs text-[#6b7280]">
                  وصف وجهة التحويل
                </label>
                <input
                  value={s.address}
                  onChange={(e) =>
                    setS((p) => ({ ...p, address: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-[#d1d9ff] bg-[#f9fbff] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563eb]/40"
                  placeholder="مثال: تحويل إلى محفظة شخصية ثانية"
                />
              </div>
            )}

            {/* ملاحظة اختيارية */}
            <div className="space-y-1">
              <label className="text-xs text-[#6b7280]">
                ملاحظة اختيارية (تظهر للإدارة فقط)
              </label>
              <textarea
                rows={2}
                value={s.note}
                onChange={(e) =>
                  setS((p) => ({ ...p, note: e.target.value }))
                }
                className="w-full rounded-2xl border border-[#d1d9ff] bg-[#f9fbff] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563eb]/40"
                placeholder="مثال: أفضّل التحويل في فترة المساء."
              />
            </div>

            {/* رسائل */}
            {s.err && (
              <div className="text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-2xl px-3 py-2">
                {s.err}
              </div>
            )}
            {s.msg && (
              <div className="text-[12px] text-green-700 bg-green-50 border border-green-200 rounded-2xl px-3 py-2">
                {s.msg}
              </div>
            )}

            {/* زر الإرسال */}
            <button
              type="submit"
              disabled={s.loading}
              className={`w-full rounded-2xl py-2.5 text-sm font-semibold shadow-sm transition
                ${
                  s.loading
                    ? "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
                    : "bg-[#22c55e] text-white hover:bg-[#16a34a]"
                }`}
            >
              {s.loading ? "جارٍ إرسال الطلب..." : "إرسال طلب السحب"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

function MethodChip(props: {
  label: string;
  value: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`rounded-2xl border px-2.5 py-2 flex flex-col items-start gap-0.5 transition text-left
        ${
          props.active
            ? "border-[#2563eb] bg-[#e0edff] text-[#1d4ed8]"
            : "border-[#e5edff] bg-[#f9fbff] text-[#374151] hover:bg-[#edf3ff]"
        }`}
    >
      <span className="text-[11px] font-semibold flex items-center gap-1">
        <span>{props.icon}</span>
        <span>{props.label}</span>
      </span>
      <span className="text-[10px] text-[#6b7280]">
        {props.active ? "محدّد" : "اضغط للاختيار"}
      </span>
    </button>
  );
}
