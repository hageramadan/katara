"use client";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

export type SelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  width?: string; // مثال: "w-56" أو "w-full"
};

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "اختر...",
  ariaLabel,
  className = "",
  width = "w-full sm:w-auto",
}: CustomSelectProps) {
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
    <div ref={ref} className={`relative ${width} ${className}`}>
      {/* ==================== Trigger ==================== */}
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`
          w-full flex items-center justify-between gap-2
          bg-white rounded-xl
          px-4 py-2.5 border
          text-xs md:text-sm font-semibold text-[#0D154B]
          outline-none transition cursor-pointer
          ${
            open
              ? "border-[#0D154B] ring-2 ring-[#0D154B]/10"
              : "border-[#DCE3EC] hover:border-[#0D154B]/40"
          }
        `}
      >
        <span className="truncate text-start">
          {selected ? selected.label : placeholder}
        </span>
        <FiChevronDown
          className={`
            text-[#0D154B] text-sm shrink-0 transition-transform duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* ==================== Panel ==================== */}
      <div
        className={`
          absolute top-full mt-2 inset-s-0 w-full z-50
          bg-white rounded-xl
          border border-[#DCE3EC] shadow-xl
          origin-top transition-all duration-200 ease-out
          overflow-hidden
          ${
            open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
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
                    transition
                    ${
                      active
                        ? "bg-[#0D154B]/5 text-[#0D154B] font-semibold"
                        : "text-[#172B35] hover:bg-[#FAFCFE]"
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
    </div>
  );
}
