const KEY_BAL = "walletBalance";
const KEY_DEPS = "walletDeposits";
const KEY_TXS = "walletTxs";
const KEY_CURR = "walletCurrency";

export function loadNumber(key: string, def = 0) {
  const v = localStorage.getItem(key);
  return v ? Number(v) : def;
}
export function saveNumber(key: string, v: number) {
  localStorage.setItem(key, String(v));
}

export function loadJSON<T>(key: string, def: T): T {
  const v = localStorage.getItem(key);
  return v ? JSON.parse(v) as T : def;
}
export function saveJSON<T>(key: string, v: T) {
  localStorage.setItem(key, JSON.stringify(v));
}

export const storage = {
  get balance() { return loadNumber(KEY_BAL, 1000); }, // رصيد ابتدائي للتجربة
  set balance(v: number) { saveNumber(KEY_BAL, v); },

  get currency(): "USDT" | "USDC" | "TRY" { return (localStorage.getItem(KEY_CURR) as any) || "USDT"; },
  set currency(v: "USDT" | "USDC" | "TRY") { localStorage.setItem(KEY_CURR, v); },

  get deposits() { return loadJSON<any[]>(KEY_DEPS, []); },
  set deposits(v: any[]) { saveJSON(KEY_DEPS, v); },

  get txs() { return loadJSON<any[]>(KEY_TXS, []); },
  set txs(v: any[]) { saveJSON(KEY_TXS, v); },
};
