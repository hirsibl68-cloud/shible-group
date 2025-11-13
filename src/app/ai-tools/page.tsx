import ToolCard from "../components/ToolCard";
import ActionButton from "../components/ActionButton";

export default function AiToolsPage() {
  const tools = [
    { title: "مساعد الدردشة", desc: "تحدث مع Money AI حول مصاريفك.", href: "/ai-chat", emoji: "🤖" },
    { title: "تحليل المصاريف", desc: "تصنيف ذكي وتقارير شهرية.", href: "/ai-tools/expenses", emoji: "📊" },
    { title: "تنبيهات الاستثمار", desc: "إشارات مبنية على البيانات.", href: "/ai-tools/alerts", emoji: "📈" },
    { title: "الرسم بالذكاء", desc: "مولد صور وواجهات.", href: "/ai-drawing", emoji: "🎨" },
    { title: "مُعدّل التجزئة", desc: "حساب الربحية بسرعة.", href: "/mining", emoji: "🪙" },
    { title: "ملفي", desc: "إعدادات الحساب والمحفظة.", href: "/me", emoji: "👤" },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* هيدر بسيط */}
      <div className="rounded-2xl border border-[#dce9ff] bg-gradient-to-br from-[#dff0ff] to-white p-5 text-center">
        <div className="text-sm text-[#345067]">مرحبًا بك في</div>
        <h1 className="text-2xl font-bold text-[#0b1a2e]">Money AI</h1>
        <p className="text-[#517694] mt-1">اختر أداة أو إجراء سريع 👇</p>
      </div>

      {/* إجراءات سريعة */}
      <div className="grid gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ActionButton href="/login" label="تسجيل الدخول" sub="ادخل إلى حسابك" emoji="🔐" />
          <ActionButton href="/signup" label="إنشاء حساب" sub="ابدأ مجانًا خلال دقيقة" emoji="🆕" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <ActionButton href="/wallet" label="المحفظة" sub="رصيدك وحركاتك" emoji="👛" />
          <ActionButton href="/deposit" label="إيداع" sub="أودِع واختر خطة ثابتة" emoji="💳" />
          <ActionButton href="/withdraw" label="سحب" sub="اسحب إلى محفظتك" emoji="🏧" />
        </div>
      </div>

      {/* أدوات الذكاء */}
      <div className="grid grid-cols-2 gap-3">
        {tools.map((t) => <ToolCard key={t.href} {...t} />)}
      </div>
    </div>
  );
}
<ActionButton href="/leaderboard" label="لوحة الإحالات" sub="المراكز الأعلى" emoji="🏆" />
