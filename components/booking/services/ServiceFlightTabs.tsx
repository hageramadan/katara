"use client";
import { useApp } from "@/context/AppContext";
import { serviceFlights } from "@/lib/booking/services";
import type { FlightKey } from "@/lib/booking/types";

type ServiceFlightTabsProps = {
  activeFlight: FlightKey;
  onChange: (flight: FlightKey) => void;
};

export default function ServiceFlightTabs({ activeFlight, onChange }: ServiceFlightTabsProps) {
  const { lang } = useApp();

  return (
    <>
      {/* ==================== Flight Tabs ==================== */}
      <div
        className="mb-6 grid grid-cols-2 gap-2 sm:mb-8 sm:flex sm:gap-3 border-b border-slate-200"
        aria-label={lang === "ar" ? "الرحلة" : "Flight"}
      >
        {serviceFlights.map((flight) => (
          <button
            key={flight.id}
            type="button"
            aria-pressed={activeFlight === flight.id}
            onClick={() => onChange(flight.id)}
            className={`min-w-0 border-b-2 px-2 py-4 sm:min-w-48 sm:shrink-0 sm:px-5 text-start transition ${activeFlight === flight.id ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-[var(--color-primary)]"}`}
          >
            <span className="mb-2 block text-xs text-slate-400">
              {lang === "ar" ? flight.titleAr : flight.titleEn}
            </span>
            <span className="block break-words text-sm font-bold leading-relaxed">
              {lang === "ar" ? flight.from.cityAr : flight.from.cityEn}
              {" "}
              {lang === "ar" ? " إلى " : " to "}
              {lang === "ar" ? flight.to.cityAr : flight.to.cityEn}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
