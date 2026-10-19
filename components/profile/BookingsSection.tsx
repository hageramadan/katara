"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

import TicketCard from "@/components/ui/TicketCard";
import CustomSelect from "@/components/ui/CustomSelect";
import { RiPlaneLine } from "react-icons/ri";
import { LuHotel } from "react-icons/lu";


// ==================== Types ====================
type TabKey = "flights" | "hotels";

type Booking = {
  id: number;
  tripTypeAr: string;
  tripTypeEn: string;
  travelers: number;
  dateAr: string;
  dateEn: string;
  fromCode: string;
  fromTime: string;
  toCode: string;
  toTime: string;
  duration: string;
  stopsAr: string;
  stopsEn: string;
  baggage: string;
};

// ==================== Data ====================
const bookings: Booking[] = [
  {
    id: 1,
    tripTypeAr: "اتجاه واحد",
    tripTypeEn: "One Way",
    travelers: 1,
    dateAr: "13 سبتمبر 2025",
    dateEn: "13 Sep 2025",
    fromCode: "CAI",
    fromTime: "01:50",
    toCode: " KWI",
    toTime: "04:10",
    duration: "3h 15m",
    stopsAr: "مباشر",
    stopsEn: "Direct",
    baggage: "45",
  },
  {
    id: 2,
    tripTypeAr: "ذهاب وعودة",
    tripTypeEn: "Round Trip",
    travelers: 2,
    dateAr: "20 أكتوبر 2025",
    dateEn: "20 Oct 2025",
    fromCode: "CAI",
    fromTime: "02:30",
    toCode: "KWI",
    toTime: "05:20",
    duration: "2h 50m",
    stopsAr: "مباشر",
    stopsEn: "Direct",
    baggage: "30",
  },
];

// ==================== Component ====================
export default function BookingsSection() {
  const { lang } = useApp();
  const [activeTab, setActiveTab] = useState<TabKey>("flights");
  const [filter, setFilter] = useState("upcoming");

  // خيارات الفلتر
  const filterOptions = [
    {
      value: "upcoming",
      label: lang === "ar" ? " حجوزات الطيران" : " Booking Flights ",
    },
    {
      value: "past",
      label: lang === "ar" ? "حجوزات فنادق" : "Booking Hotels",
    },
    {
      value: "cancelled",
      label: lang === "ar" ? "حجوزات سيارات" : "Booking Cars",
    },
  ];

  return (
    <section>
      {/* ==================== Header: Title + Filter ==================== */}
      <div className="my-3 flex flex-col items-stretch gap-2 sm:my-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3 lg:my-8">
        <h2 className="text-sm sm:text-base md:text-xl font-bold text-[#0D0D0D]">
          {lang === "ar" ? " حجوزاتي القادمة" : "My Upcoming Bookings"}
        </h2>

        {/* ✅ Custom Select */}
        <CustomSelect
          value={filter}
          onChange={setFilter}
          options={filterOptions}
          width="w-full sm:w-56"
        />
      </div>

      {/* ==================== Tabs ==================== */}
      <div className="grid grid-cols-2 text-center justify-center items-center gap-3 sm:gap-6 border-b border-[#DCE3EC] mb-4 sm:mb-5">
        {[
          {
            key: "flights" as TabKey,
            ar: "الطيران",
            en: "Flights",
            icon: RiPlaneLine,
          },
          {
            key: "hotels" as TabKey,
            ar: "الفنادق",
            en: "Hotels",
            icon: LuHotel,
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex items-center gap-1.5 sm:gap-2 pb-2.5 sm:pb-3 text-xs sm:text-sm md:text-base font-extrabold justify-center
                transition-all cursor-pointer
                ${
                  active
                    ? "text-[#187AA7] border-b-3 border-[#187AA7]"
                    : "text-[#8E8E8E] hover:text-[#187AA7]"
                }
              `}
            >
              <Icon className="text-lg sm:text-2xl" />
              {lang === "ar" ? tab.ar : tab.en}
            </button>
          );
        })}
      </div>

      {/* ==================== Content ==================== */}
      {activeTab === "flights" ? (
        <div className="flex flex-col gap-4 md:gap-5">
          {bookings.map((b) => (
            <TicketCard
              key={b.id}
              compactMobile
              image="/images/promo/travel.png"
              airlineLogo="/images/promo/Frame.png"
              imageAlt="Flight"
              date={lang === "ar" ? b.dateAr : b.dateEn}
              tripType={lang === "ar" ? b.tripTypeAr : b.tripTypeEn}
              travelers={b.travelers}
              departureCode={b.fromCode}
              departureTime={b.fromTime}
              arrivalCode={b.toCode}
              arrivalTime={b.toTime}
              duration={b.duration}
              stops={lang === "ar" ? b.stopsAr : b.stopsEn}
              baggageWeight={b.baggage}
              showFavorite={false}
              isFavorite={false}
              onFavoriteToggle={() => console.log("Toggle fav", b.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#DCE3EC] p-10 text-center">
          <LuHotel className="text-4xl text-gray-300 mx-auto mb-3" />
          <p className="text-sm md:text-base text-[#6F7E89]">
            {lang === "ar"
              ? "لا توجد حجوزات فنادق حالياً"
              : "No hotel bookings yet"}
          </p>
        </div>
      )}
    </section>
  );
}
