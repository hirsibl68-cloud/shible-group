"use client";

import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* خلفية لطيفة */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e9f4ff] via-white to-[#f5fbff]" />
        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-12">
          {/* اللوغو */}
          <div className="flex justify-center">
            <Logo />
          </div>

          <h1 className="mt-6 text-center text-3xl md:text-4xl font-extrabold tracking-tight text-[#0b1a2e]">
            Money AI
          </h1>

          <p className="mt-3 text-center text-[#345067] max-w-2xl mx-auto">
            منصة ذكية تساعدك على <span className="font-semibold text-[#0b1a2e]">إدارة أموالك</span>،
            تحليل الإنفاق، واكتشاف فرص الاستثمار — بسرعة وبساطة وبدون صداع.
          </p>

          {/* أزرار */}
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-[#2aa1ff] hover:bg-[#1b8aea] shadow-sm"
            >
              ابدأ الآن مجانًا
            </Link>
            <Link
              href="/ai-tools"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-[#0b1a2e] bg-white border border-[#dce9ff] hover:bg-[#f3f9ff]"
            >
              جرّب الأدوات
            </Link>
          </div>

          {/* شريط ثقة / شعارات مصغّرة */}
          <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-4 text-center text-xs text-[#517694] opacity-80">
            <span>تحليل ذكي</span>
            <span>تقارير لحظية</span>
            <span>تنبيهات استثمار</span>
            <span>أمان وحماية</span>
            <span>واجهة عربية</span>
            <span>دعم سريع</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-4">
          <Feature
            icon="📊"
            title="تحليل الإنفاق"
            desc="تتبّع مصاريفك تلقائيًا، وصنّفها بتقارير واضحة تساعدك على اتخاذ قرارات أفضل."
          />
          <Feature
            icon="🤖"
            title="مساعد ذكي"
            desc="اسأل Money AI عن ميزانيتك وخططك— واحصل على إجابة مبسّطة وعمليّة."
          />
          <Feature
            icon="📈"
            title="تنبيهات الاستثمار"
            desc="إشارات مبنية على البيانات لمساعدتك على اغتنام الفرص في الوقت المناسب."
          />
        </div>
      </section>

      {/* دعوة للعمل معنا */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto rounded-2xl border border-[#dce9ff] bg-white p-6 md:p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#0b1a2e]">
            انضمّ إلينا كشريك نجاح
          </h2>
          <p className="mt-2 text-[#345067]">
            نبحث عن مسوّقين وشركاء محتوى وخبراء ماليين للعمل معنا. إن كنت شغوفًا
            بالذكاء الاصطناعي والتمويل، فمكانك هنا. دعنا نبني مستقبل المال معًا.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-[#2aa1ff] hover:bg-[#1b8aea]"
            >
              انضم الآن
            </Link>
            <Link
              href="/me"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-[#0b1a2e] bg-white border border-[#dce9ff] hover:bg-[#f3f9ff]"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>

      {/* تذييل بسيط */}
      <footer className="px-6 pb-10">
        <div className="max-w-5xl mx-auto text-center text-xs text-[#7a93a8]">
          © {new Date().getFullYear()} Money AI — كل الحقوق محفوظة
        </div>
      </footer>
    </div>
  );
}

/* بطاقة ميّزات */
function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-[#dce9ff] bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-2 font-semibold text-[#0b1a2e]">{title}</h3>
      <p className="text-sm text-[#345067] leading-relaxed">{desc}</p>
    </div>
  );
}

/* لوغو SVG أنيق */
function Logo() {
  return (
    <div className="inline-flex items-center">
      <span className="sr-only">Money AI</span>
      <svg
        width="68"
        height="68"
        viewBox="0 0 68 68"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2aa1ff" />
            <stop offset="100%" stopColor="#00d1ff" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="68" height="68" rx="16" fill="url(#g)" />
        <g transform="translate(12, 12)">
          <circle cx="22" cy="22" r="20" fill="white" opacity="0.15" />
          <path
            d="M12 26c4 6 16 6 20 0M12 18c4-6 16-6 20 0"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.9"
          />
          <text
            x="22"
            y="26"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="white"
          >
            AI
          </text>
        </g>
      </svg>
    </div>
  );
}
