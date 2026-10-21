"use client";
import Image from "next/image";
import { FaPlaneArrival, FaPlaneDeparture, FaSuitcaseRolling } from "react-icons/fa6";
import { useApp } from "@/context/AppContext";
import { bookingFlights } from "@/lib/booking/data";

type BookingFlightDetailsProps = {
  returning?: boolean;
};

export default function BookingFlightDetails({ returning = false }: BookingFlightDetailsProps) {
  const { lang } = useApp();
  const flight = returning ? bookingFlights.inbound : bookingFlights.outbound;
  const Icon = returning ? FaPlaneArrival : FaPlaneDeparture;

  return (
    <section aria-label={returning
      ? (lang === "ar" ? "رحلة العودة" : "Return flight")
      : (lang === "ar" ? "رحلة الذهاب" : "Outbound flight")}>
      <h3 className="flex items-center gap-3 bg-neutral-200 px-3 py-3 text-base font-semibold text-neutral-600 sm:text-lg">
        <Icon
          aria-hidden="true"
          className="text-xl text-neutral-500"
        />
        {returning
          ? (lang === "ar" ? "طيران العودة" : "Return flight")
          : (lang === "ar" ? "طيران الذهاب" : "Outbound flight")}
      </h3>
      <div className="relative grid grid-cols-[minmax(0,1.3fr)_0.5rem_minmax(0,1fr)] gap-x-3 gap-y-8 py-5 sm:grid-cols-[minmax(0,1.4fr)_0.5rem_minmax(0,1fr)_5rem] sm:gap-x-5">
        {[flight.from, flight.to].map((airport, index) => (
          <div
            key={airport.code}
            className={`col-start-1 min-h-20 min-w-0 ${index === 0 ? "row-start-1" : "row-start-2"}`}
          >
            <h4 className="text-base leading-relaxed font-bold text-neutral-800 sm:text-lg">
              {lang === "ar" ? airport.cityAr : airport.cityEn}
              <span aria-hidden="true">-</span>
              <bdi>
                {airport.code}
              </bdi>
            </h4>
            <p className="mt-2 text-xs leading-relaxed font-semibold text-neutral-500 sm:text-sm">
              {lang === "ar" ? airport.airportAr : airport.airportEn}
              <span aria-hidden="true">-</span>
              <bdi>
                {flight.flightNumber}
              </bdi>
            </p>
          </div>
        ))}

        <div
          aria-hidden="true"
          className="relative col-start-2 row-span-2 row-start-1"
        >
          <div className="absolute top-4 bottom-16 left-1/2 w-px -translate-x-1/2 bg-[#02C3E1]">
            <span className="absolute -top-1 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-[#02C3E1]" />
            <span className="absolute -bottom-1 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-[#02C3E1]" />
          </div>
        </div>
        {[flight.departure, flight.arrival].map((time, index) => (
          <div
            key={time}
            className={`col-start-3 min-h-20 min-w-0 text-center ${index === 0 ? "row-start-1" : "row-start-2"}`}
          >
            <p className="text-base leading-relaxed font-bold text-neutral-700 sm:text-lg">
              <bdi>
                {time}
              </bdi>
            </p>
            <p className="mt-2 text-xs leading-relaxed font-semibold text-neutral-500 sm:text-sm">
              {lang === "ar" ? flight.dateAr : flight.dateEn}
            </p>
          </div>
        ))}

        <div className="col-span-3 flex items-center justify-center gap-5 text-neutral-600 sm:col-span-1 sm:col-start-4 sm:row-span-2 sm:row-start-1 sm:flex-col sm:gap-3">
          <Image
            src="/images/promo/Frame.png"
            alt={lang === "ar" ? "الخطوط الجوية القطرية" : "Qatar Airways"}
            width={110}
            height={32}
            className="h-auto w-24 object-contain"
          />
          <p className="flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold">
            <FaSuitcaseRolling aria-hidden="true" />
            {lang === "ar" ? "45 كجم" : "45 kg"}
          </p>
        </div>
      </div>
    </section>
  );
}
