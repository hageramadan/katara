"use client";

import { FaPlane, FaSuitcase } from "react-icons/fa";
import Image from "next/image";
import { localizeDigits } from "@/lib/flights/format";
import type { FlightResult } from "@/lib/flights/types";

export default function FlightBaggageContent({ flight, ar }: { flight: FlightResult; ar: boolean }) {

  return (
<div className="space-y-5">
              <div className="grid grid-cols-1 items-center gap-3 rounded-xl border border-[#E2E6EC] bg-white p-3 sm:grid-cols-[1fr_auto] sm:p-4">
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-6 w-18 shrink-0 items-center justify-center">
                      <Image src="/images/more/more.png" alt={flight.airlineEn} width={800} height={400} className="h-6 w-18" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold text-[#263142] sm:text-base">{ar ? flight.airline : flight.airlineEn}</p>
                      <p className="mt-1 text-[11px] font-semibold text-[#77808D]" dir="ltr">{flight.outboundFlight} · Airbus A320</p>
                    </div>
                  </div>
                </div>
                <div dir="ltr" className="flex items-center justify-between gap-3 rounded-lg bg-[#F8F9FB] px-3 py-2 sm:min-w-57.5">
                  <div className="text-center">
                    <p className="text-base font-extrabold text-[#263142]">{localizeDigits(flight.outboundDeparture, false)}</p>
                    <p className="text-[10px] font-semibold text-[#77808D]">CAI</p>
                  </div>
                  <div className="flex flex-1 flex-col items-center text-[#77808D]">
                    <span className="flex w-full items-center gap-1"><span className="h-px flex-1 bg-[#C9D0DA]" /><FaPlane className="text-[#16865C]" /><span className="h-px flex-1 bg-[#C9D0DA]" /></span>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-extrabold text-[#263142]">{localizeDigits(flight.outboundArrival, false)}</p>
                    <p className="text-[10px] font-semibold text-[#77808D]">JED</p>
                  </div>
                </div>
              </div>

              {[
                { key: "outbound", from: "CAI", to: "JED" },
                { key: "return", from: "JED", to: "CAI" },
              ].map((direction) => (
                <section key={direction.key} dir={ar ? "rtl" : "ltr"}>
                  <h3 className="text-sm font-extrabold text-[#131A50]">{direction.from} {ar ? "إلى" : "to"} {direction.to}</h3>
                  <p className="mb-2 mt-2 flex items-center gap-1.5 text-xs text-[#8A8A8A]">
                    <FaSuitcase aria-hidden="true" className="text-[#777]" />
                    {ar ? `${flight.seatsLeft} مقاعد متاحة · فئة الحجز E` : `${flight.seatsLeft} seats available · Booking class E`}
                  </p>
                  <div className="overflow-hidden border border-[#E2E2E2] bg-white">
                    <table className="w-full table-fixed text-center text-xs text-[#4D4D4D]">
                      <thead className="bg-[#F7F8F9] font-bold">
                        <tr>
                          
                          
                          <th className="border border-[#E2E2E2] px-2 py-3">{ar ? "الراكب" : "Passenger"}</th>
                        <th className="border border-[#E2E2E2] px-2 py-3">Check-in</th>
                        <th className="border border-[#E2E2E2] px-2 py-3">{ar ? "الكابينة" : "Cabin"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[0, 1].map((passenger) => (
                          <tr key={passenger}>
                             <td className="border border-[#E2E2E2] px-2 py-3">{ar ? "بالغ" : "Adult"}</td>
                              <td className="border border-[#E2E2E2] px-2 py-3">{flight.baggage} KG</td>
                            <td className="border border-[#E2E2E2] px-2 py-3">7 KG</td>
                           
                           
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ))}
            </div>
  );
}
