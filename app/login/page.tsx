"use client";
import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthSidebar, { RoleKey } from "@/components/auth/AuthSidebar";
import { FaArrowRight  } from "react-icons/fa6";

export default function LoginPage() {
  const { lang } = useApp();
  const [activeRole, setActiveRole] = useState<RoleKey>("members");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ role: activeRole, username, password });
  };

  return (
    <section className="relative lg:min-h-screen flex items-center justify-center px-4 py-10">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/login/bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#00000066] to-[#273C49]" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-5xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 md:items-stretch">

          {/* ✅ Sidebar Component */}
          <AuthSidebar
            activeRole={activeRole}
            onRoleChange={setActiveRole}
            className="md:col-span-3"
          />

          {/* Form — نفس ارتفاع السيدبار + محتوى في المنتصف */}
          <div className="md:col-span-9 p-6 md:p-10 flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 lg:gap-6 w-full mx-auto"
            >
              {/* ==================== Title + Description ==================== */}
              <div className="text-center mb-2 lg:mb-8">
                <h1 className="text-xl md:text-2xl lg:text-[26px] font-extrabold text-[#163B45] mb-2">
                  {lang === "ar"
                    ? "أهلاً بك في منصة الأفضل"
                    : "Welcome to Al-Afdal Platform"}
                </h1>
                <p className="text-sm md:text-[15px] text-[#6F7E89]">
                  {lang === "ar"
                    ? "سجّل الدخول للوصول إلى حسابك"
                    : "Sign in to access your account"}
                </p>
              </div>

              {/* Username */}
              <div>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={
                      lang === "ar" ? " اسم المستخدم" : "Enter username"
                    }
                    className="
                      w-full border border-[#E5EBEE] rounded-xl
                      ps-4 pe-4 py-3
                      text-[#0D154B] text-sm md:text-base font-medium
                      outline-none focus:ring-2 focus:ring-[#0D154B]/20
                      transition
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      lang === "ar" ? " كلمة المرور" : "Enter password"
                    }
                    className="
                      w-full border border-[#E5EBEE] rounded-xl
                      ps-4 pe-12 py-3
                      text-[#0D154B] text-sm md:text-base font-medium
                      outline-none focus:ring-2 focus:ring-[#0D154B]/20
                      transition
                    "
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 inset-e-4 text-gray-400 hover:text-[#0D154B] transition"
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-lg" />
                    ) : (
                      <FiEye className="text-lg" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot */}
              <div className="flex justify-start -mt-2">
                <Link
                  href="/forgot-password"
                  className="text-xs md:text-sm text-[#6F7E89] font-medium hover:underline"
                >
                  {lang === "ar" ? "هل نسيت كلمة المرور؟" : "Forgot password?"}
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  w-full bg-[#55BBC4] text-white
                  py-3.5 rounded-xl
                  font-bold text-sm md:text-lg cursor-pointer
                  hover:opacity-90 active:scale-[0.99]
                  transition
                "
              >
                {lang === "ar" ? "تسجيل الدخول" : "Sign In"}
                <FaArrowRight  className="inline-block ms-2 text-lg rtl:rotate-180" />
              </button>

              {/* Register */}
              <p className="text-center text-xs md:text-base text-[#6F7E89]">
                {lang === "ar"
                  ? "لا تمتلك حساب بعد؟"
                  : "Don't have an account?"}{" "}
                <Link
                  href="/signup"
                  className="text-[#6F7E89] font-medium hover:underline"
                >
                  {lang === "ar" ? "التسجيل" : "Sign Up"}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}