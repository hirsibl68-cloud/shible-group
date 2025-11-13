import type { Deposit } from "./types";

/** يحسب عدد الأيام المنقضية (أرضية) من startAt إلى الآن */
export function daysElapsed(dep: Deposit) {
  const s = new Date(dep.startAt);
  const now = new Date();
  const ms = now.getTime() - s.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

/** الربح المستحق حتى الآن (بدون خصم claimedProfit) ويقف عند lockDays */
export function accrued(dep: Deposit) {
  const d = Math.min(dep.plan.lockDays, daysElapsed(dep));
  const daily = dep.amount * dep.plan.rateDaily;
  return +(daily * d).toFixed(2);
}

/** الربح المتاح للسحب الآن = accrued - claimed */
export function claimable(dep: Deposit) {
  return Math.max(0, +(accrued(dep) - dep.claimedProfit).toFixed(2));
}

/** هل الإيداع غير مقفل بعد؟ */
export function isLocked(dep: Deposit) {
  const end = new Date(dep.endAt).getTime();
  return Date.now() < end;
}
