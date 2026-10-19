"use client";
import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { FiCalendar } from "react-icons/fi";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useApp } from "@/context/AppContext";
import "react-day-picker/dist/style.css";

export default function DatePicker({
  value,
  onChange,
  label,
  placeholderAr = "اختر التاريخ",
  placeholderEn = "Select date",
  align = "end",
  className = "",
}: {
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
  label?: string;
  placeholderAr?: string;
  placeholderEn?: string;
  align?: "start" | "end";
  className?: string;
}) {
  const { lang } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const locale = lang === "ar" ? ar : enUS;
  const displayValue = value
    ? format(value, "d MMM yyyy", { locale })
    : lang === "ar"
    ? placeholderAr
    : placeholderEn;

  // إغلاق عند الضغط برّه
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // إغلاق بـ Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className={`relative ${className}`} ref={ref}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-full text-start px-3 py-2 sm:px-4 sm:py-3 hover:bg-gray-100 transition"
      >
        {label && (
          <span className="text-xs sm:text-base text-[#4A4A4A] block mb-1 sm:mb-2 cursor-pointer">
            {label}
          </span>
        )}
        <div className="flex items-center justify-between cursor-pointer">
          <span
            className={`font-bold text-xs sm:text-sm ${
              value ? "text-[#333333]" : "text-gray-400"
            }`}
          >
            {displayValue}
          </span>
          <FiCalendar className="text-[#777777] w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </button>

      {/* Calendar Panel */}
      {open && (
        <div
          className={`
            absolute top-full mt-2 z-50 w-[min(19rem,calc(100vw-2rem))] bg-white rounded-2xl shadow-2xl border border-primary/10 p-2 sm:p-3
            ${align === "end" ? "inset-e-0" : "inset-s-0"}
          `}
        >
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(d) => {
              onChange(d);
              setOpen(false);
            }}
            locale={locale}
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="katra-daypicker"
          />
        </div>
      )}
    </div>
  );
}
