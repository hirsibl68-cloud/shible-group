"use client";

import { useState, useRef, useEffect } from "react";

type GameType = "daily_game_easy" | "daily_game_pro";
const USER_ID = "nu1";

export default function GamesPage() {
  const [loading, setLoading] = useState<GameType | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function resetAlerts() {
    setMessage(null);
    setError(null);
  }

  async function playGame(type: GameType) {
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

      const reward = data.rewardUSD;
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
          العب الألعاب اليومية واربط الأداء الخاص بك بأرباح حقيقية تُضاف إلى محفظتك
          الاستثمارية.
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
        {/* اللعبة السهلة: Click Game */}
        <EasyClickGameCard
          loading={loading === "daily_game_easy"}
          onGameComplete={() => playGame("daily_game_easy")}
        />

        {/* لعبة المستثمر: Reaction / Lucky Tap */}
        <ReactionGameCard
          loading={loading === "daily_game_pro"}
          onGameComplete={() => playGame("daily_game_pro")}
        />
      </div>

      <p className="text-[12px] text-gray-500 mt-3 text-center">
        * يمكن لعب كل لعبة مرة واحدة يوميًا (أو حسب إعدادات المهمة في لوحة التحكم).
      </p>
    </div>
  );
}

/* ===========================
   لعبة 1: Click Game (Easy)
   =========================== */

type EasyClickProps = {
  loading: boolean;
  onGameComplete: () => Promise<void>;
};

function EasyClickGameCard({ loading, onGameComplete }: EasyClickProps) {
  const [status, setStatus] = useState<"idle" | "running" | "finished">("idle");
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [clicks, setClicks] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  function startGame() {
    if (loading) return; // لا نبدأ لعبة جديدة أثناء حفظ المهمة

    // إعادة تهيئة القيم
    setStatus("running");
    setTimeLeft(10);
    setClicks(0);

    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
    }

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
    await onGameComplete();
  }

  function handleClickArea() {
    if (status !== "running") return;
    setClicks((c) => c + 1);
  }

  return (
    <div className="rounded-2xl border border-blue-200 bg-white p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="text-3xl">🎮</div>
        <div>
          <h3 className="text-xl font-bold text-[#0b1a2e]">
            اللعبة اليومية – مستوى عادي
          </h3>
          <p className="text-sm text-gray-600">
            اضغط بأقصى سرعة خلال 10 ثواني. الأداء لا يغير قيمة الربح حاليًا،
            لكن يعطي إحساس تفاعلي للمستخدم.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs mt-1">
        <span className="text-gray-600">
          ⏱️ الوقت المتبقي:{" "}
          <span className="font-semibold text-[#0b1a2e]">{timeLeft}s</span>
        </span>
        <span className="text-gray-600">
          👆 عدد النقرات:{" "}
          <span className="font-semibold text-[#0b1a2e]">{clicks}</span>
        </span>
      </div>

      <div
        onClick={handleClickArea}
        className={`mt-3 h-40 rounded-2xl border grid place-items-center text-sm font-semibold cursor-pointer select-none transition
          ${
            status === "running"
              ? "bg-blue-100 border-blue-300 text-blue-800"
              : "bg-gray-100 border-gray-300 text-gray-500"
          }`}
      >
        {status === "idle" && "اضغط زر البدء ثم انقر هنا بأقصى سرعة!"}
        {status === "running" && "اضغط! اضغط! اضغط! 🔥"}
        {status === "finished" &&
          "انتهى الوقت! يمكنك البدء من جديد بعد حفظ المكافأة."}
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
  onGameComplete: () => Promise<void>;
};

function ReactionGameCard({ loading, onGameComplete }: ReactionProps) {
  const [status, setStatus] = useState<
    "idle" | "waiting" | "ready" | "tooSoon" | "success"
  >("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function startChallenge() {
    if (loading) return;

    setStatus("waiting");
    setReactionTime(null);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    const delay = 1000 + Math.random() * 3000; // من 1 إلى 4 ثواني
    const id = window.setTimeout(() => {
      startTimeRef.current = Date.now();
      setStatus("ready");
    }, delay);

    timeoutRef.current = id;
  }

  async function handleTap() {
    // ضغط مبكر
    if (status === "waiting") {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      setStatus("tooSoon");
      startTimeRef.current = null;
      return;
    }

    // ضغط صحيح
    if (status === "ready") {
      const end = Date.now();
      if (startTimeRef.current) {
        const diff = end - startTimeRef.current;
        setReactionTime(diff);
      }
      setStatus("success");
      startTimeRef.current = null;

      // استدعاء المهمة (اللعبة للمستثمر)
      await onGameComplete();
      return;
    }

    // في الحالات الأخرى لا نفعل شيئًا
  }

  let infoText = "";
  if (status === "idle") {
    infoText = "اضغط زر البدء ثم انتظر حتى يتحول اللون إلى أخضر، بعدها اضغط بسرعة!";
  } else if (status === "waiting") {
    infoText = "انتظر... لا تضغط حتى يتحول اللون إلى أخضر 💡";
  } else if (status === "ready") {
    infoText = "اضغط الآن بسرعة! ⚡";
  } else if (status === "tooSoon") {
    infoText = "ضغطت مبكرًا! جرّب مرة أخرى.";
  } else if (status === "success") {
    infoText = reactionTime
      ? `ردة فعلك: ${reactionTime}ms`
      : "تم التسجيل!";

  }

  return (
    <div className="rounded-2xl border border-blue-200 bg-white p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="text-3xl">⚡</div>
        <div>
          <h3 className="text-xl font-bold text-[#0b1a2e]">
            لعبة المستثمر – ردة الفعل
          </h3>
          <p className="text-sm text-gray-600">
            اختبر سرعة ردة فعلك. عند تحول المربع إلى أخضر، اضغط بأسرع ما يمكن.
            بعد المحاولة الناجحة، يتم إضافة أرباح لعبة المستثمر إلى محفظتك.
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-600">{infoText}</p>

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
        {status === "idle" && "منطقة التحدي ستتغير بعد الضغط على بدء التحدي."}
        {status === "waiting" && "لا تضغط الآن! انتظر اللون الأخضر."}
        {status === "ready" && "اضغط الآن! ⚡"}
        {status === "tooSoon" && "ضغطت مبكرًا! اضغط بدء التحدي مرة أخرى."}
        {status === "success" &&
          (reactionTime
            ? `جميل! ردة فعلك كانت ${reactionTime}ms`
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
