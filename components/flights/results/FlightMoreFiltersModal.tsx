"use client";

import { useEffect, useState } from "react";
import { FiRotateCcw, FiX } from "react-icons/fi";
import Modal from "@/components/ui/Modal";
import { useApp } from "@/context/AppContext";
import type { FlightFilterState } from "./FlightFilters";

type RangeValue = [number, number];

function RangeSlider({
  value,
  min,
  max,
  step,
  dir,
  onChange,
}: {
  value: RangeValue;
  min: number;
  max: number;
  step: number;
  dir: "rtl" | "ltr";
  onChange: (next: RangeValue) => void;
}) {
  const update = (index: 0 | 1, nextValue: number) => {
    const next: RangeValue = [...value];
    next[index] = nextValue;
    if (next[0] > next[1]) next[index === 0 ? 1 : 0] = nextValue;
    onChange(next);
  };

  return (
    <div className="relative mx-1 h-5">
      <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#10194F]" />
      {[0, 1].map((index) => (
        <input
          key={index}
          dir={dir}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[index]}
          aria-label={index === 0 ? "Minimum" : "Maximum"}
          onChange={(event) => update(index as 0 | 1, Number(event.target.value))}
          className="pointer-events-none absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#10194F] [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:-mt-[3px] [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#10194F]"
        />
      ))}
    </div>
  );
}

function FilterRangeSection({
  title,
  resetLabel,
  startLabel,
  endLabel,
  value,
  min,
  max,
  step,
  format,
  dir,
  onChange,
  onReset,
  compact = false,
  showReset = true,
}: {
  title: string;
  resetLabel: string;
  startLabel: string;
  endLabel: string;
  value: RangeValue;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  dir: "rtl" | "ltr";
  onChange: (next: RangeValue) => void;
  onReset: () => void;
  compact?: boolean;
  showReset?: boolean;
}) {
  return (
    <section className={compact ? "py-1" : "border-b border-[#E9E9E9] px-3 py-5 last:border-b-0"}>
      <div className={`flex items-center justify-between text-sm font-semibold text-[#252525] ${compact ? "mb-0.5" : "mb-2"}`}>
        <h3>{title}</h3>
        {showReset && <button type="button" onClick={onReset} className="text-xs font-normal text-[#555] underline">{resetLabel}</button>}
      </div>
      <div className={`flex justify-between text-xs font-semibold text-[#222] ${compact ? "mb-0" : "mb-1"}`} dir={dir}>
        <span>{format(value[0])}<small className="ms-1 text-[10px] font-normal text-[#666]">{startLabel}</small></span>
        <span>{format(value[1])}<small className="ms-1 text-[10px] font-normal text-[#666]">{endLabel}</small></span>
      </div>
      <RangeSlider value={value} min={min} max={max} step={step} dir={dir} onChange={onChange} />
    </section>
  );
}

