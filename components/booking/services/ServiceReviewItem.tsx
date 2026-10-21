"use client";
import { useApp } from "@/context/AppContext";
import { travelerName } from "@/context/BookingFlowContext";
import { servicePrice } from "@/lib/booking/services";
import type { BookingTraveler, ServiceSelection } from "@/lib/booking/types";

type ServiceReviewItemProps = {
  traveler: BookingTraveler;
  selection: ServiceSelection;
};

export default function ServiceReviewItem({ traveler, selection }: ServiceReviewItemProps) {
  const { lang } = useApp();

  return (
    <li className="border-t border-slate-100 pt-3 text-xs leading-loose">
      <p className="font-bold">{travelerName(traveler)}</p>
      <p className="text-slate-500">
        {selection.seat
          ? `${lang === "ar" ? "مقعد" : "Seat"}: ${selection.seat}`
          : lang === "ar" ? "لم يتم اختيار مقعد" : "No seat selected"}
        {" · "}
        {selection.baggage
          ? `+${selection.baggage} ${lang === "ar" ? "كجم" : "kg"}`
          : lang === "ar" ? "بدون أمتعة إضافية" : "No extra baggage"}
        {selection.wheelchair && (
          <>
            {" · "}
            {lang === "ar"
              ? "إضافة كرسي متحرك للمسافر المحدد"
              : "Add wheelchair assistance for the selected passenger"}
          </>
        )}
      </p>
      <bdi>{servicePrice(selection).toFixed(2)} KWD</bdi>
    </li>
  );
}
