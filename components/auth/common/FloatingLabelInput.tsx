"use client";
import { useState } from "react";

type FloatingLabelInputProps = {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  helper?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
};

export default function FloatingLabelInput({
  label,
  required,
  value,
  onChange,
  type = "text",
  helper,
  error,
  className = "",
  disabled,
}: FloatingLabelInputProps) {
  const [focused, setFocused] = useState(false);

  // الليبل بيطلع فوق لو الحقل فيه قيمة أو متفوکس عليه
  const isFloating = focused || value !== "";

  return (
    <div className={className}>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          placeholder=" "
          className={`
            peer w-full bg-[#FAFCFE] rounded-[10px]
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
            disabled:opacity-60 disabled:cursor-not-allowed
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
            ${
              isFloating
                ? focused
                  ? "text-[#0D154B]"
                  : "text-[#6F7E89]"
                : "text-[#6F7E89]"
            }
            start-3
          `}
        >
          {label}
          {required && <span className="text-[#D1454A] ms-0.5">*</span>}
        </label>
      </div>

      {/* Helper / Error */}
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