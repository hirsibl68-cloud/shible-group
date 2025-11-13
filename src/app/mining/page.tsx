"use client";
import { useMemo, useState } from "react";

export default function MiningPage() {
  const [level] = useState("V2");
  const [runs, setRuns] = useState(0);
  const dailyRate = "2% ~ 3.3%";

  const [amount, setAmount] = useState(500);
  const [seconds] = useState(8);

  const canRun = runs < 3 && amount >= 500 && amount <= 20000;

  const note = "يجب النقر على حزمة قوة الحوسبة وتشغيلها لمدة 8 ثوانٍ يوميًا للحصول على الدخل. بعد اكتمال العملية، سيتم توزيع الدخل على رصيد الحساب.";

  const est = useMemo(() => {
    // تقدير وهمي بسيط
    const r = 0.025; // 2.5%
    return amount * r;
  }, [amount]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold text-[#0b1a2e]">مُعدّل التجزئة AI</h2>

      <div className="rounded-2xl border border-[#dce9ff] bg-white overflow-hidden">
        <div className="bg-[#eff7ff] px-4 py-3 flex items-center justify-between">
          <span className="font-semibold text-[#0b1a2e]">GPU 4 النوى</span>
          <span className="text-xs text-[#345067]">غير مقفلة</span>
        </div>

        <div className="p-4 space-y-3">
          <img
            src="https://dummyimage.com/700x300/eaf4ff/6b8bb1&text=GPU+4+CORE"
            alt="GPU 4 CORE"
            className="w-full rounded-xl border border-[#dce9ff]"
          />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-[#dce9ff] bg-[#f7fbff] p-3">
              <div className="text-[#345067]">مستوى</div>
              <div className="font-semibold text-[#0b1a2e]">{level}</div>
            </div>
            <div className="rounded-xl border border-[#dce9ff] bg-[#f7fbff] p-3">
              <div className="text-[#345067]">معدل العائد اليومي</div>
              <div className="font-semibold text-[#0b1a2e]">{dailyRate}</div>
            </div>
            <div className="rounded-xl border border-[#dce9ff] bg-[#f7fbff] p-3">
              <div className="text-[#345067]">مبلغ التشغيل</div>
              <div className="font-semibold text-[#0b1a2e]">500–20000 USDT</div>
            </div>
            <div className="rounded-xl border border-[#dce9ff] bg-[#f7fbff] p-3">
              <div className="text-[#345067]">وقت التشغيل</div>
              <div className="font-semibold text-[#0b1a2e]">{seconds} ثوانٍ</div>
            </div>
            <div className="rounded-xl border border-[#dce9ff] bg-[#f7fbff] p-3 col-span-2">
              <div className="text-[#345067]">عدد مرات الجري في اليوم الواحد</div>
              <div className="font-semibold text-[#0b1a2e]">{runs}/3</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#345067]">أدخل مبلغ التشغيل</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value || 0))}
              className="w-full rounded-xl border border-[#dce9ff] bg-white px-3 py-2 outline-none"
              min={0}
            />
          </div>

          <button
            onClick={() => canRun && setRuns(runs + 1)}
            disabled={!canRun}
            className={`w-full rounded-xl py-3 font-semibold transition ${
              canRun
                ? "bg-[#2aa1ff] hover:bg-[#1b8aea] text-white"
                : "bg-[#e7eef9] text-[#7b8fa6] cursor-not-allowed"
            }`}
          >
            تشغيل بعد إلغاء القفل
          </button>

          <div className="rounded-xl border border-[#dce9ff] bg-[#f7fbff] p-3 text-sm text-[#345067]">
            {note}
          </div>

          <div className="text-right text-sm text-[#345067]">
            عائد تقديري لليوم: <span className="font-semibold text-[#0b1a2e]">${est.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
