import Link from "next/link";

type Stat = {
  label: string;
  value: string;
  note: string;
};

type Feature = {
  icon: string;
  title: string;
  description: string;
};

type Step = {
  order: number;
  title: string;
  description: string;
};

type Plan = {
  id: string;
  name: string;
  tag: string;
  dailyRate: string;
  min: string;
  max: string;
  lockDays: number;
  highlight?: boolean;
};

type Testimonial = {
  name: string;
  role: string;
  text: string;
};

type FAQ = {
  q: string;
  a: string;
};

const stats: Stat[] = [
  {
    label: "متابعة يومية",
    value: "24/7",
    note: "نظام مراقبة وتحليل مستمر للأسواق",
  },
  {
    label: "خطط استثمار",
    value: "+3",
    note: "خيارات متنوعة تناسب أحجام رؤوس الأموال المختلفة",
  },
  {
    label: "وقت فتح الحساب",
    value: "5 دقائق",
    note: "تسجيل بسيط بدون تعقيدات",
  },
];

const coreFeatures: Feature[] = [
  {
    icon: "🤖",
    title: "ذكاء اصطناعي في خدمة أموالك",
    description:
      "منصة Money AI تستخدم خوارزميات تحليلات متقدمة لمتابعة البيانات والاتجاهات، وتساعدك على اختيار الخطط المناسبة لرأس مالك وأهدافك.",
  },
  {
    icon: "🛡️",
    title: "تركيز على إدارة المخاطر",
    description:
      "الهدف الأول هو حماية رأس المال قدر الإمكان، ثم البحث عن عائد مستقر؛ لذلك تُبنى الخطط على مبدأ التدرّج لا المغامرة العشوائية.",
  },
  {
    icon: "📊",
    title: "شفافية في الأرقام والحركة",
    description:
      "لوحة تحكم عربية واضحة توضح لك الرصيد، الأرباح اليومية، تاريخ الإيداعات والسحوبات، وكل حركة تتم في محفظتك الاستثمارية.",
  },
];

const howItWorksSteps: Step[] = [
  {
    order: 1,
    title: "إنشاء حساب في المنصة",
    description:
      "ابدأ بتسجيل بياناتك الأساسية، تأكيد رقم الهاتف أو البريد، ثم الدخول إلى لوحة التحكم الخاصة بك.",
  },
  {
    order: 2,
    title: "اختيار الخطة المناسبة",
    description:
      "اطّلع على الخطط المتاحة، مدة كل خطة، الحد الأدنى والأعلى، واحسب العائد المتوقع قبل اتخاذ القرار.",
  },
  {
    order: 3,
    title: "إيداع المبلغ المطلوب",
    description:
      "قم بعملية الإيداع من خلال الطرق المتاحة في المنصة، وسيتم تحديث رصيد المحفظة بشكل فوري أو خلال دقائق.",
  },
  {
    order: 4,
    title: "متابعة الأرباح يومياً",
    description:
      "بعد تفعيل الخطة، يبدأ النظام بمتابعة استثمارك، ويمكنك مشاهدة أرباحك اليومية وإجمالي النتائج من لوحة التحكم.",
  },
];

const plans: Plan[] = [
  {
    id: "starter",
    name: "خطة البداية الذكية",
    tag: "مناسبة للمبتدئين",
    dailyRate: "1.5٪ يومياً*",
    min: "50 USDT",
    max: "499 USDT",
    lockDays: 7,
  },
  {
    id: "growth",
    name: "خطة النمو المتدرّج",
    tag: "الأكثر طلباً",
    dailyRate: "2.0٪ يومياً*",
    min: "500 USDT",
    max: "4,999 USDT",
    lockDays: 15,
    highlight: true,
  },
  {
    id: "pro",
    name: "خطة المستثمر المتقدّم",
    tag: "لرؤوس الأموال الأكبر",
    dailyRate: "حتى 2.5٪ يومياً*",
    min: "5,000 USDT",
    max: "20,000 USDT",
    lockDays: 30,
  },
];

