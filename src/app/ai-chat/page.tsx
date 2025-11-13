"use client";
import { useState } from "react";

type Msg = { role: "user" | "ai"; text: string };

export default function AiChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "أهلًا! كيف أقدر أساعدك ماليًّا اليوم؟" },
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    const next = [...messages, { role: "user", text: input }];
    // رد وهمي الآن
    next.push({ role: "ai", text: "تم تسجيل سؤالك. (هنا لاحقًا نربطه بباك إند)" });
    setMessages(next);
    setInput("");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] ${m.role === "user" ? "ml-auto text-right" : "mr-auto text-right"}`}>
            <div className={`${m.role === "user" ? "bg-blue-600" : "bg-white/10"} rounded-2xl px-4 py-2`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-white/10 bg-black/40 backdrop-blur max-w-md mx-auto w-full">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none"
            placeholder="اسأل عن ميزانيتك…"
          />
          <button onClick={send} className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4">إرسال</button>
        </div>
      </div>
    </div>
  );
}
