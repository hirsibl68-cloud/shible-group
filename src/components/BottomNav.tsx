"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "الرئيسية",
      icon: (active: boolean) => (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill={active ? "#111827" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 9.5L12 3l9 6.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-10z" />
        </svg>
      ),
    },
    {
      href: "/plans",
      label: "المشاريع",
      icon: (active: boolean) => (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill={active ? "#111827" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="4" width="7" height="7" rx="2" />
          <rect x="14" y="4" width="7" height="7" rx="2" />
          <rect x="3" y="13" width="7" height="7" rx="2" />
          <rect x="14" y="13" width="7" height="7" rx="2" />
        </svg>
      ),
    },
    {
      href: "/wallet",
      label: "المحفظة",
      icon: (active: boolean) => (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill={active ? "#111827" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="16" cy="12" r="2" />
        </svg>
      ),
    },
    {
      href: "/profile",
      label: "الملف",
      icon: (active: boolean) => (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill={active ? "#111827" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around items-center z-50"
      style={{ direction: "rtl" }}
    >
      {navItems.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center text-xs"
          >
            {item.icon(active)}
            <span className={active ? "text-black" : "text-gray-500"}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
