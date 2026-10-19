"use client";
import { useApp } from "@/context/AppContext";
import { FiBell, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { BookingTab } from "@/lib/bookings/types";

type BookingTabsProps = {
  active: BookingTab;
  onChange: (tab: BookingTab) => void;
};

const tabs: {
  key: BookingTab;
  icon: React.ElementType;
  ar: string;
  en: string;
}[] = [
  { key: "all", icon: FiBell, ar: "جميع الحجوزات", en: "All Bookings" },
  { key: "upcoming", icon: FiClock, ar: "الحجوزات القادمة", en: "Upcoming" },
  { key: "past", icon: FiCheckCircle, ar: "الحجوزات الماضية", en: "Past" },
  { key: "cancelled", icon: FiXCircle, ar: "حجوزات ملغية", en: "Cancelled" },
];

export default function BookingTabs({ active, onChange }: BookingTabsProps) {
  const { lang } = useApp();

  return (
    <div
      className="
        flex items-center gap-4 sm:gap-6 md:gap-8
        border-b border-[#DCE3EC]
        overflow-x-auto
        [&::-webkit-scrollbar]:hidden
        [-ms-overflow-style:none]
        [scrollbar-width:none]
      "
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.key === active;

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`
              relative flex items-center gap-2
              whitespace-nowrap shrink-0
              pb-2.5 pt-1 sm:pb-3
              text-xs sm:text-sm md:text-base font-bold
              transition-colors duration-200
              cursor-pointer
              ${
                isActive
                  ? "text-[#0D154B]"
                  : "text-[#6F7E89] hover:text-[#0D154B]"
              }
            `}
          >
            <Icon className="text-sm sm:text-base md:text-lg" />
            <span>{lang === "ar" ? tab.ar : tab.en}</span>

            {/* ✅ الخط السفلي للتاب النشط */}
            <span
              className={`
                absolute bottom-0 start-0 end-0 h-[2.5px] rounded-full
                transition-all duration-300
                ${isActive ? "bg-[#0D154B]" : "bg-transparent"}
              `}
            />
          </button>
        );
      })}
    </div>
  );
}
