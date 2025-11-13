"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/ai-tools",   label: "AI Tools", icon: "🧊" },
  { href: "/ai-chat",    label: "AI Chat",  icon: "🤖" },
  { href: "/mining",     label: "التجزئة",  icon: "🪙" },
  { href: "/ai-drawing", label: "الرسم",    icon: "🎨" },
  { href: "/me",         label: "ملفي",     icon: "👤" },
];

export default function BottomTabs() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur border-t border-[#dce9ff]">
      <ul className="grid grid-cols-5 text-xs">
        {TABS.map((t) => {
          const active = path?.startsWith(t.href);
          return (
            <li key={t.href} className="text-center">
              <Link
                href={t.href}
                className={`flex flex-col items-center gap-0.5 py-2 ${
                  active ? "text-[#0b1a2e] font-semibold" : "text-[#0b1a2e]/70"
                }`}
              >
                <span aria-hidden>{t.icon}</span>
                <span>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
