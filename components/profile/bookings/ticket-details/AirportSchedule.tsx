"use client";

import { useApp } from "@/context/AppContext";
import { FaStarOfLife } from "react-icons/fa";

const border = "border-t border-dashed border-[#D8DEE8]";

export default function AirportSchedule() {
  const { lang } = useApp();
  const items = lang === "ar"
    ? ["التواجد بالمطار الساعة 11:30 ظهراً", "الإقلاع الساعة 02:30 ظهراً", "وصول الكويت الساعة 05:30 مساءً"]
    : ["Be at the airport by 11:30 AM", "Departure at 02:30 PM", "Arrival in Kuwait at 05:30 PM"];
  return (
    <section className={`${border} mt-6 flex flex-col gap-3 pt-5 text-sm font-semibold`} aria-label={lang === "ar" ? "مواعيد الرحلة" : "Flight schedule"}>
      {items.map((item) => <p key={item} className="flex items-center gap-2"><FaStarOfLife aria-hidden="true" className="shrink-0 text-xs text-[#0D154B]" />{item}</p>)}
    </section>
  );
}
