// صفحة الإحصائيات – BIPCOIN
// لا تحتاج إلى "use client" لأن الصفحة ثابتة

import React from "react";

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-black text-yellow-100 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* HEADER */}
        <header className="space-y-2">
          <p className="text-[10px] tracking-[0.3em] text-yellow-500/80 uppercase">
            BİPCOIN • Global Investment Stats
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-300">
            لوحة الإحصائيات العالمية – BİPCOIN
          </h1>
          <p className="max-w-3xl text-sm text-gray-300">
            هذه الصفحة تعرض نظرة احترافية كاملة حول أداء منصة{" "}
            <span className="text-yellow-300 font-semibold">BİPCOIN</span> على
            المستوى العالمي. جميع الأرقام مبنية على نموذج شركة استثمارية
            عالمية متوسطة لكن قوية، بأرباح ضخمة ونمو مستمر، مع حفاظ واضح على
            توازن بين أرباح المستثمرين وأرباح الشركة.
          </p>
        </header>

        {/* MAIN KPIs */}
        <section className="grid gap-4 md:grid-cols-4">
          <KPI
            label="عدد المستثمرين النشطين"
            value="640,000"
            note="مستثمر من أكثر من 30 دولة"
          />
          <KPI
            label="إجمالي الإيداعات"
            value="35,000,000$"
            note="رأس مال مستثمر داخل المنصة"
          />
          <KPI
            label="الأرباح الموزعة للمستثمرين"
            value="11,200,000$"
            note="مدفوعة خلال آخر 12 شهر"
          />
          <KPI
            label="عوائد الذكاء الاصطناعي السنوية"
            value="4,000,000$"
            note="من أنظمة تداول وتحليل متقدمة"
          />
        </section>

        {/* AI & MINING ROW */}
        <section className="grid gap-4 md:grid-cols-3">
          <KPI
            label="عوائد التعدين السنوية"
            value="2,000,000$"
            note="من 6 مزارع تعدين في عدة دول"
          />
          <KPI
            label="أرباح المستثمرين اليومية"
            value="38,500$"
            note="متوسط عائد موزع يومياً"
          />
          <KPI
            label="أرباح الشركة اليومية"
            value="5,200$"
            note="قبل خصم المصاريف التشغيلية"
          />
        </section>

        {/* MONTHLY & YEARLY + COSTS */}
        <section className="grid gap-4 md:grid-cols-2">
          <Panel title="الأرباح الشهرية والسنوية">
            <LargeRow label="أرباح المستثمرين شهرياً" value="1,155,000$" />
            <LargeRow label="أرباح المستثمرين سنوياً" value="13,860,000$" />
            <LargeRow label="أرباح الشركة شهرياً" value="156,000$" />
            <LargeRow label="أرباح الشركة سنوياً" value="1,872,000$" />
          </Panel>

          <Panel title="مصاريف وتشغيل الشركة (سنوي)">
            <Row label="رواتب الموظفين" value="600,000$" />
            <Row label="السيرفرات والأمن السيبراني" value="260,000$" />
            <Row label="التطوير والصيانة" value="140,000$" />
            <Row label="التسويق العالمي" value="420,000$" />
            <LargeRow label="إجمالي المصاريف" value="1,420,000$" />
            <LargeRow
              label="صافي الربح السنوي للشركة"
              value="452,000$"
              highlight
            />
          </Panel>
        </section>

        {/* CAPITAL DISTRIBUTION */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-yellow-300">
            توزيع رؤوس الأموال بين خطط الاستثمار
          </h2>
          <p className="text-sm text-gray-300 max-w-3xl">
            يتم توزيع رؤوس الأموال بين عدة خطط استثمارية مختلفة، تبدأ من
            الخطط الصغيرة للمبتدئين وحتى خطط النخبة Elite للمستثمرين الكبار، مع
            نظام إدارة مخاطر ذكي يوازن بين العائد والاستقرار.
          </p>
          <div className="space-y-4 max-w-3xl">
            <Bar
              label="خطة بداية (100$ – 500$)"
              percent="38%"
              widthClass="w-[38%]"
            />
            <Bar
              label="خطة مستثمر (500$ – 3000$)"
              percent="44%"
              widthClass="w-[44%]"
            />
            <Bar
              label="خطة VIP (3000$ – 15000$)"
              percent="15%"
              widthClass="w-[15%]"
            />
            <Bar
              label="خطة Elite (15000$+)"
              percent="3%"
              widthClass="w-[3%]"
            />
          </div>
        </section>

        {/* TOP COUNTRIES */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-yellow-300">
            أعلى الدول استثماراً في BİPCOIN
          </h2>
          <p className="text-sm text-gray-300 max-w-3xl">
            توسّع المنصة عالميًا سمح بدخول مستثمرين من عدة دول، مع تركّز واضح في
            منطقة الشرق الأوسط وشمال أفريقيا، بالإضافة إلى حضور أقل ولكن ثابت
            من مستثمرين من{" "}
            <span className="text-yellow-300 font-semibold">سوريا</span> ضمن
            الخطط المتوسطة والصغيرة.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <Country name="تركيا" value="95,000 مستثمر" />
            <Country name="السعودية" value="82,000 مستثمر" />
            <Country name="العراق" value="51,000 مستثمر" />
            <Country name="الجزائر" value="47,000 مستثمر" />
            <Country name="المغرب" value="44,000 مستثمر" />
            <Country name="الإمارات" value="39,000 مستثمر" />
            {/* سوريا بحصة أقل كما طلبت */}
            <Country name="سوريا" value="11,000 مستثمر" />
          </div>
        </section>

        {/* AI PROJECTS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-yellow-300">
            مشاريع الذكاء الاصطناعي الفعّالة
          </h2>
          <p className="text-sm text-gray-300 max-w-3xl">
            تعتمد BİPCOIN على عدة محركات ذكاء اصطناعي تساعد في تحقيق عوائد
            مستقرة وتوزيع الأرباح بشكل عادل بين المستثمرين، مع نظام مراقبة
            مستمر للمخاطر وإعادة موازنة تلقائية للمحافظ.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Project
              title="روبوتات التداول الذكية"
              desc="محركات تداول تراقب أكثر من 120 زوج عملات رقمية وتنفذ آلاف العمليات يومياً وفق استراتيجيات مبرمجة."
              revenue="1,450,000$"
            />
            <Project
              title="نظام تحليل المخاطر"
              desc="ذكاء اصطناعي يقيس مستوى المخاطرة لكل صفقة، ويعدل حجم الدخول بشكل تلقائي."
              revenue="980,000$"
            />
            <Project
              title="مدير المحافظ الذكي"
              desc="نظام يعيد توزيع رأس المال بين الخطط تلقائياً بناءً على أداء السوق واستراتيجية المستثمر."
              revenue="540,000$"
            />
          </div>
        </section>

        {/* MINING PROJECTS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-yellow-300">
            مزارع التعدين التابعة لـ BİPCOIN
          </h2>
          <p className="text-sm text-gray-300 max-w-3xl">
            تدير المنصة عدة مزارع تعدين موزعة جغرافياً للحصول على أقل تكلفة
            كهرباء وأعلى استقرار ممكن في الشبكة، مع اعتماد كبير على مصادر طاقة
            متجددة قدر الإمكان.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Project
              title="مزرعة كازاخستان"
              desc="أكثر من 500 جهاز تعدين تعمل بطاقة متجددة في بيئة باردة."
              revenue="740,000$"
            />
            <Project
              title="مزرعة جورجيا"
              desc="مركز تعدين بارد المناخ لتقليل تكاليف التبريد ورفع كفاءة الأجهزة."
              revenue="620,000$"
            />
            <Project
              title="مزرعة شمال أوروبا"
              desc="أجهزة متقدمة من الجيل الأخير مع مراقبة حرارية وتتبّع أداء لحظي."
              revenue="410,000$"
            />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-yellow-300">
            آراء وتجارب المستثمرين
          </h2>
          <p className="text-sm text-gray-300 max-w-3xl">
            أسماء المستثمرين معروضة بصيغة{" "}
            <span className="text-yellow-300 font-semibold">
              الاسم + أول حرفين من الكنية + تشفير
            </span>{" "}
            حفاظاً على الخصوصية، مع الحفاظ على مصداقية الآراء وتجاربهم
            الحقيقية.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Testimonial
              name="أحمد خ.** – مستثمر VIP"
              text="بدأت بمبلغ متوسط ثم رفعت رأس المال بعد ما شفت ثبات الأرباح وتقارير الإحصائيات الواضحة داخل لوحة BİPCOIN."
            />
            <Testimonial
              name="سارة م.** – مستثمرة"
              text="أهم شيء عندي الشفافية. أشوف تفاصيل الإيداعات والأرباح اليومية بسهولة، وهذا الشي اللي خلاني أدعو أصدقائي للتجربة."
            />
            <Testimonial
              name="محمد ع.** – Elite"
              text="أستخدم خطط الذكاء الاصطناعي مع خطة التعدين بنفس الوقت. العائد السنوي حقيقي وملموس مقارنة بمنصات ثانية جربتها."
            />
            <Testimonial
              name="ليلى س.** – خطط AI"
              text="لوحة الإحصاءات تعطيني راحة نفسية، أشوف فيها كل أرقام الشركة والمستثمرين بشكل منظم واحترافي."
            />
            <Testimonial
              name="أنس ح.** – مستثمر ألعاب"
              text="الألعاب اليومية فكرة ممتازة، أربح منها نقاط XP وأرباح إضافية مرتبطة برأس المال، وكل شيء موضح ضمن الإحصاءات."
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS WITH TYPES ---------- */

interface KPIProps {
  label: string;
  value: string;
  note: string;
}

function KPI({ label, value, note }: KPIProps) {
  return (
    <div className="rounded-3xl border border-yellow-500/30 bg-black/70 p-4 shadow-[0_0_25px_rgba(250,204,21,0.15)] space-y-1">
      <p className="text-[11px] text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-yellow-300">{value}</p>
      <p className="text-[10px] text-gray-500">{note}</p>
    </div>
  );
}

interface PanelProps {
  title: string;
  children: React.ReactNode;
}

function Panel({ title, children }: PanelProps) {
  return (
    <div className="rounded-3xl border border-yellow-500/30 bg-black/80 p-6 shadow-[0_0_35px_rgba(250,204,21,0.15)] space-y-4">
      <h3 className="text-yellow-200 font-bold">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

interface RowProps {
  label: string;
  value: string;
}

function Row({ label, value }: RowProps) {
  return (
    <div className="flex items-center justify-between text-sm text-gray-300">
      <span>{label}</span>
      <span className="text-yellow-300 font-semibold">{value}</span>
    </div>
  );
}

interface LargeRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function LargeRow({ label, value, highlight }: LargeRowProps) {
  return (
    <div
      className={`flex items-center justify-between text-sm ${
        highlight ? "text-yellow-300 font-bold" : "text-yellow-200"
      }`}
    >
      <span>{label}</span>
      <span className="text-yellow-300">{value}</span>
    </div>
  );
}

interface BarProps {
  label: string;
  percent: string;
  widthClass: string;
}

function Bar({ label, percent, widthClass }: BarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{label}</span>
        <span className="text-yellow-300">{percent}</span>
      </div>
      <div className="h-2 bg-yellow-500/10 rounded-full overflow-hidden">
        <div className={`h-full ${widthClass} bg-yellow-500 rounded-full`} />
      </div>
    </div>
  );
}

interface CountryProps {
  name: string;
  value: string;
}

function Country({ name, value }: CountryProps) {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-black/70 p-4 text-sm text-gray-300 space-y-1">
      <p className="font-semibold text-yellow-300">{name}</p>
      <p>{value}</p>
    </div>
  );
}

interface ProjectProps {
  title: string;
  desc: string;
  revenue: string;
}

function Project({ title, desc, revenue }: ProjectProps) {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-black/70 p-5 space-y-2 shadow-[0_0_20px_rgba(250,204,21,0.15)]">
      <h4 className="text-yellow-300 font-bold">{title}</h4>
      <p className="text-gray-300 text-sm">{desc}</p>
      <p className="text-yellow-400 font-semibold text-sm">
        عوائد تقديرية: {revenue}
      </p>
    </div>
  );
}

interface TestimonialProps {
  name: string;
  text: string;
}

function Testimonial({ name, text }: TestimonialProps) {
  return (
    <div className="rounded-3xl border border-yellow-500/25 bg-black/85 p-4 space-y-2 shadow-[0_0_20px_rgba(250,204,21,0.12)] text-sm">
      <p className="text-yellow-300 font-semibold">{name}</p>
      <p className="text-gray-300">{text}</p>
    </div>
  );
}
