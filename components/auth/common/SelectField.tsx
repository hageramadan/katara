"use client";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

type Option = { value: string; label: string };

type SelectFieldProps = {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  helper?: string;
};

export default function SelectField({
  label,
  required,
  value,
  onChange,
  options,
  placeholder,
  helper,
}: SelectFieldProps) {
  const { lang } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const defaultPlaceholder =
    placeholder ?? (lang === "ar" ? "اختر..." : "Select...");

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
      {/* ==================== Label ==================== */}
      <label className="block text-xs md:text-sm font-semibold text-[#1E2A3A] mb-2">
        {label}
        {required && <span className="text-[#D1454A] font-bold ms-1">*</span>}
      </label>

      {/* ==================== Trigger Button ==================== */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          w-full flex items-center justify-between gap-2
          bg-[#FAFCFE] rounded-[10px]
          px-4 py-3 border
          text-sm md:text-sm font-medium
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
          {selected ? selected.label : defaultPlaceholder}
        </span>
        <FiChevronDown
          className={`
            text-[#0D154B] text-base shrink-0 transition-transform duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* ==================== Dropdown Panel ==================== */}
      <div
        className={`
          absolute top-full mt-2 inset-s-0 w-full z-50
          bg-white rounded-[10px]
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
          {options.length === 0 && (
            <li className="px-4 py-3 text-sm text-gray-400 text-center">
              {lang === "ar" ? "لا توجد خيارات" : "No options"}
            </li>
          )}

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
                    px-4 py-2.5 text-sm text-start
                    transition cursor-pointer
                    ${
                      active
                        ? " text-[#0D154B] font-semibold"
                        : "text-[#1E2A3A] hover:bg-blue-50"
                    }
                  `}
                >
                  <span className="truncate">{o.label}</span>
                  {active && <FiCheck className="text-[#0D154B] shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ==================== Helper ==================== */}
      {helper && (
        <p className="text-[11px] md:text-xs text-gray-400 mt-1.5">{helper}</p>
      )}
    </div>
  );
}
