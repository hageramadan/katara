"use client";
import { useApp } from "@/context/AppContext";
import { FiRefreshCw, FiAward } from "react-icons/fi";
import { HistoryTab } from "@/lib/wallet/types";

type WalletTabsProps = {
  active: HistoryTab;
  onChange: (tab: HistoryTab) => void;
};

const tabs: { key: HistoryTab; ar: string; en: string; icon: React.ElementType }[] = [
  { key: "transactions", ar: "المعاملات", en: "Transactions", icon: FiRefreshCw },
  { key: "points", ar: "النقاط", en: "Points", icon: FiAward },
];

export default function WalletTabs({ active, onChange }: WalletTabsProps) {
  const { lang } = useApp();

  return (
    <div className="grid grid-cols-2 mt-2 lg:mt-5 text-center justify-center items-center gap-6 border-b border-[#DCE3EC] mb-5">
      {tabs.map((tab) => {
    
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`
              flex items-center justify-center gap-2 pb-3 text-sm md:text-base font-bold
              transition-all cursor-pointer
              ${
                isActive
                  ? "text-[#0D154B] border-b-2 border-[#0D154B]"
                  : "text-[#8E8E8E] hover:text-[#0D154B]"
              }
            `}
          >
            {/* <Icon className="text-base" /> */}
            {lang === "ar" ? tab.ar : tab.en}
          </button>
        );
      })}
    </div>
  );
}