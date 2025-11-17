export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50 to-white">
      <div className="mx-auto max-w-5xl px-4 py-8" dir="rtl">
        {/* الشريط العلوي */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              AI
            </div>
            <div>
              <p className="text-sm text-slate-500">منصة الاستثمار الذكي</p>
              <h1 className="text-base font-semibold text-slate-900">
                Money AI – عبد القادر الشبلي
              </h1>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <a
              href="/login"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200"
            >
              تسجيل الدخول
            </a>
            <a
              href="/signup"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              إنشاء حساب جديد
            </a>
          </nav>
        </header>

        {/* البطل (Hero) */}
        <section className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-sky-100 px-3 py-1 text-xs text-sky-700 shadow-sm">
              <span className="text-lg">🚀</span>
              <span>أهلاً بك في موقع الأستاذ عبد القادر الشبلي</span>
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-relaxed">
              الاستثمار بوساطة{" "}
              <span className="text-blue-600">الذكاء الاصطناعي</span>
              <br />
              لزيادة أرباحك بأمان وشفافية
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              منصة <span className="font-semibold text-slate-900">Money AI</span> صممت خصيصاً
              لتساعدك على استثمار أموالك بطريقة ذكية، معتمدة على تحليلات
              بالذكاء الاصطناعي وخطط استثمارية مدروسة تراعي إدارة المخاطر
              وتحافظ على رأس المال قدر الإمكان.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/signup"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md"
              >
                ابدأ الاستثمار الآن
              </a>
              <a
                href="/ai-tools"
                className="px-5 py-3 rounded-xl bg-white text-sm font-semibold text-slate-800 border border-slate-200 hover:bg-slate-50"
              >
                جرّب أدوات الذكاء الاصطناعي
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                أرباح يومية وخطط ثابتة
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                تقارير واضحة وتحكم كامل في محفظتك
              </div>
            </div>
          </div>

          {/* بطاقة توضيح المحفظة */}
          <div className="md:order-none order-first">
            <div className="rounded-3xl bg-white shadow-xl border border-sky-100 p-5 space-y-4">
              <p className="text-sm font-semibold text-slate-800">
                لمحة سريعة عن حسابك الاستثماري
              </p>

              <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white p-4 space-y-3">
                <p className="text-xs text-blue-100">محفظة تجريبية</p>
                <p className="text-sm">الرصيد الكلي</p>
                <p className="text-3xl font-bold">0.00 USDT</p>
                <p className="text-xs text-blue-100">
                  قم بإنشاء حساب جديد وابدأ أول إيداع لتفعيل الأرباح اليومية.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl border border-slate-100 p-3 bg-slate-50/70">
                  <p className="text-slate-500 mb-1">أرباح اليوم</p>
                  <p className="font-semibold text-slate-900">0.00 USDT</p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-3 bg-slate-50/70">
                  <p className="text-slate-500 mb-1">مجموع الأرباح</p>
                  <p className="font-semibold text-slate-900">0.00 USDT</p>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-sky-200 p-3 text-xs text-slate-600 bg-sky-50/60">
                🧠 يتم تحليل الفرص الاستثمارية باستخدام خوارزميات ذكاء
                اصطناعي متقدمة، مع التركيز على تقليل المخاطر قدر الإمكان.
              </div>
            </div>
          </div>
        </section>

        {/* المزايا الرئيسية */}
        <section className="mt-16">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            لماذا تختار منصة الأستاذ عبد القادر الشبلي؟
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              title="استثمار مدعوم بالذكاء الاصطناعي"
              text="نستخدم نماذج تحليل ذكية لمتابعة الأسواق واختيار أفضل الفرص بما يناسب رأس مالك."
              icon="🤖"
            />
            <FeatureCard
              title="إدارة مخاطر مدروسة"
              text="الهدف الأول حماية رأس المال ثم تنمية الأرباح تدريجياً دون مغامرة زائدة."
              icon="🛡️"
            />
            <FeatureCard
              title="متابعة وتقارير واضحة"
              text="تابع رصيدك وأرباحك اليومية من لوحة تحكم عربية سهلة وواضحة."
              icon="📊"
            />
          </div>
        </section>

        {/* خطوات البدء */}
        <section className="mt-16 mb-10">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            كيف تبدأ رحلتك الاستثمارية؟
          </h3>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <StepCard
              step="1"
              title="إنشاء حساب"
              text="سجّل بياناتك الأساسية وفعّل حسابك خلال دقائق."
            />
            <StepCard
              step="2"
              title="إيداع آمن"
              text="قم بإيداع المبلغ المناسب لك، مع إمكانية السحب حسب سياسة الخطة."
            />
            <StepCard
              step="3"
              title="متابعة الأرباح"
              text="دع أنظمة الذكاء الاصطناعي تعمل، وتابع أرباحك من لوحة التحكم."
            />
          </div>
        </section>

        <footer className="border-t border-slate-200 pt-4 mt-6 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} منصة Money AI – الأستاذ عبد القادر الشبلي.</p>
          <p>هذا الموقع لأغراض استثمارية تعليمية؛ المخاطر موجودة دائماً ويجب عدم استثمار مال لا يمكنك تحمل خسارته.</p>
        </footer>
      </div>
    </main>
  );
}

/* مكونات صغيرة للمزايا والخطوات */

type FeatureProps = {
  title: string;
  text: string;
  icon: string;
};

function FeatureCard({ title, text, icon }: FeatureProps) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 space-y-2">
      <div className="text-2xl">{icon}</div>
      <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
      <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
    </div>
  );
}

type StepProps = {
  step: string;
  title: string;
  text: string;
};

function StepCard({ step, title, text }: StepProps) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 space-y-2">
      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
        {step}
      </div>
      <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
      <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
    </div>
  );
}
