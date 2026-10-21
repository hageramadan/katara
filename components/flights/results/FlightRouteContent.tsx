"use client";

import Image from "next/image";
import { BiSolidPlaneLand, BiSolidPlaneTakeOff } from "react-icons/bi";
import { FaPlane, FaSuitcase } from "react-icons/fa";
import { localizeDigits } from "@/lib/flights/format";
import type { FlightResult } from "@/lib/flights/types";

export default function FlightRouteContent({ flight, ar }: { flight: FlightResult; ar: boolean }) {

  return (
<div className="overflow-hidden rounded-xl border border-[#E2E6EC] bg-white">
              {[
                {
                  key: "outbound",
                  route: ar ? "القاهرة - الكويت" : "Cairo - Kuwait",
                  date: ar ? "الاثنين 17 نوفمبر 2025" : "Monday, November 17, 2025",
                  departure: flight.outboundDeparture,
                  arrival: flight.outboundArrival,
                  fromCode: "CAI",
                  fromCity: ar ? "مطار القاهرة" : "Cairo Airport",
                  toCode: "KWI",
                  toCity: ar ? "مطار الكويت" : "Kuwait Airport",
                  flightNumber: flight.outboundFlight,
                },
                {
                  key: "outbound-connection",
                  route: ar ? "القاهرة - الكويت" : "Cairo - Kuwait",
                  date: ar ? "الاثنين 17 نوفمبر 2025" : "Monday, November 17, 2025",
                  departure: flight.outboundDeparture,
                  arrival: flight.outboundArrival,
                  fromCode: "CAI",
                  fromCity: ar ? "مطار القاهرة" : "Cairo Airport",
                  toCode: "KWI",
                  toCity: ar ? "مطار الكويت" : "Kuwait Airport",
                  flightNumber: flight.outboundFlight,
                },
                {
                  key: "return",
                  route: ar ? "الكويت - القاهرة" : "Kuwait - Cairo",
                  date: ar ? "الثلاثاء 18 نوفمبر 2025" : "Tuesday, November 18, 2025",
                  departure: flight.returnDeparture,
                  arrival: flight.returnArrival,
                  fromCode: "KWI",
                  fromCity: ar ? "مطار الكويت" : "Kuwait Airport",
                  toCode: "CAI",
                  toCity: ar ? "مطار القاهرة" : "Cairo Airport",
                  flightNumber: flight.returnFlight,
                },
              ].map((leg, index) => (
                <div key={leg.key}>
                  {index === 1 && (
                    <div className="flex items-center gap-3 px-3 py-2 sm:px-4">
                      <span className="h-px flex-1 bg-[#D9DDE3]" />
                      <span className="rounded-full border border-[#63B54A] px-2.5 py-1 text-[11px] font-semibold text-[#4C9638]" dir="ltr">
                        {ar ? "انتظار 7 ساعات و45 دقيقة" : "7h 45m layover"}
                      </span>
                      <span className="h-px flex-1 bg-[#D9DDE3]" />
                    </div>
                  )}
                  {(index === 0 || index === 2) && <div dir={ar ? "rtl" : "ltr"} className="flex items-center justify-between gap-3 bg-[#E7E7E7] px-3 py-2 text-[11px] font-semibold text-[#666] sm:px-4 sm:text-sm">
                    <span className="flex min-w-0 items-center gap-2">
                      {index === 0 ? <BiSolidPlaneTakeOff aria-hidden="true" /> : <BiSolidPlaneLand aria-hidden="true" />}
                      <span className="truncate">{leg.route}</span>
                    </span>
                    <span className="shrink-0">{leg.date}</span>
                    <span className="shrink-0"><bdi dir="ltr">{Math.floor(flight.durationMinutes / 60)}h {flight.durationMinutes % 60}m</bdi>: {ar ? "المدة الإجمالية" : "total duration"}</span>
                  </div>}
                  <div className="grid grid-cols-1 gap-3 px-3 py-3 sm:grid-cols-[minmax(0px,1fr)_minmax(150px,0.8fr)] sm:items-center sm:px-4 sm:py-4">
                    
                    <div dir={ar ? "rtl" : "ltr"} className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)] items-center gap-1">
                      <div className={ar ? "text-start" : "text-end"}>
                        <p className="text-xl font-extrabold text-[#333]">{localizeDigits(leg.arrival, false)}</p>
                        <p className="mt-1 text-xs font-semibold text-[#73777D]">{leg.toCity}</p>
                        <p className="text-xs text-[#858A91]">{ar ? "صالة A" : "Terminal A"}</p>
                      </div>
                      <div className="flex min-w-0 flex-col items-center gap-1 text-[11px] text-[#858A91]">
                        <span className="whitespace-nowrap">{Math.floor(flight.durationMinutes / 60)}h {flight.durationMinutes % 60}m · {flight.stops ? (ar ? "ترانزيت" : "transit") : (ar ? "مباشر" : "nonstop")}</span>
                        <div className="flex w-full items-center gap-2">
                          
                          <FaPlane aria-hidden="true" className="shrink-0 text-[#279A20] rtl:rotate-180" />
                          <span className="h-px flex-1 border-t border-dashed border-[#C6CBD2]" />
                          <span className="h-1 w-1 shrink-0 rounded-full bg-[#279A20]" />
                          
                        </div>
                        <span className="flex items-center gap-1 text-[#279A20]">W · <FaSuitcase aria-hidden="true" className="text-[#858A91]" /> <span className="text-[#858A91]">{flight.baggage} kg</span></span>
                      </div>
                      <div className={ar ? "text-end" : "text-start"}>
                        <p className="text-xl font-extrabold text-[#333]">{localizeDigits(leg.departure, false)}</p>
                        <p className="mt-1 text-xs font-semibold text-[#73777D]">{leg.fromCity}</p>
                        <p className="text-xs text-[#858A91]">{ar ? "صالة A" : "Terminal A"}</p>
                      </div>
                    </div>
                    <div dir="ltr" className="flex w-full items-center justify-start gap-3 sm:flex-col sm:items-start sm:gap-2">
                      <Image src="/images/promo/Frame.png" alt="Qatar Airways" width={78} height={34} className="h-auto w-[68px] sm:w-[78px]" />
                      <span className="text-start text-[11px] font-semibold text-[#0D0D0D] md:text-base">{leg.flightNumber} · Airbus A320</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  );
}
