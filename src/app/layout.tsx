import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Money AI",
  description: "منصة إدارة الأموال والمهام اليومية بالذكاء الاصطناعي",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-[#f3f6ff] text-[#0b1a2e]">
        <div className="mx-auto max-w-md min-h-screen flex flex-col bg-[#f3f6ff]">
          {/* المحتوى الرئيسي */}
          <main className="flex-1 pb-16">
            {children}
          </main>

          {/* شريط التنقل السفلي */}
          <nav className="h-16 border-t border-[#dde5ff] bg-white/95 backdrop-blur-sm">
            <div className="max-w-md mx-auto h-full grid grid-cols-5">
              <NavItem href="/" label="الرئيسية" icon="🏠" />
              <NavItem href="/tasks" label="المهام" icon="✅" />
              <NavItem href="/wallet" label="المحفظة" icon="💼" />
              <NavItem href="/daily" label="الهدايا" icon="🎁" />
              <NavItem href="/me" label="حسابي" icon="👤" />
            </div>
          </nav>
        </div>
      </body>
    </html>
  );
}

function NavItem({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  // ما عملنا active state حقيقي عالسريع، لكن شكلياً حلو حالياً
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center text-[11px] text-[#7b8ba5] hover:bg-[#f5f7ff]"
    >
      <span className="text-lg leading-none mb-0.5">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
