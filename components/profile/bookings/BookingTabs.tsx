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
  const { lang, dir } = useApp();

  return (
    <div
      dir={dir}
      role="group"
      aria-label={lang === "ar" ? "تصفية الحجوزات" : "Filter bookings"}
      className="
        flex min-h-12 min-w-0 items-center justify-start gap-6 sm:gap-8
        overflow-x-auto bg-transparent
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
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(tab.key)}
            className={`
              relative flex min-h-12 items-center gap-2
              whitespace-nowrap shrink-0
              pb-3 pt-2
              text-sm sm:text-base font-bold leading-6
              transition-colors duration-200
              focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0D154B]
              cursor-pointer
              ${
                isActive
                  ? "text-[#0D154B]"
                  : "text-[#6F7E89] hover:text-[#0D154B]"
              }
            `}
          >
            <Icon aria-hidden="true" className="size-[18px] shrink-0" />
            <span>{lang === "ar" ? tab.ar : tab.en}</span>

            <span
              aria-hidden="true"
              className={`
                absolute bottom-1 start-0 end-0 h-0.5
                transition-colors duration-200
                ${isActive ? "bg-[#0D154B]" : "bg-transparent"}
              `}
            />
          </button>
        );
      })}
    </div>
  );
}
