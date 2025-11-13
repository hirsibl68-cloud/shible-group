// src/app/quests/page.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Quest, loadQuests, completeQuest, isDone } from "@/lib/quests";

export default function QuestsPage() {
  const [qs, setQs] = useState<Quest[]>([]);
  useEffect(() => setQs(loadQuests()), []);

  function mark(id: string) {
    completeQuest(id);
    setQs(loadQuests());
  }

  const total = qs.reduce((a, q) => a + (isDone(q) ? q.points : 0), 0);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-[#eef6ff] via-white to-[#f7fbff]">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="rounded-2xl border border-[#dce9ff] bg-white px-5 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-xl font-bold text-[#0b1a2e]">المهام اليومية</h1>
          <Link href="/ai-tools" className="text-sm text-[#1b6fe0] hover:underline">← عودة</Link>
        </div>

        <div className="rounded-2xl border border-[#dce9ff] bg-white p-4 shadow-sm">
          <div className="text-sm text-[#345067] mb-3">
            نقاط اليوم: <span className="font-semibold text-[#0b1a2e]">{total}</span>
          </div>

          <ul className="space-y-2">
            {qs.map((q) => (
              <li key={q.id} className="flex items-center justify-between rounded-xl border border-[#e6eefb] bg-white p-3">
                <div>
                  <div className="font-medium text-[#0b1a2e]">{q.title}</div>
                  <div className="text-xs text-[#7a93a8]">+{q.points} نقطة</div>
                </div>
                <button
                  onClick={() => mark(q.id)}
                  disabled={isDone(q)}
                  className={`rounded-xl px-3 py-2 text-sm ${
                    isDone(q) ? "bg-[#eef3fb] text-[#9cb0c6] cursor-not-allowed" : "bg-[#2aa1ff] text-white hover:bg-[#1b8aea]"
                  }`}
                >
                  {isDone(q) ? "مكتملة" : "إكمال"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
