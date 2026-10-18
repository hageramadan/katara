"use client";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { BookingCategory } from "@/lib/bookings/types";

type BookingFilterSelectProps = {
  value: BookingCategory;
  onChange: (v: BookingCategory) => void;
};

const options: { value: BookingCategory; ar: string; en: string }[] = [
  { value: "flights", ar: "حجوزات الطيران", en: "Flight Bookings" },
  { value: "hotels", ar: "حجوزات فنادق", en: "Hotel Bookings" },
];

export default function BookingFilterSelect({
  value,
  onChange,
}: BookingFilterSelectProps) {
  const { lang } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // إغلاق عند الضغط برّه
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
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
    <div ref={ref} className="relative">
      {/* ==================== Trigger Button ==================== */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          flex items-center justify-between gap-2
          bg-white rounded-xl
          ps-4 pe-9 py-2.5 border
          text-xs md:text-sm font-semibold
          outline-none transition
          cursor-pointer
          ${
            open
              ? "border-[#0D154B] ring-2 ring-[#0D154B]/10"
              : "border-[#DCE3EC] hover:border-[#0D154B]/40"
          }
          ${selected ? "text-[#0D154B]" : "text-gray-400"}
        `}
      >
        <span className="truncate">
          {selected ? (lang === "ar" ? selected.ar : selected.en) : (lang === "ar" ? "اختر..." : "Select...")}
        </span>
        <FiChevronDown
          className={`
            text-[#0D154B] text-sm shrink-0 transition-transform duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* ==================== Dropdown Panel ==================== */}
      <div
        className={`
          absolute top-full mt-2 inset-s-0 min-w-full w-max z-50
          bg-white rounded-xl
          border border-[#DCE3EC] shadow-xl
          origin-top
          transition-all duration-200 ease-out
          ${
            open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
          overflow-hidden
        `}
      >
        <ul className="max-h-64 overflow-y-auto py-1">
          {options.map((o) => {
            const active = o.value === value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between gap-3
                    px-4 py-2.5 text-xs md:text-sm text-start
                    transition cursor-pointer whitespace-nowrap
                    ${
                      active
                        ? "text-[#0D154B] font-semibold"
                        : "text-[#1E2A3A] hover:bg-blue-50"
                    }
                  `}
                >
                  <span className="truncate">{lang === "ar" ? o.ar : o.en}</span>
                  {active && <FiCheck className="text-[#0D154B] shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}