"use client";
import { useApp } from "@/context/AppContext";
import { FaCar } from "react-icons/fa";
import { GiCargoShip } from "react-icons/gi";
import { RiHotelFill, RiPlaneLine } from "react-icons/ri";
import { FaBoxesPacking } from "react-icons/fa6";

export type TabKey = "flights" | "hotels" | "packages" | "cars" | "cruises";

const tabs: {
  key: TabKey;
  icon: React.ElementType;
  ar: string;
  en: string;
  enabled?: boolean; // 👈 خاصية جديدة
}[] = [
  { key: "flights", icon: RiPlaneLine, ar: "رحلات طيران", en: "Flights", enabled: true },
  { key: "hotels", icon: RiHotelFill, ar: "فنادق", en: "Hotels", enabled: false },
  { key: "packages", icon: FaBoxesPacking, ar: "باكدجات", en: "Packages", enabled: false },
  { key: "cars", icon: FaCar, ar: "تأجير سيارات", en: "Car Rental", enabled: false },
  { key: "cruises", icon: GiCargoShip, ar: "رحلات بحرية", en: "Cruises", enabled: false },
];

export default function MainTabs({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (k: TabKey) => void;
}) {
  const { lang } = useApp();

  return (
    <div className="flex w-full max-w-4xl flex-nowrap justify-start gap-1.5 overflow-x-auto rounded-2xl bg-white/25 p-2 backdrop-blur-md sm:flex-wrap sm:justify-center sm:gap-2 sm:rounded-full sm:px-2.5 sm:py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = tab.key === active;
        const isEnabled = tab.enabled === true;

        return (
          <button
            key={tab.key}
            disabled={!isEnabled}
            onClick={() => isEnabled && onChange(tab.key)}
            className={`
              flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-semibold sm:gap-2 sm:px-3 sm:text-sm
              transition-all duration-300
              ${
                !isEnabled
                  ? "text-white "
                  : isActive
                  ? "bg-white text-primary shadow-lg cursor-pointer"
                  : "text-white hover:bg-white/10 cursor-pointer"
              }
            `}
          >
            <Icon
              className={`
                text-xl transition-transform
                ${index === 0 ? "-rotate-45" : ""}
                ${
                  !isEnabled
                    ? "text-primary"
                    : isActive
                    ? "text-primary"
                    : "text-white"
                }
              `}
            />
            <span className="text-xs font-bold sm:text-base lg:text-lg">
              {lang === "ar" ? tab.ar : tab.en}
            </span>
          </button>
        );
      })}
    </div>
  );
}
