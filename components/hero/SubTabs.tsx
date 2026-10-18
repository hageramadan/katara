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
    <div className="hidden lg:grid grid-cols-3  rounded-2xl rounded-b-none overflow-hidden bg-[#F7F7F766] text-white  backdrop-blur-md">
      {subTabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = tab.key === active;

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`
              flex items-center gap-2 px-5 py-2.5 text-lg font-bold cursor-pointer
              transition-all duration-200 justify-center
              ${
                isActive
                  ? "bg-white text-primary shadow-md"
                  : "hover:bg-white/20"
              }
            `}
          >
            <Icon
              className={`${index === 0 ? "text-3xl" : "text-xl "} ${
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