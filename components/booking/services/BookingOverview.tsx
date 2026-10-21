"use client";
import { useApp } from "@/context/AppContext";
import { FiChevronDown } from "react-icons/fi";
import PassengerDetailsContent from "../passengers/PassengerDetailsContent";

export default function BookingOverview() {
  const { lang } = useApp();

  return (
    <>
      {/* ==================== Booking Overview ==================== */}
      <details
        open
        className="group mb-8 min-w-0 rounded-xl sm:mb-12 border border-slate-200 bg-white"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-t-xl bg-slate-50 px-5 py-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
          {lang === "ar" ? "تفاصيل الحجز" : "Booking details"}
          <FiChevronDown
            aria-hidden="true"
            className="transition group-open:rotate-180"
          />
        </summary>
        <div className="m-0 rounded-lg border border-primary">
          <PassengerDetailsContent embedded />
        </div>
      </details>
    </>
  );
}
