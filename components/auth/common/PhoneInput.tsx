"use client";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { countries } from "@/lib/countries";
import * as Flags from "country-flag-icons/react/3x2";

// ============ Flag Icon Component ============
const FlagIcon = ({
  code,
  className = "w-6 h-4",
}: {
  code: string;
  className?: string;
}) => {
  const Flag = (
    Flags as Record<string, React.ComponentType<{ className?: string }>>
  )[code];
  return Flag ? <Flag className={className} /> : null;
};

// ============ Phone lengths per country ============
const phoneLengths: Record<string, number> = {
  EG: 10,
  KW: 8,
  SA: 9,
  AE: 9,
  QA: 8,
  BH: 8,
  OM: 8,
  JO: 9,
};

// ============ Placeholders per country ============
const phonePlaceholders: Record<string, { ar: string; en: string }> = {
  EG: { ar: "100 000 0000", en: "100 000 0000" },
  KW: { ar: "5000 0000", en: "5000 0000" },
  SA: { ar: "50 000 0000", en: "50 000 0000" },
  AE: { ar: "50 000 0000", en: "50 000 0000" },
  QA: { ar: "3000 0000", en: "3000 0000" },
  BH: { ar: "3000 0000", en: "3000 0000" },
  OM: { ar: "9000 0000", en: "9000 0000" },
  JO: { ar: "77 000 0000", en: "77 000 0000" },
};

type PhoneInputProps = {
  label: string;
  required?: boolean;
  value: string;
  dialCode: string;
  onValueChange: (v: string) => void;
  onDialCodeChange: (v: string) => void;
  helper?: string;
  placeholder?: string;
};

export default function PhoneInput({
  label,
  required,
  value,
  dialCode,
  onValueChange,
  onDialCodeChange,
  helper,
}: PhoneInputProps) {
  const { lang, dir } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // ✅ الدولة الحالية
  const currentCountry =
    countries.find((c) => c.dialCode === dialCode) || countries[0];

  // ✅ الفلديشن حسب الدولة
  const maxDigits = phoneLengths[currentCountry.code] || 10;
  const digitsOnly = value.replace(/\s/g, "");
  const isInvalid = digitsOnly.length > 0 && digitsOnly.length !== maxDigits;

  // ✅ Placeholder ديناميكي
  const dynamicPlaceholder =
    phonePlaceholders[currentCountry.code]?.[lang] || "000 000 0000";

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

  // ✅ تنسيق الرقم أثناء الكتابة (مسافة كل 4 أرقام)
  const formatPhone = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, maxDigits);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  return (
    <div ref={ref} className="relative">
      {/* ==================== Label ==================== */}
      <label className="block text-xs md:text-sm font-semibold text-[#1E2A3A] mb-2">
        {label}
        {required && <span className="text-[#D1454A] font-bold ms-1">*</span>}
      </label>

      {/* ==================== Phone Row ==================== */}
      <div
      dir="ltr"
        className={`
          flex items-stretch bg-[#FAFCFE] border rounded-[10px] overflow-hidden
          transition
          ${isInvalid ? "border-[#D1454A]" : "border-[#DCE3EC] focus-within:border-[#0D154B] focus-within:ring-2 focus-within:ring-[#0D154B]/10"}
        `}
      >
        {/* ============ Country Code Trigger (ثابت على الشمال) ============ */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="
            flex items-center gap-1.5
            ps-3 pe-2 py-3
            border-e border-[#DCE3EC]
            bg-transparent hover:bg-[#0D154B]/5
            transition cursor-pointer shrink-0
          "
        >
          <FlagIcon
            code={currentCountry.code}
            className="w-6 h-4 rounded-sm shadow-sm"
          />
          <span className="text-[#0D154B] text-sm md:text-base font-semibold">
            {currentCountry.dialCode}
          </span>
          <FiChevronDown
            className={`
              text-[#0D154B] text-sm transition-transform duration-300
              ${open ? "rotate-180" : ""}
            `}
          />
        </button>

        {/* ============ Phone Number Input ============ */}
        <input
        
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={(e) => onValueChange(formatPhone(e.target.value))}
          placeholder={dynamicPlaceholder}
          className="
            flex-1 bg-transparent
            px-4 py-3
            text-[#0D154B] text-sm md:text-base font-medium
            outline-none
            min-w-0
          "
        />
      </div>

      {/* ==================== Dropdown Panel (Countries) ==================== */}
      {open && (
        <div
          className={`
            absolute top-full mt-2 z-50
            bg-white rounded-[10px]
            border border-[#DCE3EC] shadow-xl
            w-full max-w-xs
            origin-top
            transition-all duration-200 ease-out
            overflow-hidden
            ${dir === "rtl" ? "inset-e-0" : "inset-s-0"}
          `}
        >
          <ul className="max-h-64 overflow-y-auto py-1">
            {countries.map((c) => {
              const active = c.code === currentCountry.code;
              return (
                <li key={c.code}>
                  <button
                    type="button"
                    onClick={() => {
                      onDialCodeChange(c.dialCode);
                      setOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between gap-3
                      px-3 py-2.5 text-sm text-start
                      transition
                      ${
                        active
                          ? "bg-[#0D154B]/5 text-[#0D154B] font-semibold"
                          : "text-[#1E2A3A] hover:bg-[#FAFCFE]"
                      }
                    `}
                  >
                    <span className="flex items-center gap-2.5">
                      <FlagIcon
                        code={c.code}
                        className="w-6 h-4 rounded-sm shadow-sm shrink-0"
                      />
                      <span className="truncate">
                        {lang === "ar" ? c.nameAr : c.nameEn}
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-xs md:text-sm text-gray-400 font-mono">
                        {c.dialCode}
                      </span>
                      {active && (
                        <FiCheck className="text-[#0D154B] shrink-0" />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* ==================== Helper / Error ==================== */}
      {isInvalid ? (
        <p className="text-[11px] md:text-xs text-[#D1454A] mt-1.5 font-medium">
          {lang === "ar"
            ? `يجب أن يكون الرقم ${maxDigits} أرقام`
            : `Number must be ${maxDigits} digits`}
        </p>
      ) : (
        helper && (
          <p className="text-[11px] md:text-xs text-gray-400 mt-1.5">{helper}</p>
        )
      )}
    </div>
  );
}