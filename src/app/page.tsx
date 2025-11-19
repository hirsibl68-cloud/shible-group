// src/app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#050509] to-black text-white">
      {/* خلفية خفيفة */}

      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-24 pt-6 md:pt-10">
        {/* الهيدر العلوي */}
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-xl font-black text-black shadow-[0_0_30px_rgba(250,204,21,0.4)]">
              ₿
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-yellow-500/80">
                BİPCOIN
              </div>
              <p className="text-[11px] text-gray-400">
                نظام أرباح واستثمار VIP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/login"
              className="rounded-full border border-yellow-500/40 px-3 py-1.5 text-yellow-200 hover:bg-yellow-500/10 transition"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 px-4 py-1.5 font-semibold text-black shadow-[0_0_25px_rgba(250,204,21,0.6)] hover:brightness-110 transition"
            >
              إنشاء حساب VIP
            </Link>
          </div>
        </header>

        {/* البادج العلوي */}
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-[11px] text-yellow-100">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>منصة استثمار وألعاب يومية بأسلوب VIP</span>
        </div>

        {/* سكشن الهيرو */}
        <section className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start">
          {/* النص والأزرار */}
          <div className="space-y-5">
            <h1 className="text-3xl leading-snug md:text-4xl font-bold">
              <span className="text-gray-100">مرحباً بك في</span>{" "}
              <span className="text-yellow-400">BİPCOIN</span>{" "}
              <span className="block text-gray-100">عالم الأرباح الذهبية</span>
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-gray-300">
              نفّذ مهام يومية بسيطة، العب ألعاباً تفاعلية، استمتع بضربة حظ كل 3
              أيام، ودعوة الأصدقاء… كل ذلك مع نظام محفظة ومستويات مصمم خصيصاً
              للمستثمرين فقط بأسلوب VIP باللونين الأسود والذهبي.
            </p>

            {/* الأزرار الرئيسية */}
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link href="/tasks" className="sm:flex-1">
                <button className="w-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 px-6 py-3 text-sm font-bold text-black shadow-[0_0_30px_rgba(250,204,21,0.65)] hover:brightness-110 active:scale-[0.98] transition">
                  ابدأ تنفيذ المهام الآن
                </button>
              </Link>

              <Link href="/games" className="sm:flex-1">
                <button className="w-full rounded-full border border-yellow-500/60 bg-black/40 px-6 py-3 text-sm font-semibold text-yellow-200 hover:bg-yellow-500/10 active:scale-[0.98] transition">
                  🎮 جرّب الألعاب اليومية
                </button>
              </Link>
            </div>

            {/* روابط سريعة أخرى */}
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-gray-400">
              <Link
                href="/wallet"
                className="rounded-full border border-yellow-500/30 px-3 py-1 hover:bg-yellow-500/10 hover:text-yellow-100 transition"
              >
                محفظة BİPCOIN
              </Link>
              <Link
                href="/plans"
                className="rounded-full border border-yellow-500/20 px-3 py-1 hover:bg-yellow-500/10 hover:text-yellow-100 transition"
              >
                خطط الاستثمار
              </Link>
              <Link
                href="/levels"
                className="rounded-full border border-yellow-500/20 px-3 py-1 hover:bg-yellow-500/10 hover:text-yellow-100 transition"
              >
                نظام المستويات XP
              </Link>
            </div>
          </div>

          {/* كارد الإحصائيات */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-yellow-500/30 bg-black/70 p-4 shadow-[0_0_40px_rgba(250,204,21,0.15)]">
              <p className="text-xs text-gray-400">متوسط ربح يومي للمستخدم</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-yellow-300">
                  12.4$
                </span>
                <span className="text-xs text-gray-500">تقدير تجريبي</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1 rounded-2xl bg-yellow-500/5 p-3">
                  <p className="text-gray-400">الألعاب اليومية</p>
                  <p className="text-lg font-semibold text-yellow-200">2</p>
                  <p className="text-[10px] text-gray-500">
                    أرباح حسب رأس المال
                  </p>
                </div>
                <div className="space-y-1 rounded-2xl bg-yellow-500/5 p-3">
                  <p className="text-gray-400">ضربة حظ كل 3 أيام</p>
                  <p className="text-lg font-semibold text-yellow-200">
                    2$ – 20$
                  </p>
                  <p className="text-[10px] text-gray-500">
                    مكافأة عشوائية للمستثمرين
                  </p>
                </div>
              </div>
            </div>

            {/* كارد ضربة الحظ */}
            <div className="rounded-3xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/15 via-black to-yellow-500/10 p-4">
              <p className="text-xs text-yellow-200/80">ضربة حظ VIP</p>
              <h2 className="mt-1 text-sm font-semibold text-yellow-100">
                كل 3 أيام ضربة حظ بقيمة من 2$ إلى 20$
              </h2>
              <p className="mt-1 text-xs text-gray-300">
                يتم تفعيلها تلقائياً للمستثمرين النشطين. يمكن ربطها لاحقاً
                بالمهام أو الألعاب حسب نظامك الاستثماري.
              </p>
              <Link href="/tasks" className="mt-3 inline-block text-[11px] text-yellow-300 underline-offset-2 hover:underline">
                شاهد تفاصيل المهام المرتبطة بضربة الحظ
              </Link>
            </div>
          </div>
        </section>

        {/* سكشن الخطط الاستثمارية */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-yellow-100">
              خطط الاستثمار الذهبية
            </h2>
            <Link
              href="/plans"
              className="text-[11px] text-yellow-300 hover:underline underline-offset-2"
            >
              عرض كل الخطط
            </Link>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-yellow-500/30 bg-black/70 p-3 text-xs">
              <p className="text-[11px] text-gray-400">خطة بداية</p>
              <p className="mt-1 text-lg font-semibold text-yellow-200">
                من 50$ إلى 300$
              </p>
              <p className="mt-2 text-gray-400">
                مهام وألعاب يومية بعوائد ثابتة ونظام مستويات بسيط للمبتدئين.
              </p>
            </div>
            <div className="rounded-2xl border border-yellow-500/40 bg-black/80 p-3 text-xs shadow-[0_0_25px_rgba(250,204,21,0.25)]">
              <p className="text-[11px] text-yellow-300">خطة VIP مستثمر</p>
              <p className="mt-1 text-lg font-semibold text-yellow-100">
                من 300$ إلى 2000$
              </p>
              <p className="mt-2 text-gray-300">
                أرباح حسب رأس المال، ألعاب خاصة، وضربة حظ أعلى سقفاً.
              </p>
            </div>
            <div className="rounded-2xl border border-yellow-500/20 bg-black/60 p-3 text-xs">
              <p className="text-[11px] text-gray-400">خطة خاصة</p>
              <p className="mt-1 text-lg font-semibold text-yellow-200">
                +2000$
              </p>
              <p className="mt-2 text-gray-400">
                تصميم حسب الطلب، دعم شخصي، وإدارة أرباح مخصصة بالكامل.
              </p>
            </div>
          </div>
        </section>

        {/* سكشن روابط سريعة */}
        <section className="mt-2 grid gap-3 text-[11px] text-gray-300 md:grid-cols-4">
          <Link
            href="/wallet"
            className="rounded-2xl border border-yellow-500/25 bg-black/70 p-3 hover:bg-yellow-500/5 transition"
          >
            <p className="font-semibold text-yellow-100 mb-1">محفظة BİPCOIN</p>
            <p>عرض الرصيد، التحويلات، وضبط طريقة السحب.</p>
          </Link>
          <Link
            href="/withdraw"
            className="rounded-2xl border border-yellow-500/25 bg-black/70 p-3 hover:bg-yellow-500/5 transition"
          >
            <p className="font-semibold text-yellow-100 mb-1">طلبات السحب</p>
            <p>متابعة حالة سحوباتك بشكل واضح وسريع.</p>
          </Link>
          <Link
            href="/leaderboard"
            className="rounded-2xl border border-yellow-500/25 bg-black/70 p-3 hover:bg-yellow-500/5 transition"
          >
            <p className="font-semibold text-yellow-100 mb-1">لوحة الشرف</p>
            <p>أعلى المستثمرين ربحًا ومستوى داخل BİPCOIN.</p>
          </Link>
          <Link
            href="/profile"
            className="rounded-2xl border border-yellow-500/25 bg-black/70 p-3 hover:bg-yellow-500/5 transition"
          >
            <p className="font-semibold text-yellow-100 mb-1">الملف الشخصي</p>
            <p>معلومات حسابك، المستوى، ونقاط الخبرة XP.</p>
          </Link>
        </section>

        {/* ملاحظة صغيرة */}
        <p className="mt-2 text-[10px] leading-relaxed text-gray-500">
          * الأرقام المعروضة على هذه الصفحة تجريبية ويمكن لاحقاً ربطها مباشرة
          بقاعدة البيانات (المحفظة، الأرباح، المهام، الألعاب اليومية). تصميم
          BİPCOIN مهيأ ليتكامل مع نظام المهام /tasks ونظام الألعاب /games
          والمحفظة /wallet بشكل احترافي.
        </p>
      </div>

      {/* شريط تنقّل سفلي للموبايل */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-yellow-500/20 bg-black/95 py-2 text-[11px] text-yellow-200 sm:hidden">
        <Link href="/" className="flex flex-col items-center gap-0.5">
          <span>🏠</span>
          <span>الرئيسية</span>
        </Link>
        <Link href="/tasks" className="flex flex-col items-center gap-0.5">
          <span>✅</span>
          <span>المهام</span>
        </Link>
        <Link href="/games" className="flex flex-col items-center gap-0.5">
          <span>🎮</span>
          <span>الألعاب</span>
        </Link>
        <Link href="/wallet" className="flex flex-col items-center gap-0.5">
          <span>👛</span>
          <span>المحفظة</span>
        </Link>
      </nav>
    </div>
  );
}
