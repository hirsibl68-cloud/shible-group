"use client";

import { useEffect, useState } from "react";

const USER_ID = "nu1"; // نفس المستخدم اللي عم نستخدمه بالتجارب

type WithdrawItem = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
};

export default function WithdrawHistoryPage() {
  const [items, setItems] = useState<WithdrawItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setErr(null);

      const res = await fetch(`/api/withdraw?userId=${USER_ID}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "error");
      }

      setItems(data.list || []);
    } catch (e: any) {
      setErr("تعذّر تحميل سجل السحوبات، حاول لاحقًا.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const total = items.reduce((sum, it) => sum + (it.amount || 0), 0);

  return (
    <div className="min-h-screen bg-[#f5f8ff] py-6 px-4">
      <div className="max-w-xl mx-auto space-y-4">
        {/* العنوان + ملخص */}
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-[#0b1a2e] text-center">
            سجل طلبات السحب
          </h1>
          <p className="text-sm text-[#5b708d] text-center">
            تابع كل طلبات السحب التي قمت بها من محفظة Money AI.
          </p>
        </header>

        {/* صندوق ملخص سريع */}
        <section className="rounded-2xl border border-[#dce9ff] bg-white/80 p-4 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs text-[#7a8fad]">إجمالي المبالغ المطلوبة</div>
            <div className="text-2xl font-extrabold text-[#0b1a2e] mt-1">
              {total.toFixed(2)}$
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-[#7a8fad]">عدد الطلبات</div>
            <div className="text-lg font-semibold text-[#0b1a2e]">
              {items.length}
            </div>
          </div>
        </section>

        {/* حالات التحميل / الخطأ / لا يوجد بيانات */}
        {loading && (
          <div className="rounded-2xl border border-[#dce9ff] bg-white p-4 text-center text-[#5b708d] text-sm">
            جارٍ تحميل السجل...
          </div>
        )}

        {err && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-red-600 text-sm">
            {err}
          </div>
        )}

        {!loading && !err && items.length === 0 && (
          <div className="rounded-2xl border border-[#dce9ff] bg-white p-6 text-center text-[#5b708d] text-sm">
            لا يوجد أي طلبات سحب حتى الآن.
            <div className="mt-2 text-xs text-[#7a8fad]">
              جرّب إنشاء أول طلب سحب من صفحة المحفظة أو صفحة السحب.
            </div>
          </div>
        )}

        {/* قائمة الطلبات */}
        {!loading && !err && items.length > 0 && (
          <section className="space-y-3">
            {items.map((it) => (
              <WithdrawCard key={it.id} item={it} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

function WithdrawCard({ item }: { item: WithdrawItem }) {
  const date = new Date(item.createdAt);
  const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  const timeStr = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;

  const { label, color, bg } = statusStyle(item.status);

  return (
    <div className="rounded-2xl border border-[#dde7ff] bg-white p-4 shadow-[0_4px_12px_rgba(15,35,95,0.05)] flex justify-between gap-3">
      <div>
        <div className="text-sm text-[#7a8fad]">المبلغ</div>
        <div className="text-xl font-bold text-[#0b1a2e]">
          {item.amount.toFixed(2)}$
        </div>
        <div className="text-xs text-[#7a8fad] mt-1">
          {dateStr} • {timeStr}
        </div>
      </div>
      <div className="text-right flex flex-col items-end justify-between">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ color, backgroundColor: bg }}
        >
          {label}
        </span>
        <span className="text-[11px] text-[#9aa7c0] mt-2">
          رقم العملية: {shortId(item.id)}
        </span>
      </div>
    </div>
  );
}

function statusStyle(status: string) {
  const s = status.toLowerCase();
  if (s === "pending") {
    return {
      label: "قيد المراجعة",
      color: "#b58100",
      bg: "#fff4d6",
    };
  }
  if (s === "approved" || s === "success") {
    return {
      label: "تم التحويل",
      color: "#047857",
      bg: "#d1fae5",
    };
  }
  if (s === "rejected" || s === "failed") {
    return {
      label: "مرفوض",
      color: "#b91c1c",
      bg: "#fee2e2",
    };
  }
  return {
    label: "حالة غير معروفة",
    color: "#4b5563",
    bg: "#e5e7eb",
  };
}

function shortId(id: string) {
  if (!id) return "";
  if (id.length <= 8) return id;
  return `${id.slice(0, 4)}...${id.slice(-4)}`;
}
