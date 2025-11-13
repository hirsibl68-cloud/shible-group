"use client";

export default function Profile() {
  const user = {
    name: "المستخدم",
    email: "user@example.com",
    balance: 10.0,
    referralLink: "https://yourwebsite.com/signup?ref=12345",
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(user.referralLink);
      alert("تم نسخ الرابط ✅");
    } catch {
      alert(user.referralLink);
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">الملف الشخصي</h1>

      <div className="bg-amber-50 rounded-xl p-4 shadow">
        <p className="text-gray-700">الاسم: {user.name}</p>
        <p className="text-gray-700">البريد: {user.email}</p>
        <p className="text-gray-900 text-lg font-bold mt-2">
          الرصيد: {user.balance} USDT
        </p>
      </div>

      <div className="bg-white rounded-xl p-4 border shadow space-y-2">
        <h2 className="font-semibold">رابط الإحالة</h2>
        <input value={user.referralLink} readOnly className="w-full border p-2 rounded" />
        <button onClick={copy} className="w-full py-2 bg-amber-500 text-white rounded-lg">
          نسخ الرابط
        </button>
      </div>
    </main>
  );
}
