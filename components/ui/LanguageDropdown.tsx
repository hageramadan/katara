"use client";
import { FiGlobe, FiCheck } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import Dropdown from "./Dropdown";
import { Lang } from "@/lib/translations";

const languages: { code: Lang; name: string; native: string }[] = [
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "en", name: "English", native: "English" },
];

export default function LanguageDropdown({
  onSelect,
  className,
  triggerClassName,
  width = "w-44",
}: {
  onSelect?: () => void;
  className?: string;
  triggerClassName?: string;
  width?: string;
} = {}) {
  const { lang, setLang } = useApp();
  const current = languages.find((l) => l.code === lang)!;

  return (
    <Dropdown
      width={width}
      className={className}
      triggerClassName={triggerClassName}
      trigger={
        <>
          {/* <FiGlobe className="text-sm" /> */}
          <span>{current.native}</span>
        </>
      }
    >
      {(close) => (
        <div className="py-1">
          {/* <div className="px-4 py-2 text-xs text-gray-400 font-semibold border-b border-gray-100">
            {lang === "ar" ? "اختر اللغة" : "Select Language"}
          </div> */}

          {languages.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  close();
                  onSelect?.();
                }}
                className={`
                  w-full flex items-center justify-between px-4 py-2.5 text-sm
                  transition-colors
                  ${
                    active
                      ? "bg-secondary-soft text-primary font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <span className="flex items-center gap-3">
                  <span className="text-base">
                    {l.code === "ar" ? "🇸🇦" : "🇬🇧"}
                  </span>
                  <span>{l.native}</span>
                </span>
                {active && <FiCheck className="text-primary text-base" />}
              </button>
            );
          })}
        </div>
      )}
    </Dropdown>
  );
}
