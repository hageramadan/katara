"use client";
import { useApp } from "@/context/AppContext";
import { FiCheck } from "react-icons/fi";

const filters = [
  { key: "baggage", ar: "أمتعة فقط", en: "Baggage Only" },
  { key: "direct", ar: "الرحلات المباشرة", en: "Direct Flights" },
  { key: "refundable", ar: "قابلة للاسترداد", en: "Refundable" },
  { key: "flexible", ar: "تواريخ مرنة ±3 أيام", en: "Flexible Dates ±3 Days" },
];

export default function FlightFilters({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const { lang } = useApp();

  const toggle = (key: string) => {
    // onChange(
    //   value.includes(key) ? value.filter((k) => k !== key) : [...value, key]
    // );
  };

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3">
      {filters.map((f) => {
        const checked = value.includes(f.key);
        return (
          <label
            key={f.key}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group select-none"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(f.key)}
              className="sr-only"
            />
            {/* ✅ مربع مع علامة صح */}
            <span
              className={`
                w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
                ${
                  checked
                    ? "bg-primary border-primary scale-100"
                    : "bg-white border-gray-300 group-hover:border-primary"
                }
              `}
            >
              <FiCheck
                className={`
                  text-white text-xs transition-all duration-200
                  ${checked ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                `}
                strokeWidth={3}
              />
            </span>
            <span
              className={`
                text-xs sm:text-sm transition-colors
                ${checked ? "text-primary font-medium" : "text-gray-500 group-hover:text-primary"}
              `}
            >
              {lang === "ar" ? f.ar : f.en}
            </span>
          </label>
        );
      })}
    </div>
  );
}
