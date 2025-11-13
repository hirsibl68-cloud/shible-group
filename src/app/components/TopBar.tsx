"use client";
import useSWR from "swr";
const fetcher = (u:string)=>fetch(u).then(r=>r.json());

export default function TopBar() {
  const { data } = useSWR("/api/me", fetcher, { refreshInterval: 60000 });
  const me = data && !data.error ? data : null;

  return (
    <header className="sticky top-0 z-40 border-b border-[#e6efff] bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="inline-grid place-items-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#2aa1ff] to-[#00d1ff] text-white font-bold">AI</span>
          <span className="font-extrabold tracking-tight text-[#0b1a2e]">Money AI</span>
        </a>

        {/* Nav */}
        <nav className="ml-4 hidden md:flex items-center gap-3 text-sm">
          <a className="px-2 py-1 rounded-lg hover:bg-[#f6fbff]" href="/tasks">المهام</a>
          <a className="px-2 py-1 rounded-lg hover:bg-[#f6fbff]" href="/daily-reward">الهدايا</a>
          <a className="px-2 py-1 rounded-lg hover:bg-[#f6fbff]" href="/wallet">المحفظة</a>
          <a className="px-2 py-1 rounded-lg hover:bg-[#f6fbff]" href="/leaderboard">المتصدرين</a>
          <a className="px-2 py-1 rounded-lg hover:bg-[#f6fbff]" href="/levels">المستويات</a>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Balance + Profile */}
        <div className="flex items-center gap-2">
          <div className="text-sm rounded-lg bg-blue-50 px-2 py-1 text-[#0b1a2e]">
            💰 {me ? me.balance.toFixed(2) : "…"}$
          </div>
          <a href="/me" className="inline-grid place-items-center w-9 h-9 rounded-full bg-[#e7f2ff] text-[#0b1a2e]">👤</a>
        </div>
      </div>
    </header>
  );
}
