"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "الرئيسية", icon: (active:boolean)=>(
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active?"#111827":"none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z"/>
    </svg>
  )},
  { href: "/plans", label: "المشاريع", icon:(a)=>(
    <svg width="20" height="20" viewBox="0 0 24 24" fill={a?"#111827":"none"} stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="7" height="7" rx="2"/><rect x="14" y="4" width="7" height="7" rx="2"/>
      <rect x="3" y="13" width="7" height="7" rx="2"/><rect x="14" y="13" width="7" height="7" rx="2"/>
    </svg>
  )},
  { href: "/team", label: "الفريق", icon:(a)=>(
    <svg width="20" height="20" viewBox="0 0 24 24" fill={a?"#111827":"none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M16 11a4 4 0 1 0-8 0"/><path d="M3 21a7 7 0 0 1 18 0"/>
    </svg>
  )},
  { href: "/profile", label: "حسابي", icon:(a)=>(
    <svg width="20" height="20" viewBox="0 0 24 24" fill={a?"#111827":"none"} stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>
    </svg>
  )},
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-4 bottom-4 z-50 border border-[var(--muted)]/60 rounded-2xl backdrop-blur"
         style={{background:"linear-gradient(180deg, rgba(18,24,33,0.85), rgba(18,24,33,0.75))"}}>
      <div className="grid grid-cols-4 h-14">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link key={it.href} href={it.href}
              className={`flex flex-col items-center justify-center gap-1 text-[12px] font-medium
                ${active ? "text-[#111827]" : "text-[var(--text-dim)]"}`}
              style={active?{background:"linear-gradient(90deg, var(--brand), var(--brand-2))", borderRadius: "16px"}:{}}
            >
              {it.icon(active)}
              <span>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
