"use client";
import Link from "next/link";
import { FiCalendar, FiEdit } from "react-icons/fi";
import { FaPlane, FaPlaneArrival, FaPlaneDeparture, FaSuitcase } from "react-icons/fa6";
import { useApp } from "@/context/AppContext";
import { serviceFlights } from "@/lib/booking/services";
import PaymentAccordion from "./PaymentAccordion";

export default function PaymentFlights() {
  const { lang } = useApp();

  return (
    <PaymentAccordion title={lang === "ar" ? "تفاصيل الرحلة" : "Flight details"}>
      {/* ==================== Outbound and Return Flights ==================== */}
      <div className="space-y-6">
        {serviceFlights.map((flight) => (
          <section
            key={flight.id}
            className="text-xs"
          >
            <header className="grid grid-cols-2 items-center gap-3 border-b sm:flex sm:flex-wrap sm:justify-between border-slate-200 pb-3">
              <h3 className="flex items-center gap-2 text-sm font-bold">
                {flight.id === "outbound" ? <FaPlaneDeparture /> : <FaPlaneArrival />}
                {flight.id === "outbound"
                  ? lang === "ar" ? "الذهاب" : "Outbound"
                  : lang === "ar" ? "العودة" : "Return"}
              </h3>
              <p className="col-span-2 row-start-2 leading-relaxed">
                {lang === "ar" ? flight.from.cityAr : flight.from.cityEn}
                {lang === "ar" ? " ← " : " → "}
                {lang === "ar" ? flight.to.cityAr : flight.to.cityEn}
              </p>
              <p className="col-span-2 row-start-3 flex items-center gap-1 text-slate-500">
                <FiCalendar aria-hidden="true" />
                {lang === "ar" ? flight.dateAr : flight.dateEn}
              </p>
              <bdi className="w-fit rounded-full bg-slate-100 px-3 py-1 text-slate-400">
                {flight.flightNumber}
              </bdi>
              <Link
                href="/flight-booking"
                className="col-start-2 row-start-1 flex min-h-11 items-center justify-end gap-1 hover:underline sm:justify-start"
              >
                <FiEdit aria-hidden="true" />
                {lang === "ar" ? "تعديل" : "Edit"}
              </Link>
            </header>
            <div className="mt-5 flex items-center gap-1.5 sm:gap-3">
              <div className="shrink-0 text-center text-sm">
                <bdi className="block font-bold">
                  {flight.from.code}
                </bdi>
                <bdi>
                  {flight.departure}
                </bdi>
              </div>
              <FaPlane
                aria-hidden="true"
                className="shrink-0 text-base rtl:rotate-180"
              />
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-slate-200"
              />
              <p className="shrink-0 text-center text-slate-400">
                {lang === "ar" ? "بدون توقف" : "Nonstop"}
                <bdi className="block">3h 35m</bdi>
              </p>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-slate-200"
              />
              <div className="shrink-0 text-center text-sm">
                <bdi className="block font-bold">
                  {flight.to.code}
                </bdi>
                <bdi>
                  {flight.arrival}
                </bdi>
              </div>
            </div>
            <p className="mt-5 flex items-center gap-2 text-slate-400">
              <FaSuitcase aria-hidden="true" />
              {lang === "ar" ? "45 كجم + حقيبة يد 7 كجم" : "45 kg + 7 kg cabin bag"}
            </p>
          </section>
        ))}
      </div>
    </PaymentAccordion>
  );
}
