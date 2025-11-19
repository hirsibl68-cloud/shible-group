export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#050509] to-black">
      <div className="mx-auto flex max-w-4xl flex-col gap-5 px-4 py-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-500/80">
            BİPCOIN
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            ألعاب BİPCOIN اليومية
          </h1>
          <p className="text-sm text-gray-300">
            هذه صفحة الألعاب التجريبية. تم تبسيطها الآن لتعمل بدون أي مشاكل في
            النشر، ويمكن لاحقًا إضافة ألعاب تفاعلية وربطها بالمحفظة ونظام
            المهام.
          </p>
        </header>

        <section className="rounded-3xl border border-yellow-500/30 bg-black/70 p-5 shadow-[0_0_40px_rgba(0,0,0,0.7)]">
          <h2 className="text-lg font-semibold text-yellow-100">
            قيد التطوير (VIP)
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            سيتم قريبًا إضافة ألعاب تفاعلية مثل لعبة رد الفعل، لعبة النقر
            السريع، وضربة حظ للمستثمرين، مع تصميم كامل بالأسود والذهبي يليق
            بعلامة BİPCOIN.
          </p>
        </section>

        <p className="mt-4 text-[11px] text-gray-500">
          * هذه نسخة ثابتة فقط للتأكد من عمل النشر على Vercel بدون مشاكل. بعد
          نجاح النشر، يمكننا إضافة منطق الألعاب وربطها مع API المحفظة والمهام.
        </p>
      </div>
    </div>
  );
}
