export type Currency = "USDT" | "USDC" | "TRY";

export type Plan = {
  id: string;
  name: string;
  rateDaily: number;   // 0.02 = 2%
  lockDays: number;    // مدة القفل بالأيام
};

export type Deposit = {
  id: string;
  amount: number;
  currency: Currency;
  plan: Plan;
  startAt: string;     // ISO
  endAt: string;       // ISO
  claimedProfit: number; // أرباح تم سحبها سابقًا
};

export type Tx = {
  id: string;
  type: "DEPOSIT" | "WITHDRAW" | "CLAIM";
  amount: number;
  currency: Currency;
  at: string;          // ISO
  meta?: Record<string, any>;
};
