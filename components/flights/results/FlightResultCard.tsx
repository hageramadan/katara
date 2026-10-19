"use client";

import { useState } from "react";
import { FaPlane, FaPlaneArrival, FaWhatsapp } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa6";
import { SiEmirates, SiQatarairways, SiTurkishairlines } from "react-icons/si";

import {
  FiCheck,
  FiGrid,
  FiHeart,
  FiInfo,
  FiShare2,
  FiUsers,
} from "react-icons/fi";
import { RiSuitcaseLine } from "react-icons/ri";
import Dropdown from "@/components/ui/Dropdown";
import { useApp } from "@/context/AppContext";
import { localizeDigits } from "@/lib/flights/format";
import { FlightResult } from "@/lib/flights/types";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

function AirlineMark({ airline }: { airline: string }) {
  const BrandIcon = airline.includes("Turkish")
    ? SiTurkishairlines
    : airline.includes("Emirates")
      ? SiEmirates
      : SiQatarairways;
  const brandColor = airline.includes("Turkish")
    ? "#C8102E"
    : airline.includes("Emirates")
      ? "#D71920"
      : "#5C0632";

  return (
    <span className="flex h-6 w-22 shrink-0 items-center justify-center  sm:h-6 sm:w-22">
      <Image
        src="/images/promo/Frame.png"
        alt="airline logo"
        width={600}
        height={200}
        className="w-21.5 h-6"
      />
    </span>
  );
}

function FlightAirport({ code, time, airport }: { code: string; time: string; airport: string }) {
  return (
    <div className="flex min-w-0 shrink-0 flex-col gap-1 text-center">
      <p className="text-[10px] font-bold text-[#4A4A4A] sm:text-xs">{code}</p>
      <p className="text-base font-bold leading-tight text-[#0D0D0D] sm:text-xl" dir="ltr">{time}</p>

    </div>
  );
}

