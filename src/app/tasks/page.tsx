"use client";

import Link from "next/link";

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-black text-yellow-100 px-4 py-6 md:py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* شريط علوي صغير */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-yellow-500/80">
              BİPCOIN • VIP Investor
            </p>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">
              مهام BİPCOIN اليومية
            </h1>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <Link
              href="/"
              className="rounded-full border border-yellow-500/40 px-3 py-1 hover:bg-yellow-500/10 transition"
            >
              ← العودة للرئيسية
            </Link>
            <Link
              href="/stats"
              className="rounded-full border border-yellow-500/40 px-3 py-1 hover:bg-yellow-500/10 transition"
            >
              عرض الإحصائيات الذهبية
            </Link>
          </div>
        </div>

        {/* وصف عام طويل */}
        <section className="space-y-3 text-sm leading-relaxed text-gray-200">
          <p>
            في نظام <span className="text-yellow-400 font-semibold">BİPCOIN</span>{" "}
            نعتمد على مبدأ بسيط:{" "}
            <span className="text-yellow-300">استثمار + التزام يومي = نمو متدرّج في رأس المال</span>. 
            تم تصميم المهام اليومية لتناسب المستثمر المشغول الذي يريد نظاماً واضحاً، 
            لا يعتمد على الحظ فقط بل على الاستمرارية والانضباط.
          </p>
          <p>
            يمكنك تنفيذ المهام التالية مرّة واحدة يومياً، وكل مهمة تضيف إلى{" "}
            <span className="text-yellow-300">رصيد المحفظة</span> وإلى{" "}
            <span className="text-yellow-300">نقاط الخبرة XP</span> التي ترفع مستوى حسابك 
            وتفتح لك مزايا إضافية مثل مضاعفات أرباح الألعاب، ضربة حظ أعلى، 
            وحد أكبر للسحب اليومي.
          </p>
          <p className="text-xs text-gray-500">
            * جميع الأرقام الظاهرة هنا تجريبية ويمكن ربطها لاحقاً بقاعدة البيانات الحقيقية 
            للمستثمرين والمحفظة، دون تغيير تصميم الصفحات.
          </p>
        </section>

        {/* مجموعة البطاقات الرئيسية (المهام الأساسية) */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-yellow-200">
            المهام اليومية الأساسية
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <TaskCard
              title="مراجعة المحفظة"
              subtitle="تحليل حركة الإيداع والسحب خلال آخر 24 ساعة."
              desc={[
                "افتح صفحة المحفظة واطّلع على كل العمليات التي تمت اليوم.",
                "تحقق من توافق الرصيد الحالي مع حركات الإيداع والسحب.",
                "دوّن ملاحظاتك إن وجدت خللاً أو مبلغاً غير مفهوم.",
              ]}
              reward="$1.50 + 15 XP"
              badge="استقرار مالي"
              suggestedTime="مدة التنفيذ: 1–2 دقيقة"
            />

            <TaskCard
              title="زيارة لوحة المستثمر BİPCOIN"
              subtitle="متابعة حالة الخطط الاستثمارية والمشاريع."
              desc={[
                "استعرض ملخص أرباحك اليومية والأسبوعية.",
                "شاهد أكثر لعبة أو مهمة حققت لك أرباحاً خلال الأسبوع.",
                "قرر إذا كنت تحتاج لزيادة رأس المال في خطة معينة.",
              ]}
              reward="$1.50 + 15 XP"
              badge="إدارة رأس المال"
              suggestedTime="مدة التنفيذ: 2–3 دقائق"
            />

            <TaskCard
              title="فتح صفحة المستويات VIP Levels"
              subtitle="فهم تأثير المستوى الحالي على أرباحك."
              desc={[
                "اعرف المستوى الحالي لحسابك ونقاط XP المتبقية للترقية.",
                "اقرأ المزايا المرتبطة بكل مستوى: نسبة أرباح أعلى، سقف سحوبات أكبر، ضربة حظ أكبر.",
                "ضع هدفاً بسيطاً لنفسك للوصول للمستوى التالي خلال أسبوع.",
              ]}
              reward="$1.50 + 15 XP"
              badge="ترقية حساب"
              suggestedTime="مدة التنفيذ: 3 دقائق"
            />

            <TaskCard
              title="تحصيل الهدية اليومية VIP"
              subtitle="Bonus يومي بسيط يثبت نشاط حسابك."
              desc={[
                "ادخل إلى صفحة البونص اليومي واضغط على زر التحصيل.",
                "تأكد من إضافة المبلغ إلى رصيد المحفظة بشكل صحيح.",
                "هذه المهمة مهمة للحفاظ على حالة الحساب نشطاً داخل النظام.",
              ]}
              reward="$1.50 + 15 XP"
              badge="نشاط يومي"
              suggestedTime="مدة التنفيذ: 30 ثانية"
            />
          </div>
        </section>

        {/* قسم الألعاب اليومية داخل صفحة المهام */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-yellow-200">
              الألعاب اليومية للمستثمرين
            </h2>
            <Link
              href="/games"
              className="text-xs text-yellow-300 hover:underline underline-offset-2"
            >
              الذهاب لصفحة الألعاب الكاملة →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <GameTaskCard
              title="لعبة رد الفعل VIP"
              desc="اضغط في اللحظة المناسبة لتحصل على أرباح حسب سرعة رد فعلك. يمكن ربط الربح بنسبة من رأس المال."
              details={[
                "كل محاولة مسموحة مرة واحدة في اليوم.",
                "يمكن ضبط الربح من 0.3% حتى 1% من رأس المال حسب نتيجتك.",
                "نتائج اللعبة يمكن جمعها في صفحة إحصائيات خاصة.",
              ]}
              reward="أرباح متغيرة حسب رأس المال + XP 20"
              difficulty="المستوى: متوسط"
            />

            <GameTaskCard
              title="لعبة ضربة حظ كل 3 أيام"
              desc="لعبة بسيطة تمنحك مبلغاً عشوائياً بين 2$ و 20$ للمستثمرين النشطين فقط."
              details={[
                "لا يمكن لعبها إلا إذا أنجزت على الأقل مهمتين خلال آخر 3 أيام.",
                "المكافأة تذهب مباشرة إلى المحفظة.",
                "يمكن عرض سجل ضربات الحظ في صفحة الإحصائيات.",
              ]}
              reward="2$ – 20$ كل 3 أيام"
              difficulty="المستوى: سهل"
            />
          </div>
        </section>

        {/* قسم الإحالات */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-yellow-200">
            مهمة الإحالات – أرباح من دعوة الأصدقاء
          </h2>

          <div className="rounded-3xl border border-yellow-500/40 bg-black/70 p-5 md:p-6 shadow-[0_0_35px_rgba(250,204,21,0.18)] space-y-4">
            <p className="text-sm text-gray-200 leading-relaxed">
              يعتبر نظام الإحالات في{" "}
              <span className="text-yellow-300 font-semibold">BİPCOIN</span>{" "}
              واحداً من أهم عناصر النمو التراكمي. كل مستثمر يمكنه دعوة أصدقائه 
              أو متابعيه للانضمام إلى المنصة والاستفادة من نفس نظام المهام والألعاب اليومية، 
              وفي المقابل يحصل الداعي على مكافأة ثابتة لكل حساب يتم تفعيله واستثماره.
            </p>

            <div className="grid gap-4 md:grid-cols-3 text-xs md:text-sm">
              <div className="space-y-2">
                <p className="font-semibold text-yellow-200">مكافأة الإحالة</p>
                <p className="text-gray-300">
                  5$ عن كل صديق يقوم بإيداع أولي وتفعيل حسابه الاستثماري. يمكن 
                  تغيير القيمة لاحقاً من لوحة التحكم الخاصة بالإدارة.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-yellow-200">حدود يومية</p>
                <p className="text-gray-300">
                  يمكن وضع حد أقصى لعدد الإحالات المحتسبة يومياً أو شهرياً، 
                  لضبط النمو ومنع إساءة الاستخدام.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-yellow-200">دمج مع الإحصائيات</p>
                <p className="text-gray-300">
                  تظهر عدد الإحالات النشطة، إجمالي المكافآت المدفوعة من الإحالات، 
                  ونسبة النمو الناتجة عنها في صفحة{" "}
                  <span className="text-yellow-300">/stats</span>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <button
                className="
                  bg-transparent
                  border border-yellow-500
                  text-yellow-500
                  font-semibold
                  rounded-xl
                  px-4 py-2
                  hover:bg-yellow-500
                  hover:text-black
                  transition-all
                  duration-200
                "
              >
                نسخ رابط الدعوة
              </button>
              <span className="text-gray-400">
                مثال لرابط إحالة: bipcoin.vip/invite/USERID
              </span>
            </div>
          </div>
        </section>

        {/* ملاحظة ختامية */}
        <section className="rounded-3xl border border-yellow-500/20 bg-black/80 p-4 text-[11px] leading-relaxed text-gray-400">
          <p>
            * كل مهمة من المهام أعلاه يمكن ربطها مباشرة بنظام لوق في قاعدة البيانات 
            لاحتساب عدد مرات التنفيذ اليومي، قيمة الأرباح المضافة، وتاريخ آخر تنفيذ. 
            تم تصميم هذه الصفحة لتكون جاهزة تقنياً لتوصيلها بـ APIs 
            دون الحاجة لإعادة تصميم الواجهة.
          </p>
        </section>
      </div>
    </div>
  );
}

/* مكوّن بطاقة مهمة أساسية */
type TaskCardProps = {
  title: string;
  subtitle: string;
  desc: string[];
  reward: string;
  badge: string;
  suggestedTime: string;
};

function TaskCard({
  title,
  subtitle,
  desc,
  reward,
  badge,
  suggestedTime,
}: TaskCardProps) {
  return (
    <div className="rounded-3xl border border-yellow-500/35 bg-black/70 p-5 md:p-6 shadow-[0_0_25px_rgba(250,204,21,0.14)] space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-yellow-100">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-gray-300 mt-1">{subtitle}</p>
        </div>
        <span className="rounded-full border border-yellow-500/60 px-3 py-1 text-[10px] text-yellow-300">
          {badge}
        </span>
      </div>

      <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-200">
        {desc.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
        <button
          className="
            bg-transparent
            border border-yellow-500
            text-yellow-500
            font-semibold
            rounded-xl
            px-4 py-2
            hover:bg-yellow-500
            hover:text-black
            transition-all
            duration-200
          "
        >
          تنفيذ المهمة الآن
        </button>
        <div className="text-right">
          <p className="text-yellow-300 font-semibold">{reward}</p>
          <p className="text-[10px] text-gray-400 mt-1">{suggestedTime}</p>
        </div>
      </div>
    </div>
  );
}

/* بطاقة خاصة للألعاب */
type GameTaskCardProps = {
  title: string;
  desc: string;
  details: string[];
  reward: string;
  difficulty: string;
};

function GameTaskCard({
  title,
  desc,
  details,
  reward,
  difficulty,
}: GameTaskCardProps) {
  return (
    <div className="rounded-3xl border border-yellow-500/35 bg-gradient-to-br from-yellow-500/5 via-black to-black p-5 md:p-6 shadow-[0_0_30px_rgba(250,204,21,0.16)] space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base md:text-lg font-semibold text-yellow-100">
          {title}
        </h3>
        <span className="rounded-full border border-yellow-500/60 px-3 py-1 text-[10px] text-yellow-300">
          {difficulty}
        </span>
      </div>
      <p className="text-xs md:text-sm text-gray-200">{desc}</p>
      <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-200">
        {details.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
        <button
          className="
            bg-transparent
            border border-yellow-500
            text-yellow-500
            font-semibold
            rounded-xl
            px-4 py-2
            hover:bg-yellow-500
            hover:text-black
            transition-all
            duration-200
          "
        >
          ابدأ اللعب الآن
        </button>
        <p className="text-yellow-300 font-semibold">{reward}</p>
      </div>
    </div>
  );
}
