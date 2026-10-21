"use client";
import type { KeyboardEvent } from "react";
import { useApp } from "@/context/AppContext";
import { FaSuitcaseRolling } from "react-icons/fa6";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import type { ServiceTab } from "@/lib/booking/types";

type ServiceTabsProps = {
  active: ServiceTab;
  onChange: (tab: ServiceTab) => void;
};

export default function ServiceTabs({ active, onChange }: ServiceTabsProps) {
  const { lang } = useApp();

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, current: ServiceTab) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    let next: ServiceTab = current === "seats" ? "baggage" : "seats";

    if (event.key === "Home") next = "seats";
    if (event.key === "End") next = "baggage";

    onChange(next);
    document.getElementById(`service-tab-${next}`)?.focus();
  }

  return (
    <>
      {/* ==================== Service Tabs ==================== */}
      <div
        className="flex border border-[var(--color-primary-100)]"
        role="tablist"
        aria-label={lang === "ar" ? "خدمات إضافية" : "Extra services"}
      >
        {(["seats", "baggage"] as const).map((item) => (
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
            className={`flex min-h-16 min-w-0 flex-1 flex-col items-center justify-center gap-2 px-2 py-3 text-sm leading-relaxed font-semibold sm:flex-row sm:px-3 sm:py-4 ${active === item ? "bg-primary text-white" : "bg-primary-50 text-primary"}`}
          >
            {item === "seats"
              ? (
                <MdAirlineSeatReclineNormal
                  aria-hidden="true"
                  className="shrink-0 text-lg"
                />
              )
              : (
                <FaSuitcaseRolling
                  aria-hidden="true"
                  className="shrink-0"
                />
              )}
            {item === "seats"
              ? (lang === "ar" ? "تخصيص المقعد" : "Seat selection")
              : (lang === "ar" ? "إضافة وترقية الأمتعة" : "Add and upgrade baggage")}
          </button>
        ))}
      </div>
    </>
  );
}
