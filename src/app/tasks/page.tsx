"use client";

import { useState } from "react";

type TaskKey =
  | "visit_home"
  | "check_wallet"
  | "open_levels"
  | "daily_reward"
  | "watch_ad";

type Task = {
  key: TaskKey;
  title: string;
  desc: string;
  icon: string;
};

const USER_ID = "nu1"; // نفس المستخدم اللي استعملناه في صفحات أخرى

const TASKS: Task[] = [
  {
    key: "visit_home",
    title: "زيارة الصفحة الرئيسية",
    desc: "تفقد لوحة التحكم وتعرف على آخر التحديثات.",
    icon: "🏠",
  },
  {
    key: "check_wallet",
    title: "تفقد المحفظة",
    desc: "راجع أرباحك وحركات الإيداع والسحب.",
    icon: "💼",
  },
  {
    key: "open_levels",
    title: "فتح صفحة المستويات",
    desc: "شاهد تقدمك في مستويات Money AI.",
    icon: "📊",
  },
  {
    key: "daily_reward",
    title: "تحصيل الهدية اليومية",
    desc: "لا تنسَ جمع هديتك المجانية اليوم.",
    icon: "🎁",
  },
  {
    key: "watch_ad",
    title: "مشاهدة إعلان قصير",
    desc: "شاهد إعلان 30 ثانية لتحصل على مكافأة إضافية.",
    icon: "📺",
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
        if (data?.message === "already_done_today") {
          showError("لقد أنجزت هذه المهمة اليوم بالفعل ✅");
        } else if (data?.error === "user_not_found") {
          showError("المستخدم غير موجود، تأكد من ID المستخدم.");
        } else {
          showError("تعذر تنفيذ المهمة، حاول لاحقًا.");
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

      const msgParts = [];
      if (reward) msgParts.push(`+$${reward.toFixed(2)}`);
      if (xp) msgParts.push(`+${xp} XP`);
      if (level) msgParts.push(`المستوى الحالي: ${level}`);
      const msg = msgParts.length
        ? `تمت المهمة! ${msgParts.join(" · ")}`
        : "تمت المهمة بنجاح 🎉";

      showMessage(msg);
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

  return (
    <div className="min-h-screen bg-[#f3f7ff]">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {/* الرأس */}
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0b1a2e]">
            مهام Money AI اليومية
          </h1>
          <p className="text-sm md:text-base text-[#435a73]">
            نفّذ المهام البسيطة، واربح مكافآت نقدية و XP لتعزيز مستواك داخل المنصّة.
          </p>
        </header>

        {/* بانرات الرسائل */}
        {banner && (
          <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {banner}
          </div>
        )}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* شبكة المهام */}
        <section className="grid gap-4 md:grid-cols-2">
          {tasks.map((task) => (
            <button
              key={task.key}
              onClick={() => handleTaskClick(task.key)}
              disabled={task.done || task.loading}
              className={`group relative flex flex-col items-start rounded-2xl border px-4 py-4 text-right transition shadow-sm
                ${
                  task.done
                    ? "border-[#9dd9a2] bg-[#f0fff4]"
                    : "border-[#dce9ff] bg-white hover:shadow-md hover:-translate-y-[1px]"
                }`}
            >
              <div className="flex items-center gap-3 w-full">
                <div
                  className={`h-10 w-10 rounded-2xl grid place-items-center text-xl
                  ${
                    task.done
                      ? "bg-[#c8f5d0]"
                      : "bg-[#e4f0ff] group-hover:bg-[#d6e7ff]"
                  }`}
                >
                  <span>{task.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-semibold text-[#0b1a2e]">
                      {task.title}
                    </h2>
                    {task.done && (
                      <span className="text-xs rounded-full bg-[#c8f5d0] text-[#145c2b] px-2 py-0.5">
                        منجزة
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-[#5b7087]">
                    {task.desc}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between w-full text-xs">
                <span className="text-[#365b8a] font-medium">
                  {task.key === "watch_ad"
                    ? "+0.50$ · +5 XP"
                    : "+1.50$ · +15 XP"}
                </span>
                <span className="text-[#8295b0]">
                  {task.loading
                    ? "جارٍ التنفيذ..."
                    : task.done
                    ? task.lastReward
                      ? `رُبحت ${task.lastReward.toFixed(2)}$`
                      : "تمت المهمة ✓"
                    : "اضغط للبدء"}
                </span>
              </div>
            </button>
          ))}
        </section>

        {/* ملاحظة صغيرة */}
        <p className="text-[11px] text-[#8fa2be] mt-4">
          * يمكن تنفيذ كل مهمة مرة واحدة فقط في اليوم. يتم احتساب المكافآت بالدولار الأمريكي داخل محفظتك في Money AI.
        </p>
      </div>

      {/* نافذة مشاهدة الإعلان */}
      {showAdModal && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-[#dce9ff] shadow-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0b1a2e]">
                مشاهدة إعلان قصير
              </h2>
              <button
                onClick={closeAdModal}
                className="text-[#72819a] hover:text-[#0b1a2e] text-sm"
              >
                إغلاق
              </button>
            </div>

            {adStep === 1 && (
              <>
                <p className="text-sm text-[#435a73]">
                  شاهد إعلانًا قصيرًا لمدة 30 ثانية لتحصل على مكافأة
                  <span className="font-semibold text-[#0b1a2e]"> +0.50$ </span>
                  و
                  <span className="font-semibold text-[#0b1a2e]"> +5 XP</span>
                  داخل محفظتك.
                </p>

                <div className="mt-3 rounded-2xl bg-[#f3f7ff] border border-[#dce9ff] h-40 grid place-items-center text-[#7b8fa8] text-sm">
                  منطقة عرض الإعلان (Placeholder)
                </div>

                <button
                  onClick={() => setAdStep(2)}
                  className="mt-4 w-full rounded-xl bg-[#2aa1ff] hover:bg-[#1b8aea] text-white text-sm font-semibold py-2.5 transition"
                >
                  بدء مشاهدة الإعلان
                </button>
              </>
            )}

            {adStep === 2 && (
              <>
                <p className="text-sm text-[#435a73]">
                  تخيّل أن الإعلان يُعرض الآن… بعد الانتهاء اضغط على الزر
                  بالأسفل لتحصيل مكافأتك.
                </p>

                <div className="mt-3 rounded-2xl bg-[#fdf5e6] border border-[#ffe0a3] h-32 grid place-items-center text-[#8a6a35] text-sm">
                  ⏱️ تم إكمال مدة الإعلان الوهمية
                </div>

                <button
                  onClick={finishAd}
                  className="mt-4 w-full rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold py-2.5 transition"
                >
                  إنهاء الإعلان وتحصيل المكافأة
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
