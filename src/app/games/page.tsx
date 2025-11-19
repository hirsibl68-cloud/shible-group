"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type GameType = "daily_game_easy" | "daily_game_pro";
const USER_ID = "nu1";

export default function GamesPage() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode"); // "easy" أو "pro"

  const [loading, setLoading] = useState<GameType | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialMode === "easy") {
      // فقط نبرز لعبة easy مثلاً (ما في حاجة لفعل شيء إضافي الآن)
    }
  }, [initialMode]);

  function resetAlerts() {
    setMessage(null);
    setError(null);
  }

  async function completeGame(type: GameType) {
    setLoading(type);
    resetAlerts();

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, taskKey: type }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data?.message === "limit_reached") {
          setError("لقد لعبت هذه اللعبة الحد المسموح به لليوم.");
        } else if (data?.message === "cooldown") {
          const wait = Math.ceil(data.waitHours);
          setError(`لا يمكنك لعب هذه اللعبة الآن، حاول بعد حوالي ${wait} ساعة.`);
        } else {
          setError("لا يمكنك لعب هذه اللعبة الآن، حاول لاحقاً.");
        }
        return;
      }

      const reward = data.rewardUSD as number;
      setMessage(`🎉 ربحت +$${reward.toFixed(2)} · +${data.rewardXP} XP`);
    } catch (e) {
      console.error(e);
      setError("خطأ في الاتصال بالخادم.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f7ff] px-4 py-6 max-w-4xl mx-auto space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-[#0b1a2e]">🎮 ألعاب Money AI</h1>
        <p className="text-gray-600 text-sm">
          العب الألعاب اليومية واربح مكافآت حقيقية تضاف مباشرة إلى محفظتك الاستثمارية.
        </p>
      </header>

      {message && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <EasyClickGame
          loading={loading === "daily_game_easy"}
          onFinish={() => completeGame("daily_game_easy")}
        />
        <ReactionGame
          loading={loading === "daily_game_pro"}
          onFinish={() => completeGame("daily_game_pro")}
        />
      </div>

      <p className="text-[12px] text-gray-500 mt-3 text-center">
        * يمكن لعب كل لعبة مرة واحدة يوميًا (أو حسب إعدادات المهمة في قاعدة البيانات).
      </p>
    </div>
  );
}

/* ===========================
   لعبة 1: Click Game (عادي)
   =========================== */

type EasyProps = {
  loading: boolean;
  onFinish: () => Promise<void>;
};

function EasyClickGame({ loading, onFinish }: EasyProps) {
  const [status, setStatus] = useState<"idle" | "running" | "finished">(
    "idle"
  );
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [clicks, setClicks] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, []);

  function startGame() {
    if (loading) return;
    setStatus("running");
    setTimeLeft(10);
    setClicks(0);

    if (timerRef.current !== null) window.clearInterval(timerRef.current);

    const id = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(id);
          timerRef.current = null;
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    timerRef.current = id;
  }

  async function finishGame() {
    setStatus("finished");
    await onFinish();
  }

  function handleAreaClick() {
    if (status !== "running") return;
    setClicks((c) => c + 1);
  }

  return (
    <div className="rounded-2xl border border-blue-200 bg-white p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="text-3xl">🎮</div>
        <div>
          <h3 className="text-lg font-bold text-[#0b1a2e]">
            اللعبة اليومية – مستوى عادي
          </h3>
          <p className="text-sm text-gray-600">
            اضغط بأقصى سرعة خلال 10 ثواني. بعد انتهاء الوقت يتم احتساب مكافأة اللعبة.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs mt-1 text-gray-600">
        <span>
          ⏱️ الوقت المتبقي:{" "}
          <span className="font-semibold text-[#0b1a2e]">{timeLeft}s</span>
        </span>
        <span>
          👆 عدد النقرات:{" "}
          <span className="font-semibold text-[#0b1a2e]">{clicks}</span>
        </span>
      </div>

      <div
        onClick={handleAreaClick}
        className={`mt-3 h-40 rounded-2xl border grid place-items-center text-sm font-semibold cursor-pointer select-none transition
          ${
            status === "running"
              ? "bg-blue-100 border-blue-300 text-blue-800"
              : "bg-gray-100 border-gray-300 text-gray-500"
          }`}
      >
        {status === "idle" && "اضغط زر البدء ثم انقر هنا بأقصى سرعة!"}
        {status === "running" && "اضغط! اضغط! اضغط! 🔥"}
        {status === "finished" && "انتهى الوقت! تم حفظ مكافأتك."}
      </div>

      <button
        disabled={loading || status === "running"}
        onClick={startGame}
        className={`w-full mt-3 py-2 rounded-xl text-white font-semibold transition
          ${
            loading || status === "running"
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {loading
          ? "جاري حفظ مكافأتك..."
          : status === "running"
          ? "اللعبة قيد التشغيل"
          : "ابدأ اللعبة الآن"}
      </button>
    </div>
  );
}

/* ===========================
   لعبة 2: Reaction / Lucky Tap
   =========================== */

type ReactionProps = {
  loading: boolean;
  onFinish: () => Promise<void>;
};

function ReactionGame({ loading, onFinish }: ReactionProps) {
  const [status, setStatus] = useState<
    "idle" | "waiting" | "ready" | "tooSoon" | "success"
  >("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function startChallenge() {
    if (loading) return;

    setStatus("waiting");
    setReactionTime(null);

    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);

    const delay = 1000 + Math.random() * 3000; // من 1 إلى 4 ثواني
    const id = window.setTimeout(() => {
      startRef.current = Date.now();
      setStatus("ready");
    }, delay);

    timeoutRef.current = id;
  }

  async function handleTap() {
    // ضغط مبكر
    if (status === "waiting") {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      setStatus("tooSoon");
      startRef.current = null;
      return;
    }

    // ضغط صحيح
    if (status === "ready") {
      const end = Date.now();
      if (startRef.current) {
        const diff = end - startRef.current;
        setReactionTime(diff);
      }
      setStatus("success");
      startRef.current = null;

      await onFinish();
    }
  }

  let info = "";
  if (status === "idle") {
    info = "اضغط زر بدء التحدي، ثم انتظر حتى يتحول المربع إلى أخضر واضغط بأسرع ما يمكن.";
  } else if (status === "waiting") {
    info = "انتظر... لا تضغط حتى يتحول اللون إلى أخضر.";
  } else if (status === "ready") {
    info = "اضغط الآن بسرعة! ⚡";
  } else if (status === "tooSoon") {
    info = "ضغطت مبكرًا! جرّب مرة أخرى.";
  } else if (status === "success") {
    info = reactionTime
      ? `ردة فعلك كانت ${reactionTime}ms`
      : "محاولة ناجحة!";
  }

  return (
    <div className="rounded-2xl border border-blue-200 bg-white p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="text-3xl">⚡</div>
        <div>
          <h3 className="text-lg font-bold text-[#0b1a2e]">
            لعبة المستثمر – ردة الفعل
          </h3>
          <p className="text-sm text-gray-600">
            اختبر سرعة ردة فعلك. عند تحوّل المربع إلى أخضر، اضغط فورًا لتحصل على مكافأة المستثمر.
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-600">{info}</p>

      <div
        onClick={handleTap}
        className={`mt-2 h-40 rounded-2xl border grid place-items-center text-sm font-semibold cursor-pointer select-none transition
          ${
            status === "ready"
              ? "bg-green-400 border-green-600 text-white"
              : status === "waiting"
              ? "bg-red-400 border-red-600 text-white"
              : status === "tooSoon"
              ? "bg-yellow-100 border-yellow-300 text-yellow-800"
              : status === "success"
              ? "bg-blue-100 border-blue-300 text-blue-800"
              : "bg-gray-100 border-gray-300 text-gray-600"
          }`}
      >
        {status === "idle" && "منطقة التحدي ستتغير بعد الضغط على زر البدء."}
        {status === "waiting" && "انتظر اللون الأخضر… لا تضغط الآن."}
        {status === "ready" && "اضغط الآن! ⚡"}
        {status === "tooSoon" && "ضغطت مبكرًا! اضغط زر البدء مرة أخرى."}
        {status === "success" &&
          (reactionTime
            ? `ردة فعلك: ${reactionTime}ms`
            : "محاولة ناجحة!")}
      </div>

      <button
        disabled={loading || status === "waiting" || status === "ready"}
        onClick={startChallenge}
        className={`w-full mt-3 py-2 rounded-xl text-white font-semibold transition
          ${
            loading || status === "waiting" || status === "ready"
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
      >
        {loading
          ? "جاري حفظ مكافأتك..."
          : status === "waiting" || status === "ready"
          ? "التحدي قيد التشغيل..."
          : "ابدأ التحدي الآن"}
      </button>
    </div>
  );
}
