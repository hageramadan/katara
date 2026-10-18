"use client";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type PasswordFieldProps = {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  helper?: string;
};

export default function PasswordField({
  label,
  required,
  value,
  onChange,
  placeholder = "••••••••",
  helper,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block text-xs md:text-sm font-semibold text-[#1E2A3A] mb-2">
       {label}
        {required && <span className="text-[#D1454A] font-bold ms-1">*</span>}
        
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            w-full bg-[#FAFCFE] rounded-[10px]
          px-4 py-3 border border-[#DCE3EC]
          text-[#0D154B] text-sm md:text-sm font-medium
          outline-none focus:ring-2 focus:ring-[#0D154B]/20
          transition
          "
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute top-1/2 -translate-y-1/2 inset-e-4 text-gray-400 hover:text-[#0D154B] transition"
        >
          {show ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
        </button>
      </div>
      {helper && (
        <p className="text-[11px] md:text-xs text-gray-400 mt-1.5">{helper}</p>
      )}
    </div>
  );
}