function FlightSegmentCard({
  direction,
  departure,
  arrival,
  flightNumber,
  airline,
  airlineKey,
  baggage,
  durationMinutes,
  stops,
  ar,
}: {
  direction: "outbound" | "return";
  departure: string;
  arrival: string;
  flightNumber: string;
  airline: string;
  airlineKey: string;
  baggage: number;
  durationMinutes: number;
  stops: number;
  ar: boolean;
}) {
  const isReturn = direction === "return";
  const DirectionIcon = isReturn ? FaPlaneArrival : FaPlaneDeparture;
  const label = isReturn
    ? ar
      ? "العودة"
      : "Return"
    : ar
      ? "الذهاب"
      : "Outbound";
  const route = isReturn
    ? ar
      ? "الكويت · إسطنبول"
      : "Kuwait · Istanbul"
    : ar
      ? "إسطنبول · الكويت"
      : "Istanbul · Kuwait";
  const departureCode = isReturn ? "KWI" : "IST";
  const arrivalCode = isReturn ? "IST" : "KWI";
  const departureAirport = isReturn
    ? ar ? "مطار الكويت" : "Kuwait Airport"
    : ar ? "مطار إسطنبول" : "Istanbul Airport";
  const arrivalAirport = isReturn
    ? ar ? "مطار إسطنبول" : "Istanbul Airport"
    : ar ? "مطار الكويت" : "Kuwait Airport";
  const duration = `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`;

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-[#DFE5ED] bg-white shadow-[0_3px_12px_rgba(15,23,42,0.045)] transition hover:border-[#C9D4E2]">
      <header className="flex min-h-[68px] items-stretch justify-between gap-3 bg-[#E7E8ED] text-[#0D154BBF]">
        <div className="flex min-w-0 items-stretch gap-0">
          <span
            className="inline-flex shrink-0 items-center gap-2 self-stretch bg-[#0D154B] px-3 text-[11px] md:text-base font-bold text-white"
            style={{
              clipPath: isReturn
                ? "polygon(8% 0, 100% 0, 100% 100%, 0 100%)"
                : "polygon(0 0, 100% 0, 100% 100%, 8% 100%)",
            }}
          >
            <span>{label}</span>
            <DirectionIcon className="shrink-0 w-6 h-6  -scale-x-100 " />
          </span>
          <p className="flex min-w-0 items-center px-2 text-base font-bold text-[#0D154B] sm:px-3 sm:text-lg">
            <span className="truncate">{route}</span>
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end justify-center py-2 pe-3 text-end sm:pe-6">
          <p className="text-[10px] font-semibold text-[#0D0D0D] sm:text-sm">
            {ar ? "4 سبتمبر 2026" : "4 September 2026"}
          </p>
          <p className="mt-0.5 truncate text-[10px] md:text-sm font-semibold text-[#0D0D0D]">
            {ar ? "درجة رجال الأعمال" : "Business class"}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-[auto_1fr] items-center gap-2.5 p-3 sm:gap-3 sm:p-4">
        <input
          type="radio"
          name={`flight-${direction}`}
          value={flightNumber}
          aria-label={`${label}: ${flightNumber}`}
          className="h-4 w-4 accent-[#0D154B]"
        />
        <div className="grid min-w-0 gap-2 lg:grid-cols-3 lg:items-center">
          <div className="flex min-w-0 i flex-col  gap-2.5">
            <AirlineMark airline={airlineKey} />
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-[#263142] sm:text-sm">
                {airline}
              </p>
              <p
               
                className="mt-0.5 text-[10px] font-semibold tracking-wide text-[#77808D] "
              >
                {localizeDigits(flightNumber, false)}
              </p>
            </div>
          </div>

          <div
            dir="ltr"
            className="col-span-2 flex min-w-0 items-center justify-between gap-1.5 rounded-xl bg-white px-2 py-2.5 sm:gap-2 sm:px-2.5 sm:py-3 md:gap-3 md:px-4 md:py-4"
          >
            <FlightAirport code={departureCode} time={departure} airport={departureAirport} />
            <div className="flex min-w-0 flex-1 flex-col items-center px-0.5 sm:px-1 md:px-2">
              <p className="mb-1.5 whitespace-nowrap text-[9px] font-semibold text-[#8E8E8E] sm:text-[10px] md:text-xs">
                {stops === 0
                  ? ar ? "مباشر" : "Nonstop"
                  : ar ? `${localizeDigits(stops, false)} توقف` : `${stops} stop`}{" · "}{duration}
              </p>
              <div className="flex w-full items-center justify-center gap-1 md:gap-1.5">
                <FaPlane className="shrink-0 text-sm text-[#289800] md:text-lg lg:text-xl rtl:rotate-180" />
                
                <span className="h-0.5 min-w-3 flex-1 bg-[#D9D9D9]" />
                <span className="h-1 w-1 shrink-0 rounded-full bg-[#289800] md:h-1.5 md:w-1.5" />
                
              </div>
              <div className="mt-1.5 flex flex-wrap flex-row-reverse items-center justify-center gap-1 text-[9px] font-bold text-[#8E8E8E] sm:text-[10px] md:gap-2 md:text-xs">
                <Image src="/images/promo/w.png" alt={ar ? "أمتعة المقصورة" : "Cabin baggage"} width={20} height={20} className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="text-[#289800]">W</span><span aria-hidden="true">·</span>
               
                <Image src="/images/promo/pag2.png" alt={ar ? "الأمتعة المسجلة" : "Checked baggage"} width={24} height={24} className="h-4 w-4 md:h-5 md:w-5" />
                <span>{localizeDigits(baggage, false)}</span>
                 {ar ? "كجم" : "kg"}
              </div>
            </div>
            <FlightAirport code={arrivalCode} time={arrival} airport={arrivalAirport} />
          </div>
        </div>

      
      </div>
    </section>
  );
}

export default function FlightResultCard({ flight }: { flight: FlightResult }) {
  const { lang } = useApp();
  const ar = lang === "ar";
  const [showDetails, setShowDetails] = useState(false);
  const [showFares, setShowFares] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const airline = ar ? flight.airline : flight.airlineEn;
  const formattedPrice = localizeDigits(
    new Intl.NumberFormat("en-KW").format(flight.price),
    false,
  );

  const shareFlight = async () => {
    const shareData = {
      title: airline,
      text: `${airline} · KWD ${formattedPrice}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
      }
    } catch {
      // The user may dismiss the native share sheet.
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-[#E1E7EF] bg-white shadow-[0_4px_16px_rgba(15,23,42,0.05)] transition duration-200 hover:border-[#CCD5E2] hover:shadow-md">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 border-b border-[#E8EDF3] bg-gradient-to-br from-white via-white to-[#F8FAFD] p-4 sm:grid-cols-[minmax(180px,1fr)_auto_auto] sm:gap-4 sm:p-5">
        <div className="col-start-1 row-start-1 flex min-w-0 items-center gap-3">
          <AirlineMark airline={flight.airlineEn} />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#0D0D0D] sm:text-lg">
              {airline}
            </p>
            
          </div>
        </div>

        <div className="col-span-2 row-start-2 flex min-w-0 flex-wrap items-center gap-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:flex-nowrap">
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold sm:text-base ${flight.refundable ? " text-[#4CD964]" : "bg-[#FFF0F0] text-[#B64646]"}`}
          >
            {flight.refundable
              ? ar
                ? "قابلة للاسترداد"
                : "Refundable"
              : ar
                ? "غير قابلة للاسترداد"
                : "Non-refundable"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full py-1 text-sm font-semibold text-[#777777] sm:text-base">
            <FiUsers className="shrink-0" />
            {ar
              ? `متبقي ${localizeDigits(flight.seatsLeft, false)} مقاعد`
              : `${flight.seatsLeft} seats left`}
          </span>
          <div className="col-start-2 row-start-1 shrink-0 text-end sm:col-start-3 px-4">
            <p className="text-sm font-semibold text-[#4A4A4A] sm:text-base">
              {ar ? "السعر للشخص البالغ" : "Price per adult"}
            </p>
            <p
            
              className="mt-0.5 text-lg font-bold tracking-tight text-[#0D154B] sm:text-2xl "
            >
              KWD {formattedPrice}
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:gap-4 sm:p-4">
        <FlightSegmentCard
          direction="outbound"
          departure={localizeDigits(flight.outboundDeparture, false)}
          arrival={localizeDigits(flight.outboundArrival, false)}
          flightNumber={flight.outboundFlight}
          airline={airline}
          airlineKey={flight.airlineEn}
          baggage={flight.baggage}
          durationMinutes={flight.durationMinutes}
          stops={flight.stops}
          ar={ar}
        />
        <FlightSegmentCard
          direction="return"
          departure={localizeDigits(flight.returnDeparture, false)}
          arrival={localizeDigits(flight.returnArrival, false)}
          flightNumber={flight.returnFlight}
          airline={airline}
          airlineKey={flight.airlineEn}
          baggage={flight.baggage}
          durationMinutes={flight.durationMinutes}
          stops={flight.stops}
          ar={ar}
        />
      </div>

      <p className="mx-3 mb-3 flex items-center gap-1 px-3 py-2 text-[10px]  text-[#7B8A90] sm:mx-4 sm:text-xs">
        
        {ar
          ? "اختيار الرحلة يتم لكل اتجاه بشكل مستقل"
          : "Choose a flight separately for each direction"}
          <FaCheckCircle className="shrink-0 text-[#7B8A90] text-xs" />
      </p>

      {(showDetails || showFares) && (
        <div className="mx-3 mb-3 grid grid-cols-1 gap-2 rounded-xl bg-[#F7F8FA] p-3 text-xs sm:mx-4 sm:grid-cols-2 sm:p-4">
          {showDetails && (
            <div className="rounded-lg border border-[#E3E8EF] bg-white p-3 text-[#596474]">
              <p className="font-bold text-[#263142]">
                {ar ? "تفاصيل الرحلة" : "Flight details"}
              </p>
              <p className="mt-2 leading-6">
                {ar
                  ? `الرحلة ${localizeDigits(flight.outboundFlight, false)} مباشرة من إسطنبول إلى الكويت. تشمل حقيبة يد و${localizeDigits(flight.baggage, false)} كجم أمتعة مسجلة.`
                  : `Flight ${flight.outboundFlight} flies from Istanbul to Kuwait. Includes a carry-on and ${flight.baggage} kg checked baggage.`}
              </p>
            </div>
          )}
          {showFares && (
            <div className="rounded-lg border border-[#E3E8EF] bg-white p-3 text-[#596474]">
              <p className="font-bold text-[#263142]">
                {ar ? "فئة رجال الأعمال" : "Business class"}
              </p>
              <p className="mt-2">
                KWD {formattedPrice} ·{" "}
                {flight.refundable
                  ? ar
                    ? "قابلة للاسترداد"
                    : "Refundable"
                  : ar
                    ? "غير قابلة للاسترداد"
                    : "Non-refundable"}
              </p>
            </div>
          )}
        </div>
      )}

      <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#EEF1F5] p-3 sm:p-4">
        <Dropdown
          align="start"
          width="w-60"
          triggerClassName="justify-between rounded-xl border border-[#DCE3EC] bg-[#F8FAFC] px-3 py-2.5 text-xs text-[#354052] sm:text-sm"
          trigger={ar ? "إظهار المزيد من الخيارات" : "Show more options"}
        >
          {(close) => (
            <div className="py-1">
              <button
                type="button"
                onClick={() => {
                  setShowDetails((value) => !value);
                  close();
                }}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-start text-xs text-[#354052] hover:bg-[#F7F8FA] sm:text-sm"
              >
                <FiInfo />
                {ar ? "تفاصيل الرحلة" : "Flight details"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowFares((value) => !value);
                  close();
                }}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-start text-xs text-[#354052] hover:bg-[#F7F8FA] sm:text-sm"
              >
                <FiGrid />
                {ar ? "فئات الحجز" : "Fare classes"}
              </button>
            </div>
          )}
        </Dropdown>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFavorite((value) => !value)}
            aria-label={ar ? "إضافة للمفضلة" : "Add to favorites"}
            aria-pressed={isFavorite}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCE3EC] transition ${isFavorite ? "bg-[#FCEDEF] text-[#D3314A]" : "bg-white text-[#596474] hover:bg-[#F7F8FA]"}`}
          >
            <FiHeart fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button
            type="button"
            onClick={shareFlight}
            aria-label={ar ? "مشاركة الرحلة" : "Share flight"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCE3EC] bg-white text-[#596474] transition hover:bg-[#F7F8FA]"
          >
            <FiShare2 />
          </button>
          <button
            type="button"
            onClick={() => setShowFares((value) => !value)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-[11px] font-bold text-[#354052] hover:bg-[#F7F8FA] sm:text-xs"
          >
            <FiGrid />
            {ar ? "فئات الحجز" : "Fare classes"}
          </button>
          <button
            type="button"
            onClick={() => setShowDetails((value) => !value)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-[11px] font-bold text-[#354052] hover:bg-[#F7F8FA] sm:text-xs"
          >
            <FiInfo />
            {ar ? "تفاصيل وأسعار" : "Details & prices"}
          </button>
          <a
            href="https://wa.me/971588250786"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#24B75A] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#1DA34F] sm:text-sm"
          >
            <FaWhatsapp className="text-base" />
            {ar ? "حجز واتساب" : "Book on WhatsApp"}
          </a>
        </div>
      </footer>
    </article>
  );
}
