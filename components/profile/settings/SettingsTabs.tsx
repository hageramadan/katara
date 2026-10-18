"use client";
import { useApp } from "@/context/AppContext";
import { FiShield, FiBell, FiSettings } from "react-icons/fi";
import { SettingsTab } from "@/lib/settings/types";

type SettingsTabsProps = {
  active: SettingsTab;
  onChange: (tab: SettingsTab) => void;
};

const tabs: {
  key: SettingsTab;
  icon: React.ElementType;
  ar: string;
  en: string;
}[] = [
  { key: "security", icon: FiShield, ar: "أمان الحساب", en: "Account Security" },
  { key: "notifications", icon: FiBell, ar: "الإشعارات", en: "Notifications" },
  { key: "account", icon: FiSettings, ar: "الحساب", en: "Account" },
];

export default function SettingsTabs({ active, onChange }: SettingsTabsProps) {
  const { lang } = useApp();

  return (
    <div className="flex items-center gap-6 md:gap-8 border-b border-[#DCE3EC] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`
              relative flex items-center gap-2 whitespace-nowrap shrink-0
              pb-3 pt-1 text-sm md:text-base font-bold
              transition-colors duration-200 cursor-pointer
              ${isActive ? "text-[#0D154B]" : "text-[#6F7E89] hover:text-[#0D154B]"}
            `}
          >
            <Icon className="text-base md:text-lg" />
            <span>{lang === "ar" ? tab.ar : tab.en}</span>
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