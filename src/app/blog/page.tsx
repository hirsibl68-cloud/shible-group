// src/app/blog/page.tsx
import Link from "next/link";

const posts = [
  { slug: "budget-ai", title: "كيف يساعدك الذكاء الاصطناعي على ضبط ميزانيتك", excerpt: "خطوات عملية لتتبع الإنفاق…" },
  { slug: "stable-returns", title: "كل ما يجب معرفته عن الربح الثابت", excerpt: "مخاطر، مزايا، وكيف تختار الخطة…" },
  { slug: "referral-growth", title: "ابنِ دخلك عبر الإحالات بذكاء", excerpt: "أفضل ممارسات مشاركة الرابط…" },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-[#eef6ff] via-white to-[#f7fbff]">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="rounded-2xl border border-[#dce9ff] bg-white px-5 py-4 shadow-sm">
          <h1 className="text-xl font-bold text-[#0b1a2e]">المدوّنة</h1>
          <p className="text-sm text-[#517694]">محتوى خفيف يرفع الـ SEO</p>
        </div>

        <div className="grid gap-3">
          {posts.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-2xl border border-[#dce9ff] bg-white p-4 hover:bg-[#f6fbff]">
              <div className="font-semibold text-[#0b1a2e]">{p.title}</div>
              <div className="text-sm text-[#345067]">{p.excerpt}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
