"use client";

import { useRouter } from "next/navigation";
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
};

type UiTask = Task & {
  done: boolean;
  loading: boolean;
  lastReward?: number;
};

const USER_ID = "nu1";

const TASKS: Task[] = [
  // اليومية
  {
    key: "visit_home",
    title: "زيارة لوحة BİPCOIN",
    desc: "تفقّد لوحة المستثمر وشاهد آخر تحديثات رصيدك.",
    icon: "🏠",
    category: "daily",
    rewardLabel: "+1.50$ · +15 XP",
  },
  {
    key: "check_wallet",
    title: "مراجعة المحفظة",
    desc: "اطّلع على أرباحك وحركات الإيداع والسحب.",
    icon: "💼",
    category: "daily",
    rewardLabel: "+1.50$ · +15 XP",
  },
  {
    key: "open_levels",
    title: "فتح صفحة المستويات",
    desc: "شاهد رتبتك بين مستثمري BİPCOIN.",
    icon: "📊",
    category: "daily",
    rewardLabel: "+1.50$ · +15 XP",
  },
  {
    key: "daily_reward",
    title: "الهدية اليومية",
    desc: "تحصيل البونص اليومي لمستثمري الـ VIP.",
    icon: "🎁",
    category: "daily",
    rewardLabel: "+1.50$ · +15 XP",
  },
  {
    key: "watch_ad",
    title: "مشاهدة إعلان VIP",
    desc: "شاهد إعلانًا قصيرًا واحصل على مكافأة إضافية.",
    icon: "📺",
    category: "daily",
    rewardLabel: "+0.50$ · +5 XP",
  },

  // ضربة الحظ
  {
    key: "lucky_spin",
    title: "ضربة حظ ذهبية",
    desc: "كل 3 أيام فرصة لربح 2$ – 20$ دفعة واحدة.",
    icon: "🎡",
    category: "lucky",
    rewardLabel: "2$ – 20$ · +25 XP",
  },

  // الألعاب
  {
    key: "daily_game_easy",
    title: "لعبة يومية (عادي)",
    desc: "أرباح ثابتة تزيد مع رأس المال.",
    icon: "🎮",
    category: "games",
    rewardLabel: "أرباح حسب رأس المال",
  },
  {
    key: "daily_game_pro",
    title: "لعبة يومية (مستثمر VIP)",
    desc: "أرباح أعلى لأصحاب المحافظ الكبيرة.",
    icon: "🔥",
    category: "games",
    rewardLabel: "أرباح عالية حسب رأس المال",
  },

  // الإحالات
  {
    key: "invite_friend",
    title: "دعوة مستثمر جديد",
    desc: "اربح 5$ عن كل صديق ينضم ويفعّل حسابه.",
    icon: "👥",
    category: "referral",
    rewardLabel: "5$ لكل صديق",
  },
];

