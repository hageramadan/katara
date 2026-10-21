"use client";
import type { FlightKey } from "@/lib/booking/types";

import { Fragment, useMemo } from "react";
import { seatTypes } from "@/lib/booking/data";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { FiCheck, FiX } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { useBookingFlow } from "@/context/BookingFlowContext";
import { emptyServiceSelection } from "@/lib/booking/data";
import { seatCategory, seatColumns, seatPrice, seatRows, serviceKey, unavailableSeats } from "@/lib/booking/services";

type SeatMapProps = {
  flight: FlightKey;
  travelerId: string;
};

export default function SeatMap({ flight, travelerId }: SeatMapProps) {
  const { lang } = useApp();
  const { services, travelers, updateService } = useBookingFlow();
  const key = serviceKey(flight, travelerId);
  const selection = services[key] ?? emptyServiceSelection;
  // ✅ حجز المقعد لمسافر واحد فقط على نفس الرحلة
  const occupied = useMemo(() => {
    return new Set(travelers
      .filter((person) => person.id !== travelerId)
      .map((person) => services[serviceKey(flight, person.id)]?.seat)
      .filter(Boolean));
  }, [travelers, services, flight, travelerId]);

  return (
    <div>
      {/* ==================== Seat Types ==================== */}
      <div className="grid grid-cols-2 items-start gap-3 px-3 py-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5">
        {(["standard", "comfort", "preferred", "unavailable"] as const).map((category) => (
          <div
            key={category}
            className="flex items-center gap-2 text-xs text-primary"
          >
            <span className={`grid size-7 shrink-0 place-items-center rounded border ${category === "unavailable" ? "border-slate-200 bg-slate-50 text-slate-400" : category === "standard" ? "border-emerald-400 bg-emerald-50 text-emerald-600" : "border-sky-400 bg-sky-100 text-sky-600"}`}>
              {category === "unavailable"
                ? <FiX />
                : <MdAirlineSeatReclineNormal className="text-base" />}
            </span>
            <span>
              {lang === "ar"
                ? seatTypes[category].labelAr
                : seatTypes[category].labelEn}
              {category !== "unavailable" && (
                <small
                  className="mt-1 block text-slate-400"
                  dir="ltr"
                >{category === "standard" ? 5 : category === "preferred" ? 10 : 15} KWD</small>
              )}
            </span>
          </div>
        ))}
      </div>
      <p className="px-4 pb-4 text-xs leading-relaxed text-slate-500 sm:px-6">
        {lang === "ar"
          ? "اختر مقعداً على الخريطة للمسافر المحدد. يمكنك الضغط عليه مرة أخرى لإلغاء الاختيار."
          : "Choose a seat on the map for the selected passenger. Select it again to remove it."}
        <span className="mt-2 block sm:hidden">
          {lang === "ar"
            ? "حرّك الخريطة أفقياً لعرض جميع المقاعد."
            : "Scroll the map horizontally to see all seats."}
        </span>
      </p>
      {/* ==================== Aircraft Seat Map ==================== */}
      <div
        className="relative max-h-96 min-w-0 max-w-full overflow-auto overscroll-contain rounded-b-lg border-t border-slate-100 bg-neutral-200 px-3"
        dir="ltr"
        role="region"
        aria-label={lang === "ar" ? "خريطة المقاعد" : "Seat map"}
        tabIndex={0}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-28 h-24 -skew-y-12 border-y border-neutral-300 bg-neutral-100"
        />
        <div className="relative mx-auto w-96 shrink-0 border-x-8 border-slate-300 bg-white px-3 pt-4 pb-6 shadow-sm sm:w-80">
          <div className="sticky top-0 z-10 grid grid-cols-[repeat(3,minmax(0,1fr))_1.5rem_repeat(3,minmax(0,1fr))] gap-1 bg-white pb-3 text-center text-xs text-slate-400">
            {seatColumns.map((column, index) => (
              <Fragment key={column}>
                {index === 3 && <span />}
                <span>
                  {column}
                </span>
              </Fragment>
            ))}
          </div>
          <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_1.5rem_repeat(3,minmax(0,1fr))] items-center gap-1">
            {seatRows.map((row) => (
              <Fragment key={row}>
                {seatColumns.map((column, index) => {
                  const seat = `${row}${column}`;
                  const disabled = unavailableSeats.has(seat) || occupied.has(seat);
                  const selected = selection.seat === seat;
                  const category = seatCategory(seat);
                  return (
                    <Fragment key={seat}>
                      {index === 3 && (
                        <span className="text-center text-xs text-slate-400">
                          {row}
                        </span>
                      )}

                      <button
                        type="button"
                        disabled={disabled}
                        aria-pressed={selected}
                        aria-label={`${(lang === "ar" ? "مقعد" : "Seat")} ${seat}, ${(lang === "ar" ? seatTypes[category].labelAr : seatTypes[category].labelEn)}, ${seatPrice(seat)} KWD`}
                        title={`${seat} · ${(lang === "ar" ? seatTypes[category].labelAr : seatTypes[category].labelEn)} · ${seatPrice(seat)} KWD`}
                        onClick={() => updateService(key, { seat: selected ? null : seat })}
                        className={`relative flex h-11 min-w-0 sm:h-9 items-center justify-center rounded-t-md rounded-b-sm border-2 border-b-4 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${disabled ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300" : selected ? "border-emerald-600 bg-emerald-500 text-white" : category === "standard" ? "border-emerald-300 bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "border-sky-400 bg-sky-100 text-sky-600 hover:bg-sky-200"}`}
                      >
                        {disabled
                          ? <FiX aria-hidden="true" />
                          : selected ? (
                            <FiCheck
                              aria-hidden="true"
                              className="stroke-3"
                            />
                          ) : (
                            <MdAirlineSeatReclineNormal
                              aria-hidden="true"
                              className="text-lg"
                            />
                          )}
                      </button>
                    </Fragment>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      {/* ==================== Selected Seat ==================== */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-4 text-sm sm:px-6"
        aria-live="polite"
      >
        <span>
          {selection.seat
            ? `${(lang === "ar" ? "المقعد المختار" : "Selected seat")}: ${selection.seat}`
            : (lang === "ar" ? "لم يتم اختيار مقعد" : "No seat selected")}
        </span>
        {selection.seat && (
          <button
            type="button"
            className="min-h-11 text-sm underline underline-offset-4"
            onClick={() => updateService(key, { seat: null })}
          >
            {lang === "ar" ? "إلغاء اختيار المقعد" : "Remove seat selection"}
          </button>
        )}
      </div>
    </div>
  );
}
