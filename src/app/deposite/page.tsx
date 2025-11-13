"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useWallet } from "@/app/providers";
import type { Plan } from "@/lib/types";

const PLANS: Plan[] = [
  { id: "fix-20", name: "ثابت يومي 2.0%", rateDaily: 0.02, lockDays: 7 },
  { id: "fix-25", name: "ثابت يومي 2.5%", rateDaily: 0.025, lockDays: 15 },
  { id: "fix-30", name: "ثابت يومي 3.0%", rateDaily: 0.03, lockDays: 30 },
];
const MIN = 50;
const MAX = 20000;

export default function DepositPage() {
  const { balance, currency, deposit } = useWallet();
  const [amount, setAmount] = useState(500);
  const [planId, setPlanId] = useState(PLANS[1].id);
  const [agree, setAgree] = useState(false);
  const [msg, setMsg] = useState<{type:"ok"|"err"; text:string} | null>(null);

  const plan = useMemo(() => PLANS.find(p=>p.id===planId)!, [planId]);
  const expectedDaily = +(amount * plan.rateDaily).toFixed(2);
  const expectedTotal = +(expectedDaily * plan.lockDays).toFixed(2);

  function submit() {
    if (amount < MIN) return setMsg({type:"err", text:`الحد الأدنى ${MIN}`});
    if (amount > MAX) return setMsg({type:"err", text:`الحد الأقصى ${MAX}`});
    if (!agree) return setMsg({type:"err", text:"وافق على الشروط"});
    if (amount > balance) return setMsg({type:"err", text:"رصيد غير كافٍ"});
    deposit(amount, currency, plan);
    setMsg({type:"ok", text:"تم الإيداع بنجاح"});
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-[#eef6ff] via-white to-[#f7fbff]">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="rounded-2xl border border-[#dce9ff] bg-white px-5 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-[#0b1a2e]">إيداع الأموال</h1>
            <p className="text-sm text-[#517694]">اختر خطة أرباح ثابتة</p>
          </div>
          <Link href="/ai-tools" className="text-sm text-[#1b6fe0] hover:underline">← عودة</Link>
        </div>

        <div className="rounded-2xl border border-[#dce9ff] bg-white p-5 shadow-sm space-y-5">
          <div className="text-sm text-[#345067]">
            الرصيد المتاح: <span className="font-semibold text-[#0b1a2e]">{balance.toLocaleString()} {currency}</span>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-[#345067]">مبلغ الإيداع</label>
            <div className="flex gap-2">
              <input
                type="number"
                min={0}
                value={amount}
                onChange={(e)=>setAmount(Number(e.target.value || 0))}
                className="flex-1 rounded-xl border border-[#dce9ff] bg-white px-3 py-2 outline-none"
                placeholder={`بين ${MIN} و ${MAX}`}
              />
              <button onClick={()=>setAmount(500)} className="rounded-xl border border-[#dce9ff] bg-white px-3 py-2 text-sm hover:bg-[#f3f9ff]">500</button>
              <button onClick={()=>setAmount(1000)} className="rounded-xl border border-[#dce9ff] bg-white px-3 py-2 text-sm hover:bg-[#f3f9ff]">1000</button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#345067]">الخطة</label>
            <div className="grid md:grid-cols-3 gap-3">
              {PLANS.map(p => (
                <button
                  key={p.id}
                  onClick={()=>setPlanId(p.id)}
                  className={`text-left rounded-2xl border p-4 transition w-full ${
                    planId===p.id ? "border-[#2aa1ff] bg-[#e9f5ff]" : "border-[#dce9ff] bg-white hover:bg-[#f6fbff]"
                  }`}
                >
                  <div className="font-semibold text-[#0b1a2e]">{p.name}</div>
                  <div className="text-xs text-[#7a93a8]">قفل {p.lockDays} يوم</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <Info label="عائد يومي" value={`${expectedDaily} ${currency}`} />
            <Info label={`عائد ${plan.lockDays} يوم`} value={`${expectedTotal} ${currency}`} />
            <Info label="نسبة يومية" value={`${(plan.rateDaily*100).toFixed(1)}%`} />
          </div>

          <label className="flex items-start gap-2">
            <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} className="mt-1 accent-[#2aa1ff]" />
            <span className="text-sm text-[#345067]">أوافق على سياسة الإيداع والأرباح الثابتة</span>
          </label>

          {msg && (
            <div className={`rounded-xl px-3 py-2 text-sm ${
              msg.type==="ok" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
            }`}>{msg.text}</div>
          )}

          <button onClick={submit} className="w-full rounded-xl py-3 font-semibold bg-[#2aa1ff] hover:bg-[#1b8aea] text-white">تأكيد الإيداع</button>
        </div>
      </div>
    </div>
  );
}

function Info({label, value}:{label:string; value:string}) {
  return (
    <div className="rounded-2xl border border-[#dce9ff] bg-white p-4 shadow-sm">
      <div className="text-xs text-[#7a93a8]">{label}</div>
      <div className="mt-1 font-semibold text-[#0b1a2e]">{value}</div>
    </div>
  );
}
