import type { TabKey } from "./FlightMoreOptionsContent";

const tabs: { key: TabKey; ar: string; en: string }[] = [
  { key: "fares", ar: "خيارات الأسعار", en: "Fare options" },
  { key: "route", ar: "مسار الرحلة", en: "Flight route" },
  { key: "baggage", ar: "الأمتعة", en: "Baggage" },
  { key: "terms", ar: "الرسوم والأحكام", en: "Fees & terms" },
];

export default function FlightMoreOptionsTabs({
  activeTab,
  onTabChange,
  ar,
}: {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  ar: boolean;
}) {
  return (
    <div role="tablist" aria-label={ar ? "تفاصيل الرحلة" : "Flight details"} className="grid shrink-0 grid-cols-2 border-b border-[#E5E8ED] bg-white sm:grid-cols-4">
      {tabs.map((tab) => {
        const active = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onTabChange(tab.key)}
            className={`border-b-2 px-2 py-3 text-xs font-bold transition sm:px-3 sm:text-base ${active ? "border-[#0D154B] text-[#0D154B]" : "border-transparent text-[#858B95] hover:text-[#354052]"}`}
          >
            {ar ? tab.ar : tab.en}
          </button>
        );
      })}
    </div>
  );
}
