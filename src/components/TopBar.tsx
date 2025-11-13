"use client";
import Link from "next/link";

export default function TopBar({ title = "Money AI" }: { title?: string }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur border-b border-white/5">
      <div className="h-14 px-4 flex items-center justify-between">
        <Link href="/ai-tools" className="font-bold text-lg">{title}</Link>
        <div className="flex items-center gap-3 text-xl">
          <Link href="/inbox" aria-label="inbox" className="opacity-80">✉️</Link>
          <Link href="/help" aria-label="help" className="opacity-80">🎧</Link>
        </div>
      </div>
    </header>
  );
}
