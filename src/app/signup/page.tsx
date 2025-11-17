"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("+90");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [refCode, setRefCode] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [accept, setAccept] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = getPasswordStrength(password);

  function validate() {
    const e: Record<string, string> = {};
    if (!name || name.trim().length < 2) e.name = "اكتب اسمك الكامل";
    if (!phone || phone.trim().length < 6) e.phone = "رقم هاتف غير صحيح";
    if (password.length < 8) e.password = "كلمة المرور 8 أحرف على الأقل";
    if (confirm !== password) e.confirm = "كلمتا المرور غير متطابقتين";
    if (!accept) e.accept = "يجب الموافقة على الشروط والسياسة";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, code, phone, email, password, refCode }),
      });

      if (res.ok) {
        const data = await res.json();

        // ✅ تخزين userId وكود الإحالة
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("myCode", data.myCode);

        // ✅ الانتقال
        window.location.href = "/ai-tools";
      } else {
        alert("تعذر إنشاء الحساب، جرّب لاحقًا.");
      }
    } catch {
      alert("خطأ غير متوقع، حاول مجددًا.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-[#eef6ff] via-white to-[#f7fbff]">
      <aside className="hidden md:block p-10">
        <div className="sticky top-0">
          <Logo />
          <h1 className="mt-8 text-3xl font-bold text-[#0b1a2e]">
            ابدأ مستقبلك المالي مع الذكاء الاصطناعي
          </h1>
          <p className="mt-3 text-[#345067] max-w-md">
            أنشئ حسابك في دقائق واستفد من أدوات مالية ذكية تساعدك على اتخاذ قرارات أفضل.
          </p>

          <ul className="mt-8 space-y-3">
            <FeatureLine icon="✨" text="واجهة عربية سهلة وسريعة" />
            <FeatureLine icon="🔒" text="أمان عالي وحماية متقدمة" />
            <FeatureLine icon="📊" text="تقارير مالية فورية" />
            <FeatureLine icon="🤖" text="مساعد ذكاء اصطناعي مالي" />
          </ul>
        </div>
      </aside>

      <main className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="bg-white border border-[#dce9ff] shadow-sm rounded-2xl p-6">
            {/* الخطوة الحالية = 1 حالياً */}
            <Stepper current={1} />

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <Field label="الاسم الكامل" error={errors.name}>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اكتب اسمك كما في الهوية"
                  className="input"
                />
              </Field>

              <div className="grid grid-cols-3 gap-2">
                <Field label="الكود">
                  <select
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="input"
                  >
                    <option value="+90">+90</option>
                    <option value="+971">+971</option>
                    <option value="+966">+966</option>
                    <option value="+20">+20</option>
                  </select>
                </Field>
                <div className="col-span-2">
                  <Field label="رقم الهاتف" error={errors.phone}>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05xxxxxxxx"
                      className="input"
                    />
                  </Field>
                </div>
              </div>

              <Field label="البريد الإلكتروني (اختياري)">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="input"
                />
              </Field>

              <Field label="كلمة المرور" error={errors.password}>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPass ? "text" : "password"}
                  placeholder="على الأقل 8 أحرف"
                  className="input"
                />
              </Field>

              <PasswordMeter score={strength} />

              <Field label="تأكيد كلمة المرور" error={errors.confirm}>
                <input
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  type={showPass ? "text" : "password"}
                  placeholder="أعد كتابة كلمة المرور"
                  className="input"
                />
              </Field>

              <Field label="رمز الإحالة (اختياري)">
                <input
                  value={refCode}
                  onChange={(e) => setRefCode(e.target.value)}
                  placeholder="مثال: FRIEND20"
                  className="input"
                />
              </Field>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                />
                <span className="text-sm text-[#345067]">
                  أوافق على الشروط والأحكام وسياسة الخصوصية
                </span>
              </div>

              <button className="btn-primary" disabled={submitting}>
                {submitting ? "جارٍ إنشاء الحساب..." : "إنشاء حساب"}
              </button>

              <p className="text-center text-sm text-[#517694]">
                لديك حساب؟{" "}
                <Link href="/login" className="text-[#1b6fe0] font-semibold">
                  تسجيل الدخول
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

/* -------------------- COMPONENTS -------------------- */

function FeatureLine({ icon, text }: any) {
  return (
    <div className="flex items-center gap-3">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Field({ label, error, children }: any) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-[#345067]">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function getPasswordStrength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/\d/.test(pw) || /[@$!%*#?&]/.test(pw)) s++;
  return Math.min(s, 4);
}

function PasswordMeter({ score }: any) {
  const colors = ["#ff6b6b", "#ff9f43", "#ffd166", "#34d399", "#10b981"];
  return (
    <div className="grid grid-cols-5 gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-1.5 rounded"
          style={{ background: i <= score ? colors[score] : "#dce9ff" }}
        />
      ))}
    </div>
  );
}

function Logo() {
  return <div className="text-3xl font-bold text-[#2aa1ff]">AI</div>;
}

type StepperProps = {
  current: number;
};

function Stepper({ current }: StepperProps) {
  const steps = [1, 2, 3];

  return (
    <div className="flex items-center justify-center gap-2 mb-2">
      {steps.map((step) => {
        const active = step === current;
        return (
          <div
            key={step}
            className={
              "h-2 rounded-full " +
              (active ? "w-8 bg-[#2aa1ff]" : "w-4 bg-[#dce9ff]")
            }
          />
        );
      })}
    </div>
  );
}
