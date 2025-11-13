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

const USER_ID = "nu1"; // بدّلها لاحقًا بتسجيل الدخول الفعلي

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
      if (!res.ok) throw new Error(data?.error || "error");
      setS((p) => ({
        ...p,
        loading: false,
        canClaim: data.canClaim,
        lastClaim: data.lastClaim,
        streak: data.streak,
        rewardUSD: data.rewardUSD,
        weeklyBonusUSD: data.weeklyBonusUSD,
        weeklyEvery: data.weeklyEvery,
        claimedMsg: undefined,
        err: undefined,
      }));
    } catch (e: any) {
      setS((p) => ({ ...p, loading: false, err: "فشل الجلب" }));
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function claim() {
    try {
      setS((p) => ({ ...p, loading: true, claimedMsg: undefined }));
      const res = await fetch("/api/daily-reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data?.message || "error");

      const msg =
        data.bonusUSD && data.bonusUSD > 0
          ? `🎉 حصلت على ${data.totalUSD}$ (تشمل بونص أسبوعي ${data.bonusUSD}$)`
          : `✅ تمت إضافة ${data.totalUSD}$ إلى محفظتك`;

      setS((p) => ({
        ...p,
        loading: false,
        canClaim: false,
        lastClaim: new Date().toISOString(),
        streak: data.streak,
        claimedMsg: msg,
        err: undefined,
      }));
    } catch (e: any) {
      setS((p) => ({ ...p, loading: false, err: "لا يمكن المطالبة الآن" }));
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f9ff]">
      <div className="max-w-md mx-auto py-10 px-4">
        <h1 className="text-center text-[#0b1a2e] font-bold text-xl">صندوق الهدايا اليومي</h1>

        <div className="mt-6 bg-white border border-[#dce9ff] shadow-sm rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[#0b1a2e] font-semibold">هدية اليوم</div>
              <div className="text-sm text-[#587089]">
                اربح {s.rewardUSD}$ يوميًا — و{ s.weeklyBonusUSD }$ بونص كل {s.weeklyEvery} أيام متتالية.
              </div>
            </div>
            <div className="text-2xl">🎁</div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-5">
            <Stat label="Streak" value={`يوم ${s.streak}`} />
            <Stat label="آخر تحصيل" value={s.lastClaim ? fmtDate(s.lastClaim) : "—"} />
            <Stat label="حالة" value={s.canClaim ? "متاح اليوم" : "غير متاح اليوم"} />
          </div>

          {s.claimedMsg && (
            <div className="mt-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl p-3">
              {s.claimedMsg}
            </div>
          )}
          {s.err && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
              {s.err}
            </div>
          )}

          <button
            onClick={claim}
            disabled={s.loading || !s.canClaim}
            className={`mt-5 w-full rounded-xl py-3 font-semibold transition
              ${s.loading || !s.canClaim ? "bg-[#e7eef9] text-[#7b8fa6] cursor-not-allowed" :
               "bg-[#2aa1ff] hover:bg-[#1b8aea] text-white"}`}
          >
            {s.loading ? "جارٍ..." : "إدعُ الآن"}
          </button>

          <div className="mt-4 text-xs text-[#6b85a0]">
            * يتم إضافة البونص تلقائيًا في اليوم {s.weeklyEvery} من الستريك (وكل مضاعف 7).
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center bg-[#f8fbff] border border-[#e7effa] rounded-xl py-3">
      <div className="text-xs text-[#6b85a0]">{label}</div>
      <div className="text-[#0b1a2e] font-semibold mt-1">{value}</div>
    </div>
  );
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} — ${d.getHours()}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
}
