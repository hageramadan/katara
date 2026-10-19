"use client";

import { useApp } from "@/context/AppContext";
import { FaUser } from "react-icons/fa6";

export default function PassengerDetails() {
  const { lang } = useApp();
  return (
    <section className="border-t border-dashed border-[#D8DEE8] pt-5" aria-labelledby="passenger-heading">
      <h2 id="passenger-heading" className="mb-4 text-base font-bold text-[#0D0D0D] md:text-xl">{lang === "ar" ? "بيانات المسافرين" : "Passenger details"}</h2>
      <ul className="divide-y divide-[#E9EDF1]">
        {["2D", "3D"].map((seat, index) => (
          <li key={seat} className="flex items-center justify-between gap-3 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0D154B] text-white"><FaUser aria-hidden="true" /></span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#667085]">{lang === "ar" ? `المسافر ${index ? "الثاني" : "الأول"} - بالغ` : `Passenger ${index + 1} - Adult`}</p>
                <p className="mt-1 truncate text-sm font-bold sm:text-base">Mr. Saleh Mohamed Ameen</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-center rounded-lg bg-white px-4 py-2">
              <span className="text-[10px] text-[#8993A1]">{lang === "ar" ? "المقعد" : "Seat"}</span>
              <span className="mt-0.5 font-extrabold text-primary">{seat}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
