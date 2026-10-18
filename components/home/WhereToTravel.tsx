"use client";
import { useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { FiCheck } from "react-icons/fi";
import { countries } from "@/lib/countries";
import Dropdown from "@/components/ui/Dropdown";
import * as Flags from "country-flag-icons/react/3x2";

// ============ FlagIcon Component ============
const FlagIcon = ({
  code,
  className = "w-6 h-4",
}: {
  code: string;
  className?: string;
}) => {
  const Flag = (
    Flags as Record<string, React.ComponentType<{ className?: string }>>
  )[code];
  return Flag ? <Flag className={className} /> : null;
};

// ============ Tabs ============
const tabs = [
  { key: "kuwait", ar: "الكويت", en: "Kuwait" },
  { key: "jahra", ar: "الجهراء", en: "Jahra" },
  { key: "farwaniya", ar: "الفروانية", en: "Farwaniya" },
  { key: "ahmadi", ar: "الأحمدي", en: "Ahmadi" },
];

// ============ 3 مجموعات × 3 كروت = 9 كروت ============
const dealsGroups = [
  {
    id: "group-1",
    big: {
      image: "/images/travel/dubai-big-1.jpg",
      cityAr: "دبي",
      cityEn: "Dubai",
      dateAr: "من 14 أكتوبر حتي 15 ديسمبر",
      dateEn: "14 Oct – 15 Dec",
      priceAr: "إبتداء من 500 KWD",
      priceEn: "Starting from 500 KWD",
      metaAr: "ذهاب فقط / إقتصادية",
      metaEn: "One Way / Economy",
    },
    smalls: [
      {
        id: "s1-1",
        image: "/images/travel/dubai-1.jpg",
        cityAr: "دبي",
        cityEn: "Dubai",
        dateAr: "من 14 أكتوبر حتي 15 ديسمبر",
        dateEn: "14 Oct – 15 Dec",
        priceAr: "إبتداء من 500 KWD",
        priceEn: "Starting from 500 KWD",
        metaAr: "ذهاب فقط / إقتصادية",
        metaEn: "One Way / Economy",
      },
      {
        id: "s1-2",
        image: "/images/travel/dubai-2.jpg",
        cityAr: "دبي",
        cityEn: "Dubai",
        dateAr: "من 14 أكتوبر حتي 15 ديسمبر",
        dateEn: "14 Oct – 15 Dec",
        priceAr: "إبتداء من 500 KWD",
        priceEn: "Starting from 500 KWD",
        metaAr: "ذهاب فقط / إقتصادية",
        metaEn: "One Way / Economy",
      },
    ],
  },
  {
    id: "group-2",
    big: {
      image: "/images/travel/istanbul-big.jpg",
      cityAr: "إسطنبول",
      cityEn: "Istanbul",
      dateAr: "من 20 نوفمبر حتي 20 ديسمبر",
      dateEn: "20 Nov – 20 Dec",
      priceAr: "إبتداء من 350 KWD",
      priceEn: "Starting from 350 KWD",
      metaAr: "ذهاب وعودة / إقتصادية",
      metaEn: "Round Trip / Economy",
    },
    smalls: [
      {
        id: "s2-1",
        image: "/images/travel/istanbul-1.jpg",
        cityAr: "إسطنبول",
        cityEn: "Istanbul",
        dateAr: "من 20 نوفمبر حتي 20 ديسمبر",
        dateEn: "20 Nov – 20 Dec",
        priceAr: "إبتداء من 350 KWD",
        priceEn: "Starting from 350 KWD",
        metaAr: "ذهاب وعودة / إقتصادية",
        metaEn: "Round Trip / Economy",
      },
      {
        id: "s2-2",
        image: "/images/travel/dubai-1.jpg",
        cityAr: "إسطنبول",
        cityEn: "Istanbul",
        dateAr: "من 20 نوفمبر حتي 20 ديسمبر",
        dateEn: "20 Nov – 20 Dec",
        priceAr: "إبتداء من 350 KWD",
        priceEn: "Starting from 350 KWD",
        metaAr: "ذهاب وعودة / إقتصادية",
        metaEn: "Round Trip / Economy",
      },
    ],
  },
  {
    id: "group-3",
    big: {
      image: "/images/travel/london-big.png",
      cityAr: "لندن",
      cityEn: "London",
      dateAr: "من 1 يناير حتي 28 فبراير",
      dateEn: "1 Jan – 28 Feb",
      priceAr: "إبتداء من 850 KWD",
      priceEn: "Starting from 850 KWD",
      metaAr: "ذهاب وعودة / إقتصادية",
      metaEn: "Round Trip / Economy",
    },
    smalls: [
      {
        id: "s3-1",
        image: "/images/travel/london-1.jpg",
        cityAr: "لندن",
        cityEn: "London",
        dateAr: "من 1 يناير حتي 28 فبراير",
        dateEn: "1 Jan – 28 Feb",
        priceAr: "إبتداء من 850 KWD",
        priceEn: "Starting from 850 KWD",
        metaAr: "ذهاب وعودة / إقتصادية",
        metaEn: "Round Trip / Economy",
      },
      {
        id: "s3-2",
        image: "/images/travel/london-2.jpg",
        cityAr: "لندن",
        cityEn: "London",
        dateAr: "من 1 يناير حتي 28 فبراير",
        dateEn: "1 Jan – 28 Feb",
        priceAr: "إبتداء من 850 KWD",
        priceEn: "Starting from 850 KWD",
        metaAr: "ذهاب وعودة / إقتصادية",
        metaEn: "Round Trip / Economy",
      },
    ],
  },
];

export default function WhereToTravel() {
  const { lang, country, setCountry } = useApp();
  const [activeTab, setActiveTab] = useState("kuwait");

  return (
    <section className="py-8 md:py-16 px-4 bg-white">
      <div className="container mx-auto">
        {/* ============ Title ============ */}
        <h2 className="font-bold text-[22px] md:text-[28px] lg:text-[32px] text-[#0D0D0D] mb-4 md:mb-8">
          {lang === "ar" ? "إلى أين ستسافر؟" : "Where Will You Travel?"}
        </h2>

        {/* ============ Tabs + Country Dropdown ============ */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-0">
          {/* Tabs — scroll أفقي على الموبايل */}
          <div className="flex items-center gap-5 md:gap-7 overflow-x-auto scrollbar-hide pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            {tabs.map((tab) => {
              const active = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    pb-3 md:pb-5 text-sm md:text-lg whitespace-nowrap transition cursor-pointer shrink-0
                    ${
                      active
                        ? "text-[#0D154B] font-extrabold border-b-2 border-[#0D154B]"
                        : "text-[#1D1D1D] hover:text-[#0D0D0D] font-semibold"
                    }
                  `}
                >
                  {lang === "ar" ? tab.ar : tab.en}
                </button>
              );
            })}
          </div>

          {/* Country Dropdown */}
          <Dropdown
            width="w-56"
            triggerClassName="bg-white/80 px-3 py-2 rounded-full border border-primary/20 shadow-sm hover:shadow-md transition text-xs md:text-sm"
            trigger={
              <>
                <span>{lang === "ar" ? country.nameAr : country.nameEn}</span>
                <FlagIcon
                  code={country.code}
                  className="w-5 h-3.5 md:w-6 md:h-4 rounded-sm shadow-sm"
                />
              </>
            }
          >
            {(close) => (
              <div className="max-h-72 overflow-y-auto py-1">
                {countries.map((c) => {
                  const active = c.code === country.code;
                  return (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCountry(c);
                        close();
                      }}
                      className={`
                        w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition
                        ${
                          active
                            ? "bg-secondary-soft text-primary font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }
                      `}
                    >
                      <span className="flex items-center gap-3">
                        <FlagIcon
                          code={c.code}
                          className="w-6 h-4 rounded-sm shadow-sm"
                        />
                        <span>{lang === "ar" ? c.nameAr : c.nameEn}</span>
                      </span>
                      {active && <FiCheck className="text-primary" />}
                    </button>
                  );
                })}
              </div>
            )}
          </Dropdown>
        </div>

        {/* ============ Divider ============ */}
        <div className="h-px bg-gray-200 mb-5 md:mb-8 mt-0" />

        {/* ============ 3 Rows of Cards ============ */}
        <div className="flex flex-col gap-4 md:gap-5">
          {dealsGroups.map((group) => (
            <div
              key={group.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5"
            >
              {/* ============ Big Card ============ */}
              <div className="relative rounded-2xl overflow-hidden group h-56 md:h-80 lg:h-107">
                <Image
                  src={group.big.image}
                  alt={lang === "ar" ? group.big.cityAr : group.big.cityEn}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-7 text-white">
                  <div className="flex items-end justify-between gap-3 md:gap-4">
                    <div className="flex flex-col gap-1 md:gap-2">
                      <h3 className="text-lg md:text-2xl lg:text-[32px] font-extrabold">
                        {lang === "ar" ? group.big.cityAr : group.big.cityEn}
                      </h3>
                      <p className="text-white text-xs md:text-base lg:text-lg font-bold">
                        {lang === "ar" ? group.big.dateAr : group.big.dateEn}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 md:gap-2 text-end shrink-0">
                      <p className="bg-white text-[#4A4A4A] text-xs md:text-base lg:text-lg font-semibold px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-md whitespace-nowrap">
                        {lang === "ar" ? group.big.priceAr : group.big.priceEn}
                      </p>
                      <p className="text-white font-bold text-xs md:text-base lg:text-lg">
                        {lang === "ar" ? group.big.metaAr : group.big.metaEn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ============ 2 Small Cards ============ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {group.smalls.map((deal) => (
                  <div
                    key={deal.id}
                    className="relative rounded-2xl overflow-hidden group h-56 md:h-80 lg:h-107"
                  >
                    <Image
                      src={deal.image}
                      alt={lang === "ar" ? deal.cityAr : deal.cityEn}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/20 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 text-white">
                      <div className="flex flex-col gap-1.5 md:gap-2.5">
                        <h3 className="text-lg md:text-2xl lg:text-[32px] font-extrabold">
                          {lang === "ar" ? deal.cityAr : deal.cityEn}
                        </h3>
                        <p className="text-white text-xs md:text-base lg:text-lg font-bold">
                          {lang === "ar" ? deal.dateAr : deal.dateEn}
                        </p>
                        <p className="bg-white text-[#4A4A4A] w-fit text-xs md:text-base lg:text-lg font-semibold px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-md whitespace-nowrap">
                          {lang === "ar" ? deal.priceAr : deal.priceEn}
                        </p>
                        <p className="text-white font-bold text-xs md:text-base lg:text-lg">
                          {lang === "ar" ? deal.metaAr : deal.metaEn}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ============ Discover Button ============ */}
     
      </div>
    </section>
  );
}