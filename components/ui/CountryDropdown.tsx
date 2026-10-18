"use client";
import { FiCheck } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { countries } from "@/lib/countries";
import Dropdown from "./Dropdown";
import * as Flags from "country-flag-icons/react/3x2";

export default function CountryDropdown() {
  const { lang, country, setCountry } = useApp();

  // ✅ دالة تجيب علم الدولة كـ component
  const FlagIcon = ({ code, className = "w-6 h-4" }: { code: string; className?: string }) => {
    const Flag = (Flags as Record<string, React.ComponentType<{ className?: string }>>)[code];
    return Flag ? <Flag className={className} /> : null;
  };

  return (
    <Dropdown
      width="w-64"
      trigger={
        <>
         <span>{lang === "ar" ? country.nameAr : country.nameEn}</span>
          <FlagIcon code={country.code} className="w-6 h-4 rounded-sm shadow-sm" />
         
        </>
      }
    >
      {(close) => (
        <div className="max-h-80 overflow-y-auto py-1">
          {/* Header */}
          {/* <div className="px-4 py-2 text-xs text-gray-400 font-semibold border-b border-gray-100">
            {lang === "ar" ? "اختر الدولة" : "Select Country"}
          </div> */}

          {countries.map((c) => {
            const active = c.code === country.code;
            return (
              <button
                key={c.code}
                onClick={() => {
                  setCountry(c);
                  close();
                }}
                className={`
                  w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm
                  transition-colors
                  ${
                    active
                      ? "bg-secondary-soft text-primary font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <span className="flex items-center gap-3">
                  <FlagIcon
                    code={c.code}
                    className="w-6 h-4 rounded-sm shadow-sm"
                  />
                  <span>{lang === "ar" ? c.nameAr : c.nameEn}</span>
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono">
                    {c.currency}
                  </span>
                  {active && <FiCheck className="text-primary text-base" />}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </Dropdown>
  );
}