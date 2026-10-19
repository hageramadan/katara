"use client";
import { useApp } from "@/context/AppContext";

export type TripType = "round" | "oneway" | "multi";

const options: { key: TripType; ar: string; en: string }[] = [
  { key: "round", ar: "رحلة ذهاب و عودة", en: "Round Trip" },
  { key: "oneway", ar: "رحلةإتجاه واحد", en: "One Way" },
  { key: "multi", ar: "وجهات متعددة", en: "Multi-City" },
];

export default function TripTypeSelector({
  value,
  onChange,
}: {
  value: TripType;
  onChange: (t: TripType) => void;
}) {
  const { lang } = useApp();

  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`
              rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer
              sm:px-5 sm:py-2 sm:text-base
              ${
                active
                  ? "bg-primary text-white shadow-md"
                  : "bg-[#C4EAEB66] text-[#0D154B] hover:bg-[#c4eaebab]"
              }
            `}
          >
            {lang === "ar" ? opt.ar : opt.en}
          </button>
        );
      })}
    </div>
  );
}