const testimonials: Testimonial[] = [
  {
    name: "مستثمر من الخليج",
    role: "مستخدم لخطة النمو المتدرّج",
    text: "المنصة ساعدتني أرتّب دخلي الشهري بطريقة أوضح. أحببت وضوح الأرقام وسهولة متابعة الأرباح من الموبايل.",
  },
  {
    name: "مستثمر من تركيا",
    role: "مستخدم لخطة البداية الذكية",
    text: "كنت متردد بالدخول في عالم الاستثمار، لكن وجود واجهة عربية بسيطة مع شرح واضح للخطط شجعني أبدأ بمبلغ صغير.",
  },
  {
    name: "مستثمر مستقل",
    role: "مستخدم لعدة خطط",
    text: "أهم شيء بالنسبة لي إدارة المخاطر. فكرة التدرّج في الخطط وعدم إجبار المستثمر على مبالغ ضخمة من البداية أعطتني راحة.",
  },
];

const faqs: FAQ[] = [
  {
    q: "هل Money AI تقدم نصيحة مالية مباشرة؟",
    a: "المنصة لا تقدّم نصيحة مالية شخصية. هي توفر أدوات وخطط استثمارية عامة مبنية على تحليلات رقمية، والقرار النهائي للاستثمار أو عدمه يعود لك وحدك.",
  },
  {
    q: "هل الأرباح مضمونة بشكل كامل؟",
    a: "لا، أي استثمار في العالم يحمل معه مستوى من المخاطر، ولا يوجد عائد مضمون 100٪. هدفنا هو إدارة هذه المخاطر بذكاء قدر الإمكان وتوضيح الصورة للمستثمر.",
  },
  {
    q: "ما هي أقل قيمة أستطيع البدء بها؟",
    a: "يمكنك البدء بمبالغ صغيرة حسب الخطة المتاحة، غالباً من 50 USDT أو ما يعادله. الهدف هو أن تكون البداية مريحة وتناسب ميزانيتك.",
  },
  {
    q: "هل يمكنني السحب في أي وقت؟",
    a: "توجد سياسات خاصة بكل خطة. بعض الخطط تعتمد على مدة قفل محددة (Lock Period)، وبعدها تستطيع السحب أو إعادة استثمار الأرباح، حسب ما هو موضح لك داخل لوحة التحكم.",
  },
  {
    q: "كيف يتم استخدام الذكاء الاصطناعي داخل المنصة؟",
    a: "يُستخدم الذكاء الاصطناعي في تحليل البيانات والمؤشرات، ومتابعة الأداء التاريخي والآني؛ للمساعدة في بناء استراتيجيات وخطط أكثر استقراراً، لكن القرار الأخير واختيار الخطة يبقى دائماً لك.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-8" dir="rtl">
        {/* HEADER */}
        <Header />

        {/* HERO SECTION */}
        <Hero />

        {/* STATS SECTION */}
        <StatsSection />

        {/* CORE FEATURES */}
        <CoreFeaturesSection />

        {/* HOW IT WORKS */}
        <HowItWorksSection />

        {/* PLANS SECTION */}
        <PlansSection />

        {/* AI EXPLANATION */}
        <AIExplanationSection />

        {/* RISK NOTICE */}
        <RiskNoticeSection />

        {/* TESTIMONIALS */}
        <TestimonialsSection />

        {/* FAQ */}
        <FAQSection />

        {/* CONTACT & SUPPORT */}
        <ContactSection />

        {/* FOOTER */}
        <Footer />
      </div>
    </main>
  );
}

/* ========================= HEADER ========================= */

function Header() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
          AI
        </div>
        <div>
          <p className="text-xs text-slate-500">منصة استثمار مدعومة بالذكاء الاصطناعي</p>
          <h1 className="text-base md:text-lg font-semibold text-slate-900">
            Money AI – استثمر بذكاء لا بعشوائية
          </h1>
        </div>
      </div>

      <nav className="flex items-center gap-3 text-sm">
        <Link
          href="/login"
          className="px-4 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200"
        >
          تسجيل الدخول
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
        >
          إنشاء حساب جديد
        </Link>
      </nav>
    </header>
  );
}

