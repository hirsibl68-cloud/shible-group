"use client";

import Link from "next/link";

// ملاحظة: هذه نسخة مبسطة مؤقتاً بدون useWallet
// فقط لكي يمرّ الـ build ونسلّم الموقع، ويمكن لاحقاً
// إعادة تفعيل منطق الإيداع الحقيقي مع WalletProvider.

export default function DepositPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-[#eef6ff] via-white to-[#f7fbff]">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="rounded-2xl border border-[#dce9ff] bg-white px-5 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-[#0b1a2e]">إيداع الأموال</h1>
            <p className="text-sm text-[#517694]">
              صفحة الإيداع قيد التطوير وسيتم تفعيلها قريباً.
            </p>
          </div>
          <Link
            href="/ai-tools"
            className="text-sm text-[#1b6fe0] hover:underline"
          >
            ← عودة
          </Link>
        </div>

        <div className="rounded-2xl border border-dashed border-[#dce9ff] bg-white p-6 shadow-sm text-center space-y-3">
          <p className="text-sm text-[#345067]">
            حالياً يمكنك استعراض الأدوات والخطط، وسنقوم بتفعيل نظام الإيداع
            والسحب والمحفظة في التحديث القادم.
          </p>
          <p className="text-xs text-[#7a93a8]">
            إذا كنت تختبر النظام محلياً، يمكنك إبقاء منطق الإيداع في كومبوننت
            منفصل لا يُستخدم أثناء البناء.
          </p>
          <Link
            href="/plans"
            className="inline-flex items-center justify-center rounded-xl bg-[#2aa1ff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1b8aea]"
          >
            عرض الخطط المتاحة
          </Link>
        </div>
      </div>
    </div>
  );
}
