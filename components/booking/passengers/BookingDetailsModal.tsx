"use client";
import { useApp } from "@/context/AppContext";
import PassengerDialog from "../PassengerDialog";
import BookingFlightDetails from "./BookingFlightDetails";

type BookingDetailsModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function BookingDetailsModal({ open, onClose }: BookingDetailsModalProps) {
  const { lang } = useApp();

  return (
    <PassengerDialog
      open={open}
      onClose={onClose}
      title={lang === "ar" ? "تفاصيل الحجز" : "Booking details"}
      titleId="booking-details-title"
    >
      <p className="py-8 text-base font-bold text-neutral-950 sm:py-10 sm:text-lg">{lang === "ar" ? "رحلة طيران" : "Flight booking"}: {lang === "ar"
        ? "(2 بالغ)  (1 طفل)  (1 رضيع)"
        : "(2 adults)  (1 child)  (1 infant)"}</p>
      <div className="space-y-5">
        <BookingFlightDetails />
        <BookingFlightDetails returning />
      </div>
    </PassengerDialog>
  );
}
