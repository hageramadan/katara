"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

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
  showPasswordToggle?: boolean;
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
  showPasswordToggle = false,
}: FloatingLabelInputProps) {
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { lang } = useApp();

  // الليبل بيطلع فوق لو الحقل فيه قيمة أو متفوکس عليه
  const isFloating = focused || value !== "";

  return (
    <div className={className}>
      <div className="relative">
        <input
          type={showPasswordToggle && passwordVisible ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          placeholder=" "
          className={`
            peer w-full bg-[#FAFCFE] rounded-[10px]
            px-4 pt-6 pb-2 ${showPasswordToggle ? "pe-12" : ""}
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

        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setPasswordVisible((visible) => !visible)}
            aria-label={passwordVisible
              ? lang === "ar" ? "إخفاء كلمة المرور" : "Hide password"
              : lang === "ar" ? "إظهار كلمة المرور" : "Show password"}
            className="absolute inset-e-3 top-1/2 -translate-y-1/2 rounded p-1 text-[#6F7E89] transition hover:text-[#0D154B]"
          >
            <span className="text-xs font-semibold underline underline-offset-2">
              {passwordVisible
                ? lang === "ar" ? "إخفاء" : "Hide"
                : lang === "ar" ? "إظهار" : "Show"}
            </span>
          </button>
        )}

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
