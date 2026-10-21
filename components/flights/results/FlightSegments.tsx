import { useRef } from "react";
import { FaPlane, FaPlaneArrival } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa6";
import Image from "next/image";
import { localizeDigits } from "@/lib/flights/format";
import type { FlightResult } from "@/lib/flights/types";

function AirlineMark() {
  return (
    <span className="flex h-6 w-22 shrink-0 items-center justify-center sm:w-22">
      <Image
        src="/images/promo/Frame.png"
        alt=""
        width={600}
        height={200}
        className="w-21.5 h-6"
      />
    </span>
  );
}

function FlightAirport({ code, time }: { code: string; time: string }) {
  return (
    <div className="flex min-w-0 shrink-0 flex-col gap-1 text-center">
      <p className="text-[10px] font-bold text-[#4A4A4A] sm:text-xs">{code}</p>
      <p className="text-base font-bold leading-tight text-[#0D0D0D] sm:text-xl" dir="ltr">{time}</p>

    </div>
  );
}

type FlightSegmentCardProps = {
  direction: "outbound" | "return";
  departure: string;
  arrival: string;
  flightNumber: string;
  airline: string;
  baggage: number;
  durationMinutes: number;
  stops: number;
  ar: boolean;
  onSelect?: () => void;
  showHeader?: boolean;
};

function FlightSegmentCard({
  direction,
  departure,
  arrival,
  flightNumber,
  airline,
  baggage,
  durationMinutes,
  stops,
  ar,
  onSelect,
  showHeader = true,
}: FlightSegmentCardProps) {
  const radioRef = useRef<HTMLInputElement>(null);
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
  const duration = `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`;

  return (
    <section
      onClick={(event) => {
        if (event.target instanceof Element && event.target.closest('input[type="radio"]')) return;
        radioRef.current?.click();
      }}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        radioRef.current?.click();
      }}
      tabIndex={0}
      className="min-w-0 cursor-pointer overflow-hidden rounded-2xl border border-[#DFE5ED] h-fit bg-white shadow-[0_3px_12px_rgba(15,23,42,0.045)] transition hover:border-[#C9D4E2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D154B]/30 has-[:checked]:border-[#0D154B]"
    >
      {showHeader && <header className="flex min-h-17 items-stretch justify-between gap-3 bg-[#E7E8ED] text-[#0D154BBF]">
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
      </header>}

      <div className="grid grid-cols-[auto_1fr] items-center gap-2.5 bg-white p-3 transition-colors has-[:checked]:bg-[#DADBE5] sm:gap-3 sm:p-4">
        <input
          ref={radioRef}
          type="radio"
          name={`flight-${direction}`}
          value={flightNumber}
          aria-label={`${label}: ${flightNumber}`}
          onChange={onSelect}
          className="h-4 w-4 accent-[#0D154B]"
        />
        <div className="grid min-w-0 gap-2 lg:grid-cols-3 lg:items-center">
          <div className="flex min-w-0 flex-col gap-2.5">
            <AirlineMark />
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-[#263142] sm:text-sm">
                {airline}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold tracking-wide text-[#77808D]">
                {localizeDigits(flightNumber, false)}
              </p>
            </div>
          </div>

          <div
            dir="ltr"
            className="col-span-2 flex min-w-0 items-center justify-between gap-1.5 rounded-xl  px-2 py-2.5 sm:gap-2 sm:px-2.5 sm:py-3 md:gap-3 md:px-4 md:py-4"
          >
            <FlightAirport code={departureCode} time={departure} />
            <div className="flex min-w-0 flex-1 flex-col items-center px-0.5 sm:px-1 md:px-2">
              <p className="mb-1.5 whitespace-nowrap text-[9px] font-semibold text-[#8E8E8E] sm:text-[10px] md:text-xs">
               {duration}
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
            <FlightAirport code={arrivalCode} time={arrival} />
          </div>
        </div>

      
      </div>
      
    </section>
  );
}

export default function FlightSegments({
  flight,
  availableFlights,
  onSelectFlight,
  onSelectReturn,
  airline,
  ar,
  tripKind,
}: {
  flight: FlightResult;
  availableFlights?: FlightResult[];
  onSelectFlight?: (flight: FlightResult) => void;
  onSelectReturn?: () => void;
  airline: string;
  ar: boolean;
  tripKind: "multi" | "oneway" | "round";
}) {
  const segments = [
    {
      direction: "outbound" as const,
      departure: flight.outboundDeparture,
      arrival: flight.outboundArrival,
      flightNumber: flight.outboundFlight,
    },
    {
      direction: "return" as const,
      departure: flight.returnDeparture,
      arrival: flight.returnArrival,
      flightNumber: flight.returnFlight,
    },
  ];
  const visibleSegments = tripKind === "oneway" ? segments.slice(0, 1) : segments;

  if (tripKind === "multi" || tripKind === "round") {
    const outboundOptions = availableFlights?.length ? availableFlights : [flight];
    const outboundCards = outboundOptions.map((option, index) => (
      <FlightSegmentCard
        key={option.id}
        direction="outbound"
        departure={localizeDigits(option.outboundDeparture, false)}
        arrival={localizeDigits(option.outboundArrival, false)}
        flightNumber={option.outboundFlight}
        airline={ar ? option.airline : option.airlineEn}
        baggage={option.baggage}
        durationMinutes={option.durationMinutes}
        stops={option.stops}
        ar={ar}
        onSelect={() => onSelectFlight?.(option)}
        showHeader={tripKind === "multi" || index === 0}
      />
    ));

    return (
      <div className={`grid grid-cols-1 gap-3 p-3 sm:gap-4 sm:p-4 ${tripKind === "round" ? "lg:grid-cols-2" : ""}`}>
        <div className="grid min-w-0 ">{outboundCards}</div>
        {tripKind === "round" && (
          <FlightSegmentCard
            direction="return"
            departure={localizeDigits(flight.returnDeparture, false)}
            arrival={localizeDigits(flight.returnArrival, false)}
            flightNumber={flight.returnFlight}
            airline={ar ? flight.airline : flight.airlineEn}
            baggage={flight.baggage}
            durationMinutes={flight.durationMinutes}
            stops={flight.stops}
            ar={ar}
            onSelect={onSelectReturn}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-3 p-3 sm:gap-4 sm:p-4 ${tripKind === "oneway" ? "" : "sm:grid-cols-2"}`}>
      {visibleSegments.map((segment) => (
        <FlightSegmentCard
          key={segment.direction}
          {...segment}
          departure={localizeDigits(segment.departure, false)}
          arrival={localizeDigits(segment.arrival, false)}
          airline={airline}
          baggage={flight.baggage}
          durationMinutes={flight.durationMinutes}
          stops={flight.stops}
          ar={ar}
        />
      ))}
    </div>
  );
}
