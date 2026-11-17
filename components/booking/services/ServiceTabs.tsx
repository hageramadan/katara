"use client";
import type { KeyboardEvent } from "react";
import { useApp } from "@/context/AppContext";
import type { ServiceTab } from "@/lib/booking/types";

type ServiceTabsProps = {
  active: ServiceTab;
  onChange: (tab: ServiceTab) => void;
};

export default function ServiceTabs({ active, onChange }: ServiceTabsProps) {
  const { lang, dir } = useApp();
  const tabs: ServiceTab[] = ["seats", "baggage", "meals"];

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, current: ServiceTab) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    const step = (event.key === "ArrowRight" ? 1 : -1) * (dir === "rtl" ? -1 : 1);
    let next = tabs[(tabs.indexOf(current) + step + tabs.length) % tabs.length];

    if (event.key === "Home") next = "seats";
    if (event.key === "End") next = "meals";

    onChange(next);
    document.getElementById(`service-tab-${next}`)?.focus();
  }

  return (
    <>
      {/* ==================== Service Tabs ==================== */}
      <div
        className="flex overflow-hidden rounded-md border border-[#CBCDD7]"
        role="tablist"
        aria-label={lang === "ar" ? "خدمات إضافية" : "Extra services"}
      >
        {tabs.map((item) => (
          <button
            key={item}
            id={`service-tab-${item}`}
            type="button"
            role="tab"
            aria-selected={active === item}
            aria-controls="service-panel"
            tabIndex={active === item ? 0 : -1}
            onClick={() => onChange(item)}
            onKeyDown={(event) => handleKeyDown(event, item)}
            className={`flex min-h-12 min-w-0 flex-1 items-center justify-center border-e border-[#CBCDD7] px-2 py-3 text-[11px] leading-relaxed font-bold last:border-e-0 sm:px-3 sm:text-sm ${active === item ? "bg-primary text-white" : "bg-[#D8D9E2] text-primary hover:bg-primary-100"}`}
          >
            {item === "seats"
              ? (lang === "ar" ? "تخصيص المقعد" : "Seat selection")
              : item === "baggage"
                ? (lang === "ar" ? "إضافة وترقية الأمتعة" : "Add and upgrade baggage")
                : (lang === "ar" ? "إضافة وجبات" : "Add meals")}
          </button>
        ))}
      </div>
    </>
  );
}
