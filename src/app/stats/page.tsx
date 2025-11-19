export default function StatsPage() {
  return (
    <div className="min-h-screen bg-black text-yellow-100 px-4 py-6 md:py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* الهيدر */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-yellow-500/80">
              BİPCOIN • Investor Dashboard
            </p>
            <h1 className="mt-1 text-2xl md:text-3xl font-bold">
              لوحة الإحصائيات الذهبية
            </h1>
            <p className="mt-2 text-xs md:text-sm text-gray-300 max-w-xl">
              جميع الأرقام في هذه الصفحة افتراضية (وهمية) لعرض الشكل النهائي 
              للوحة تحكم المستثمرين. يمكن لاحقاً ربط كل خانة هنا ببيانات حقيقية 
              من قاعدة البيانات دون تغيير التصميم.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <a
              href="/"
              className="rounded-full border border-yellow-500/40 px-3 py-1 hover:bg-yellow-500/10 transition"
            >
              ← العودة للرئيسية
            </a>
            <a
              href="/tasks"
              className="rounded-full border border-yellow-500/40 px-3 py-1 hover:bg-yellow-500/10 transition"
            >
              الذهاب لمهام اليوم
            </a>
          </div>
        </header>

        {/* أرقام أساسية */}
        <section className="grid gap-4 md:grid-cols-4 text-xs md:text-sm">
          <StatCard
            label="إجمالي عدد المستثمرين"
            value="1,284"
            note="حسابات مفعّلة شاركت في مهام أو ألعاب خلال آخر 30 يوم."
          />
          <StatCard
            label="إجمالي المبالغ المودعة"
            value="382,450$"
            note="إجمالي رؤوس الأموال المسجّلة في المنصّة (رقم افتراضي)."
          />
          <StatCard
            label="عوائد المشاريع التراكمية"
            value="97,320$"
            note="أرباح المشاريع الاستثمارية المسجّلة داخل BİPCOIN."
          />
          <StatCard
            label="الأرباح الموزعة للمستثمرين"
            value="71,890$"
            note="مجموع الأرباح التي صرفت للمستثمرين حتى الآن."
          />
        </section>

        {/* مخطط نصي مبسّط */}
        <section className="grid gap-4 md:grid-cols-[2fr_3fr]">
          <div className="rounded-3xl border border-yellow-500/30 bg-black/80 p-5 space-y-3 text-xs md:text-sm">
            <h2 className="text-sm md:text-base font-semibold text-yellow-200">
              توزيع رؤوس الأموال حسب الخطة
            </h2>
            <p className="text-gray-300">
              يوضّح الجدول التالي كيف يتم توزيع رؤوس أموال المستثمرين بين 
              الخطط المختلفة داخل نظام BİPCOIN. جميع القيم تقريبية لأغراض العرض فقط.
            </p>
            <div className="space-y-2">
              <DistributionRow
                label="خطة بداية (50$ – 300$)"
                percent="35%"
                barWidth="w-[35%]"
              />
              <DistributionRow
                label="خطة VIP مستثمر (300$ – 2000$)"
                percent="48%"
                barWidth="w-[48%]"
              />
              <DistributionRow
                label="خطة خاصة (+2000$)"
                percent="17%"
                barWidth="w-[17%]"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-yellow-500/30 bg-black/80 p-5 space-y-3 text-xs md:text-sm">
            <h2 className="text-sm md:text-base font-semibold text-yellow-200">
              متوسط الأرباح اليومية حسب المستوى
            </h2>
            <p className="text-gray-300">
              الأرقام التالية تمثّل متوسطات تقريبية يمكن تعديلها وربطها 
              مباشرةً بنظام المستويات الحقيقي الذي قمت ببنائه في المنصة.
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              <MiniStat
                label="مستوى 1 – مبتدئ"
                value="2.5$"
                note="مهمات أساسية فقط."
              />
              <MiniStat
                label="مستوى 2 – مستثمر نشط"
                value="6.8$"
                note="مهام + لعبة يومية."
              />
              <MiniStat
                label="مستوى 3 – VIP"
                value="14.2$"
                note="مهام + ألعاب + إحالات."
              />
              <MiniStat
                label="مستوى 4 – Elite"
                value="27.9$"
                note="رأس مال كبير + ألعاب خاصة."
              />
            </div>
          </div>
        </section>

        {/* آراء المستثمرين (Testimonials) */}
        <section className="space-y-4">
          <h2 className="text-sm md:text-base font-semibold text-yellow-200">
            آراء المستثمرين (نصوص تجريبية)
          </h2>
          <p className="text-xs md:text-sm text-gray-300">
            هذه العبارات قابلة للاستبدال بآراء حقيقية لاحقاً. الهدف هنا هو عرض 
            شكل الكروت وتوزيعها داخل الصفحة.
          </p>
          <div className="grid gap-4 md:grid-cols-3 text-xs md:text-sm">
            <TestimonialCard
              name="م. خالد – مستثمر VIP"
              text="منصة BİPCOIN رتّبت لي موضوع الاستثمار اليومي بشكل واضح. كل شيء مكتوب ومقسّم لمهام وألعاب، وهذا ساعدني ألتزم بخطّة ثابتة بدون توتر."
              tag="ركّز على المهام اليومية"
            />
            <TestimonialCard
              name="سارة – خطة بداية"
              text="بدأت بمبلغ بسيط جداً فقط لأفهم النظام، وفوجئت إن التصميم يساعدني أفهم أين أربح وكيف تتحرك المحفظة خطوة بخطوة."
              tag="مبتدئة في الاستثمار"
            />
            <TestimonialCard
              name="أبو يزن – مستثمر خاص"
              text="أكثر شيء أعجبني هو لوحة الإحصائيات، حتى لو الأرقام تجريبية الآن لكنها تعطيني تصور واضح كيف سيكون شكل التقارير عندما تتحول المنصة للبيانات الحقيقية."
              tag="يحب الأرقام"
            />
          </div>
        </section>

        {/* قسم أخير: ملخّص سريع للنظام */}
        <section className="rounded-3xl border border-yellow-500/20 bg-black/80 p-5 text-[11px] md:text-xs leading-relaxed text-gray-300 space-y-2">
          <p>
            • يمكن ربط كل خانة رقمية في هذه الصفحة بجداول مختلفة في قاعدة البيانات 
            (Users, Wallet, Deposits, Tasks, Games, Referrals).  
          </p>
          <p>
            • طريقة العرض مصممة لتناسب الشاشات الصغيرة والكبيرة، وتلائم الهوية 
            البصرية الذهبية السوداء للعلامة التجارية{" "}
            <span className="text-yellow-300 font-semibold">BİPCOIN</span>.
          </p>
          <p>
            • يمكن إضافة فلاتر زمنية (آخر 7 أيام، آخر 30 يوم، منذ البداية) وأزرار 
            تصدير التقارير بصيغة PDF أو Excel لاحقاً دون تغيير هيكل الواجهة.
          </p>
        </section>
      </div>
    </div>
  );
}

