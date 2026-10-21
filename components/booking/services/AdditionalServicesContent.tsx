"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useBookingFlow } from "@/context/BookingFlowContext";
import { emptyServiceSelection } from "@/lib/booking/data";
import { baseBookingFare, serviceKey, servicePrice } from "@/lib/booking/services";
import type { FlightKey, ServiceTab } from "@/lib/booking/types";
import BookingSteps from "../BookingSteps";
import BookingOverview from "./BookingOverview";
import ServiceFlightTabs from "./ServiceFlightTabs";
import ServiceTravelers from "./ServiceTravelers";
import ServiceTabs from "./ServiceTabs";
import BaggageOptions from "./BaggageOptions";
import SeatMap from "./SeatMap";
import WheelchairService from "./WheelchairService";
import ServiceFooter from "./ServiceFooter";

export default function AdditionalServicesContent() {
  const { lang, dir } = useApp();
  const router = useRouter();
  const { travelers, services, updateService } = useBookingFlow();
  const [activeFlight, setActiveFlight] = useState<FlightKey>("outbound");
  const [activeTraveler, setActiveTraveler] = useState(travelers.find((person) => person.type !== "infant")!.id);
  const [tab, setTab] = useState<ServiceTab>("baggage");
  const key = serviceKey(activeFlight, activeTraveler);
  const selection = services[key] ?? emptyServiceSelection;

  // ✅ حساب رسوم الخدمات المختارة لكل المسافرين والرحلات
  const extrasTotal = useMemo(() => {
    return Object.values(services).reduce((total, item) => total + servicePrice(item), 0);
  }, [services]);

  const total = baseBookingFare + extrasTotal;

  useEffect(() => {
    document.title = `${lang === "ar" ? "خدمات إضافية" : "Extra services"} | Katra Go`;
  }, [lang]);

  return (
    <main
      dir={dir}
      className="min-h-screen min-w-0 bg-slate-50/50 pt-6 text-primary"
    >
      <div className="container mx-auto px-4">
        {/* ==================== Booking Steps ==================== */}
        <BookingSteps current={2} />
        {/* ==================== Flight Selection ==================== */}
        <ServiceFlightTabs
          activeFlight={activeFlight}
          onChange={setActiveFlight}
        />
        {/* ==================== Booking Details ==================== */}
        <BookingOverview />
        <section
          className="scroll-mt-24 pb-8"
          aria-labelledby="services-heading"
        >
          {/* ==================== Header: Title and Description ==================== */}
          <header className="mb-8">
            <h1
              id="services-heading"
              className="text-xl font-bold text-neutral-900 sm:text-2xl"
            >
              {lang === "ar" ? "إضافة المزيد إلى رحلتك" : "Add more to your trip"}
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
              {lang === "ar"
                ? "حدد المزيد من الخدمات لكل المسافرين خلال رحلتك."
                : "Choose extra services for each passenger on your journey."}
            </p>
          </header>
          {/* ==================== Passengers and Extra Services ==================== */}
          <div className="grid min-w-0 items-stretch gap-4 sm:gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
            <ServiceTravelers
              activeTraveler={activeTraveler}
              onChange={setActiveTraveler}
            />
            <div className="min-w-0 overflow-hidden rounded-lg bg-white">
              <ServiceTabs
                active={tab}
                onChange={setTab}
              />
              <div
                role="tabpanel"
                id="service-panel"
                aria-labelledby={`service-tab-${tab}`}
              >
                {tab === "seats"
                  ? (
                    <SeatMap
                      flight={activeFlight}
                      travelerId={activeTraveler}
                    />
                  )
                  : (
                    <BaggageOptions
                      value={selection.baggage}
                      selectionKey={key}
                      onChange={(baggage) => updateService(key, { baggage })}
                    />
                  )}
              </div>
            </div>
          </div>
          {/* ==================== Wheelchair Assistance ==================== */}
          <WheelchairService
            checked={selection.wheelchair}
            onChange={(wheelchair) => updateService(key, { wheelchair })}
          />
         
        </section>
      </div>
      {/* ==================== Price Summary ==================== */}
      <ServiceFooter
        total={total}
        extrasTotal={extrasTotal}
        onNext={() => router.push("/booking-payment")}
      />
    </main>
  );
}
