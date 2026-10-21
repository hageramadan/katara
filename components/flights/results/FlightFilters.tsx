"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiRotateCcw, FiSliders } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { localizeDigits } from "@/lib/flights/format";
import FlightMoreFiltersModal from "./FlightMoreFiltersModal";

export type FlightFilterState = {
  airlines: string[];
  refundableOnly: boolean;
  maxPrice: number;
  minPrice: number;
  stops: "any" | "direct" | "one";
  maxDuration: number;
  departureTime: "any" | "day" | "night";
  departureWindow: [number, number];
  arrivalWindow: [number, number];
};

type FilterKey =
  | "refundable"
  | "airlines"
  | "duration"
  | "stops"
  | "price"
  | "time";

const airlineOptions = [
  { key: "Turkish Airlines", ar: "الخطوط السعودية", en: "Turkish Airlines" },
  { key: "Emirates", ar: "الخطوط الإماراتية", en: "Emirates" },
  { key: "Qatar Airways", ar: "الخطوط القطرية", en: "Qatar Airways" },
];

export default function FlightFilters({
  filters,
  onChange,
  onReset,
}: {
  filters: FlightFilterState;
  onChange: (next: FlightFilterState) => void;
  onReset: () => void;
}) {
  const { lang } = useApp();
  const ar = lang === "ar";
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);
  const openMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openFilter) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!openMenuRef.current?.contains(event.target as Node)) {
        setOpenFilter(null);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [openFilter]);

  const labels: Record<FilterKey, string> = {
    refundable: ar ? "قابلة للاسترداد" : "Refundable",
    airlines: ar ? "الخطوط الجوية" : "Airlines",
    duration: ar ? "المدة" : "Duration",
    stops: ar ? "توقف" : "Stops",
    price: ar ? "السعر" : "Price",
    time: ar ? "وقت" : "Time",
  };

  const toggleAirline = (airline: string) => {
    const airlines = filters.airlines.includes(airline)
      ? filters.airlines.filter((item) => item !== airline)
      : [...filters.airlines, airline];
    onChange({ ...filters, airlines });
  };

  const filterKeys: FilterKey[] = [
    "time",
    "price",
     "stops",
      "duration",
    "airlines",
    "refundable",
  ];

  return (
    <section>
      <div className="mb-2 flex justify-start">
        <div className="inline-flex items-center gap-2 py-1 text-sm font-bold text-[#465264] sm:text-base">
         <FiSliders className="shrink-0" />
          
          <span>{ar ? "خيارات بحث متقدمة" : "Advanced search options"}</span>
          <FiChevronDown className="shrink-0" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-wrap">
        {filterKeys.map((key, index) => {
          const isOpen = openFilter === key;
          const active =
            (key === "refundable" && filters.refundableOnly) ||
            (key === "airlines" && filters.airlines.length > 0) ||
            (key === "stops" && filters.stops !== "any") ||
            (key === "price" && (filters.minPrice > 0 || filters.maxPrice < 3000)) ||
            (key === "duration" && filters.maxDuration < 360) ||
            (key === "time" && filters.departureTime !== "any");

          return (
            <div key={key} className="relative min-w-0 lg:flex-1">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenFilter(isOpen ? null : key)}
                className={`flex w-full items-center justify-between gap-2 rounded-xl bg-[#F1F2F4] px-3 py-2.5 text-start text-xs font-bold transition sm:text-sm ${active || isOpen ? "bg-[#E2E5E9] text-[#0D154B]" : "text-[#465264] hover:bg-[#E8EAED]"}`}
              >
                <span className="truncate">{labels[key]}</span>
                <FiChevronDown
                  className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div
                  ref={openMenuRef}
                  className={`absolute top-full z-40 mt-2 w-[min(14rem,calc(100vw-2rem))] rounded-xl border border-[#E1E6ED] bg-white p-3 shadow-xl ${ar ? (index % 2 === 0 ? "right-0" : "left-0") : index % 2 === 0 ? "left-0" : "right-0"}`}
                >
                  {key === "refundable" && (
                    <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-[#465264]">
                      <input
                        type="checkbox"
                        checked={filters.refundableOnly}
                        onChange={(event) =>
                          onChange({
                            ...filters,
                            refundableOnly: event.target.checked,
                          })
                        }
                        className="h-4 w-4 accent-[#0D154B]"
                      />
                      {ar ? "قابلة للاسترداد فقط" : "Refundable only"}
                    </label>
                  )}

                  {key === "airlines" && (
                    <div className="space-y-3">
                      {airlineOptions.map((airline) => (
                        <label
                          key={airline.key}
                          className="flex cursor-pointer items-center gap-2 text-xs text-[#465264]"
                        >
                          <input
                            type="checkbox"
                            checked={filters.airlines.includes(airline.key)}
                            onChange={() => toggleAirline(airline.key)}
                            className="h-4 w-4 accent-[#0D154B]"
                          />
                          {ar ? airline.ar : airline.en}
                        </label>
                      ))}
                    </div>
                  )}

                  {(key === "price" || key === "duration") && (
                    <label className="block text-xs font-semibold text-[#465264]">
                      <span className="mb-2 flex justify-between gap-3">
                        <span>
                          {key === "price"
                            ? ar
                              ? "أقصى سعر"
                              : "Maximum price"
                            : ar
                              ? "أقصى مدة"
                              : "Maximum duration"}
                        </span>
                        <span className="shrink-0">
                          {key === "price"
                            ? `${localizeDigits(filters.maxPrice, false)} KWD`
                            : localizeDigits(
                                `${Math.floor(filters.maxDuration / 60)}h ${filters.maxDuration % 60}m`,
                              false,
                              )}
                        </span>
                      </span>
                      <input
                        aria-label={labels[key]}
                        type="range"
                        min={key === "price" ? 1500 : 180}
                        max={key === "price" ? 3000 : 360}
                        step={key === "price" ? 50 : 15}
                        value={
                          key === "price"
                            ? filters.maxPrice
                            : filters.maxDuration
                        }
                        onChange={(event) =>
                          onChange(
                            key === "price"
                              ? {
                                  ...filters,
                                  maxPrice: Number(event.target.value),
                                }
                              : {
                                  ...filters,
                                  maxDuration: Number(event.target.value),
                                },
                          )
                        }
                        className="w-full accent-[#0D154B]"
                      />
                    </label>
                  )}

                  {key === "stops" && (
                    <div className="space-y-2">
                      {(
                        [
                          ["any", ar ? "الكل" : "Any"],
                          ["direct", ar ? "مباشر" : "Direct"],
                          ["one", ar ? "توقف واحد" : "1 stop"],
                        ] as const
                      ).map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => onChange({ ...filters, stops: value })}
                          className={`block w-full rounded-lg px-2.5 py-2 text-start text-xs font-medium ${filters.stops === value ? "bg-[#F1F3F9] text-[#0D154B]" : "text-[#596474] hover:bg-[#F7F8FA]"}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}

                  {key === "time" && (
                    <select
                      value={filters.departureTime}
                      onChange={(event) =>
                        onChange({
                          ...filters,
                          departureTime: event.target
                            .value as FlightFilterState["departureTime"],
                        })
                      }
                      className="w-full rounded-lg border border-[#E1E5EC] bg-white px-2.5 py-2 text-xs text-[#354052]"
                    >
                      <option value="any">{ar ? "أي وقت" : "Any time"}</option>
                      <option value="day">
                        {ar ? "نهارًا (06:00–18:00)" : "Daytime (06:00–18:00)"}
                      </option>
                      <option value="night">
                        {ar ? "ليلًا (18:00–06:00)" : "Night (18:00–06:00)"}
                      </option>
                    </select>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0D154B] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#E8EAED] sm:text-sm hover:text-[#0D154B] border hover:border-[#0D154B] "
        >
          <FiRotateCcw className="shrink-0" />
          {ar ? "إعادة تعيين" : "Reset"}
        </button>
        <button
          type="button"
          onClick={() => setIsMoreFiltersOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isMoreFiltersOpen}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#F1F2F4] px-3 py-2.5 text-xs font-bold text-[#465264] transition hover:bg-[#E8EAED] sm:text-sm"
        >
          <FiSliders className="shrink-0" />
          {ar ? "عرض المزيد من التصفية" : "More filters"}
        </button>
      </div>
      <FlightMoreFiltersModal
        open={isMoreFiltersOpen}
        filters={filters}
        onClose={() => setIsMoreFiltersOpen(false)}
        onApply={(nextFilters) => {
          onChange(nextFilters);
          setIsMoreFiltersOpen(false);
        }}
        onReset={() => {
          onReset();
          setIsMoreFiltersOpen(false);
        }}
      />
    </section>
  );
}
