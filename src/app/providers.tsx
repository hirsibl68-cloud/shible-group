"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { storage } from "@/lib/storage";
import type { Currency, Deposit, Tx, Plan } from "@/lib/types";
import { accrued, claimable } from "@/lib/finance";

type WalletState = {
  currency: Currency;
  balance: number;
  deposits: Deposit[];
  txs: Tx[];

  setCurrency: (c: Currency) => void;
  deposit: (amount: number, currency: Currency, plan: Plan) => Deposit;
  withdraw: (amount: number, currency: Currency) => boolean;
  claimProfit: (depositId: string) => number; // المبلغ المُطالب به
  refresh: () => void;
};

const WalletCtx = createContext<WalletState | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>("USDT");
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [txs, setTxs] = useState<Tx[]>([]);

  // load
  useEffect(() => {
    setBalance(storage.balance);
    setDeposits(storage.deposits);
    setTxs(storage.txs);
    setCurrency(storage.currency);
  }, []);

  // persist
  useEffect(() => { storage.balance = balance; }, [balance]);
  useEffect(() => { storage.deposits = deposits; }, [deposits]);
  useEffect(() => { storage.txs = txs; }, [txs]);
  useEffect(() => { storage.currency = currency; }, [currency]);

  function deposit(amount: number, curr: Currency, plan: Plan): Deposit {
    const startAt = new Date();
    const endAt = new Date(startAt);
    endAt.setDate(endAt.getDate() + plan.lockDays);

    const dep: Deposit = {
      id: crypto.randomUUID(),
      amount, currency: curr, plan,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      claimedProfit: 0,
    };
    setDeposits(d => [...d, dep]);
    setBalance(b => +(b - amount).toFixed(2));
    setTxs(t => [{ id: crypto.randomUUID(), type: "DEPOSIT", amount, currency: curr, at: new Date().toISOString(), meta: { plan: plan.id } }, ...t]);
    return dep;
  }

  function withdraw(amount: number, curr: Currency): boolean {
    if (amount <= 0 || amount > balance) return false;
    setBalance(b => +(b - amount).toFixed(2));
    setTxs(t => [{ id: crypto.randomUUID(), type: "WITHDRAW", amount, currency: curr, at: new Date().toISOString() }, ...t]);
    return true;
  }

  function claimProfit(depositId: string): number {
    const idx = deposits.findIndex(d => d.id === depositId);
    if (idx < 0) return 0;
    const dep = deposits[idx];
    const can = claimable(dep);
    if (can <= 0) return 0;
    const upd = { ...dep, claimedProfit: +(dep.claimedProfit + can).toFixed(2) };
    const next = [...deposits];
    next[idx] = upd;
    setDeposits(next);
    setBalance(b => +(b + can).toFixed(2));
    setTxs(t => [{ id: crypto.randomUUID(), type: "CLAIM", amount: can, currency: dep.currency, at: new Date().toISOString(), meta: { depositId } }, ...t]);
    return can;
  }

  function refresh() {
    // مجرد تفعيل رندر لحسابات accrued/claimable
    setDeposits(d => [...d]);
  }

  // تحديث تلقائي كل دقيقة لعرض الأرباح المتراكمة
  useEffect(() => {
    const id = setInterval(() => refresh(), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const value = useMemo<WalletState>(() => ({
    currency, balance, deposits, txs,
    setCurrency,
    deposit, withdraw, claimProfit,
    refresh,
  }), [currency, balance, deposits, txs]);

  return <WalletCtx.Provider value={value}>{children}</WalletCtx.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletCtx);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
