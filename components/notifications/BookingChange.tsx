"use client";
import { useId, useState } from "react";
import Image from "next/image";
import { FaPlane, FaPlaneArrival, FaPlaneDeparture, FaSuitcase, FaSuitcaseRolling } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import type { FlightResult } from "@/lib/flights/types";
import FlightBookingDetailsModal from "@/components/flights/results/FlightBookingDetailsModal";
import FlightMoreOptionsModal from "@/components/flights/results/FlightMoreOptionsModal";
import FlightFareOptions from "@/components/flights/results/FlightFareOptions";
import FlightResultCard from "@/components/flights/results/FlightResultCard";
import FlightTicketActions from "@/components/flights/results/FlightTicketActions";
import { flightResults } from "@/lib/flights/data";

// Keep the flight values displayed in the supplied notification design.
const bookingChangeFlight: FlightResult = {
  id: "notification-booking-change",
  airline: "الخطوط التركية",
  airlineEn: "Turkish Airlines",
  price: 220,
  seatsLeft: 3,
  refundable: true,
  durationMinutes: 195,
  stops: 0,
  outboundFlight: "",
  returnFlight: "",
  outboundDeparture: "03:05",
  outboundArrival: "21:10",
  returnDeparture: "03:05",
  returnArrival: "21:10",
  baggage: 45,
};

export default function BookingChange() {
  const { lang, dir } = useApp();
  const ar = lang === "ar";
  const [favorite, setFavorite] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [classesOpen, setClassesOpen] = useState(false);
  const [moreTicketsOpen, setMoreTicketsOpen] = useState(false);

  const classesId = useId();
  const moreTicketsId = useId();

  const actionClass = "inline-flex min-h-9 items-center justify-center gap-1 rounded border border-[#35396E] px-2 py-1 text-xs font-semibold sm:min-h-10 sm:px-3 sm:text-base";

  return (
    <section dir={dir} aria-label={ar ? "تغيير الحجز" : "Booking change"} className="space-y-7 px-4 pb-6 pt-6 text-[#24275E] sm:space-y-10 sm:px-8 sm:py-8">
      <h2 className="sr-only">{ar ? "تغيير الحجز" : "Booking change"}</h2>
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
        <div className="flex items-center gap-1.5 text-sm font-bold text-[#444] sm:text-lg">
          <Image src="/images/promo/Frame.png" alt="Qatar Airways" width={90} height={25} className="h-auto w-12 sm:w-20" />
          {ar ? "الخطوط التركية" : "Turkish Airlines"}
        </div>
        <div className="flex flex-wrap items-end gap-x-3 gap-y-1 text-xs sm:gap-x-5 sm:text-base">
          <span className="font-bold text-[#54C668]">▪ {ar ? "قابلة للاسترداد" : "Refundable"} ▪</span>
          <div className="text-end">
            <p className="mb-0.5 text-xs text-[#777] sm:text-sm">{ar ? "السعر للشخص البالغ" : "Price per adult"}</p>
            <div className="flex flex-wrap items-baseline justify-end gap-1 text-[#8D8D8D]">
              <span>{ar ? "متبقي 3 مقاعد" : "3 seats left"}</span>
              <bdi className="font-[family-name:var(--font-inter)] text-base font-bold text-[#16194F] sm:text-2xl">220 KWD</bdi>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-7 sm:space-y-10">
        <FlightLeg returning={false} />
        <FlightLeg returning />
      </div>

      <div id={classesId} hidden={!classesOpen}>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          <FlightFareOptions flight={bookingChangeFlight} direction="outbound" ar={ar} />
          <FlightFareOptions flight={bookingChangeFlight} direction="return" ar={ar} />
        </div>
      </div>

      <FlightTicketActions
        ar={ar}
        isFavorite={favorite}
        shareOpen={shareOpen}
        detailsOpen={detailsOpen}
        classesOpen={classesOpen}
        classesId={classesId}
        onToggleFavorite={() => setFavorite((value) => !value)}
        onShare={() => setShareOpen(true)}
        onOpenDetails={() => setDetailsOpen(true)}
        onToggleClasses={() => setClassesOpen((value) => !value)}
      />
      <div dir="ltr">
        <button type="button" onClick={() => setMoreTicketsOpen((open) => !open)} aria-expanded={moreTicketsOpen} aria-controls={moreTicketsId} className={`${actionClass} bg-[#EFEFF3]`}>
          <FiChevronDown aria-hidden="true" className={`transition-transform ${moreTicketsOpen ? "rotate-180" : ""}`} />
          {moreTicketsOpen ? ar ? "إظهار خيارات أقل" : "Show fewer options" : ar ? "إظهار المزيد من الخيارات" : "Show more options"}
        </button>
      </div>
      <div id={moreTicketsId} hidden={!moreTicketsOpen}>
        {moreTicketsOpen && <div className="space-y-5">
          {flightResults.map((flight) => <FlightResultCard key={flight.id} flight={flight} availableFlights={flightResults} />)}
        </div>}
      </div>
      <FlightBookingDetailsModal flight={bookingChangeFlight} open={shareOpen} onClose={() => setShareOpen(false)} />
      <FlightMoreOptionsModal flight={bookingChangeFlight} open={detailsOpen} onClose={() => setDetailsOpen(false)} ar={ar} />
    </section>
  );
}

