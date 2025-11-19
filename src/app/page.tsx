"use client";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
        {/* النص الأساسي */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-500/10 px-3 py-1 text-[11px] text-yellow-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            منصة استثمار وألعاب يومية بأسلوب VIP
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-snug text-yellow-50">
              مرحباً بك في{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                BİPCOIN
              </span>{" "}
              — عالم الأرباح الذهبية
            </h1>
            <p className="text-sm md:text-base text-yellow-100/70 max-w-xl">
              نفّذ مهام يومية بسيطة، العب ألعاباً تفاعلية، استمتع بضربة حظ كل
              3 أيام، ودعوة الأصدقاء… كل هذا مع نظام محفظة ومستويات مخصص
              للمستثمرين فقط.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/tasks"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-yellow-500/40 hover:brightness-110 transition"
            >
              ابدأ تنفيذ المهام الآن
            </a>
            <a
              href="/games"
              className="inline-flex items-center justify-center rounded-xl border border-yellow-500/50 bg-black/40 px-4 py-2.5 text-sm font-semibold text-yellow-200 hover:bg-yellow-500/10 transition"
            >
              جرّب الألعاب اليومية 🎮
            </a>
          </div>

          {/* أرقام سريعة */}
          <div className="grid sm:grid-cols-3 gap-3 text-[11px]">
            <StatCard label="متوسط ربح يومي" value="12.4$" sub="للمستخدم النشِط" />
            <StatCard label="ألعاب يومية" value="2" sub="أرباح حسب رأس المال" />
            <StatCard label="ضربة حظ" value="كل 3 أيام" sub="من 2$ إلى 20$" />
          </div>
        </section>

        {/* كرت المحفظة */}
        <section className="space-y-4">
          <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-black via-[#020617] to-yellow-900/20 p-5 shadow-2xl shadow-yellow-500/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] text-yellow-100/60">محفظة BİPCOIN</p>
                <p className="mt-1 text-sm text-yellow-50 font-semibold">
                  رصيد المستثمر الحالي
                </p>
              </div>
              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/40 px-3 py-1 text-[11px] text-yellow-200">
                وضع VIP
              </div>
            </div>

            <div className="mb-6">
              <p className="text-[11px] text-yellow-100/60">الرصيد (USD)</p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight text-yellow-300">
                0.00
              </p>
              <p className="mt-1 text-[11px] text-yellow-100/50">
                اربح أكثر كلما زاد رأس مالك في المنصّة.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="rounded-2xl bg-black/60 border border-yellow-500/20 p-3 space-y-1">
                <p className="text-yellow-100/70">مكافآت اليوم</p>
                <p className="text-yellow-300 font-semibold">0.00$</p>
              </div>
              <div className="rounded-2xl bg-black/60 border border-yellow-500/20 p-3 space-y-1">
                <p className="text-yellow-100/70">XP المكتسب</p>
                <p className="text-yellow-300 font-semibold">0</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2 text-[11px]">
              <a
                href="/deposit"
                className="flex-1 rounded-xl bg-yellow-500 text-black font-semibold py-2 text-center hover:bg-yellow-400 transition"
              >
                إيداع رأس مال
              </a>
              <a
                href="/tasks"
                className="flex-1 rounded-xl border border-yellow-500/60 text-yellow-200 font-semibold py-2 text-center hover:bg-yellow-500/10 transition"
              >
                تنفيذ المهام
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-yellow-500/10 bg-black/60 p-3 text-[11px] text-yellow-100/70">
            * كل المهام والألعاب تُحتسب بالدولار الأمريكي داخل محفظتك على BİPCOIN،
            ويمكنك سحب الأرباح حسب شروط المنصّة.
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-black/70 px-3 py-3 space-y-1">
      <p className="text-yellow-100/70">{label}</p>
      <p className="text-lg font-bold text-yellow-300">{value}</p>
      <p className="text-[11px] text-yellow-100/50">{sub}</p>
    </div>
  );
}