/* ========================= HERO ========================= */

function Hero() {
  return (
    <section className="mt-12 grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
      <div className="space-y-5">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-sky-100 px-3 py-1 text-xs text-sky-700 shadow-sm">
          <span className="text-lg">🚀</span>
          <span>أهلاً بك في Money AI – بوابتك إلى استثمار منظم ومدروس.</span>
        </p>

        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-relaxed">
          حوّل طريقة استثمارك مع{" "}
          <span className="text-blue-600">منصة عربية تعتمد على الذكاء الاصطناعي</span>
          ، تتابع أموالك وتعرض لك النتائج بوضوح.
        </h2>

        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          سواء كنت في بداية رحلتك الاستثمارية أو لديك خبرة سابقة، توفر لك{" "}
          <span className="font-semibold text-slate-900">Money AI</span> بيئة آمنة وأكثر
          تنظيماً لمتابعة رأس مالك، اختيار الخطط، ورؤية تأثير القرارات التي تتخذها على أرباحك
          اليومية والشهرية.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/signup"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md"
          >
            ابدأ الآن خلال 5 دقائق
          </Link>
          <Link
            href="/ai-tools"
            className="px-5 py-3 rounded-xl bg-white text-sm font-semibold text-slate-800 border border-slate-200 hover:bg-slate-50"
          >
            استكشف أدوات الذكاء الاصطناعي
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            متابعة مستمرة لحسابك على مدار الساعة
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            خطط واضحة بعوائد متوقعة وحدود مخاطر معقولة
          </div>
        </div>
      </div>

      <HeroCard />
    </section>
  );
}

function HeroCard() {
  return (
    <div className="md:order-none order-first">
      <div className="rounded-3xl bg-white shadow-xl border border-sky-100 p-5 space-y-4">
        <p className="text-sm font-semibold text-slate-800">
          نظرة سريعة على حساب استثماري في Money AI
        </p>

        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white p-4 space-y-3">
          <p className="text-xs text-blue-100">محفظة تجريبية – للاطلاع فقط</p>
          <p className="text-sm">الرصيد الكلي</p>
          <p className="text-3xl font-bold">0.00 USDT</p>
          <p className="text-xs text-blue-100 leading-relaxed">
            بعد إنشاء الحساب والإيداع في إحدى الخطط، يبدأ النظام بحساب الأرباح المتوقعة
            وعرضها لك بشكل يومي داخل لوحة التحكم.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <InfoBox label="أرباح اليوم" value="0.00 USDT" />
          <InfoBox label="إجمالي الأرباح" value="0.00 USDT" />
        </div>

        <div className="rounded-2xl border border-dashed border-sky-200 p-3 text-xs text-slate-600 bg-sky-50/60 leading-relaxed">
          🧠 تعتمد الحسابات المعروضة داخل المنصة على نماذج رياضية وتحليلات رقمية. الأرقام
          التوضيحية لا تعني ضمان ربح محدد مستقبلاً، بل هدفها إعطاء صورة تقريبية عن الخطة
          قبل الدخول فيها.
        </div>
      </div>
    </div>
  );
}

/* ========================= STATS ========================= */

