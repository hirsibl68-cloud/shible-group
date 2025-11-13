"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MeData = {
  id: string;
  name: string;
  balance: number;
  level: number;
  xp: number;
};

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; user: MeData };

export default function HomePage() {
  const [s, setS] = useState<State>({ status: "loading" });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        if (!res.ok || data.error) {
          setS({ status: "error" });
        } else {
          setS({
            status: "ready",
            user: {
              id: data.id,
              name: data.name,
              balance: data.balance,
              level: data.level,
              xp: data.xp,
            },
          });
        }
      } catch {
        setS({ status: "error" });
      }
    })();
  }, []);

  const cards = [
    {
      title: "المحفظة",
      desc: "عرض الرصيد وكل عملياتك",
      href: "/wallet",
      icon: "💼",
    },
    {
      title: "الإيداع",
      desc: "اشحن رصيدك بأمان",
      href: "/deposit",
      icon: "⬆️",
    },
    {
      title: "السحب",
      desc: "اسحب أرباحك بسهولة",
      href: "/withdraw",
      icon: "⬇️",
    },
    {
      title: "المهام اليومية",
      desc: "اربح 1.5$ لكل مهمة",
      href: "/tasks",
      icon: "✅",
    },
    {
      title: "مستويات و XP",
      desc: "طوّر مستواك واربح شارات",
      href: "/levels",
      icon: "🎮",
    },
    {
      title: "صندوق الهدايا اليومي",
      desc: "هدية يومية + بونص أسبوعي",
      href: "/daily",
      icon: "🎁",
    },
    {
      title: "قائمة المتصدرين",
      desc: "شاهد أفضل الشركاء",
      href: "/leaderboard",
      icon: "🏆",
    },
    {
      title: "ملفي الشخصي",
      desc: "بياناتك وحسابك الشخصي",
      href: "/me",
      icon: "👤",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f6ff]">
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">

        {/* رأس الصفحة */}
        <header className="flex items-center justify-between">
          <div>
            <div className="text-xs text-[#7b8ba5]">لوحة التحكم</div>
            <h1 className="text-lg font-semibold text-[#10172a]">
              Money AI
            </h1>
          </div>
          <Link
            href="/me"
            className="flex items-center gap-2 text-xs text-[#4b5d88]"
          >
            <span>ملفي</span>
            <span className="w-8 h-8 rounded-full bg-[#e0ebff] grid place-items-center">
              👤
            </span>
          </Link>
        </header>

        {/* بطاقة الرصيد والمستوى */}
        <section className="rounded-3xl bg-gradient-to-b from-[#1a84ff] to-[#1653c7] text-white p-5 shadow-md">
          {s.status === "loading" && (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-white/30 rounded w-1/3" />
              <div className="h-7 bg-white/40 rounded w-1/2" />
              <div className="h-3 bg-white/20 rounded w-2/3 mt-4" />
            </div>
          )}

          {s.status === "error" && (
            <div className="text-sm text-white/90">
              تعذّر تحميل بيانات الحساب، لكن يمكنك متابعة التصفّح.
            </div>
          )}

          {s.status === "ready" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/70">
                    أهلاً، {s.user.name || "مستخدم"}
                  </div>
                  <div className="mt-1 text-2xl font-semibold">
                    ${s.user.balance.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-white/80 mt-1">
                    رصيدك القابل للسحب
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-xs">
                    <span className="text-white/70">المستوى</span>
                    <span className="font-semibold">LVL {s.user.level}</span>
                  </div>
                  <div className="mt-2 text-[11px] text-white/80">
                    XP: {s.user.xp}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/deposit"
                  className="flex-1 text-center text-sm font-semibold bg-white text-[#1653c7] rounded-2xl py-2 shadow-sm"
                >
                  إيداع سريع
                </Link>
                <Link
                  href="/withdraw"
                  className="flex-1 text-center text-sm font-semibold bg-white/10 text-white rounded-2xl py-2 border border-white/30"
                >
                  سحب أرباح
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* قسم اختصارات سريعة */}
        <section className="grid grid-cols-4 gap-3">
          <QuickLink icon="✅" label="مهام" href="/tasks" />
          <QuickLink icon="🎁" label="هدية" href="/daily" />
          <QuickLink icon="🎮" label="مستويات" href="/levels" />
          <QuickLink icon="🏆" label="المتصدّرون" href="/leaderboard" />
        </section>

        {/* باقي الكروت */}
        <section className="space-y-3 pb-6">
          {cards.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="block rounded-2xl bg-white border border-[#e2e9ff] px-4 py-3 shadow-sm hover:bg-[#f7f9ff] transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-[#eef3ff] grid place-items-center text-lg">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#111827]">
                      {c.title}
                    </div>
                    <div className="text-[11px] text-[#7b8ba5] mt-0.5">
                      {c.desc}
                    </div>
                  </div>
                </div>
                <span className="text-[#c0cadc] text-lg">›</span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}

function QuickLink({
  icon,
  label,
  href,
}: {
  icon: string;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl bg-white border border-[#e2e9ff] px-3 py-3 flex flex-col items-center gap-1 text-center text-xs hover:bg-[#f7f9ff] transition"
    >
      <div className="w-8 h-8 rounded-2xl bg-[#eef3ff] grid place-items-center text-lg">
        {icon}
      </div>
      <span className="text-[#111827]">{label}</span>
    </Link>
  );
}
