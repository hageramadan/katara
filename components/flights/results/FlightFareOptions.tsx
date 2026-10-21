"use client";

import { useState } from "react";
import { BiSolidPlaneLand, BiSolidPlaneTakeOff } from "react-icons/bi";
import { FaSuitcase } from "react-icons/fa";
import { GoBookmarkFill } from "react-icons/go";
import { FiClock } from "react-icons/fi";
import type { FlightResult } from "@/lib/flights/types";

const baggageCategories = [
  { key: "three", label: "3 Bags ", color: "#852089" },
  { key: "two", label: "2 Bags", color: "#328316" },
  { key: "one", label: "1 Bag", color: "#263CCD" },
  { key: "none", label: "No bag", color: "#777777" },
] as const;

const fares = [
  { name: "3B|Flex", price: 210, baggage: "three" },
  { name: "3B|Saver", price: 195, baggage: "three" },
  { name: "2B|Flex", price: 180, baggage: "two" },
  { name: "2B|Saver", price: 165, baggage: "two" },
  { name: "1B|Flex", price: 145, baggage: "one" },
  { name: "1B|Saver", price: 130, baggage: "one" },
  { name: "M|EC", price: 110, baggage: "none" },
  { name: "L|EC", price: 125, baggage: "none" },
] as const;

export default function FlightFareOptions({
  flight,
  direction,
  ar,
}: {
  flight: FlightResult;
  direction: "outbound" | "return";
  ar: boolean;
}) {
  const [selectedFare, setSelectedFare] = useState("M|EC");
  const selectedFareOption = fares.find((fare) => fare.name === selectedFare) ?? fares[0];
  const durationMinutes = flight.durationMinutes;
  const duration = `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`;
  const directionLabel = direction === "outbound" ? (ar ? "الذهاب" : "Outbound") : (ar ? "العودة" : "Return");
  const DirectionIcon = direction === "outbound" ? BiSolidPlaneTakeOff : BiSolidPlaneLand;

  return (
    <section className="overflow-hidden rounded-2xl border border-[#E1E7EF] bg-white">
      <header className="flex flex-wrap items-center justify-between gap-3 bg-[#0D154B26] p-3 sm:p-4">
        <div className="flex min-w-0 items-center gap-2 rounded-xl text-[#0D154B] px-3 py-2 text-sm font-bold ">
         <h2 className="text-[#0D154B] font-extrabold text-base md:text-lg">{directionLabel}</h2>
          <DirectionIcon aria-hidden="true" className="shrink-0 -scale-x-100 w-7 h-7" />
          
        </div>
        <div className="flex items-center gap-3 text-sm  text-[#6C757D]" dir="ltr">
           <span className="inline-flex items-center gap-1.5 text-[#6C757D]">
            <FiClock aria-hidden="true" /> {duration}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#6C757D] sm:text-xs" dir={ar ? "rtl" : "ltr"}>
            {ar ? "الأسعار متغيرة حسب الفئة" : "Prices vary by fare"}
            <GoBookmarkFill aria-hidden="true" className="shrink-0 text-[#6C757D]" />
            
          </span>
         
        </div>
      </header>

      <div className="space-y-4 p-3 sm:p-4">
        <div className="flex flex-wrap gap-2 ">
          {baggageCategories.map((category) => (
            <span
              key={category.key}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#263142]"
            >
               <span>
                {ar
                  ? category.key === "none" ? " No Bag" : category.label
                  : category.label}
              </span>
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: category.color }}
              >
                <FaSuitcase />
              </span>
             
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
          {fares.map((fare) => {
            const fareCategory = baggageCategories.find((category) => category.key === fare.baggage)!;

            return (
              <button
                key={fare.name}
                type="button"
                aria-pressed={selectedFare === fare.name}
                onClick={() => setSelectedFare(fare.name)}
                className={`relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-xl border-2 bg-white px-1 pb-1 pt-3 text-center transition hover:bg-[#F8F9FC] ${selectedFare === fare.name ? "ring-2 ring-[#0D154B]/20" : ""}`}
                style={{ borderColor: fareCategory.color }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-3 w-3"
                  style={{ backgroundColor: fareCategory.color, clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                />
                <span className="block truncate text-[9px] font-extrabold text-[#263142]">{fare.name}</span>
                <bdi dir="ltr" className="mt-1 block whitespace-nowrap text-[8px] font-bold text-[#4A4A4A]">{fare.price} KWD</bdi>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
