"use client";
import Link from "next/link";
import { FaSuitcase, FaUser } from "react-icons/fa6";
import { useApp } from "@/context/AppContext";
import { useBookingFlow, travelerName } from "@/context/BookingFlowContext";
import { emptyServiceSelection, travelerTypes } from "@/lib/booking/data";
import { serviceFlights, serviceKey, servicePrice } from "@/lib/booking/services";
import PaymentAccordion from "./PaymentAccordion";

export default function PaymentTravelers() {
  const { lang } = useApp();
  const { travelers, services } = useBookingFlow();

  return (
    <PaymentAccordion title={lang === "ar" ? "بيانات المسافرين" : "Passenger details"}>
      {/* ==================== Travelers and Selected Services ==================== */}
      <ul className="space-y-2">
        {travelers.map((traveler) => {
          const selections = serviceFlights.map((flight) => services[serviceKey(flight.id, traveler.id)] ?? emptyServiceSelection);
          const extraPrice = selections.reduce((sum, item) => sum + servicePrice(item), 0);

          return (
            <li
              key={traveler.id}
              className="flex min-w-0 flex-col items-start justify-between gap-2 rounded-lg sm:flex-row sm:items-center sm:gap-3 border-s-2 border-primary bg-slate-50 px-3 py-3"
            >
              <Link
                href="/passenger-details"
                className="grid min-h-11 min-w-0 max-w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 gap-y-1 text-sm hover:underline sm:flex sm:flex-wrap"
              >
                <FaUser
                  aria-hidden="true"
                  className="row-span-2 shrink-0 text-primary"
                />
                <bdi className="min-w-0 break-words">
                  {traveler.gender === "female" ? "Ms." : "Mr."}
                  {travelerName(traveler)}
                </bdi>
                <span className="col-start-2 text-xs text-[var(--color-primary-300)]">
                  ({lang === "ar" ? travelerTypes[traveler.type].labelAr : travelerTypes[traveler.type].labelEn} {traveler.number})
                </span>
              </Link>
              <span className={`flex shrink-0 items-center gap-2 text-xs ${extraPrice ? "text-primary" : "text-slate-400"}`}>
                <FaSuitcase aria-hidden="true" />
                {extraPrice > 0
                  ? <bdi>{extraPrice.toFixed(2)} KWD</bdi>
                  : lang === "ar" ? "بدون خدمات إضافية" : "No extra services"}
              </span>
            </li>
          );
        })}
      </ul>
    </PaymentAccordion>
  );
}
