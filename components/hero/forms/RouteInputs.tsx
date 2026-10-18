"use client";
import { useApp } from "@/context/AppContext";
import { GoArrowSwitch } from "react-icons/go";

export default function RouteInputs({ className = "" }: { className?: string }) {
  const { lang } = useApp();

  return (
    <div className={`relative flex items-center gap-2 ${className}`}>
      {/* From */}
      <div className="flex-1 bg-[#F7F7F7] rounded-xl px-4 py-3 hover:bg-gray-100 transition">
        <label className="text-base text-[#4A4A4A] block mb-2">
          {lang === "ar" ? "من" : "From"}
        </label>
        <input
          defaultValue={lang === "ar" ? "القاهرة" : "Cairo"}
          className="bg-transparent outline-none w-full text-[#333333] font-bold text-base"
        />
      </div>

      {/* Swap Button */}
      <button className="absolute p-1.5  inset-s-[48%] bg-[#F7F7F7] -translate-x-1/2 rtl:translate-x-1/2 z-10 w-12 h-12 rounded-full  border-2 border-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition">
        <GoArrowSwitch className="w-8 h-8 p-1" />
      </button>

      {/* To */}
      <div className="flex-1 bg-[#F7F7F7] rounded-xl px-4 py-3 hover:bg-gray-100 transition">
        <label className="text-base text-[#4A4A4A] block mb-2">
          {lang === "ar" ? "إلى" : "To"}
        </label>
        <input
          defaultValue={lang === "ar" ? "جدة" : "Jeddah"}
          className="bg-transparent outline-none w-full text-[#333333] font-bold text-base"
        />
      </div>
    </div>
  );
}