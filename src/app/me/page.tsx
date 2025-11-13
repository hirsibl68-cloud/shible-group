"use client";

import { useEffect, useState } from "react";

type MeData = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  balance: number;
  xp: number;
  level: number;
};

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; user: MeData };

const PROGRESS_MAX = 100; // كم XP نعتبره للبار (شكلي فقط هنا)

export default function MePage() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "فشل تحميل البيانات");
        }
        setState({ status: "ready", user: data });
      } catch (e: any) {
        setState({
          status: "error",
          message: "تعذّر تحميل الملف الشخصي، حاول مجددًا.",
        });
      }
    })();
  }, []);

  // ===== حالات التحميل / الخطأ =====
  if (state.status === "loading") {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#f5f7ff] flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-md px-4">
          <div className="h-28 rounded-3xl bg-white/80 shadow-sm" />
          <div className="h-32 rounded-3xl bg-white/80 shadow-sm" />
          <div className="h-40 rounded-3xl bg-white/80 shadow-sm" />
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#f5f7ff] flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <div className="rounded-3xl border border-red-100 bg-red-50 text-red-700 p-4 text-center text-sm">
            {state.message}
          </div>
        </div>
      </div>
    );
  }

  const u = state.user;
  const xpProgress = Math.min(100, Math.round((u.xp % PROGRESS_MAX) || 0));

  // ===== الصفحة الرئيسية =====
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f5f7ff]">
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">

        {/* بطاقة العنوان العلوية */}
        <header className="flex items-center justify-between">
          <div>
            <div className="text-xs text-[#7b8ba5]">الملف الشخصي</div>
            <h1 className="text-lg font-semibold text-[#10172a]">
              أهلاً، {u.name || "مستخدم"}
            </h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#e4efff] flex items-center justify-center text-xl">
            👤
          </div>
        </header>

        {/* بطاقة الرصيد + المستوى */}
        <section className="rounded-3xl bg-gradient-to-b from-[#1a84ff] to-[#1661d1] text-white p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs/4 text-white/70">الرصيد المتاح</div>
              <div className="text-2xl font-semibold mt-1">
                ${u.balance.toFixed(2)}
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-xs">
                <span className="text-white/70">المستوى</span>
                <span className="font-semibold">LVL {u.level}</span>
              </div>
            </div>
          </div>

          {/* شريط تقدم الـ XP */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white/80">
                الخبرة (XP): <span className="font-semibold">{u.xp}</span>
              </span>
              <span className="text-white/70">{xpProgress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white/90 transition-all"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
        </section>

        {/* معلومات الحساب الأساسية */}
        <section className="rounded-3xl bg-white shadow-sm border border-[#e4ecff] divide-y">
          <Row label="معرّف المستخدم" value={u.id} />
          <Row label="رقم الجوال" value={u.phone || "غير مضاف"} />
          <Row label="البريد الإلكتروني" value={u.email || "غير مضاف"} />
        </section>

        {/* خيارات وعمليات */}
        <section className="rounded-3xl bg-white shadow-sm border border-[#e4ecff] divide-y">
          <SectionTitle title="الإعدادات و المساعدة" />

          <LinkRow icon="🎯" label="سحب الحظ" description="فرصة يومية لربح هدايا إضافية" />
          <LinkRow
            icon="🛡️"
            label="مركز الأمان"
            description="إدارة كلمة المرور والتحقق بخطوتين"
          />
          <LinkRow
            icon="❓"
            label="مركز المساعدة"
            description="الأسئلة الشائعة والدعم الفني"
          />

          <button
            type="button"
            className="w-full text-right px-4 py-3 text-[13px] text-red-600 flex items-center justify-between hover:bg-red-50/60 transition"
            onClick={() => {
              // تنظيف الكاش البسيط للمتصفح (يمكن توسعتها لاحقاً)
              localStorage.clear();
              sessionStorage.clear();
              alert("تم مسح الذاكرة المؤقتة بنجاح.");
            }}
          >
            <span className="flex items-center gap-2">
              <span>🧹</span>
              <span className="font-medium">مسح الذاكرة المؤقتة</span>
            </span>
            <span className="text-xs text-red-400">إجراء سريع</span>
          </button>
        </section>

        {/* ملاحظة صغيرة أسفل الصفحة */}
        <p className="text-[11px] text-center text-[#9aa4bc] pt-2">
          يتم تحديث رصيدك ومستوى الخبرة تلقائيًا بعد إكمال المهام اليومية
          والحصول على المكافآت.
        </p>
      </div>
    </div>
  );
}

/* ===== مكوّنات فرعية صغيرة لسهولة القراءة ===== */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between text-sm">
      <span className="text-[#7b8ba5]">{label}</span>
      <span className="font-medium text-[#111827] max-w-[60%] text-right truncate">
        {value}
      </span>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="px-4 py-3 text-[12px] font-semibold text-[#7b8ba5]">
      {title}
    </div>
  );
}

function LinkRow({
  icon,
  label,
  description,
}: {
  icon: string;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      className="w-full text-right px-4 py-3 flex items-center justify-between hover:bg-[#f6fbff] transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#eef4ff] flex items-center justify-center text-lg">
          {icon}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-[#111827]">{label}</span>
          {description && (
            <span className="text-[11px] text-[#9aa4bc]">{description}</span>
          )}
        </div>
      </div>
      <span className="text-[#c0cadc] text-lg">›</span>
    </button>
  );
}
