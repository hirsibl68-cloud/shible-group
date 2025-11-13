import Link from "next/link";

export default function ActionButton({
  href, label, sub, emoji,
}: { href: string; label: string; sub?: string; emoji?: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl border border-[#dce9ff] bg-white px-4 py-3 shadow-sm hover:bg-[#f6fbff] transition"
    >
      <div className="text-xl">{emoji ?? "➡️"}</div>
      <div>
        <div className="font-semibold text-[#0b1a2e]">{label}</div>
        {sub && <div className="text-xs text-[#517694]">{sub}</div>}
      </div>
    </Link>
  );
}
