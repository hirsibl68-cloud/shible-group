"use client";

import { useState } from "react";

type TaskKey =
  | "visit_home"
  | "check_wallet"
  | "open_levels"
  | "daily_reward"
  | "watch_ad"
  | "lucky_spin"
  | "daily_game_easy"
  | "daily_game_pro"
  | "invite_friend";

type TaskCategory = "daily" | "lucky" | "games" | "referral";

type Task = {
  key: TaskKey;
  title: string;
  desc: string;
  icon: string;
  category: TaskCategory;
  rewardLabel: string;
  helper?: string;
};

const USER_ID = "nu1";

const TASKS: Task[] = [
  {
    key: "visit_home",
    title: "زيارة الصفحة الرئيسية",
    desc: "تفقد لوحة التحكم وتعرف على آخر التحديثات.",
    icon: "🏠",
    category: "daily",
    rewardLabel: "+1.50$ · +15 XP",
  },
  {
    key: "check_wallet",
    title: "تفقد المحفظة",
    desc: "راجع أرباحك وحركات الإيداع والسحب.",
    icon: "💼",
    category: "daily",
    rewardLabel: "+1.50$ · +15 XP",
  },
  {
    key: "open_levels",
    title: "فتح صفحة المستويات",
    desc: "شاهد تقدمك في مستويات Money AI.",
    icon: "📊",
    category: "daily",
    rewardLabel: "+1.50$ · +15 XP",
  },
  {
    key: "daily_reward",
    title: "تحصيل الهدية اليومية",
    desc: "لا تنسَ جمع هديتك المجانية اليوم.",
    icon: "🎁",
    category: "daily",
    rewardLabel: "+1.50$ · +15 XP",
  },
  {
    key: "watch_ad",
    title: "مشاهدة إعلان قصير",
    desc: "شاهد إعلان 30 ثانية لتحصل على مكافأة إضافية.",
    icon: "📺",
    category: "daily",
    rewardLabel: "+0.50$ · +5 XP",
  },

  {
    key: "lucky_spin",
    title: "ضربة حظ كل 3 أيام",
    desc: "اربح مبلغًا عشوائيًا بين 2$ و 20$.",
    icon: "🎡",
    category: "lucky",
    rewardLabel: "2$ – 20$ · +25 XP",
  },

  {
    key: "daily_game_easy",
    title: "لعبة يومية (عادي)",
    desc: "أرباح ثابتة تزيد حسب رأس المال.",
    icon: "🎮",
    category: "games",
    rewardLabel: "أرباح حسب رأس المال",
  },
  {
    key: "daily_game_pro",
    title: "لعبة يومية (مستثمر)",
    desc: "أرباح أعلى ملائمة لأصحاب رؤوس الأموال.",
    icon: "🔥",
    category: "games",
    rewardLabel: "أرباح عالية حسب رأس المال",
  },

  {
    key: "invite_friend",
    title: "دعوة صديق",
    desc: "اربح 5$ عند دعوة صديق يفعل حسابه.",
    icon: "👥",
    category: "referral",
    rewardLabel: "5$ لكل صديق",
  },
];

