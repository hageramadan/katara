"use client";
import { useId, useState } from "react";
import { useApp } from "@/context/AppContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

type PasswordFieldProps = {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  helper?: string;
  minLength?: number;
  error?: string;
};

export default function PasswordField({
  label,
  required,
  value,
  onChange,
  placeholder = "••••••••",
  helper,
  minLength,
  error,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);
  const id = useId();
  const { lang } = useApp();
  const lengthError = minLength && value.length > 0 && value.length < minLength
    ? (lang === "ar" ? `كلمة المرور يجب ألا تقل عن ${minLength} أحرف أو أرقام.` : `Password must have at least ${minLength} characters.`)
    : undefined;
  const validationError = lengthError ?? error;

  return (
    <div>
      <label htmlFor={id} className="block text-xs md:text-sm font-semibold text-[#1E2A3A] mb-2">
       {label}
        {required && <span className="text-[#D1454A] font-bold ms-1">*</span>}
        
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          required={required}
          minLength={minLength}
          aria-invalid={Boolean(validationError)}
          aria-describedby={validationError ? `${id}-error` : helper ? `${id}-helper` : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full bg-[#FAFCFE] rounded-[10px]
          px-4 py-3 pe-12 border ${validationError ? "border-[#D1454A]" : "border-[#DCE3EC]"}
          text-[#0D154B] text-sm md:text-sm font-medium
          outline-none focus:ring-2 focus:ring-[#0D154B]/20
          transition
          `}
        />
        <button
          type="button"
          aria-label={show ? (lang === "ar" ? "إخفاء كلمة المرور" : "Hide password") : (lang === "ar" ? "إظهار كلمة المرور" : "Show password")}
          onClick={() => setShow(!show)}
          className="absolute top-1/2 -translate-y-1/2 inset-e-4 text-gray-400 hover:text-[#0D154B] transition"
        >
          {show ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
        </button>
      </div>
      {validationError && <p id={`${id}-error`} className="mt-1.5 text-xs text-[#D1454A]">{validationError}</p>}
      {helper && !validationError && (
        <p id={`${id}-helper`} className="text-[11px] md:text-xs text-gray-400 mt-1.5">{helper}</p>
      )}
    </div>
  );
}
