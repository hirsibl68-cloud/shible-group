"use client";

import { useEffect, useState } from "react";

const USER_ID = "nu1"; // نفس المستخدم التجريبي

type WalletData = {
  balance: number;
  totalDeposits?: number;
  totalWithdrawals?: number;
  totalTasksEarn?: number;
  totalDailyEarn?: number;
};

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: WalletData };

export default function WalletPage() {
  const [s, setS] = useState<State>({ status: "loading" });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/wallet?userId=${USER_ID}`);
        const data = await res.json();

        if (!res.ok || data.error) {
          // لو ما عندك API جاهز، نرجّع بيانات افتراضية بدل ما نكسر الصفحة
          setS({
            status: "ready",
            data: {
              balance: 0,
              totalDeposits: 0,
              totalWithdrawals: 0,
              totalTasksEarn: 0,
              totalDailyEarn: 0,
            },
          });
          return;
        }

        setS({
          status: "ready",
          data: {
            balance: data.balance ?? 0,
            totalDeposits: data.totalDeposits ?? 0,
            totalWithdrawals: data.totalWithdrawals ?? 0,
            totalTasksEarn: data.totalTasksEarn ?? 0,
            totalDailyEarn: data.totalDailyEarn ?? 0,
          },
        });
      } catch {
        // نفس الشي: fallback افتراضي
        setS({
          status: "ready",
          data: {
            balance: 0,
            totalDeposits: 0,
            totalWithdrawals: 0,
            totalTasksEarn: 0,
            totalDailyEarn: 0,
          },
        });
      }
    })();
  }, []);

  if (s.status === "loading") {
    return (
      <div className="min-h-screen bg-[#eef3ff]">
        <div className="max-w-md mx-auto px-4 py-6 space-y-4">
          <div className="h-32 bg-[#e3ebff] rounded-3xl animate-pulse" />
          <div className="h-24 bg-[#e3ebff] rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  const d = s.status === "ready" ? s.data : {
    balance: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalTasksEarn: 0,
    totalDailyEarn: 0,
  };

  return (
    <div className="min-h-screen bg-[#eef3ff]">
      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        {/* رأس الصفحة */}
        <header className="flex items-center justify-between">
          <div>
            <div className="text-xs text-[#7b8ba5]">محفظة Money AI</div>
            <h1 className="text-lg font-semibold text-[#10172a]">
              ملخص المحفظة والربح
            </h1>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#dbeafe] grid place-items-center text-xl">
            💳
          </div>
        </header>

        {/* بطاقة الرصيد الرئيسي */}
        <section className="rounded-3xl bg-gradient-to-br from-[#1a84ff] via-[#2563eb] to-[#0f172a] text-white p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-white/75">الرصيد المتاح</div>
              <div className="mt-1 text-3xl font-extrabold tracking-wide">
                ${d.balance.toFixed(2)}
              </div>
              <div className="text-[11px] text-white/75 mt-1">
                يمكنك الإيداع والسحب في أي وقت حسب حدود الحساب لديك.
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs hover:bg-white/15 transition">
                تفاصيل الحركات
              </button>
              <div className="text-[11px] text-white/80">
                آخر تحديث: الآن تقريبًا
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-white/85 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">⬆️</span>
              <div>
                <div className="opacity-75">إجمالي الإيداعات</div>
                <div className="font-semibold">
                  ${(d.totalDeposits ?? 0).toFixed(2)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">⬇️</span>
              <div>
                <div className="opacity-75">إجمالي السحوبات</div>
                <div className="font-semibold">
                  ${(d.totalWithdrawals ?? 0).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* أرباح ذكية */}
        <section className="rounded-3xl bg-white border border-[#e1e7ff] p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#111827]">
              أرباحك من الذكاء الاصطناعي
            </h2>
            <span className="text-[11px] text-[#6b7280]">مباشرة إلى المحفظة</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <EarningCard
              label="أرباح المهام اليومية"
              emoji="🧩"
              amount={d.totalTasksEarn ?? 0}
              hint="قم بإنهاء المهام في صفحة المهام لزيادة هذا الرقم."
            />
            <EarningCard
              label="أرباح الهدايا اليومية"
              emoji="🎁"
              amount={d.totalDailyEarn ?? 0}
              hint="ادخل كل يوم إلى صندوق الهدايا اليومية لتحصل على رصيد إضافي."
            />
          </div>
        </section>

        {/* اختصارات سريعة */}
        <section className="rounded-3xl bg-white border border-[#e1e7ff] p-4 shadow-sm space-y-3 mb-6">
          <h2 className="text-sm font-semibold text-[#111827]">
            اختصارات سريعة
          </h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <QuickLink href="/deposit" label="إيداع" emoji="➕" desc="إضافة رصيد لمحفظتك." />
            <QuickLink href="/withdraw" label="سحب" emoji="💸" desc="سحب أرباحك." />
            <QuickLink href="/tasks" label="المهام اليومية" emoji="🧠" desc="نفّذ مهام واربح." />
            <QuickLink href="/daily" label="صندوق يومي" emoji="🎁" desc="هدية يومية مستمرة." />
          </div>
        </section>
      </div>
    </div>
  );
}

function EarningCard({
  label,
  emoji,
  amount,
  hint,
}: {
  label: string;
  emoji: string;
  amount: number;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-[#e5edff] bg-[#f8fbff] px-3 py-2.5 space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#111827] font-semibold">{label}</span>
        <span className="text-sm">{emoji}</span>
      </div>
      <div className="text-[#1d4ed8] font-bold text-base">
        ${amount.toFixed(2)}
      </div>
      <div className="text-[10px] text-[#6b7280] leading-snug">{hint}</div>
    </div>
  );
}

function QuickLink({
  href,
  label,
  emoji,
  desc,
}: {
  href: string;
  label: string;
  emoji: string;
  desc: string;
}) {
  return (
    <a
      href={href}
      className="rounded-2xl border border-[#e5edff] bg-[#f9fbff] px-3 py-2.5 hover:bg-[#edf3ff] transition shadow-sm"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#111827] font-semibold">{label}</span>
        <span className="text-lg">{emoji}</span>
      </div>
      <div className="text-[11px] text-[#6b7280] mt-1">{desc}</div>
    </a>
  );
}
