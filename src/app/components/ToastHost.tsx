"use client";
import { useEffect, useState } from "react";
import { onToast, ToastItem } from "@/lib/toast";

export default function ToastHost() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    return onToast((t) => {
      setItems((prev) => [...prev, t]);
      if (t.duration !== 0) {
        setTimeout(() => setItems((p) => p.filter(i => i.id !== t.id)), t.duration ?? 3000);
      }
    });
  }, []);

  const color = (t: ToastItem["type"]) =>
    t === "success" ? "bg-green-500" : t === "error" ? "bg-red-500" : "bg-blue-500";

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 rtl:left-4 rtl:right-auto">
      {items.map((t) => (
        <div key={t.id} className="rounded-xl shadow-lg overflow-hidden border border-white/40">
          <div className={`h-1 ${color(t.type)}`} />
          <div className="bg-white px-4 py-3 text-[#0b1a2e] min-w-[260px] max-w-[360px]">
            <div className="text-sm font-semibold mb-0.5">
              {t.type === "success" ? "تم بنجاح" : t.type === "error" ? "حدث خطأ" : "معلومة"}
            </div>
            <div className="text-sm text-[#47627c]">{t.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
