"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

type Option = { value: string; label: string; icon?: ReactNode };

type Props = {
  label: string;
  required?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  selectAll?: boolean;
  placeholder?: string;
  helper?: string;
  disabled?: boolean;
  error?: string;
};

export default function MultiSelectField({ label, required, value, onChange, options, selectAll, placeholder, helper, disabled = false, error }: Props) {
  const { lang } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const selected = options.filter((option) => value.includes(option.value));
  const allSelected = options.length > 0 && selected.length === options.length;

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        if (ref.current?.contains(document.activeElement)) {
          ref.current.querySelector("button")?.focus();
        }
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div ref={ref} className="relative min-w-0" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <span id={`${id}-label`} className="mb-2 block text-xs font-semibold text-[#1E2A3A] md:text-sm">
        {label}{required && <span className="ms-1 font-bold text-[#D1454A]">*</span>}
      </span>
      <button type="button" aria-labelledby={`${id}-label ${id}-value`} aria-expanded={open}
        disabled={disabled} aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
        aria-controls={open ? `${id}-options` : undefined} onClick={() => setOpen(!open)}
        className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-[10px] border bg-[#FAFCFE] px-4 py-3 text-start text-sm outline-none transition hover:border-[#0D154B]/40 focus-visible:ring-2 focus-visible:ring-[#0D154B]/20 disabled:cursor-not-allowed disabled:opacity-60 ${error ? "border-[#D1454A]" : open ? "border-[#0D154B] ring-2 ring-[#0D154B]/10" : "border-[#DCE3EC]"}`}>
        <span id={`${id}-value`} className={`truncate ${selected.length ? "text-[#0D154B]" : "text-gray-400"}`}>
          {selectAll && allSelected ? (lang === "ar" ? "الجميع" : "All") : selected.map((option) => option.label).join(lang === "ar" ? "، " : ", ") || placeholder || (lang === "ar" ? "اختر..." : "Select...")}
        </span>
        <FiChevronDown className={`shrink-0 text-[#0D154B] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && !disabled && (
        <fieldset id={`${id}-options`} aria-labelledby={`${id}-label`} className="absolute inset-x-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-[10px] border border-[#DCE3EC] bg-white p-2 shadow-xl">
          {selectAll && (
            <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-3 text-sm text-[#1E2A3A] hover:bg-[#FAFCFE]">
              <input type="checkbox" checked={allSelected} onChange={() => onChange(allSelected ? [] : options.map((option) => option.value))} className="size-5 shrink-0 accent-[#24285D]" />
              {lang === "ar" ? "الجميع" : "All"}
            </label>
          )}
          {options.map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-3 text-sm text-[#1E2A3A] hover:bg-[#FAFCFE]">
              <input type="checkbox" checked={value.includes(option.value)} onChange={() => onChange(value.includes(option.value) ? value.filter((item) => item !== option.value) : [...value, option.value])} className="size-5 shrink-0 accent-[#24285D]" />
              <span className="flex min-w-0 items-center gap-2">{option.icon}{option.label}</span>
            </label>
          ))}
        </fieldset>
      )}
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs text-[#D1454A]">{error}</p>}
      {helper && <p id={`${id}-helper`} className="mt-1.5 text-[11px] text-gray-400 md:text-xs">{helper}</p>}
    </div>
  );
}