export default function FlightMoreFiltersModal({
  open,
  filters,
  onClose,
  onApply,
  onReset,
}: {
  open: boolean;
  filters: FlightFilterState;
  onClose: () => void;
  onApply: (next: FlightFilterState) => void;
  onReset: () => void;
}) {
  const { lang } = useApp();
  const ar = lang === "ar";
  const [draft, setDraft] = useState(filters);

  useEffect(() => {
    if (open) setDraft(filters);
  }, [filters, open]);

  const resetDraft = () => setDraft({
    airlines: [],
    refundableOnly: false,
    minPrice: 0,
    maxPrice: 3000,
    stops: "any",
    maxDuration: 360,
    departureTime: "any",
    departureWindow: [0, 24],
    arrivalWindow: [0, 24],
  });

  const resetLabel = ar ? "إعادة ضبط" : "Reset";
  const dir = ar ? "rtl" : "ltr";
  const formatPrice = (value: number) => `${value.toFixed(2)} KWD`;
  const formatTime = (value: number) => `${String(value % 24).padStart(2, "0")}:00`;

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md">
      <div dir={ar ? "rtl" : "ltr"} className="-mx-5 -my-3 flex max-h-[88vh] flex-col overflow-hidden rounded-xl border border-[#10194F] bg-white md:-mx-6">
        <header className="relative flex shrink-0 items-center justify-center px-12 py-4">
          <h2 className="text-lg font-bold text-[#171717]">{ar ? "تصفية حسب" : "Filter by"}</h2>
          <button type="button" onClick={onClose} aria-label={ar ? "إغلاق" : "Close"} className="absolute end-4 flex h-8 w-8 items-center justify-center rounded-full text-[#303030] hover:bg-[#F1F2F4]">
            <FiX className="text-lg" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-3">
          <FilterRangeSection
            title={ar ? "السعر" : "Price"}
            resetLabel={resetLabel}
            startLabel=""
            endLabel=""
            value={[draft.minPrice, draft.maxPrice]}
            min={0}
            max={3000}
            step={50}
            format={formatPrice}
            dir={dir}
            onChange={([minPrice, maxPrice]) => setDraft((current) => ({ ...current, minPrice, maxPrice }))}
            onReset={() => setDraft((current) => ({ ...current, minPrice: 0, maxPrice: 3000 }))}
          />

          <section className="border-b border-[#E9E9E9] px-3 py-6">
            <div className="mb-3 flex items-center justify-between text-sm font-semibold text-[#252525]">
               <h3>{ar ? "توقف" : "Stops"}</h3>
              <button type="button" onClick={() => setDraft((current) => ({ ...current, stops: "any" }))} className="text-xs font-normal text-[#555] underline">{resetLabel}</button>
             
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#10194F]">
              <input type="checkbox" checked={draft.stops === "direct"} onChange={(event) => setDraft((current) => ({ ...current, stops: event.target.checked ? "direct" : "any" }))} className="h-3.5 w-3.5 accent-[#10194F]" />
              {ar ? "بدون توقف" : "Nonstop"}
            </label>
          </section>

      <section className="py-1">
            <div className="mb-1 flex items-center justify-between text-sm font-semibold text-[#252525]">
              <h3>{ar ? "توقيت المغادرة" : "Departure time"}</h3>
              <button type="button" onClick={() => setDraft((current) => ({ ...current, departureWindow: [0, 24], departureTime: "any" }))} className="text-xs font-normal text-[#555] underline">{resetLabel}</button>
            </div>
            <FilterRangeSection
              title={ar ? "المغادرة من القاهرة" : "Departure from Cairo"}
              resetLabel={resetLabel}
              startLabel=""
              endLabel=""
              value={draft.departureWindow}
              min={0}
              max={24}
              step={1}
              format={formatTime}
              dir={dir}
              onChange={(departureWindow) => setDraft((current) => ({ ...current, departureWindow, departureTime: "any" }))}
              onReset={() => setDraft((current) => ({ ...current, departureWindow: [0, 24], departureTime: "any" }))}
              compact
              showReset={false}
            />
             <FilterRangeSection
              title={ar ? "المغادرة من أبو ظبي" : "Departure from Abozaby"}
              resetLabel={resetLabel}
              startLabel=""
              endLabel=""
              value={draft.departureWindow}
              min={0}
              max={24}
              step={1}
              format={formatTime}
              dir={dir}
              onChange={(departureWindow) => setDraft((current) => ({ ...current, departureWindow, departureTime: "any" }))}
              onReset={() => setDraft((current) => ({ ...current, departureWindow: [0, 24], departureTime: "any" }))}
              compact
              showReset={false}
            />
            
          </section>

          <section className="py-1">
            <div className="mb-1 flex items-center justify-between text-sm font-semibold text-[#252525]">
              <h3>{ar ? "توقيت الوصول" : "Arrival time"}</h3>
              <button type="button" onClick={() => setDraft((current) => ({ ...current, arrivalWindow: [0, 24] }))} className="text-xs font-normal text-[#555] underline">{resetLabel}</button>
            </div>
            <FilterRangeSection
              title={ar ? "الوصول في أبو ظبي" : "Arrival in Abu Dhabi"}
              resetLabel={resetLabel}
              startLabel=""
              endLabel=""
              value={draft.arrivalWindow}
              min={0}
              max={24}
              step={1}
              format={formatTime}
              dir={dir}
              onChange={(arrivalWindow) => setDraft((current) => ({ ...current, arrivalWindow }))}
              onReset={() => setDraft((current) => ({ ...current, arrivalWindow: [0, 24] }))}
              compact
              showReset={false}
            />
          </section>
        </div>

        <footer className="grid shrink-0 grid-cols-2 gap-2 border-t border-[#ECEEF2] bg-white p-3">
          <button type="button" onClick={() => { resetDraft(); onReset(); }} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#10194F] px-3 py-3 text-sm font-semibold text-[#10194F] hover:bg-[#F5F6FA]">
            <FiRotateCcw aria-hidden="true" />{ar ? "إعادة ضبط الجميع" : "Reset all"}
          </button>
          <button type="button" onClick={() => onApply(draft)} className="rounded-lg bg-[#10194F] px-3 py-3 text-sm font-semibold text-white hover:bg-[#1C286D]">
            {ar ? "تطبيق" : "Apply"}
          </button>
        </footer>
      </div>
    </Modal>
  );
}
