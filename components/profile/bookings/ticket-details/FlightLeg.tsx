"use client";

import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { FaPlane } from "react-icons/fa6";

export default function FlightLeg({ reverse = false }: { reverse?: boolean }) {
  const { lang } = useApp();
  const from = reverse ? "KWI" : "CAI";
  const to = reverse ? "CAI" : "KWI";
  const fromTime = reverse ? "18:20" : "01:50";
  const toTime = reverse ? "21:40" : "04:10";
  const departureAirport = reverse
    ? lang === "ar" ? "مطار الكويت، صالة A" : "Kuwait Airport, Terminal A"
    : lang === "ar" ? "مطار القاهرة، صالة A" : "Cairo Airport, Terminal A";
  const arrivalAirport = reverse
    ? lang === "ar" ? "مطار القاهرة، صالة A" : "Cairo Airport, Terminal A"
    : lang === "ar" ? "مطار الكويت، صالة A" : "Kuwait Airport, Terminal A";

  return (
    <article className="rounded-2xl border border-[#E8ECF1] bg-[#FBFCFD] p-4 md:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Image src="/images/tiket/tikd.png" alt={lang === "ar" ? "شعار شركة الطيران" : "Airline logo"} width={56} height={56} className="h-14 w-14 object-contain" />
          <div className="text-[#0D0D0D]">
            <h3 className="text-base font-bold md:text-xl">{lang === "ar" ? "طيران القطرية" : "Qatar Airways"}</h3>
            <p className="mt-2 text-xs text-gray-500 md:text-sm" dir="ltr">MS-917 - Airbus A321neo | 7h 40 min</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#0D154BEB] sm:text-sm">
          <span className="rounded-full bg-[#E7F7F7] px-3 py-2">{lang === "ar" ? "غير قابل للاسترداد" : "Non-refundable"}</span>
          <span className="rounded-full bg-[#E7F7F7] px-3 py-2">{lang === "ar" ? "ترانزيت" : "Transit"}</span>
          <span className="rounded-full bg-[#E7F7F7] px-3 py-2">{lang === "ar" ? "الخميس، 2 سبتمبر 2025" : "Thu, 2 Sep 2025"}</span>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm font-semibold text-[#596579]">
        <h4 className="text-lg font-bold text-[#0D0D0D] md:text-2xl">{lang === "ar" ? "القاهرة إلى الكويت - طيران أعمال" : "Cairo to Kuwait - Business class"}</h4>
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary">2D، 3D</span><span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">{lang === "ar" ? "حقيبة" : "Luggage"} 23 + 23 + 7 {lang === "ar" ? "كجم" : "kg"}<Image src="/images/promo/pag2.png" alt="" width={24} height={24} className="h-5 w-5 object-contain md:h-6 md:w-6" /></span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-4 md:gap-4 md:px-5 md:py-6">
        <Airport code={from} time={fromTime} airport={departureAirport} />
        <div className="flex min-w-0 flex-1 flex-col items-center px-1 md:px-4">
          <p className="mb-2 whitespace-nowrap text-[10px] font-bold text-[#8E8E8E] sm:text-xs md:text-sm">7h 40 min</p>
          <div className="flex w-full items-center justify-center gap-1 md:gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D9D9D9] md:h-2 md:w-2" />
            <span className="h-0.5 min-w-3 flex-1 bg-[#D9D9D9]" />
            <FaPlane className="shrink-0 text-base text-[#D9D9D9] md:text-xl lg:text-2xl rtl:rotate-180" />
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-bold text-[#8E8E8E] sm:text-xs md:gap-3 md:text-sm">
            <Image src="/images/promo/w.png" alt={lang === "ar" ? "أمتعة المقصورة" : "Cabin baggage"} width={20} height={20} className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-[#39D700]">W</span><span aria-hidden="true">·</span>
            <Image src="/images/promo/pag2.png" alt={lang === "ar" ? "الأمتعة المسجلة" : "Checked baggage"} width={24} height={24} className="h-5 w-5 md:h-6 md:w-6" />
            <span dir="ltr">45 {lang === "ar" ? "كجم" : "kg"}</span>
          </div>
        </div>
        <Airport code={to} time={toTime} airport={arrivalAirport} />
      </div>
    </article>
  );
}

function Airport({ code, time, airport }: { code: string; time: string; airport: string }) {
  return (
    <div className="flex shrink-0 flex-col gap-1.5 text-center md:gap-2">
      <p className="text-xs font-bold text-[#4A4A4A] md:text-sm lg:text-base">{code}</p>
      <p className="text-lg font-bold text-[#0D0D0D] md:text-2xl" dir="ltr">{time}</p>
      <p className="max-w-24 text-[9px] leading-snug text-[#606060] sm:max-w-32 sm:text-[10px] md:max-w-none md:text-xs">{airport}</p>
    </div>
  );
}
