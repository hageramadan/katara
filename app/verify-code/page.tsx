"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { FiArrowLeft, FiArrowRight, FiShield } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";

function VerifyCodeContent() {
  const { lang, dir } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "+965-57885654";

  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ⏱️ Timer للعد التنازلي
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // ✅ إدخال الرقم والانتقال التلقائي
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // أرقام فقط

    const newCode = [...code];
    newCode[index] = value.slice(-1); // رقم واحد بس
    setCode(newCode);
    setError("");

    // الانتقال للخانة التالية
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ⬅️ Backspace
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // 📋 Paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    const newCode = [...code];
    pasted.split("").forEach((char, i) => {
      if (i < 4) newCode[i] = char;
    });
    setCode(newCode);
    const lastIndex = Math.min(pasted.length, 4) - 1;
    if (lastIndex >= 0) inputRefs.current[lastIndex]?.focus();
  };

  // ✅ Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 4) {
      setError(lang === "ar" ? "يرجى إدخال الرمز كامل" : "Please enter the full code");
      return;
    }
    console.log({ phone, code: fullCode });
    // TODO: API call
    // router.push("/reset-password");
  };

  // 🔄 إعادة الإرسال
  const handleResend = () => {
    setTimer(60);
    setCode(["", "", "", ""]);
    inputRefs.current[0]?.focus();
    console.log("Resend code to", phone);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-10">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/login/bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#00000066] to-[#273C49]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-[#0D154B]/5 flex items-center justify-center">
              <FiShield className="text-[#0D154B] text-3xl" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-extrabold text-[#163B45] mb-2">
              {lang === "ar"
                ? "أدخل رمز التحقق الخاص بك"
                : "Enter Your Verification Code"}
            </h1>
            <p className="text-xs md:text-sm text-[#6F7E89] mb-1">
              {lang === "ar"
                ? "تم إرسال رمز التحقق إلى رقم جوالك التالي"
                : "A verification code was sent to your phone"}
            </p>
            <p className="text-sm md:text-base font-bold text-[#0D154B] font-mono" dir="ltr">
              {phone}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3" dir="ltr">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="
                    w-14 h-16 md:w-16 md:h-16
                    text-center text-2xl md:text-3xl font-bold
                    bg-[#FAFCFE] border rounded-[10px]
                    text-[#0D154B]
                    outline-none transition
                    border-[#DCE3EC]
                    focus:border-[#0D154B] focus:ring-2 focus:ring-[#0D154B]/10
                  "
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <p className="text-[11px] md:text-xs text-[#D1454A] font-medium text-center">
                {error}
              </p>
            )}

            {/* Resend Timer */}
            <div className="text-center text-xs md:text-sm text-gray-500">
              {timer > 0 ? (
                <>
                  {lang === "ar" ? "إعادة الإرسال بعد" : "Resend in"}{" "}
                  <span className="font-bold text-[#0D154B] font-mono">
                    {String(Math.floor(timer / 60)).padStart(2, "0")}:
                    {String(timer % 60).padStart(2, "0")}
                  </span>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[#0D154B] font-bold hover:underline"
                >
                  {lang === "ar" ? "إعادة إرسال الرمز" : "Resend Code"}
                </button>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full bg-[#0D154B] text-white
                py-3.5 rounded-full font-bold text-sm md:text-base
                hover:opacity-90 active:scale-[0.99] transition
                flex items-center justify-center gap-2 cursor-pointer
              "
            >
              {lang === "ar" ? "تأكيد" : "Confirm"}
              <FaTelegramPlane className="w-5 h-5" />
            </button>

            {/* Back */}
            <Link
              href="/forgot-password"
              className="text-center text-xs md:text-sm text-[#0D154B] font-semibold hover:underline flex items-center justify-center gap-1.5"
            >
              {dir === "rtl" ? (
                <FiArrowRight className="text-sm" />
              ) : (
                <FiArrowLeft className="text-sm" />
              )}
              {lang === "ar" ? "تغيير رقم الهاتف" : "Change phone number"}
            </Link>
          </form>

        </div>
      </div>
    </section>
  );
}

export default function VerifyCodePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#0D154B] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyCodeContent />
    </Suspense>
  );
}