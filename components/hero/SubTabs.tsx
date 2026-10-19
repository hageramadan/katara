"use client";
import { useApp } from "@/context/AppContext";
import { MdAirplaneTicket } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { HiTicket } from "react-icons/hi2";

export type SubTabKey = "book" | "manage" | "status";

const subTabs: {
  key: SubTabKey;
  icon: React.ElementType;
  ar: string;
  en: string;
}[] = [
  { key: "book", icon: MdAirplaneTicket, ar: "حجز رحلة طيران", en: "Book a Flight" },
  { key: "manage", icon: IoCalendar, ar: "إدارة الحجز", en: "Manage Booking" },
  { key: "status", icon: HiTicket, ar: "حالة الرحلة", en: "Flight Status" },
];

export default function SubTabs({
  active,
  onChange,
}: {
  active: SubTabKey;
  onChange: (k: SubTabKey) => void;
}) {
  const { lang } = useApp();

  return (
    <div className="grid grid-cols-3 overflow-hidden rounded-xl bg-[#0D154B]/80 text-white backdrop-blur-md lg:rounded-2xl lg:rounded-b-none">
      {subTabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = tab.key === active;

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`
              flex flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] font-bold leading-tight cursor-pointer sm:flex-row sm:gap-2 sm:px-3 sm:py-2.5 sm:text-sm lg:px-5 lg:text-lg
              transition-all duration-200 justify-center
              ${
                isActive
                ? "bg-white text-primary shadow-md"
                  : "hover:bg-white/20"
              }
            `}
          >
            <Icon
              className={`${index === 0 ? "text-lg sm:text-2xl lg:text-3xl" : "text-base sm:text-lg"} ${
                isActive ? "text-primary" : "text-white"
              }`}
            />
            <span>{lang === "ar" ? tab.ar : tab.en}</span>
          </button>
        );
      })}
    </div>
  );
}
