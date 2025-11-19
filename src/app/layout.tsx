import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BİPCOIN | منصة استثمار VIP",
  description:
    "BİPCOIN منصة استثمار وألعاب يومية VIP بأسلوب أسود وذهبي، مع نظام مستويات ومكافآت ديناميكي.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-black text-white antialiased">
        {/* خلفية عامة */}
        <div className="min-h-screen bg-gradient-to-b from-black via-[#020617] to-black">
          {/* هيدر VIP */}
          <header className="sticky top-0 z-40 border-b border-yellow-500/20 bg-black/80 backdrop-blur">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
              {/* الشعار */}
              <a href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-600 grid place-items-center text-black text-xl font-extrabold shadow-lg shadow-yellow-500/40">
                  ₿
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-bold tracking-tight">
                    BİPCOIN
                  </div>
                  <div className="text-[11px] text-yellow-200/70">
                    نظام أرباح واستثمار VIP
                  </div>
                </div>
              </a>

              {/* الناف بار */}
              <nav className="hidden md:flex items-center gap-5 text-[13px] text-yellow-100/70">
                <a
                  href="/"
                  className="hover:text-yellow-300 transition-colors"
                >
                  الرئيسية
                </a>
                <a
                  href="/tasks"
                  className="hover:text-yellow-300 transition-colors"
                >
                  المهام اليومية
                </a>
                <a
                  href="/games"
                  className="hover:text-yellow-300 transition-colors"
                >
                  الألعاب
                </a>
                <a
                  href="/wallet"
                  className="hover:text-yellow-300 transition-colors"
                >
                  المحفظة
                </a>
              </nav>

              {/* بادج VIP */}
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[11px] rounded-full border border-yellow-500/60 bg-yellow-500/10 px-3 py-1 text-yellow-300 font-medium shadow-md shadow-yellow-500/20">
                  VIP Investor
                </span>
              </div>
            </div>
          </header>

          {/* محتوى الصفحات */}
          <main>{children}</main>

          {/* فوتر */}
          <footer className="mt-10 border-t border-yellow-500/10 bg-black/80">
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-yellow-100/60">
              <span>© {new Date().getFullYear()} BİPCOIN. جميع الحقوق محفوظة.</span>
              <span className="text-yellow-400/80">
                استثمر · العب · اربح مثل عملاء الـ VIP 🥇
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
