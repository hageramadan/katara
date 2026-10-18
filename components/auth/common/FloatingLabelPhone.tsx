"use client";
import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { countries } from "@/lib/countries";
import * as Flags from "country-flag-icons/react/3x2";

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

const phoneLengths: Record<string, number> = {
  EG: 10, KW: 8, SA: 9, AE: 9, QA: 8, BH: 8, OM: 8, JO: 9,
};

const phonePlaceholders: Record<string, { ar: string; en: string }> = {
  EG: { ar: "100 000 0000", en: "100 000 0000" },
  KW: { ar: "5000 0000", en: "5000 0000" },
  SA: { ar: "50 000 0000", en: "50 000 0000" },
  AE: { ar: "50 000 0000", en: "50 000 0000" },
};

type FloatingLabelPhoneProps = {
  label: string;
  required?: boolean;
  value: string;
  dialCode: string;
  onValueChange: (v: string) => void;
  onDialCodeChange: (v: string) => void;
  helper?: string;
};

export default function FloatingLabelPhone({
  label,
  required,
  value,
  dialCode,
  onValueChange,
  onDialCodeChange,
  helper,
}: FloatingLabelPhoneProps) {
  const { lang, dir } = useApp();
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentCountry =
    countries.find((c) => c.dialCode === dialCode) || countries[0];

  const maxDigits = phoneLengths[currentCountry.code] || 10;
  const digitsOnly = value.replace(/\s/g, "");
  const isInvalid = digitsOnly.length > 0 && digitsOnly.length !== maxDigits;

  const dynamicPlaceholder =
    phonePlaceholders[currentCountry.code]?.[lang] || "000 000 0000";

  // Label يطفو لو فيه قيمة أو مفتوح/متفوکس
  const isFloating = focused || value !== "" || open;

  // إغلاق
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const formatPhone = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, maxDigits);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  return (
    <div ref={ref} className="relative">
      <div className="relative" >
        <div
          className={`
            flex items-stretch bg-[#FAFCFE] border rounded-[10px] overflow-hidden
            pt-2 pb-2 transition
            ${
              isInvalid
                ? "border-[#D1454A]"
                : focused
                ? "border-[#0D154B] ring-2 ring-[#0D154B]/10"
                : "border-[#DCE3EC]"
            }
          `}
          dir="ltr"
        >
          {/* Country code button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            onFocus={() => setFocused(true)}
            className="
              flex items-center gap-1.5
              ps-3 pe-2
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

          <input
            type="tel"
            inputMode="numeric"
            value={value}
            onChange={(e) => onValueChange(formatPhone(e.target.value))}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={focused ? dynamicPlaceholder : " "}
            className="
              flex-1 bg-transparent
              px-4 py-2
              text-[#0D154B] text-sm md:text-base font-medium
              outline-none min-w-0
            "
          />
        </div>

        {/* 🏷️ Label على الحد */}
        <label
          className={`
            absolute pointer-events-none
            bg-[#FAFCFE] px-1.5
            transition-all duration-200 ease-out
            ${
              isFloating
                ? "top-0 -translate-y-1/2 text-[11px] md:text-xs font-semibold"
                : "top-1/2 -translate-y-1/2 text-sm md:text-base font-medium"
            }
            ${
              isInvalid
                ? "text-[#D1454A]"
                : focused
                ? "text-[#0D154B]"
                : "text-[#6F7E89]"
            }
            start-3
          `}
        >
          {label}
          {required && <span className="text-[#D1454A] ms-0.5">*</span>}
        </label>
      </div>

      {(helper || isInvalid) && (
        <p
          className={`
            text-[11px] md:text-xs mt-1.5
            ${isInvalid ? "text-[#D1454A] font-medium" : "text-gray-400"}
          `}
        >
          {isInvalid
            ? lang === "ar"
              ? `يجب أن يكون الرقم ${maxDigits} أرقام`
              : `Number must be ${maxDigits} digits`
            : helper}
        </p>
      )}

      {/* Dropdown */}
      {open && (
        <div
          className={`
            absolute top-full mt-2 z-50
            bg-white rounded-[10px]
            border border-[#DCE3EC] shadow-xl
            w-full max-w-xs
            origin-top transition-all duration-200
            overflow-hidden
            ${dir === "rtl" ? "end-0" : "start-0"}
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
                      px-3 py-2.5 text-sm text-start transition
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
                      <span className="text-xs text-gray-400 font-mono">
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
    </div>
  );
}