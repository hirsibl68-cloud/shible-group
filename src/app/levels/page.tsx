"use client";

import { useEffect, useState } from "react";

const USER_ID = "nu1"; // نفس المستخدم التجريبي

type LevelData = {
  userId: string;
  xp: number;
  level: number;
  progress: number; // 0..1
  nextLevelXP: number;
};

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: LevelData };

const perksByLevel: Record<number, string[]> = {
  1: ["فتح المهام اليومية", "صندوق هدية يومي", "بدء تجميع XP"],
  2: ["زيادة حد السحب اليومي", "فتح تحديات إضافية", "شارة متسخدم نشيط"],
  3: ["زيادة مكافأة بعض المهام", "أولوية في الدعم", "مميزات تسويقية إضافية"],
  4: ["مكافآت أسبوعية أعلى", "حملات إحالة خاصة", "مركز VIP"],
};

export default function LevelsPage() {
  const [s, setS] = useState<State>({ status: "loading" });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/levels?userId=${USER_ID}`);
        const data = await res.json();
        if (!res.ok || data.error) {
          setS({ status: "error" });
        } else {
          setS({
            status: "ready",
            data: {
              userId: data.userId,
              xp: data.xp,
              level: data.level,
              progress: data.progress,
              nextLevelXP: data.nextLevelXP,
            },
          });
        }
      } catch {
        setS({ status: "error" });
      }
    })();
  }, []);

  if (s.status === "loading") {
    return (
      <div className="min-h-screen bg-[#f3f6ff]">
        <div className="max-w-md mx-auto px-4 py-6 space-y-4">
          <div className="h-8 bg-[#e3ebff] rounded-xl w-2/3 animate-pulse" />
          <div className="h-32 bg-[#e3ebff] rounded-3xl animate-pulse" />
          <div className="h-40 bg-[#e3ebff] rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (s.status === "error") {
    return (
      <div className="min-h-screen bg-[#f3f6ff]">
        <div className="max-w-md mx-auto px-4 py-10 text-center text-sm text-red-500">
          تعذّر تحميل بيانات المستوى، حاول لاحقًا.
        </div>
      </div>
    );
  }

  const { level, xp, progress, nextLevelXP } = s.data;
  const perc = Math.round((progress || 0) * 100);

  const currentPerks = perksByLevel[level] ?? [
    "مميزات أساسية",
    "كشف رصيد وXP",
    "المهام اليومية",
  ];

  const upcomingPerks = perksByLevel[level + 1] ?? [
    "مميزات سيتم الإعلان عنها لاحقًا",
  ];

  return (
    <div className="min-h-screen bg-[#f3f6ff]">
      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        {/* رأس الصفحة */}
        <header className="flex items-center justify-between">
          <div>
            <div className="text-xs text-[#7b8ba5]">نظام المستويات</div>
            <h1 className="text-lg font-semibold text-[#10172a]">
              مستوى حسابك في Money AI
            </h1>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#ffe9b3] grid place-items-center text-xl">
            ⭐
          </div>
        </header>

        {/* بطاقة المستوى الحالي */}
        <section className="rounded-3xl bg-gradient-to-br from-[#1a84ff] via-[#1653c7] to-[#0e2458] text-white p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs text-white/75">مستواك الحالي</div>
              <div className="mt-1 text-3xl font-extrabold">
                LVL {level}
              </div>
              <div className="text-[11px] text-white/80 mt-1">
                كل مهمة، كل إيداع، كل نشاط يزيد نقاط الخبرة XP ويطوّر حسابك.
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-xs">
                <span>XP</span>
                <span className="font-semibold">{xp}</span>
              </div>
              <div className="mt-3 text-[11px] text-white/80">
                المتبقي للمستوى التالي:
                <br />
                <span className="font-semibold text-white">
                  {nextLevelXP - xp > 0 ? nextLevelXP - xp : 0} XP
                </span>
              </div>
            </div>
          </div>

          {/* شريط تقدم المستوى */}
          <div>
            <div className="flex justify-between text-[11px] text-white/80 mb-1">
              <span>التقدّم نحو المستوى التالي</span>
              <span>{perc}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#ffdd7c]"
                style={{ width: `${Math.min(100, Math.max(0, perc))}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] mt-2">
            <span className="px-2 py-1 rounded-full bg-white/10">
              🎯 نفّذ المهام اليومية لزيادة XP بسرعة
            </span>
            <span className="px-2 py-1 rounded-full bg-white/10">
              🎁 الهدايا اليومية تزيد فرص الوصول للمستوى التالي
            </span>
          </div>
        </section>

        {/* مزايا المستوى الحالي */}
        <section className="rounded-3xl bg-white border border-[#e2e9ff] p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#111827]">
              مزايا المستوى الحالي (LVL {level})
            </h2>
            <span className="text-xs text-[#6b7280]">مفعّلة على حسابك</span>
          </div>
          <ul className="space-y-2">
            {currentPerks.map((perk, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#374151]">
                <span className="mt-0.5 text-[#22c55e]">●</span>
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* نظرة على المستوى القادم */}
        <section className="rounded-3xl bg-[#fef9e7] border border-[#f5e0a3] p-4 shadow-sm space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#854d0e]">
              ماذا ينتظرك في المستوى التالي (LVL {level + 1})؟
            </h2>
            <span className="text-xs text-[#a16207]">قريباً 🎯</span>
          </div>
          <ul className="space-y-2">
            {upcomingPerks.map((perk, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#92400e]">
                <span className="mt-0.5 text-[#f97316]">★</span>
                <span>{perk}</span>
              </li>
            ))}
          </ul>
          <div className="text-[11px] text-[#92400e] mt-1">
            استمر في تنفيذ المهام اليومية والإيداعات للحصول على XP أسرع والوصول إلى المستويات الأعلى.
          </div>
        </section>
      </div>
    </div>
  );
}
