"use client";
import { useWallet } from "@/app/providers";

export default function BalancePill() {
  const { balance, currency, setCurrency } = useWallet();
  return (
    <div className="my-3 flex items-center justify-between rounded-2xl border border-[#dce9ff] bg-white px-4 py-2 shadow-sm">
      <div className="text-sm text-[#345067]">الرصيد</div>
      <div className="flex items-center gap-2">
        <div className="font-semibold text-[#0b1a2e]">{balance.toLocaleString()} {currency}</div>
        <select
          value={currency}
          onChange={(e)=>setCurrency(e.target.value as any)}
          className="text-sm rounded-xl border border-[#dce9ff] bg-white px-2 py-1 outline-none"
        >
          <option>USDT</option>
          <option>USDC</option>
          <option>TRY</option>
        </select>
      </div>
    </div>
  );
}
