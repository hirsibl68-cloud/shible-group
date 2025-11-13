"use client";

export default function History() {
  const fakeData = [
    { type: "إيداع", amount: 50, date: "2025-02-10" },
    { type: "سحب", amount: 20, date: "2025-02-12" },
  ];

  return (
    <main className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">السجلات المالية</h1>

      {fakeData.map((t, i) => (
        <div key={i} className="bg-gray-100 rounded-xl p-3">
          <div>النوع: {t.type}</div>
          <div>المبلغ: {t.amount} USDT</div>
          <div>التاريخ: {t.date}</div>
        </div>
      ))}
    </main>
  );
}
