"use client";

import { useEffect, useState } from "react";

type State = {
  loading: boolean;
  canClaim: boolean;
  lastClaim?: string | null;
  streak: number;
  rewardUSD: number;
  weeklyBonusUSD: number;
  weeklyEvery: number;
  claimedMsg?: string;
  err?: string;
};

const USER_ID = "nu1"; // مؤقتًا نفس المستخدم التجريبي

export default function DailyRewardPage() {
  const [s, setS] = useState<State>({
    loading: true,
    canClaim: false,
    lastClaim: null,
    streak: 0,
    rewardUSD: 1.5,
    weeklyBonusUSD: 3,
    weeklyEvery: 7,
  });

  async function load() {
    try {
      const res = await fetch(`/api/daily-reward?userId=${USER_ID}`);
      const data = await res.json();
      if (!res.ok || data.error) throw new Error("error");

      setS((p) => ({
        ...p,
        loading: false,
        canClaim: data.canClaim,
        lastClaim: data.lastClaim,
        streak: data.streak ?? 0,
        rewardUSD: data.rewardUSD ?? p.rewardUSD,
        weeklyBonusUSD: data.weeklyBonusUSD ?? p.weeklyBonusUSD,
        weeklyEvery: data.weeklyEvery ?? p.weeklyEvery,
        claimedMsg: undefined,
        err: undefined,
      }));
    } catch {
      setS((p) => ({ ...p, loading: false, err: "فشل تحميل بيانات الهديّة" }));
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function claim() {
    try {
      setS((p) => ({ ...p, loading: true, claimedMsg: undefined, err: undefined }));
      const res = await fetch("/api/daily-reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data?.message || "error");

      const total = data.totalUSD ?? data.rewardUSD ?? s.rewardUSD;
      const bonus = data.bonusUSD ?? 0;
      const streak = data.streak ?? s.streak + 1;

      const msg =
        bonus > 0
          ? `🎉 حصلت على ${total}$ (تشمل بونص أسبوعي ${bonus}$)`
          : `✅ تمت إضافة ${total}$ إلى محفظتك`;

      setS((p) => ({
        ...p,
        loading: false,
        canClaim: false,
        lastClaim: new Date().toISOString(),
        streak,
        claimedMsg: msg,
        err: undefined,
      }));
    } catch {
      setS((p) => ({
        ...p,
        loading: false,
        err: "لا يمكن استلام الهديّة الآن، جرّب بعد قليل.",
      }));
    }
  }

  const progressPercent = Math.min(
    100,
    Math.round(((s.streak % s.weeklyEvery) / s.weeklyEvery) * 100)
  );

  return (
    <div className="min-h-screen bg-[#eef3ff]">
      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        {/* الهيدر */}
        <header className="flex items-center justify-between">
          <div>
            <div className="text-xs text-[#7b8ba5]">مكافآت النشاط</div>
            <h1 className="text-lg font-semibold text-[#10172a]">
              صندوق الهدايا اليومي
            </h1>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#ffe3b3] grid place-items-center text-xl">
            🎁
          </div>
        </header>

        {/* صندوق كبير للهديّة */}
        <section className="relative rounded-3xl bg-gradient-to-br from-[#1a84ff] via-[#2563eb] to-[#0f172a] text-white p-5 shadow-lg overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-10 bottom-0 w-32 h-32 bg-[#22c55e]/10 rounded-full blur-3xl" />

          <div className="relative flex items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs text-white/75">هديّة اليوم</div>
              <div className="text-3xl font-extrabold">
                +{s.rewardUSD.toFixed(2)}$
              </div>
              <div className="text-[11px] text-white/75">
                ادخل كل يوم لتحصل على مكافأتك، ومع الاستمرار تحصل على بونص أسبوعي إضافي.
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-3xl bg-white/10 grid place-items-center text-3xl border border-white/20">
                🎁
              </div>
              <div className="text-[11px] text-white/80">
                ستريك: <span className="font-semibold">{s.streak} يوم</span>
              </div>
            </div>
          </div>

          {/* شريط الستريك للأسبوع */}
          <div className="relative mt-5 space-y-1">
            <div className="flex justify-between text-[11px] text-white/75">
              <span>التقدم نحو البونص الأسبوعي</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#facc15]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-white/60 mt-1">
              <span>0</span>
              <span>{s.weeklyEvery} أيام متتالية = +{s.weeklyBonusUSD}$</span>
            </div>
          </div>
        </section>

        {/* كروت المعلومات */}
        <section className="grid grid-cols-3 gap-3">
          <InfoCard
            label="آخر استلام"
            value={
              s.lastClaim ? formatNiceDate(s.lastClaim) : "لم تستلم أي هدية بعد"
            }
          />
          <InfoCard
            label="سلسلة الأيام"
            value={`${s.streak} يوم`}
          />
          <InfoCard
            label="حالة اليوم"
            value={
              s.loading
                ? "جارٍ التحقق..."
                : s.canClaim
                ? "متاح للاستلام ✅"
                : "غير متاح اليوم"
            }
          />
        </section>

        {/* رسائل نجاح / خطأ */}
        {s.claimedMsg && (
          <div className="rounded-2xl bg-green-50 border border-green-200 text-[12px] text-green-700 px-3 py-2">
            {s.claimedMsg}
          </div>
        )}
        {s.err && (
          <div className="rounded-2xl bg-red-50 border border-red-200 text-[12px] text-red-700 px-3 py-2">
            {s.err}
          </div>
        )}

        {/* زر الاستلام */}
        <section className="space-y-2 pb-6">
          <button
            onClick={claim}
            disabled={s.loading || !s.canClaim}
            className={`w-full rounded-2xl py-3 text-sm font-semibold shadow-sm transition
              ${
                s.loading || !s.canClaim
                  ? "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
                  : "bg-[#22c55e] text-white hover:bg-[#16a34a]"
              }`}
          >
            {s.loading
              ? "جارٍ التحقق..."
              : s.canClaim
              ? "استلام هديّة اليوم"
              : "تم الاستلام اليوم"}
          </button>
          <p className="text-[11px] text-[#6b7280] text-center">
            تتم إضافة قيمة الهديّة مباشرة إلى محفظتك، ويمكنك سحبها حسب قواعد السحب في حسابك.
          </p>
        </section>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white border border-[#e1e7ff] px-3 py-2.5 shadow-sm">
      <div className="text-[10px] text-[#6b7280] mb-1">{label}</div>
      <div className="text-[12px] text-[#0f172a] font-semibold leading-snug">
        {value}
      </div>
    </div>
  );
}

function formatNiceDate(iso: string) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${y}/${m}/${day} - ${h}:${mi}`;
}
