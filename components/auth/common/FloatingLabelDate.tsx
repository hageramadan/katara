"use client";
import { useState } from "react";
import { FiCalendar } from "react-icons/fi";

type FloatingLabelDateProps = {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  helper?: string;
  error?: string;
};

export default function FloatingLabelDate({
  label,
  required,
  value,
  onChange,
  helper,
  error,
}: FloatingLabelDateProps) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value !== "";

  return (
    <div>
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          className={`
            w-full bg-[#FAFCFE] rounded-[10px]
            px-4 pt-6 pb-2 
            text-[#0D154B] text-sm md:text-base font-medium
            border outline-none transition
            ${
              error
                ? "border-[#D1454A]"
                : focused
                ? "border-[#0D154B] ring-2 ring-[#0D154B]/10"
                : "border-[#DCE3EC]"
            }
          `}
        />

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
              error
                ? "text-[#D1454A]"
                : focused
                ? "text-[#0D154B]"
                : "text-[#6F7E89]"
            }
            inset-s-3
          `}
        >
          {label}
          {required && <span className="text-[#D1454A] ms-0.5">*</span>}
        </label>

        {/* 📅 Calendar icon */}
        {/* <FiCalendar className="absolute top-1/2 end-4 -translate-y-1/2 text-[#6F7E89] pointer-events-none" /> */}
      </div>

      {(helper || error) && (
        <p
          className={`
            text-[11px] md:text-xs mt-1.5
            ${error ? "text-[#D1454A] font-medium" : "text-gray-400"}
          `}
        >
          {error || helper}
        </p>
      )}
    </div>
  );
}