function StatsSection() {
  return (
    <section className="mt-12">
      <div className="rounded-3xl bg-white border border-slate-100 shadow-sm p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-sky-700">لماذا يختار المستثمرون المنصات الرقمية؟</p>
            <p className="text-sm md:text-base text-slate-600 mt-1 max-w-xl">
              السر في وضوح الأرقام وسهولة المتابعة. Money AI تمنحك لوحة تحكم تجمع بين
              الأرقام والتحليلات في مكان واحد، حتى ترى صورة أوضح لاستثمارك.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto md:min-w-[360px]">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-slate-50 border border-slate-100 p-3 text-center"
              >
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="text-lg font-bold text-slate-900 mt-1">{item.value}</p>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================= CORE FEATURES ========================= */

function CoreFeaturesSection() {
  return (
    <section className="mt-16">
      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
        ما الذي يميز Money AI عن الاستثمار التقليدي؟
      </h3>
      <p className="text-sm text-slate-600 max-w-2xl mb-6">
        بدلاً من الاعتماد على التوقعات الشخصية فقط، تجمع المنصة بين خبرة الإنسان وقوة
        التحليل الآلي. النتيجة هي قرارات أكثر هدوءاً، وخطط مبنية على بيانات حقيقية.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {coreFeatures.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 space-y-2">
      <div className="text-2xl">{feature.icon}</div>
      <h4 className="font-semibold text-slate-900 text-sm">{feature.title}</h4>
      <p className="text-xs text-slate-600 leading-relaxed">{feature.description}</p>
    </div>
  );
}

/* ========================= HOW IT WORKS ========================= */

function HowItWorksSection() {
  return (
    <section className="mt-20">
      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
        كيف تعمل منصة Money AI خطوة بخطوة؟
      </h3>
      <p className="text-sm text-slate-600 max-w-2xl mb-6">
        صممت المنصة لتكون تجربة الاستثمار واضحة من البداية. لا تحتاج لأن تكون خبيراً
        بالأسواق؛ كل ما عليك هو معرفة المبلغ المناسب لك، واختيار الخطة التي تعكس مستوى
        الراحة الذي تريده.
      </p>

      <div className="grid gap-4 md:grid-cols-4">
        {howItWorksSteps.map((step) => (
          <StepCard key={step.order} step={step} />
        ))}
      </div>
    </section>
  );
}

function StepCard({ step }: { step: Step }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 space-y-2">
      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
        {step.order}
      </div>
      <h4 className="font-semibold text-slate-900 text-sm">{step.title}</h4>
      <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
    </div>
  );
}

/* ========================= PLANS ========================= */

function PlansSection() {
  return (
    <section className="mt-20">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900">
            خطط استثمار متدرجة تناسب أحجام رؤوس الأموال المختلفة
          </h3>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            يمكنك البدء بمبلغ بسيط، أو اختيار خطط أكبر حسب قدرتك. دائماً بإمكانك مراجعة
            تفاصيل كل خطة قبل اتخاذ القرار، ورؤية العائد المتوقع بناءً على مبلغك.
          </p>
        </div>
        <Link
          href="/plans"
          className="text-xs md:text-sm text-blue-700 hover:text-blue-800 font-semibold"
        >
          استعراض كل الخطط من داخل المنصة →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
        * النسب المعروضة هي نسب مستهدفة/متوقعة ضمن خطط استثمارية مبنية على تحليلات
        رقمية، وليست وعداً ثابتاً أو ضماناً قاطعاً بتحقيق هذا العائد في كل مرة. الأداء
        الفعلي قد يختلف تبعاً لظروف السوق وعوامل أخرى.
      </p>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`rounded-3xl border p-4 space-y-3 bg-white shadow-sm ${
        plan.highlight
          ? "border-blue-500 shadow-md ring-1 ring-blue-100"
          : "border-slate-100"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <h4 className="font-semibold text-slate-900 text-sm md:text-base">{plan.name}</h4>
          <p className="text-[11px] text-slate-500 mt-1">{plan.tag}</p>
        </div>
        {plan.highlight && (
          <span className="text-[11px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            الأكثر اختياراً
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
          <p className="text-slate-500 mb-1">العائد اليومي المستهدف</p>
          <p className="font-semibold text-slate-900">{plan.dailyRate}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
          <p className="text-slate-500 mb-1">مدة الخطة</p>
          <p className="font-semibold text-slate-900">{plan.lockDays} يوم</p>
        </div>
        <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
          <p className="text-slate-500 mb-1">الحد الأدنى</p>
          <p className="font-semibold text-slate-900">{plan.min}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
          <p className="text-slate-500 mb-1">الحد الأقصى</p>
          <p className="font-semibold text-slate-900">{plan.max}</p>
        </div>
      </div>

      <Link
        href="/deposit"
        className="block text-center text-xs md:text-sm mt-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        اختيار هذه الخطة
      </Link>
    </div>
  );
}

/* ========================= AI EXPLANATION ========================= */

function AIExplanationSection() {
  return (
    <section className="mt-20">
      <div className="rounded-3xl bg-slate-900 text-slate-50 p-5 md:p-7 grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-lg md:text-xl font-bold">
            كيف يساعد الذكاء الاصطناعي في تحسين قرارات الاستثمار؟
          </h3>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
            الفكرة ليست في أن يكون الذكاء الاصطناعي بديلاً عن الإنسان، بل أن يكون أداة
            قوية بين يدي المستثمر. تقوم الأنظمة بتحليل بيانات ضخمة، سرعة تفاعلها مع
            الأرقام أعلى بكثير من قدرة الإنسان، لكنها في النهاية لا تلغي دور المتابعة
            البشرية والقرار الواعي.
          </p>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
            في Money AI، تُستخدم نماذج تحليلية لمراقبة التذبذب، قياس المخاطر، ومقارنة
            الخطط المحتملة؛ ثم تُترجم هذه النتائج إلى أرقام واضحة في لوحة التحكم لتساعدك
            على رؤية الصورة كاملة قبل الإيداع أو إعادة الاستثمار.
          </p>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-4 text-xs md:text-sm">
            <p className="font-semibold mb-1 text-slate-100">كيف تستفيد كمستثمر؟</p>
            <ul className="list-disc pr-4 space-y-1 text-slate-200">
              <li>رؤية أوضح لمستوى المخاطرة في كل خطة.</li>
              <li>إمكانية مقارنة العائد المتوقع بين أكثر من خيار.</li>
              <li>متابعة تأثير قراراتك السابقة على أدائك الحالي.</li>
              <li>تجنّب القرارات العشوائية المبنية على المشاعر فقط.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-4 text-[11px] leading-relaxed text-slate-300">
            ⚠️ رغم كل هذه الأدوات التحليلية، تبقى الأسواق متغيرة، ولا يوجد نظام قادر على
            إزالة المخاطر بالكامل. الذكاء الاصطناعي يساعد في فهم الصورة بشكل أفضل، لكنه لا
            يضمن نتائج ثابتة في المستقبل.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================= RISK NOTICE ========================= */

function RiskNoticeSection() {
  return (
    <section className="mt-16">
      <div className="rounded-3xl bg-amber-50 border border-amber-200 p-4 md:p-5 text-xs md:text-sm text-amber-900 leading-relaxed space-y-2">
        <p className="font-semibold">تنبيه مهم قبل البدء بالاستثمار</p>
        <p>
          الاستثمار دائماً مرتبط بدرجة من المخاطرة. لا توجد أداة أو منصة قادرة على
          إلغاء الخسارة بشكل كامل. دور Money AI هو توفير بيئة أوضح وأدوات تحليلية أفضل،
          لكن القرار النهائي باستخدام أي خطة ومسؤولية النتائج تقع على عاتق المستثمر نفسه.
        </p>
        <p>
          يُنصح بعدم استثمار مبالغ تحتاجها لمصاريفك الأساسية أو ديونك الشخصية، وأن يكون
          الاستثمار من جزء محدد ومدروس من رأس مالك يمكنك تحمّل خسارته في أسوأ الأحوال.
        </p>
      </div>
    </section>
  );
}

/* ========================= TESTIMONIALS ========================= */

function TestimonialsSection() {
  return (
    <section className="mt-20">
      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
        ماذا يقول مستخدمو Money AI عن تجربتهم؟
      </h3>
      <p className="text-sm text-slate-600 max-w-2xl mb-6">
        الآراء التالية من مستخدمين حقيقيين يعبرون عن تجربتهم الشخصية، وقد تختلف النتيجة من
        شخص لآخر بحسب المبلغ، الخطة، ومدة الاستثمار.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <TestimonialCard key={item.name} testimonial={item} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-3xl bg-white border border-slate-100 shadow-sm p-4 space-y-2 text-xs leading-relaxed">
      <p className="text-slate-700">“{testimonial.text}”</p>
      <div className="mt-2">
        <p className="font-semibold text-slate-900">{testimonial.name}</p>
        <p className="text-[11px] text-slate-500">{testimonial.role}</p>
      </div>
    </div>
  );
}

/* ========================= FAQ ========================= */

function FAQSection() {
  return (
    <section className="mt-20">
      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
        أسئلة شائعة حول المنصة وطريقة العمل
      </h3>
      <p className="text-sm text-slate-600 max-w-2xl mb-6">
        لا تتردد في طرح أسئلتك على فريق الدعم في حال احتجت لتفاصيل أكثر. إليك بعض
        الأسئلة المتكررة وإجاباتها لتوضيح الصورة العامة.
      </p>

      <div className="space-y-3">
        {faqs.map((item) => (
          <FAQItem key={item.q} faq={item} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ faq }: { faq: FAQ }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 text-xs md:text-sm space-y-1">
      <p className="font-semibold text-slate-900">{faq.q}</p>
      <p className="text-slate-600 leading-relaxed">{faq.a}</p>
    </div>
  );
}

/* ========================= CONTACT ========================= */

function ContactSection() {
  return (
    <section className="mt-20 mb-10">
      <div className="rounded-3xl bg-white border border-slate-100 shadow-sm p-5 md:p-6 grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-lg md:text-xl font-bold text-slate-900">
            جاهز لتجربة Money AI أو لديك سؤال؟
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            فريق الدعم موجود لمساعدتك في فهم خصائص المنصة، طريقة الحساب، وسياسات الخطط.
            يمكنك التواصل معنا عبر القنوات التالية، وسنحاول الرد في أقرب وقت ممكن.
          </p>
          <ul className="text-xs md:text-sm text-slate-700 space-y-1">
            <li>• دعم فني عبر البريد الإلكتروني الرسمي للمنصة.</li>
            <li>• قناة تواصل فورية (مثل واتساب أو تيليغرام) حسب ما هو موضح داخل حسابك.</li>
            <li>• مواد تعليمية داخلية تشرح أساسيات الاستثمار وإدارة المخاطر.</li>
          </ul>
        </div>

        <div className="space-y-3 text-xs md:text-sm">
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 space-y-2">
            <p className="font-semibold text-slate-900">خطوات التواصل السريعة</p>
            <ol className="list-decimal pr-4 space-y-1 text-slate-700">
              <li>أنشئ حساباً جديداً أو سجّل الدخول إن كان لديك حساب مسبقاً.</li>
              <li>ادخل إلى صفحة “الدعم” أو “التواصل” من داخل لوحة التحكم.</li>
              <li>اختر طريقة التواصل الأنسب لك، واكتب سؤالك بشكل واضح.</li>
            </ol>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            حفاظاً على خصوصيتك وأمان حسابك، لا تشارك بيانات تسجيل الدخول أو رموز
            التحقق مع أي شخص، حتى لو ادّعى أنه من فريق الدعم. التواصل الرسمي يكون فقط
            من خلال القنوات الموضحة داخل المنصة.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ========================= FOOTER ========================= */

function Footer() {
  return (
    <footer className="border-t border-slate-200 pt-4 mt-4 text-[11px] md:text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
      <p>© {new Date().getFullYear()} منصة Money AI للاستثمار الذكي. جميع الحقوق محفوظة.</p>
      <p>
        هذه المنصة لأغراض استثمارية عامة وتعليمية؛ المعلومات المعروضة لا تُعد نصيحة مالية
        شخصية. يرجى استشارة مختص مالي مستقل قبل اتخاذ أي قرار استثماري كبير.
      </p>
    </footer>
  );
}

/* ========================= INFO BOX (REUSED) ========================= */

type InfoProps = {
  label: string;
  value: string;
};

function InfoBox({ label, value }: InfoProps) {
  return (
    <div className="rounded-2xl border border-slate-100 p-3 bg-slate-50/70">
      <p className="text-slate-500 mb-1 text-xs">{label}</p>
      <p className="font-semibold text-slate-900 text-sm">{value}</p>
    </div>
  );
}
