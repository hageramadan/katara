"use client";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

type CheckboxFieldProps = {
  checked: boolean;
  onChange: (v: boolean) => void;
  required?: boolean;
};

export default function CheckboxField({
  checked,
  onChange,
  required,
}: CheckboxFieldProps) {
  const { lang } = useApp();

  return (
    <label className="flex items-center gap-2 cursor-pointer select-none pb-4 border-b border-gray-200">
      <span className="text-xs md:text-sm text-[#2A3A4A]">
        {lang === "ar" ? "أوافق على" : "I agree to"}{" "}
         {required && <span className="text-[#D1454A] font-bold mx-1">*</span>}
        <Link href="/terms" className="text-[#00A8B5] hover:underline">
          {lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
        </Link>
       
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={`
          w-5 h-5 rounded-md border-2 flex items-center justify-center transition
          ${checked ? "bg-[#0D154B] border-[#0D154B]" : "bg-white border-gray-300"}
        `}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      
    </label>
  );
}