function FlightLeg({ returning }: { returning: boolean }) {
  const { lang } = useApp();
  const ar = lang === "ar";
  const [selected, setSelected] = useState(false);
  return (
    <div className="border-l border-[#F0F0F4] pl-2 sm:pl-4">
      <div className="overflow-hidden rounded-lg border border-[#E1E1EC]">
        <div className="grid grid-cols-[1fr_1.4fr_1.2fr] items-stretch bg-[#E9E9F0] text-[11px] font-bold sm:grid-cols-[1fr_1.6fr_1.2fr] sm:text-lg">
          <div className="relative flex flex-row-reverse items-center justify-end gap-2 bg-[#15174F] px-2 py-3 text-white sm:px-5">
            <span aria-hidden="true" className={`absolute inset-y-0 -end-4 w-7 bg-[#15174F] ${returning ? "[clip-path:polygon(100%_0,100%_100%,0_100%)]" : "[clip-path:polygon(0_0,100%_0,100%_100%)]"}`} />
            {returning ? <FaPlaneArrival aria-hidden="true" /> : <FaPlaneDeparture aria-hidden="true" />}
            {returning ? ar ? "العودة" : "Return" : ar ? "الذهاب" : "Departure"}
          </div>
          <strong className="flex items-center justify-center px-1 text-center">{ar ? "اسطنبول . الكويت" : "Istanbul · Kuwait"}</strong>
          <div className="px-1 py-2 text-center text-[9px] font-normal text-[#444] sm:text-sm"><b>{ar ? "4 سبتمبر 2025" : "4 September 2025"}</b><span className="block">{ar ? "درجة رجال الأعمال" : "Business class"}</span></div>
        </div>
        <div className="grid grid-cols-[14px_70px_36px_minmax(0,1fr)_36px] items-center gap-1 px-2 py-4 text-xs sm:grid-cols-[20px_160px_70px_minmax(0,1fr)_70px] sm:gap-5 sm:px-5 sm:py-6 sm:text-lg">
          <input type="radio" name={returning ? "notification-return-flight" : "notification-outbound-flight"} checked={selected} onChange={() => setSelected(true)} aria-label={returning ? ar ? "اختيار رحلة العودة" : "Select return flight" : ar ? "اختيار رحلة الذهاب" : "Select departure flight"} className="size-3 accent-[#35396E] sm:size-4" />
          <div className="min-w-0"><Image src="/images/promo/Frame.png" alt="Qatar Airways" width={110} height={31} className="h-auto w-14 sm:w-24" /><b className="mt-1 block text-[9px] text-[#444] sm:text-base">{ar ? "القطرية الجوية" : "Qatar Airways"}</b></div>
          <div className="text-center text-[#444]"><b dir="ltr">03:05</b><span className="mt-1 block text-[10px] text-[#888] sm:text-sm">CAI</span></div>
          <div className="min-w-0 text-center text-[8px] text-[#999] sm:text-sm">
            <span className="block pb-1.5">{ar ? "مباشر" : "Nonstop"} · 3h 15m</span>
            <div className="relative h-px bg-[#CCD6C9]"><span className="absolute -top-0.5 start-0 size-1 rounded-full bg-[#55C92C]" /><FaPlane aria-hidden="true" className="absolute -top-1.5 end-0 bg-white text-xs text-[#55C92C] rtl:rotate-180" /></div>
            <span className="mt-2 flex flex-wrap items-center justify-center gap-1"><FaSuitcaseRolling aria-hidden="true" className="text-[#55C92C]" /><span className="text-[#55C92C]">W</span><span>·</span><FaSuitcase aria-hidden="true" /><span>45 {ar ? "كجم" : "kg"}</span></span>
          </div>
          <div className="text-center text-[#444]"><b dir="ltr">21:10</b><span className="mt-1 block text-[10px] text-[#888] sm:text-sm">DXB</span></div>
        </div>
      </div>
    </div>
  );
}
