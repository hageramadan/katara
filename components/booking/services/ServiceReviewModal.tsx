"use client";
import { useApp } from "@/context/AppContext";
import { useBookingFlow } from "@/context/BookingFlowContext";
import PassengerDialog from "../PassengerDialog";
import ServiceReviewItem from "./ServiceReviewItem";
import { emptyServiceSelection } from "@/lib/booking/data";
import { serviceFlights, serviceKey, baseBookingFare } from "@/lib/booking/services";

type ServiceReviewModalProps = {
  open: boolean;
  onClose: () => void;
  total: number;
};

export default function ServiceReviewModal({ open, onClose, total }: ServiceReviewModalProps) {
  const { lang } = useApp();
  const { travelers, services } = useBookingFlow();
  return (
    <>
      {/* ==================== Review Selected Services ==================== */}
      <PassengerDialog
        open={open}
        onClose={onClose}
        title={lang === "ar" ? "اختيارات الخدمات الإضافية" : "Your extra services"}
        titleId="services-review-title"
      >
        <div className="space-y-5 py-6">
          {serviceFlights.map((flight) => (
            <section
              key={flight.id}
              className="rounded-lg border border-slate-200 p-4"
            >
              <h2 className="mb-3 text-sm font-bold">
                {lang === "ar" ? flight.from.cityAr : flight.from.cityEn}
                {lang === "ar" ? "إلى" : "to"}
                {lang === "ar" ? flight.to.cityAr : flight.to.cityEn}
              </h2>
              <ul className="space-y-3">
                {travelers.filter((person) => person.type !== "infant").map((person) => (
                  <ServiceReviewItem
                    key={person.id}
                    traveler={person}
                    selection={services[serviceKey(flight.id, person.id)] ?? emptyServiceSelection}
                  />
                ))}
              </ul>
            </section>
          ))}

          <p className="flex items-center justify-between gap-3 text-sm">
            {lang === "ar" ? "سعر الحجز الأساسي" : "Base booking fare"}
            <bdi>{baseBookingFare.toFixed(2)} KWD</bdi>
          </p>
          <p className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4 text-base font-bold">
            {lang === "ar" ? "إجمالي الحجز" : "Booking total"}
            <bdi>{total.toFixed(2)} KWD</bdi>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white"
          >
            {lang === "ar" ? "تم" : "Done"}
          </button>
        </div>
      </PassengerDialog>
    </>
  );
}