type UiTask = Task & {
  done: boolean;
  loading: boolean;
  lastReward?: number;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<UiTask[]>(
    TASKS.map((t) => ({ ...t, done: false, loading: false }))
  );
  const [banner, setBanner] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [showAdModal, setShowAdModal] = useState(false);
  const [adStep, setAdStep] = useState<1 | 2>(1);
  const [adTaskKey, setAdTaskKey] = useState<TaskKey | null>(null);

  const [showLuckyModal, setShowLuckyModal] = useState(false);
  const [luckyTaskKey, setLuckyTaskKey] = useState<TaskKey | null>(null);

  function showMessage(msg: string) {
    setBanner(msg);
    setTimeout(() => setBanner(null), 4000);
  }

  function showError(msg: string) {
    setError(msg);
    setTimeout(() => setError(null), 4000);
  }

  async function completeTask(key: TaskKey) {
    setTasks((prev) =>
      prev.map((t) =>
        t.key === key ? { ...t, loading: true } : t
      )
    );

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, taskKey: key }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data?.message === "limit_reached") {
          showError("لقد أنجزت هذه المهمة اليوم بالفعل.");
        } else if (data?.message === "cooldown") {
          const wait = Math.ceil(data.waitHours);
          showError(`انتظر ${wait} ساعة قبل تكرار هذه المهمة.`);
        } else {
          showError("تعذر تنفيذ المهمة.");
        }
        return;
      }

      const reward = data.rewardUSD;

      setTasks((prev) =>
        prev.map((t) =>
          t.key === key
            ? { ...t, done: true, loading: false, lastReward: reward }
            : t
        )
      );

      showMessage(`تم التنفيذ! +$${reward.toFixed(2)} · +${data.rewardXP} XP`);
    } catch (e) {
      showError("خطأ في الاتصال بالخادم.");
    }
  }

  function handleTaskClick(key: TaskKey) {
    if (key === "watch_ad") {
      setAdTaskKey(key);
      setAdStep(1);
      setShowAdModal(true);
      return;
    }

    if (key === "lucky_spin") {
      setLuckyTaskKey(key);
      setShowLuckyModal(true);
      return;
    }

    // الألعاب + دعوة صديق + المهام اليومية
    completeTask(key);
  }

  function closeAdModal() {
    setShowAdModal(false);
    setAdStep(1);
    setAdTaskKey(null);
  }

  async function finishAd() {
    if (!adTaskKey) return;
    await completeTask(adTaskKey);
    closeAdModal();
  }

  function closeLuckyModal() {
    setShowLuckyModal(false);
    setLuckyTaskKey(null);
  }

  async function runLuckySpin() {
    if (!luckyTaskKey) return;
    await completeTask(luckyTaskKey);
    closeLuckyModal();
  }

  const daily = tasks.filter((t) => t.category === "daily");
  const lucky = tasks.filter((t) => t.category === "lucky");
  const games = tasks.filter((t) => t.category === "games");
  const referral = tasks.filter((t) => t.category === "referral");

  function renderCard(task: UiTask) {
    return (
      <button
        key={task.key}
        onClick={() => handleTaskClick(task.key)}
        disabled={task.done || task.loading}
        className={`rounded-2xl border px-4 py-4 text-right shadow-sm transition
          ${
            task.done
              ? "border-green-300 bg-green-50"
              : "border-blue-200 bg-white hover:shadow-md hover:-translate-y-1"
          }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl grid place-items-center bg-blue-100">
            {task.icon}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-xs text-gray-500">{task.desc}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs mt-3">
          <span className="text-blue-700 font-medium">{task.rewardLabel}</span>

          <span>
            {task.loading
              ? "جارٍ..."
              : task.done
              ? task.lastReward
                ? `ربحت $${task.lastReward.toFixed(2)}`
                : "✓"
              : "ابدأ"}
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f7ff] px-4 py-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[#0b1a2e]">
        مهام Money AI اليومية
      </h1>

      {banner && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          {banner}
        </div>
      )}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <section>
        <h2 className="font-semibold mb-2">المهام اليومية</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {daily.map(renderCard)}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">ضربة الحظ</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {lucky.map(renderCard)}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">الألعاب اليومية</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {games.map(renderCard)}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">الإحالات</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {referral.map(renderCard)}
        </div>
      </section>

      {/* Modal الإعلان */}
      {showAdModal && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4">
          <div className="bg-white p-5 rounded-2xl border max-w-md w-full">
            <h3 className="font-bold mb-2">مشاهدة إعلان</h3>

            {adStep === 1 && (
              <>
                <p className="text-sm text-gray-600">
                  شاهد إعلانًا لمدة 30 ثانية لتحصل على المكافأة.
                </p>

                <div className="bg-gray-100 border rounded-xl h-40 mt-3 grid place-items-center">
                  Placeholder الإعلان
                </div>

                <button
                  className="w-full mt-4 py-2 bg-blue-600 text-white rounded-xl"
                  onClick={() => setAdStep(2)}
                >
                  بدء الإعلان
                </button>
              </>
            )}

            {adStep === 2 && (
              <>
                <p className="text-sm text-gray-600">
                  تم عرض الإعلان… اضغط لإنهاء المهمة.
                </p>

                <div className="bg-yellow-100 border-yellow-300 border rounded-xl h-32 mt-3 grid place-items-center">
                  ⏱️ الإعلان منتهي
                </div>

                <button
                  className="w-full mt-4 py-2 bg-green-600 text-white rounded-xl"
                  onClick={finishAd}
                >
                  إنهاء وتحصيل المكافأة
                </button>
              </>
            )}

            <button
              className="text-sm text-gray-500 mt-3"
              onClick={closeAdModal}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Modal ضربة الحظ */}
      {showLuckyModal && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4">
          <div className="bg-white p-5 rounded-2xl border max-w-md w-full">
            <h3 className="font-bold mb-2">ضربة الحظ</h3>

            <p className="text-sm text-gray-600">
              يمكنك ربح مبلغ عشوائي بين 2$ و 20$.
            </p>

            <div className="bg-blue-50 border rounded-xl h-40 mt-3 grid place-items-center">
              Placeholder عجلة الحظ
            </div>

            <button
              className="w-full mt-4 py-2 bg-orange-600 text-white rounded-xl"
              onClick={runLuckySpin}
            >
              بدء ضربة الحظ
            </button>

            <button
              className="text-sm text-gray-500 mt-3"
              onClick={closeLuckyModal}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
