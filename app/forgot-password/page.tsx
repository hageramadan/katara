"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

type EmailError = "empty" | "invalid" | null;

export default function ForgotPasswordPage() {
  const { lang, dir } = useApp();
  const ar = lang === "ar";
  const [email, setEmail] = useState("");
  const [error, setError] = useState<EmailError>(null);
  const [submitted, setSubmitted] = useState(false);
  const [simulation, setSimulation] = useState<EmailError>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  function validateEmail(value: string): EmailError {
    if (!value.trim()) return "empty";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? null : "invalid";
  }

  function showError(value: string, simulated: EmailError) {
    setEmail(value);
    setSimulation(simulated);
    setError(validateEmail(value));
    emailRef.current?.focus();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateEmail(email);
    setError(validation);
    if (validation) {
      emailRef.current?.focus();
      return;
    }
    // Preview the supplied flow; no email is sent until a recovery API is connected.
    setEmail(email.trim());
    setSubmitted(true);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  const errorMessage = error === "empty"
    ? ar ? "يرجى إدخال بريدك الإلكتروني للمتابعة." : "Please enter your email address to continue."
    : ar ? "يرجى إدخال بريد إلكتروني صالح، مثل example@email.com." : "Please enter a valid email address, such as example@email.com.";
  const submitLabel = error === "empty"
    ? ar ? "إدخال البريد الإلكتروني" : "Enter your email address"
    : error === "invalid"
      ? ar ? "تصحيح البريد الإلكتروني" : "Correct your email address"
      : ar ? "إرسال رابط إعادة التعيين" : "Send reset link";

  return (
    <main dir={dir} className="relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center bg-[#273C49] px-4 py-10 sm:px-8 sm:py-16">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/login/bg.jpg')" }} />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-black/45 to-[#273C49]/85" />
      <section aria-labelledby="forgot-password-title" className="w-full max-w-[820px] rounded-2xl bg-white px-6 py-9 text-[#163B45] shadow-2xl sm:px-12 sm:py-10">
        <div className="mx-auto w-full max-w-[592px]">
          <header className="text-center">
            <h1 id="forgot-password-title" ref={headingRef} tabIndex={-1} className="text-xl font-extrabold outline-none sm:text-2xl">
              {submitted
                ? ar ? "تحقّق من بريدك الإلكتروني" : "Check your email"
                : ar ? "هل نسيت كلمة المرور؟" : "Forgot your password?"}
            </h1>
            <p className="mt-2 text-sm leading-7 text-[#617D8B]">
              {submitted ? (
                <>{ar ? "إذا كان البريد الإلكتروني مرتبطًا بحساب لدينا،" : "If the email address is linked to an account,"}<br />{ar ? "فستصلك رسالة تحتوي على رابط لإعادة تعيين كلمة المرور." : "you will receive a message with a link to reset your password."}</>
              ) : (
                <>{ar ? "أدخل البريد الإلكتروني المرتبط بحسابك،" : "Enter the email address linked to your account,"}<br />{ar ? "وسنرسل لك رابطًا لإعادة تعيين كلمة المرور." : "and we’ll send you a password reset link."}</>
              )}
            </p>
          </header>
          {submitted ? (
            <div className="pb-12 pt-6 text-center sm:pb-16">
              <p className="mb-7 text-sm leading-7 text-[#617D8B]">
                {ar ? "لم تجد الرسالة؟ تحقّق من مجلد البريد غير المرغوب فيه،" : "Can’t find the message? Check your spam folder,"}<br />
                {ar ? "أو تأكّد من صحة عنوان بريدك الإلكتروني." : "or make sure your email address is correct."}
              </p>
              <Link href="/login" className="flex min-h-12 items-center justify-center rounded-lg bg-[#50B9C4] px-4 py-3 text-base font-bold transition hover:bg-[#43aab5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#163B45]">
                {ar ? "العودة إلى تسجيل الدخول" : "Back to sign in"}
              </Link>
              <button type="button" onClick={() => {
                setSubmitted(false);
                setSimulation(null);
                requestAnimationFrame(() => emailRef.current?.focus());
              }} className="mt-3 min-h-10 text-sm hover:underline">
                {ar ? "تعديل البريد الإلكتروني" : "Edit email address"}
              </button>
              <p role="status" className="mt-4 text-xs leading-6 text-[#617D8B]">
                {ar ? "معاينة للفلو فقط — لم يتم إرسال بريد إلكتروني فعلي." : "Flow preview only — no email has actually been sent."}
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} noValidate className="mt-7 sm:mt-8">
                <label htmlFor="recovery-email" className="mb-2 block text-sm font-medium">{ar ? "البريد الإلكتروني" : "Email address"}</label>
                <input
                  ref={emailRef} id="recovery-email" name="email" type="email" autoComplete="email" required
                  value={email} aria-invalid={Boolean(error)} aria-describedby={error ? "recovery-email-error" : undefined}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError(null);
                    setSimulation(null);
                  }}
                  placeholder={error === "empty" ? ar ? "أدخل بريدك الإلكتروني" : "Enter your email address" : "example@email.com"}
                  className={`min-h-12 w-full rounded-lg border px-4 py-3 text-start text-sm text-[#163B45] outline-none transition placeholder:text-[#617D8B] focus:ring-2 ${error ? "border-[#ef4444] bg-[#fff8f8] focus:ring-red-100" : "border-[#E5EBEE] bg-white focus:border-[#50B9C4] focus:ring-[#50B9C4]/20"}`}
                />
                {error && <p id="recovery-email-error" role="alert" className="mt-2 text-xs leading-6 text-[#dc3434]">{errorMessage}</p>}
                <button type="submit" className="mt-5 min-h-12 w-full rounded-lg bg-[#50B9C4] px-4 py-3 text-base font-bold transition hover:bg-[#43aab5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#163B45]">{submitLabel}</button>
                <Link href="/login" className="mx-auto mt-2 flex min-h-10 w-fit items-center text-sm hover:underline">{ar ? "العودة إلى تسجيل الدخول" : "Back to sign in"}</Link>
              </form>
              <div className="mx-auto mt-4 max-w-[348px] text-center">
                <p className="mb-1 text-xs leading-6 text-[#617D8B]">{ar ? "محاكاة الأخطاء — للعرض فقط، دون تحقق فعلي" : "Error simulation — preview only, no account verification"}</p>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" aria-pressed={simulation === "empty"} onClick={() => showError("", "empty")} className={`min-h-9 rounded-md border border-[#dce7ed] px-2 py-1.5 text-xs transition hover:bg-[#e5f6f8] ${simulation === "empty" ? "bg-[#e5f6f8]" : "bg-white"}`}>{ar ? "تجربة بريد فارغ" : "Try empty email"}</button>
                  <button type="button" aria-pressed={simulation === "invalid"} onClick={() => showError("example.com", "invalid")} className={`min-h-9 rounded-md border border-[#dce7ed] px-2 py-1.5 text-xs transition hover:bg-[#e5f6f8] ${simulation === "invalid" ? "bg-[#e5f6f8]" : "bg-white"}`}>{ar ? "تجربة بريد غير صالح" : "Try invalid email"}</button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