export default function TasksPage() {
  const router = useRouter();

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
    setError(null);

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, taskKey: key }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data?.message === "limit_reached") {
          showError("لقد أكملت هذه المهمة الحد المسموح به لليوم.");
        } else if (data?.message === "cooldown") {
          const wait = Math.ceil(data.waitHours);
          showError(`انتظر حوالي ${wait} ساعة قبل إعادة تنفيذ هذه المهمة.`);
        } else if (data?.error === "user_not_found") {
          showError("المستخدم غير موجود.");
        } else {
          showError("تعذر تنفيذ المهمة حالياً.");
        }
        return;
      }

      const reward = data.rewardUSD as number | undefined;
      const xp = data.rewardXP as number | undefined;
      const level = data.level as number | undefined;

      setTasks((prev) =>
        prev.map((t) =>
          t.key === key
            ? { ...t, done: true, loading: false, lastReward: reward }
            : t
        )
      );

      const parts: string[] = [];
      if (typeof reward === "number") parts.push(`+$${reward.toFixed(2)}`);
      if (xp) parts.push(`+${xp} XP`);
      if (level) parts.push(`المستوى: ${level}`);
      showMessage(
        parts.length ? `تمت المهمة بنجاح! ${parts.join(" · ")}` : "تمت المهمة!"
      );
    } catch (e) {
      console.error(e);
      showError("خطأ في الاتصال بالخادم.");
    } finally {
      setTasks((prev) =>
        prev.map((t) =>
          t.key === key ? { ...t, loading: false } : t
        )
      );
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

    if (key === "daily_game_easy") {
      router.push("/games?mode=easy");
      return;
    }

    if (key === "daily_game_pro") {
      router.push("/games?mode=pro");
      return;
    }

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
        disabled={task.loading || task.done}
        className={`group relative flex flex-col items-start rounded-2xl border px-4 py-4 text-right transition shadow-sm
          ${
            task.done
              ? "border-emerald-400/60 bg-emerald-500/10"
              : "border-yellow-500/20 bg-black/60 hover:shadow-[0_0_25px_rgba(250,204,21,0.25)] hover:border-yellow-400/60"
          }`}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="w-10 h-10 rounded-2xl grid place-items-center bg-yellow-500/15 border border-yellow-500/40 text-xl text-yellow-300">
            {task.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold text-yellow-50">
                {task.title}
              </h2>
              {task.done && (
                <span className="text-[10px] rounded-full bg-emerald-500/20 text-emerald-300 px-2 py-0.5 border border-emerald-400/60">
                  منجزة
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-yellow-100/70">
              {task.desc}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between w-full text-[11px]">
          <span className="text-yellow-300 font-medium">
            {task.rewardLabel}
          </span>
          <span className="text-yellow-100/70">
            {task.loading
              ? "جارٍ التنفيذ..."
              : task.done
              ? task.lastReward
                ? `ربحت ${task.lastReward.toFixed(2)}$`
                : "تمت ✓"
              : "ابدأ"}
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-black/80 via-black to-black/90">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-50">
            مهام BİPCOIN اليومية
          </h1>
          <p className="text-sm text-yellow-100/70 max-w-2xl">
            نفّذ المهام البسيطة، جرّب ضربة الحظ والألعاب اليومية، واستخدم دعوة
            الأصدقاء لتحويل وقتك داخل المنصّة إلى أرباح ذهبية حقيقية.
          </p>
        </header>

        {banner && (
          <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {banner}
          </div>
        )}
        {error && (
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* اليومية */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-yellow-200">
            المهام اليومية
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {daily.map(renderCard)}
          </div>
        </section>

        {/* ضربة الحظ */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-yellow-200">
            ضربة الحظ الذهبية
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {lucky.map(renderCard)}
          </div>
        </section>

        {/* الألعاب */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-yellow-200">
            الألعاب اليومية للمستثمرين
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {games.map(renderCard)}
          </div>
        </section>

        {/* الإحالات */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-yellow-200">
            برنامج الإحالات
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {referral.map(renderCard)}
          </div>
        </section>

        <p className="text-[11px] text-yellow-100/60 mt-4">
          * كل مهمة يمكن تنفيذها حسب حدود اليوم والكول داون المحدد في نظام
          BİPCOIN، ويتم احتساب المكافآت بالدولار الأمريكي داخل محفظتك.
        </p>
      </div>

      {/* مودال الإعلان */}
      {showAdModal && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl bg-black border border-yellow-500/40 shadow-[0_0_40px_rgba(250,204,21,0.35)] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-yellow-50">
                مشاهدة إعلان VIP
              </h2>
              <button
                onClick={closeAdModal}
                className="text-sm text-yellow-200/70 hover:text-yellow-300"
              >
                إغلاق
              </button>
            </div>

            {adStep === 1 && (
              <>
                <p className="text-sm text-yellow-100/80">
                  شاهد إعلانًا قصيرًا لمدة 30 ثانية لتحصل على{" "}
                  <span className="font-semibold text-yellow-300">+0.50$</span> و{" "}
                  <span className="font-semibold text-yellow-300">+5 XP</span> في محفظة
                  BİPCOIN الخاصة بك.
                </p>
                <div className="mt-3 rounded-2xl bg-gradient-to-br from-yellow-500/10 via-black to-yellow-900/20 border border-yellow-500/40 h-40 grid place-items-center text-sm text-yellow-200/80">
                  منطقة عرض الإعلان (Placeholder)
                </div>
                <button
                  onClick={() => setAdStep(2)}
                  className="w-full mt-4 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-sm font-semibold py-2.5"
                >
                  بدء مشاهدة الإعلان
                </button>
              </>
            )}

            {adStep === 2 && (
              <>
                <p className="text-sm text-yellow-100/80">
                  تم افتراض عرض الإعلان… اضغط على الزر بالأسفل لتحصيل مكافأتك.
                </p>
                <div className="mt-3 rounded-2xl bg-yellow-500/10 border border-yellow-500/60 h-32 grid place-items-center text-sm text-yellow-200/90">
                  ⏱️ تم إكمال مدة الإعلان الوهمية
                </div>
                <button
                  onClick={finishAd}
                  className="w-full mt-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold py-2.5"
                >
                  إنهاء الإعلان وتحصيل المكافأة
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* مودال ضربة الحظ */}
      {showLuckyModal && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl bg-black border border-yellow-500/50 shadow-[0_0_45px_rgba(250,204,21,0.4)] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-yellow-50">
                ضربة حظ BİPCOIN الذهبية
              </h2>
              <button
                onClick={closeLuckyModal}
                className="text-sm text-yellow-200/70 hover:text-yellow-300"
              >
                إغلاق
              </button>
            </div>

            <p className="text-sm text-yellow-100/80">
              لديك فرصة كل{" "}
              <span className="font-semibold text-yellow-300">3 أيام</span> لربح
              مبلغ عشوائي بين{" "}
              <span className="font-semibold text-yellow-300">2$</span> و{" "}
              <span className="font-semibold text-yellow-300">20$</span> بالإضافة
              إلى XP إضافي.
            </p>

            <div className="mt-3 rounded-2xl bg-gradient-to-br from-yellow-500/10 via-black to-yellow-900/20 border border-yellow-500/50 h-40 grid place-items-center text-sm text-yellow-200/90">
              مكان عجلة الحظ / الأنيميشن (Placeholder)
            </div>

            <button
              onClick={runLuckySpin}
              className="w-full mt-4 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-black text-sm font-semibold py-2.5"
            >
              بدء ضربة الحظ الآن
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
