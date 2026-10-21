"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useBookingFlow } from "@/context/BookingFlowContext";
import BookingContact from "./BookingContact";
import BookingSteps from "../BookingSteps";
import PassengerSummary from "./PassengerSummary";
import PassengerCard from "./PassengerCard";
import BookingDetailsModal from "./BookingDetailsModal";
import CancellationPolicyModal from "./CancellationPolicyModal";

type PassengerDetailsContentProps = {
  embedded?: boolean;
};

export default function PassengerDetailsContent({ embedded = false }: PassengerDetailsContentProps) {
  const { lang, dir } = useApp();
  const [openPassengers, setOpenPassengers] = useState<number[]>([]);
  const { travelers: passengers } = useBookingFlow();
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);
  const [cancellationPolicyOpen, setCancellationPolicyOpen] = useState(false);

  useEffect(() => {
    if (!embedded) {
      document.title = `${lang === "ar" ? "بيانات المسافرين" : "Passenger details"} | Katra Go`;
    }
  }, [lang, embedded]);
  const Container = embedded ? "div" : "main";
  const Heading = embedded ? "h2" : "h1";

  function togglePassenger(index: number) {
    setOpenPassengers((current) => {
      return current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index];
    });
  }

  return (
    <Container
      className={`${embedded ? "p-3 sm:p-4 md:p-6" : "mx-auto min-h-[80vh] container px-4 pb-2 pt-5"} min-w-0 text-primary [&_input]:min-w-0 [&_input]:text-base sm:[&_input]:text-sm [&_select]:min-w-0 [&_select]:text-base sm:[&_select]:text-sm [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[var(--color-primary)] [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-[var(--color-primary)] [&_select:focus-visible]:outline-2 [&_select:focus-visible]:outline-[var(--color-primary)]`}
      dir={dir}
    >
      {/* ==================== Booking Steps ==================== */}
      {!embedded && <BookingSteps />}

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-7 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-12.5">
        {/* ==================== Passenger Details ==================== */}
        <section
          className="min-w-0 lg:pt-8"
          aria-labelledby="passengers-heading"
        >
          <Heading
            id="passengers-heading"
            className="mb-5 text-lg sm:mb-7 sm:text-xl font-bold"
          >
            {lang === "ar" ? "بيانات المسافرين" : "Passenger details"}
          </Heading>
          <div className="flex flex-col gap-5">
            {passengers.map((passenger, index) => (
              <PassengerCard
                key={passenger.id}
                passenger={passenger}
                index={index}
                open={openPassengers.includes(index)}
                onToggle={() => togglePassenger(index)}
              />
            ))}
          </div>
          {!embedded && (
            <>
              <BookingContact />
              <div className="mt-5 flex flex-col justify-end gap-3.5 sm:flex-row sm:flex-wrap">
                <Link
                  href="/additional-services"
                  className="flex min-h-12 w-full items-center justify-center rounded-[7px] border-2 border-primary bg-white px-6 py-3.5 text-base leading-relaxed font-bold text-primary transition-colors hover:bg-[var(--color-primary-50)] sm:w-auto"
                >
                  {lang === "ar"
                    ? "اختر مقعدك و خدمات إضافية"
                    : "Choose seats and extra services"}
                </Link>
                <Link
                  href="/booking-payment"
                  className="flex min-h-12 w-full items-center justify-center rounded-[7px] border-2 border-primary bg-primary px-6 py-3.5 text-base leading-relaxed font-bold text-white transition-colors hover:bg-[var(--color-primary-600)] sm:w-auto"
                >
                  {lang === "ar" ? "متابعة إلى الدفع" : "Continue to payment"}
                </Link>
              </div>
            </>
          )}
        </section>
        {/* ==================== Trip Summary ==================== */}
        <PassengerSummary
          onBookingDetails={() => setBookingDetailsOpen(true)}
          onCancellationPolicy={() => setCancellationPolicyOpen(true)}
        />
      </div>
      {/* ==================== Booking and Cancellation Modals ==================== */}
      <BookingDetailsModal
        open={bookingDetailsOpen}
        onClose={() => setBookingDetailsOpen(false)}
      />
      <CancellationPolicyModal
        open={cancellationPolicyOpen}
        onClose={() => setCancellationPolicyOpen(false)}
      />
    </Container>
  );
}
