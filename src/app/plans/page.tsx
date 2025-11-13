export default function Plans() {
  const plans = [
    { name: "Litecoin Miner L11 HU6", rate: 0.26, min: 10, max: 10000 },
    { name: "KAS Miner KS7", rate: 0.18, min: 20, max: 15000 },
  ];

  return (
    <main className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">المشروع</h1>

      {plans.map((p) => (
        <div key={p.name} className="bg-amber-50 rounded-2xl p-4 shadow">
          <div className="text-sm text-gray-500">معدل العائد</div>
          <div className="text-2xl font-bold">{(p.rate * 100).toFixed(2)}%</div>
          <div className="mt-1 text-gray-700">{p.name}</div>
          <div className="mt-1 text-sm text-gray-600">
            الحد الأدنى {p.min} USDT • الحد الأقصى {p.max} USDT
          </div>

          <button className="mt-3 px-4 py-2 rounded-xl bg-amber-600 text-white">
            استثمر الآن
          </button>
        </div>
      ))}
    </main>
  );
}
