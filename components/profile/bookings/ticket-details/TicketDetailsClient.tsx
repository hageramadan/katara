"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { HiOutlineTicket } from "react-icons/hi2";
import FlightLeg from "./FlightLeg";
import PassengerDetails from "./PassengerDetails";
import PriceBreakdown from "./PriceBreakdown";
import AirportSchedule from "./AirportSchedule";
import TicketActions from "./TicketActions";

export default function TicketDetailsClient({ ticketNumber }: { ticketNumber: string }) {
  const { lang } = useApp();
  const ar = lang === "ar";

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5 pb-8 text-[#172033]">
      <nav aria-label={ar ? "مسار التنقل" : "Breadcrumb"} className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#929BA8] md:text-sm">
        <Link href="/" className="hover:text-[#0D154B]">{ar ? "الرئيسية" : "Home"}</Link>
        <span aria-hidden="true">›</span>
        <Link href="/profile" className="hover:text-[#0D154B]">{ar ? "ملفي الشخصي" : "My profile"}</Link>
        <span aria-hidden="true">›</span>
        <Link href="/profile/bookings" className="text-[#333333] hover:text-[#0D154B]">{ar ? `تذكرة ${ticketNumber}` : `Ticket ${ticketNumber}`}</Link>
      </nav>

      <header>
        <h1 className="flex items-center gap-2 text-xl font-extrabold md:text-2xl">
          <HiOutlineTicket aria-hidden="true" className="text-[#0D154B]" />
          {ar ? "تفاصيل تذكرة الطيران" : "Flight ticket details"}
        </h1>
        <p className="mt-1 text-sm text-[#8993A1]">{ar ? "تابع تفاصيل تذكرة طيرانك من هنا" : "Review your flight ticket details here"}</p>
      </header>

      <section aria-labelledby="departure-heading" className="rounded-2xl border border-[#E8ECF1] bg-white p-4 shadow-[0_4px_18px_rgba(20,35,60,0.03)] md:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="departure-heading" className="text-lg font-bold">{ar ? "رحلات الذهاب" : "Departure flights"}</h2>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="rounded-lg border border-[#E2E6EC] px-3 py-2 text-xs font-semibold hover:bg-gray-50 md:px-4 md:text-sm">{ar ? "إلغاء الرحلة" : "Cancel flight"}</button>
            <button type="button" className="rounded-lg border border-[#E2E6EC] px-3 py-2 text-xs font-semibold hover:bg-gray-50 md:px-4 md:text-sm">{ar ? "تغيير موعد الرحلة" : "Change flight date"}</button>
            <button type="button" className="rounded-lg bg-[#0D154B] px-3 py-2 text-xs font-semibold text-white hover:bg-[#18245F] md:px-4 md:text-sm">{ar ? "إضافة خدمات للرحلة" : "Add flight services"}</button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <FlightLeg />
          <FlightLeg reverse />
        </div>
        <PassengerDetails />
        <PriceBreakdown />
        <AirportSchedule />
        <div className="mt-6 border-t border-dashed border-[#D8DEE8] pt-5">
          <TicketActions />
        </div>
      </section>
    </div>
  );
}
