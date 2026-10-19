"use client";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { FiArrowLeft, FiArrowRight, FiHome } from "react-icons/fi";

export default function NotFoundPage() {
  const { lang, dir } = useApp();

  return (
    <section className="min-h-screen bg-[#F7F9FB] flex items-center justify-center px-4 py-16 relative overflow-hidden">

      {/* ==================== Decorative Blobs ==================== */}
      <div className="absolute top-0 inset-e-0 w-80 h-80 rounded-full bg-[#0D154B]/5 blur-3xl -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 inset-s-0 w-80 h-80 rounded-full bg-[#C4EAEB]/30 blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="relative z-10 max-w-2xl w-full text-center">

     

        {/* ==================== 404 Badge ==================== */}
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#0D154B]/5 text-[#0D154B] text-xs md:text-sm font-bold mb-4">
          Error 404
        </span>

        {/* ==================== Title ==================== */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#163B45] mb-4 leading-tight">
          {lang === "ar"
            ? "الصفحة غير موجودة"
            : "Page Not Found"}
        </h1>

        {/* ==================== Description ==================== */}
        <p className="text-sm md:text-base text-[#6F7E89] leading-relaxed max-w-md mx-auto mb-8">
          {lang === "ar"
            ? "عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. تحقق من الرابط أو عد إلى الصفحة الرئيسية."
            : "Sorry, the page you're looking for doesn't exist or has been moved. Check the URL or go back home."}
        </p>

        {/* ==================== Actions ==================== */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="
              inline-flex items-center justify-center gap-2
              bg-[#0D154B] text-white font-bold text-sm md:text-base
              px-8 py-3.5 rounded-full w-full sm:w-auto
              hover:opacity-90 active:scale-[0.99] transition
            "
          >
            <FiHome className="text-base" />
            {lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="
              inline-flex items-center justify-center gap-2
              border-2 border-[#0D154B] text-[#0D154B] font-bold
              text-sm md:text-base px-8 py-3 rounded-full w-full sm:w-auto
              hover:bg-[#0D154B] hover:text-white transition
            "
          >
            {dir === "rtl" ? (
              <FiArrowRight className="text-base" />
            ) : (
              <FiArrowLeft className="text-base" />
            )}
            {lang === "ar" ? "العودة للخلف" : "Go Back"}
          </button>
        </div>

      </div>
    </section>
  );
}