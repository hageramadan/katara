"use client";

import { useApp } from "@/context/AppContext";

const border = "border-t border-dashed border-[#D8DEE8]";

export default function PriceBreakdown() {
  const { lang } = useApp();
  const items = [
    ["2,000 KWD", lang === "ar" ? "التذكرة" : "Ticket"],
    ["2,000 KWD", lang === "ar" ? "تذاكر الطيران" : "Flight tickets"],
    ["2,000 KWD", lang === "ar" ? "العملة" : "Currency"],
    ["2,100 KWD", lang === "ar" ? "إجمالي السعر" : "Total price"],
  ];
  return (
    <section className={`${border} mt-6 grid grid-cols-1 gap-3 pt-5`} aria-label={lang === "ar" ? "ملخص السعر" : "Price summary"}>
      {items.map(([value, label], index) => (
        <div key={label} className="flex items-center justify-between gap-2">
          <p className={`text-sm font-semibold sm:text-base ${index === 3 ? "text-[#0D154B]" : "text-[#4A4A4A]"}`}>{label}</p>
          <p dir="ltr" className={`text-base font-extrabold sm:text-lg ${index === 3 ? "text-[#0D154B]" : "text-[#172033]"}`}>{value}</p>
        </div>
      ))}
    </section>
  );
}
