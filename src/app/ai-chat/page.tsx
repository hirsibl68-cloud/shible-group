"use client";

import { useState, FormEvent } from "react";

type Msg = {
  role: "user" | "ai";
  text: string;
};

export default function AiChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "أهلاً بك في مساعد Money AI، كيف أقدر أساعدك اليوم؟" },
  ]);
  const [input, setInput] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    // نبني الرسائل القادمة مع typing صحيح
    const next: Msg[] = [
      ...messages,
      { role: "user", text: trimmed },
      {
        role: "ai",
        text: "تم تسجيل سؤالك. (لاحقًا نربطه بباك إند فعلي 🤖)",
      },
    ];

    setMessages(next);
    setInput("");
  }

  return (
    <div className="min-h-screen bg-[#f5f9ff]">
      <div className="max-w-xl mx-auto py-6 px-4 space-y-4">
        <h1 className="text-center text-lg font-bold text-[#0b1a2e]">
          مساعد الدردشة الذكي
        </h1>
        <p className="text-center text-sm text-[#5a718b]">
          اسأل عن خطط الاستثمار، الأرباح اليومية، أو أي استفسار مالي.
        </p>

        <div className="bg-white border border-[#dce9ff] rounded-2xl shadow-sm p-3 h-[420px] flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#2aa1ff] text-white rounded-br-sm"
                      : "bg-[#f3f7ff] text-[#0b1a2e] rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
            <input
              className="flex-1 rounded-2xl border border-[#d0ddf2] bg-[#f8fbff] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2aa1ff]"
              placeholder="اكتب سؤالك هنا..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-2xl bg-[#2aa1ff] text-white text-sm font-semibold hover:bg-[#1b8aea] transition disabled:opacity-60"
              disabled={!input.trim()}
            >
              إرسال
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
