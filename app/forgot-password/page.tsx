"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { FiArrowLeft, FiArrowRight, FiLock } from "react-icons/fi";
import PhoneInput from "@/components/auth/common/PhoneInput";
import { FaTelegramPlane } from "react-icons/fa";

export default function ForgotPasswordPage() {
  const { lang, dir } = useApp();
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [dialCode, setDialCode] = useState("+965");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!phone.trim()) {
      setError(lang === "ar" ? "يرجى إدخال رقم الهاتف" : "Please enter phone number");
      return;
    }

    // Navigate to verify page with phone
    router.push(`/verify-code?phone=${encodeURIComponent(dialCode + phone)}`);
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
              <FiLock className="text-[#0D154B] text-3xl" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-extrabold text-[#163B45] mb-2">
              {lang === "ar" ? "نسيت كلمة المرور" : "Forgot Password"}
            </h1>
            <p className="text-xs md:text-sm text-[#6F7E89]">
              {lang === "ar"
                ? "أدخل رقم هاتفك لإرسال رمز التحقق"
                : "Enter your phone to receive a verification code"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <PhoneInput
              label={lang === "ar" ? "رقم الهاتف" : "Phone Number"}
              required
              value={phone}
              dialCode={dialCode}
              onValueChange={setPhone}
              onDialCodeChange={setDialCode}
              helper={
                error
                  ? undefined
                  : lang === "ar"
                  ? "سيتم إرسال رمز التحقق إلى هذا الرقم"
                  : "A verification code will be sent to this number"
              }
            />

            {/* Error Message */}
            {error && (
              <p className="text-[11px] md:text-xs text-[#D1454A] font-medium -mt-2">
                {error}
              </p>
            )}

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
              {lang === "ar" ? "إرسال رمز التحقق" : "Send Verification Code"}
              <FaTelegramPlane className="w-5 h-5" />
            </button>

            {/* Back to Login */}
            <Link
              href="/login"
              className="text-center text-xs md:text-sm text-[#0D154B] font-semibold hover:underline flex items-center justify-center gap-1.5"
            >
              {dir === "rtl" ? (
                <FiArrowRight className="text-sm" />
              ) : (
                <FiArrowLeft className="text-sm" />
              )}
              {lang === "ar" ? "العودة لتسجيل الدخول" : "Back to Login"}
            </Link>
          </form>

        </div>
      </div>
    </section>
  );
}