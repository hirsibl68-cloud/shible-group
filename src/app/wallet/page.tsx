"use client";

import React, { useState } from "react";

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw" | "history">("deposit");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("trc20");

  const walletAddresses: any = {
    trc20: "TQ7xKX8wV9AcPb8sF6J2Y9yERQ8zXXB1kF",
    bep20: "0xA71Fe2366aD99C1505efb92727664772",
    erc20: "0x9321B9b7d3B91953Aa0a9FcF347c2a8e9c",
    btc: "bc1qlkm4w0swq9gf3yu4rfaxhx0pwq3x9smu",
    eth: "0x8d2c4e2E77EC1e15288FbE821954b7a5C",
    usdc: "0x4d315e2834A9341CB8C8A7C54AD99E41",
    trx: "TYi923asfa8Yd98B1mS1Tsg2g4Bv1p2KkM",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddresses[network]);
    alert("✓ تم نسخ عنوان المحفظة");
  };

  return (
    <div className="min-h-screen bg-black text-yellow-100 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* الرأس */}
        <header className="text-center space-y-2">
          <p className="text-[11px] text-yellow-500/70 tracking-[0.3em] uppercase">
            BİPCOIN • WALLET
          </p>
          <h1 className="text-4xl font-bold text-yellow-300">محفظة المستثمر</h1>
          <p className="text-gray-400 text-sm">
            الإيداع، السحب، وإدارة معاملاتك المالية في نظام BİPCOIN.
          </p>
        </header>

        {/* الرصيد */}
        <div className="rounded-3xl border border-yellow-500/30 bg-black/60 p-6 text-center shadow-[0_0_30px_rgba(250,204,21,0.15)]">
          <p className="text-gray-400 text-sm">الرصيد الحالي</p>
          <h2 className="text-4xl font-bold text-yellow-300">$2,540.00</h2>
          <p className="text-xs text-yellow-500/60 mt-1">يتم التحديث تلقائياً</p>
        </div>

        {/* التابات */}
        <div className="flex justify-center gap-2">
          <Tab
            label="الإيداع"
            active={activeTab === "deposit"}
            onClick={() => setActiveTab("deposit")}
          />
          <Tab
            label="السحب"
            active={activeTab === "withdraw"}
            onClick={() => setActiveTab("withdraw")}
          />
          <Tab
            label="السجل"
            active={activeTab === "history"}
            onClick={() => setActiveTab("history")}
          />
        </div>

        {/* المحتوى حسب التاب */}
        {activeTab === "deposit" && (
          <Deposit
            network={network}
            setNetwork={setNetwork}
            walletAddresses={walletAddresses}
            copy={handleCopy}
          />
        )}

        {activeTab === "withdraw" && (
          <Withdraw amount={amount} setAmount={setAmount} />
        )}

        {activeTab === "history" && <History />}
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Tab({ label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
        active
          ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(250,204,21,0.5)]"
          : "border border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/20"
      }`}
    >
      {label}
    </button>
  );
}

function Deposit({ network, setNetwork, walletAddresses, copy }: any) {
  return (
    <div className="rounded-3xl border border-yellow-500/30 bg-black/80 p-6 space-y-6 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
      <h2 className="text-xl font-bold text-yellow-300 text-center">
        إيداع العملات الرقمية (USDT • BTC • ETH)
      </h2>

      {/* اختيار الشبكة */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          ["trc20", "USDT (TRC20)"],
          ["bep20", "USDT (BEP20)"],
          ["erc20", "USDT (ERC20)"],
          ["btc", "BTC"],
          ["eth", "ETH"],
          ["usdc", "USDC"],
          ["trx", "TRX"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setNetwork(id)}
            className={`px-3 py-2 rounded-xl text-sm border ${
              network === id
                ? "bg-yellow-500 text-black border-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                : "bg-black text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/20"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* عنوان المحفظة */}
      <div className="rounded-2xl border border-yellow-500/30 bg-black p-4 text-center space-y-3">
        <p className="text-sm text-gray-400">
          عنوان شبكة {network.toUpperCase()}
        </p>
        <p className="text-yellow-300 font-bold break-all">
          {walletAddresses[network]}
        </p>

        <button
          onClick={copy}
          className="flex items-center gap-2 mx-auto bg-yellow-500 text-black px-4 py-2 rounded-xl hover:brightness-110"
        >
          <span className="text-lg">📋</span>
          <span className="text-sm font-semibold">نسخ العنوان</span>
        </button>
      </div>

      <p className="text-[11px] text-gray-500 text-center">
        تأكد من الإيداع على نفس الشبكة المحددة. أي إيداع على شبكة مختلفة قد يؤدي
        لفقدان المبلغ بشكل نهائي.
      </p>
    </div>
  );
}

function Withdraw({ amount, setAmount }: any) {
  return (
    <div className="rounded-3xl border border-yellow-500/30 bg-black/80 p-6 shadow-[0_0_30px_rgba(250,204,21,0.15)] space-y-4">
      <h2 className="text-xl font-bold text-yellow-300">طلب سحب</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="أدخل مبلغ السحب بالدولار"
        className="w-full rounded-2xl bg-black border border-yellow-500/30 px-4 py-2 text-yellow-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/70"
      />

      <button
        onClick={() => alert(`✓ تم إرسال طلب السحب: ${amount}$`)}
        className="w-full bg-yellow-500 text-black font-bold py-2.5 rounded-2xl hover:brightness-110 shadow-[0_0_15px_rgba(250,204,21,0.4)]"
      >
        تأكيد طلب السحب
      </button>

      <p className="text-xs text-gray-400">
        تتم مراجعة طلبات السحب يدويًا لضمان الأمان، مدة المعالجة عادة بين 1 – 24 ساعة
        عمل.
      </p>
    </div>
  );
}

function History() {
  const items = [
    { type: "إيداع USDT TRC20", amount: "+500$", date: "2024-01-10" },
    { type: "سحب BTC", amount: "-0.002 BTC", date: "2024-01-07" },
    { type: "ربح يومي", amount: "+14$", date: "2024-01-06" },
    { type: "إيداع USDT BEP20", amount: "+300$", date: "2024-01-02" },
  ];

  return (
    <div className="rounded-3xl border border-yellow-500/30 bg-black/80 p-6 space-y-4 shadow-[0_0_30px_rgba(250,204,21,0.15)]">
      <h2 className="text-xl font-bold text-yellow-300">سجل العمليات</h2>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-yellow-500/20 pb-2"
          >
            <span className="text-yellow-200 text-sm">{item.type}</span>
            <span className="text-sm font-bold text-green-400">
              {item.amount}
            </span>
            <span className="text-[11px] text-gray-500">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
