"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
import { FiChevronDown } from "react-icons/fi";

type DropdownProps = {
  trigger: ReactNode;
  children: (close: () => void) => ReactNode;
  align?: "start" | "end";
  width?: string;
  /** ✅ className إضافية للحاوية الرئيسية */
  className?: string;
  /** ✅ className إضافية للزرار (trigger) */
  triggerClassName?: string;
  /** ✅ className إضافية للـ panel */
  panelClassName?: string;
};

export default function Dropdown({
  trigger,
  children,
  align = "end",
  width = "w-56",
  className = "",
  triggerClassName = "",
  panelClassName = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-1.5 font-bold text-primary text-sm hover:opacity-80 transition
          ${triggerClassName}
        `}
      >
        {trigger}
        <FiChevronDown
          className={`text-sm transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Panel */}
      <div
        className={`
          absolute top-full mt-3 ${align === "end" ? "lg:inset-e-0" : "inset-s-0"} ${width}
          bg-white rounded-xl shadow-xl border border-primary/10
          origin-top
          transition-all duration-200 ease-out
          ${
            open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
          z-50 overflow-hidden
          ${panelClassName}
        `}
      >
        {children(() => setOpen(false))}
      </div>
    </div>
  );
}