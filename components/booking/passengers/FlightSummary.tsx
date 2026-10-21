"use client";
import { useApp } from "@/context/AppContext";
import { bookingFlights } from "@/lib/booking/data";
import { FaPlane, FaPlaneArrival, FaPlaneDeparture, FaSuitcase, FaSuitcaseRolling } from "react-icons/fa6";

type FlightSummaryProps = {
  returning?: boolean;
};

export default function FlightSummary({ returning = false }: FlightSummaryProps) {
  const { lang } = useApp();
  const flight = returning ? bookingFlights.inbound : bookingFlights.outbound;
  const title = returning
    ? lang === "ar" ? "رحلة العودة" : "Return flight"
    : lang === "ar" ? "رحلة الذهاب" : "Outbound flight";

  return (
    <section
      className="border-b border-dotted border-slate-200 px-1 pt-7 pb-4 first-of-type:pt-10"
      aria-label={title}
    >
      {/* ==================== Flight Heading ==================== */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-sm font-bold text-primary">
          {returning ? <FaPlaneArrival /> : <FaPlaneDeparture />}
          {title}
        </h3>
        <span className="text-xs text-slate-500">
          {flight.from.code}
          {lang === "ar" ? "إلى" : "to"}
          {flight.to.code}
        </span>
      </div>
      {/* ==================== Departure + Route + Arrival ==================== */}
      <div className="grid grid-cols-[57px_1fr_57px] items-start">
        <div className="flex flex-col items-center">
          <strong className="font-[family-name:var(--font-inter)] text-base font-bold">
            {flight.departure}
          </strong>
          <span className="text-base text-slate-400">
            {lang === "ar" ? flight.from.cityAr : flight.from.cityEn}
          </span>
          <b className="mt-1 font-[family-name:var(--font-inter)] text-xs font-bold text-slate-500">
            {flight.from.code}
          </b>
        </div>
        <div className="min-w-0 pt-0.5 text-center text-slate-500">
          <span className="text-xs">
            {lang === "ar" ? "بدون توقف" : "Nonstop"}
            <i className="mx-1 not-italic">•</i>
            <b
              dir="ltr"
              className="font-normal"
            >3h 35m</b>
          </span>
          <div className="relative mt-1.5 mb-2 h-0.5 bg-slate-300">
            <span className="absolute -top-[3px] start-0 size-2 rounded-full bg-slate-300" />
            <FaPlane className="absolute -top-2.5 -end-1 h-5 w-6 bg-white pe-1 text-primary rtl:rotate-180" />
          </div>
          <small className="flex flex-wrap items-center justify-center gap-1 text-xs">
            <FaSuitcaseRolling className="text-green-500" /> 7
            <i className="mx-1 not-italic">•</i>
            <FaSuitcase />
            {lang === "ar" ? "45 كجم" : "45 kg"}
          </small>
        </div>
        <div className="flex flex-col items-center">
          <strong className="font-[family-name:var(--font-inter)] text-base font-bold">
            {flight.arrival}
          </strong>
          <span className="text-base text-slate-400">
            {lang === "ar" ? flight.to.cityAr : flight.to.cityEn}
          </span>
          <b className="mt-1 font-[family-name:var(--font-inter)] text-xs font-bold text-slate-500">
            {flight.to.code}
          </b>
        </div>
      </div>
    </section>
  );
}
