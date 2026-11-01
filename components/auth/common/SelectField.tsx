"use client";
import { useEffect, useId, useRef, useState } from "react";
import { FiChevronDown, FiCheck, FiSearch } from "react-icons/fi";
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
  disabled?: boolean;
  error?: string;
  name?: string;
};

export default function SelectField({
  label,
  required,
  value,
  onChange,
  options,
  placeholder,
  helper,
  disabled = false,
  error,
  name,
}: SelectFieldProps) {
  const { lang } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const [search, setSearch] = useState("");
  const searchable = options.length > 10;
  const visibleOptions = options.filter((option) => option.label.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()));

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
      if (e.key === "Escape" && ref.current?.contains(document.activeElement)) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={ref} className="relative min-w-0" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      {/* ==================== Label ==================== */}
      <label htmlFor={id} className="block text-xs md:text-sm font-semibold text-[#1E2A3A] mb-2">
        {label}
        {required && <span className="text-[#D1454A] font-bold ms-1">*</span>}
      </label>

      {/* ==================== Trigger Button ==================== */}
      <button
        id={id}
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-controls={open ? `${id}-options` : undefined}
        aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
        onClick={() => { setSearch(""); setOpen(!open); }}
        className={`
          w-full flex items-center justify-between gap-2
          bg-[#FAFCFE] rounded-[10px]
          px-4 py-3 border
          text-sm md:text-sm font-medium
          outline-none transition
          cursor-pointer text-start disabled:cursor-not-allowed disabled:opacity-60
          ${
            open
              ? "border-[#0D154B] ring-2 ring-[#0D154B]/10"
              : error ? "border-[#D1454A]" : "border-[#DCE3EC] hover:border-[#0D154B]/40"
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
      {name && <input type="hidden" name={name} value={value} disabled={disabled} />}

      {/* ==================== Dropdown Panel ==================== */}
      {open && !disabled && <div
        id={`${id}-options`}
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
        {searchable && (
          <div className="flex items-center gap-2 border-b border-[#E5EBEE] px-3 py-2">
            <FiSearch aria-hidden="true" className="shrink-0 text-[#6F7E89]" />
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)}
              aria-label={lang === "ar" ? `بحث في ${label}` : `Search ${label}`}
              placeholder={lang === "ar" ? "بحث..." : "Search..."}
              className="min-w-0 flex-1 rounded-md bg-[#FAFCFE] px-2 py-2 text-sm text-[#0D154B] outline-none focus:ring-2 focus:ring-[#0D154B]/10" />
          </div>
        )}
        <ul className="max-h-64 overflow-y-auto py-1">
          {visibleOptions.length === 0 && (
            <li className="px-4 py-3 text-sm text-gray-400 text-center">
              {lang === "ar" ? "لا توجد نتائج" : "No results"}
            </li>
          )}

          {visibleOptions.map((o) => {
            const active = o.value === value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className={`
                    w-full flex items-center justify-between gap-3
                    px-4 py-2.5 text-sm text-start
                    transition cursor-pointer
                    ${
                      active
                        ? "bg-[#E5F6F7] text-[#163B45] font-semibold"
                        : "text-[#1E2A3A] hover:bg-[#F0F8F9] focus-visible:bg-[#F0F8F9]"
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
      </div>}

      {/* ==================== Helper ==================== */}
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs text-[#D1454A]">{error}</p>}
      {helper && (
        <p id={`${id}-helper`} className="text-[11px] md:text-xs text-gray-400 mt-1.5">{helper}</p>
      )}
    </div>
  );
}