/* مكوّنات صغيرة مساعدة */

type StatCardProps = {
  label: string;
  value: string;
  note: string;
};

function StatCard({ label, value, note }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-yellow-500/30 bg-black/80 p-4 shadow-[0_0_25px_rgba(250,204,21,0.16)] space-y-2">
      <p className="text-[11px] md:text-xs text-gray-400">{label}</p>
      <p className="text-lg md:text-2xl font-bold text-yellow-300">{value}</p>
      <p className="text-[10px] md:text-[11px] text-gray-400">{note}</p>
    </div>
  );
}

type DistributionRowProps = {
  label: string;
  percent: string;
  barWidth: string;
};

function DistributionRow({ label, percent, barWidth }: DistributionRowProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px] text-gray-300">
        <span>{label}</span>
        <span className="text-yellow-300 font-semibold">{percent}</span>
      </div>
      <div className="h-2 rounded-full bg-yellow-500/10 overflow-hidden">
        <div className={`h-2 ${barWidth} bg-gradient-to-r from-yellow-400 to-yellow-600`} />
      </div>
    </div>
  );
}

type MiniStatProps = {
  label: string;
  value: string;
  note: string;
};

function MiniStat({ label, value, note }: MiniStatProps) {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-black/80 p-3 space-y-1">
      <p className="text-[11px] md:text-xs text-gray-300">{label}</p>
      <p className="text-lg font-bold text-yellow-300">{value}</p>
      <p className="text-[10px] md:text-[11px] text-gray-400">{note}</p>
    </div>
  );
}

type TestimonialProps = {
  name: string;
  text: string;
  tag: string;
};

function TestimonialCard({ name, text, tag }: TestimonialProps) {
  return (
    <div className="rounded-3xl border border-yellow-500/25 bg-black/85 p-4 flex flex-col gap-2 shadow-[0_0_20px_rgba(250,204,21,0.12)]">
      <p className="text-[11px] md:text-xs text-gray-400">{name}</p>
      <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
        “{text}”
      </p>
      <span className="mt-auto self-start rounded-full border border-yellow-500/40 px-3 py-1 text-[10px] text-yellow-300">
        {tag}
      </span>
    </div>
  );
}
