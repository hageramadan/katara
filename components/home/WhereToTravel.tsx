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
    <section className="w-full overflow-x-clip bg-white px-3 py-7 sm:px-4 md:py-16">
      <div className="container mx-auto w-full min-w-0">
        {/* ============ Title ============ */}
        <h2 className="font-bold text-[20px] sm:text-[21px] md:text-[28px] lg:text-[32px] text-[#0D0D0D] mb-3 md:mb-8">
          {lang === "ar" ? "إلى أين ستسافر؟" : "Where Will You Travel?"}
        </h2>

        {/* ============ Tabs + Country Dropdown ============ */}
        <div className="mb-0 flex items-center justify-between gap-2 sm:gap-4">
          {/* Tabs — scroll أفقي على الموبايل */}
          <div className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-7">
            {tabs.map((tab) => {
              const active = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    pb-2 text-xs whitespace-nowrap transition cursor-pointer shrink-0 sm:pb-3 sm:text-sm md:pb-5 md:text-lg
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
            width="w-[132px] sm:w-56"
            className="w-[132px] shrink-0 sm:w-56"
            triggerClassName="w-full justify-center bg-white/80 px-2 py-2 rounded-full border border-primary/20 shadow-sm hover:shadow-md transition text-[11px] sm:px-3 sm:text-xs md:text-sm"
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
        <div className="mt-0 mb-4 h-px bg-gray-200 sm:mb-5 md:mb-8" />

        {/* ============ 3 Rows of Cards ============ */}
        <div className="flex flex-col gap-4 md:gap-5">
          {dealsGroups.map((group) => (
            <div
              key={group.id}
              className="grid min-w-0 grid-cols-2 gap-2.5 sm:gap-4 md:gap-5 lg:grid-cols-2"
            >
              {/* ============ Big Card ============ */}
              <div className="group relative col-span-2 h-48 overflow-hidden rounded-2xl sm:h-64 md:h-80 lg:col-span-1 lg:h-107">
                <Image
                  src={group.big.image}
                  alt={lang === "ar" ? group.big.cityAr : group.big.cityEn}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-3 text-white sm:p-4 md:p-7">
                  <div className="flex items-end justify-between gap-2 sm:gap-3 md:gap-4">
                    <div className="flex min-w-0 flex-col gap-1 md:gap-2">
                      <h3 className="text-base sm:text-lg md:text-2xl lg:text-[32px] font-extrabold">
                        {lang === "ar" ? group.big.cityAr : group.big.cityEn}
                      </h3>
                      <p className="text-[10px] leading-snug sm:text-xs md:text-base lg:text-lg font-bold">
                        {lang === "ar" ? group.big.dateAr : group.big.dateEn}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1 text-end md:gap-2">
                      <p className="rounded-full bg-white px-2 py-1 text-[9px] font-semibold leading-tight text-[#4A4A4A] shadow-md sm:px-3 sm:text-xs md:px-4 md:py-1.5 md:text-base lg:text-lg">
                        {lang === "ar" ? group.big.priceAr : group.big.priceEn}
                      </p>
                      <p className="text-[10px] font-bold leading-tight text-white sm:text-xs md:text-base lg:text-lg">
                        {lang === "ar" ? group.big.metaAr : group.big.metaEn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ============ 2 Small Cards ============ */}
              <div className="col-span-2 grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-5 lg:col-span-1">
                {group.smalls.map((deal) => (
                  <div
                    key={deal.id}
                    className="group relative h-48 overflow-hidden rounded-2xl sm:h-64 md:h-80 lg:h-107"
                  >
                    <Image
                      src={deal.image}
                      alt={lang === "ar" ? deal.cityAr : deal.cityEn}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/20 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-2.5 text-white sm:p-3 md:p-5">
                      <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2.5">
                        <h3 className="text-base sm:text-lg md:text-2xl lg:text-[32px] font-extrabold">
                          {lang === "ar" ? deal.cityAr : deal.cityEn}
                        </h3>
                        <p className="text-[9px] leading-snug text-white sm:text-[10px] md:text-base lg:text-lg font-bold">
                          {lang === "ar" ? deal.dateAr : deal.dateEn}
                        </p>
                        <p className="w-fit rounded-full bg-white px-2 py-1 text-[9px] font-semibold leading-tight text-[#4A4A4A] shadow-md sm:text-[10px] md:px-4 md:py-1.5 md:text-base lg:text-lg">
                          {lang === "ar" ? deal.priceAr : deal.priceEn}
                        </p>
                        <p className="text-[9px] font-bold leading-tight text-white sm:text-[10px] md:text-base lg:text-lg">
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
