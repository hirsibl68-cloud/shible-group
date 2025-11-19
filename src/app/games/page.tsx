"use client";

import { useState } from "react";

type GameMode = "investor" | "normal";

type GameStatus = "idle" | "waiting" | "now" | "finished";

function ReactionGame({
  mode,
}: {
  mode: GameMode;
}) {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [message, setMessage] = useState<string>("اضغط على الزر لبدء اللعبة.");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reaction, setReaction] = useState<number | null>(null);

  function startGame() {
    if (status === "waiting") return;

    setStatus("waiting");
    setMessage("⏳ انتظر… لا تضغط حتى تظهر إشارة الذهب!");

    // وقت عشوائي بين 1 و 4 ثواني
    const delay = 1000 + Math.random() * 3000;

    setTimeout(() => {
      setStatus("now");
      setMessage("✨ اضغط الآن فورًا!");
      setStartTime(Date.now());
    }, delay);
  }

  function handleClick() {
    if (status === "idle") {
      startGame();
      return;
    }

    if (status === "waiting") {
      setStatus("finished");
      setMessage("❌ استعجلت وضغطت قبل الوقت! جرّب مرة أخرى.");
      setReaction(null);
      setStartTime(null);
      return;
    }

    if (status === "now" && startTime) {
      const diff = Date.now() - startTime;
      setReaction(diff);
      setStatus("finished");

      let extra =
        mode === "investor"
          ? "كلما كان رد فعلك أسرع، زادت أرباحك كمستثمر."
          : "رد فعل جميل! العب يوميًا لزيادة أرباحك.";

      setMessage(`✅ زمن رد فعلك: ${diff}ms. ${extra}`);
      setStartTime(null);
      return;
    }

    if (status === "finished") {
      // إعادة من جديد
      setStatus("idle");
      setReaction(null);
      setMessage("اضغط على الزر لبدء اللعبة.");
      return;
    }
  }

  const modeLabel =
    mode === "investor" ? "لعبة يومية (مستثمر)" : "لعبة يومية (عادي)";

  return (
    <div className="mt-6 rounded-3xl border border-yellow-500/30 bg-black/60 px-5 py-6 shadow-[0_0_40px_rgba(250,204,21,0.1)]">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-yellow-500/80">
            BİPCOIN VIP GAME
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">
            {modeLabel}
          </h2>
          <p className="mt-1 text-sm text-gray-300">
            انتظر حتى تضيء إشارة الذهب ثم اضغط بأسرع ما يمكن. يتم تسجيل زمن
            استجابتك ويمكن ربطه لاحقًا بنظام الأرباح داخل المنصة.
          </p>
        </div>

        <div className="mt-3 flex flex-col items-end gap-1 md:mt-0">
          <span className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-300">
            {mode === "investor"
              ? "أرباح حسب رأس مال المستثمر"
              : "أرباح يومية ثابتة"}
          </span>
          <span className="text-xs text-gray-400">
            * هذه لعبة تجريبية، يمكن ربطها API بالمحفظة لاحقًا.
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 via-black to-yellow-500/5 px-4 py-3">
            <p className="text-sm text-yellow-100">{message}</p>
          </div>

          {reaction !== null && (
            <p className="mt-3 text-sm font-semibold text-green-400">
              🔥 نتيجتك: {reaction}ms
            </p>
          )}
        </div>

        <div className="mt-4 md:mt-0 md:w-52 flex flex-col items-stretch gap-3">
          <button
            onClick={handleClick}
            className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 px-4 py-3 text-sm font-bold text-black shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:brightness-110 active:scale-[0.98] transition"
          >
            {status === "idle" && "ابدأ اللعبة الآن"}
            {status === "waiting" && "لا تضغط… انتظر الإشارة"}
            {status === "now" && "اضغط فورًا!"}
            {status === "finished" && "إعادة اللعب"}
          </button>

          <div className="rounded-2xl border border-gray-700 bg-gray-900/80 px-3 py-2 text-xs text-gray-300">
            <p className="font-semibold text-gray-200">ملاحظة ربحية:</p>
            {mode === "investor" ? (
              <p className="mt-1">
                يمكن جعل كل محاولة ناجحة تضيف ربحًا نسبيًا حسب رصيد المستثمر
                (مثلاً 0.2% من رأس المال مع سقف يومي).
              </p>
            ) : (
              <p className="mt-1">
                يمكن جعل كل نتيجة تحت 300ms تعطي ربحًا صغيرًا ثابتًا (مثلاً
                0.20$) مع حد أقصى لعدد المحاولات في اليوم.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GamesPage() {
  const [mode, setMode] = useState<GameMode>("investor");

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#050509] to-black">
      <div className="mx-auto flex max-w-4xl flex-col gap-5 px-4 py-8">
        {/* العنوان العلوي */}
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-500/80">
            BİPCOIN
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            ألعاب BİPCOIN اليومية
          </h1>
          <p className="text-sm text-gray-300">
            العب بشكل يومي، وحوّل تفاعلك وسرعة رد فعلك إلى أرباح حقيقية داخل
            محفظة BİPCOIN. التصميم VIP بالذهب والأسود ليعكس مستوى المستثمرين.
          </p>
        </header>

        {/* اختيار نوع اللعبة */}
        <section className="rounded-3xl border border-yellow-500/30 bg-black/70 p-4 shadow-[0_0_40px_rgba(0,0,0,0.7)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-yellow-100">
                اختر نوع اللعبة
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                يمكنك التبديل بين لعبة المستثمر (مرتبطة برأس المال) ولعبة
                عادية بأرباح ثابتة.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-gray-900/80 p-1">
              <button
                onClick={() => setMode("investor")}
                className={`flex-1 rounded-2xl px-3 py-1.5 text-xs font-semibold transition ${
                  mode === "investor"
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-300 text-black shadow"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                مستثمر
              </button>
              <button
                onClick={() => setMode("normal")}
                className={`flex-1 rounded-2xl px-3 py-1.5 text-xs font-semibold transition ${
                  mode === "normal"
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-300 text-black shadow"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                عادي
              </button>
            </div>
          </div>
        </section>

        {/* اللعبة نفسها */}
        <ReactionGame mode={mode} />

        {/* ملاحظة نهائية */}
        <p className="mt-4 text-[11px] text-gray-500">
          * هذه الصفحة هي واجهة الألعاب فقط. يمكن لاحقًا ربط نتائج اللعبة مع
          نظام المهام والمحفظة في BİPCOIN عبر API مثل{" "}
          <span className="text-yellow-400">/api/tasks</span> أو{" "}
          <span className="text-yellow-400">/api/games</span> لحساب الأرباح
          اليومية تلقائيًا.
        </p>
      </div>
    </div>
  );
}
