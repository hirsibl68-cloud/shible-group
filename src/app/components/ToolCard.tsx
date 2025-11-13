import Link from "next/link";

export default function ToolCard({
  title, desc, href, emoji,
}: { title: string; desc: string; href: string; emoji: string; }) {
  return (
    <Link
      href={href}
      className="block p-4 rounded-2xl shadow-md border border-[#dce9ff] bg-white hover:shadow-lg hover:-translate-y-0.5 transition"
    >
      <div className="text-3xl mb-2">{emoji}</div>
      <h3 className="font-semibold text-[#0b1a2e]">{title}</h3>
      <p className="text-sm text-[#345067] leading-relaxed">{desc}</p>
    </Link>
  );
}
