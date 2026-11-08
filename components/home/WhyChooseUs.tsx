"use client";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import offersImage from "@/public/images/why-us/offers.png";
import flightsImage from "@/public/images/why-us/flights.png";
import expertsImage from "@/public/images/why-us/experts.png";
import valueImage from "@/public/images/why-us/value.png";

const cards = [
  {
    key: "offers",
    image: offersImage,
    width: 185,
    ar: "أفضل عروض السفر في الكويت",
    en: "Best Travel Offers in Kuwait",
  },
  {
    key: "flights",
    image: flightsImage,
    width: 101,
    ar: "آلاف من عروض الرحلات والفنادق",
    en: "Thousands of Flight & Hotel Offers",
  },
  {
    key: "experts",
    image: expertsImage,
    width: 121,
    ar: "إرشادات الخبراء",
    en: "Expert Guidance",
  },
  {
    key: "value",
    image: valueImage,
    width: 102,
    ar: "أفضل القيم والخدمات المميزة",
    en: "Best Value & Premium Services",
  },
];

export default function WhyChooseUs() {
  const { lang } = useApp();

  return (
    <section className="py-5 lg:py-10 px-4">
      <div className="container mx-auto">
        {/* ============ Title ============ */}
        <h2 className="text-center font-bold text-[20px] sm:text-[22px] md:text-[32px] lg:text-[40px] text-[#333333] mb-3 lg:mb-12">
          {lang === "ar"
            ? "لماذا تستخدم منصة كتارا جو"
            : "Why Use Katara go Platform"}
        </h2>

        {/* ============ Cards Grid ============ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card) => (
            <div
              key={card.key}
              className="
                bg-white rounded-2xl border border-white shadow-sm
                p-3 lg:p-6 flex flex-col items-center justify-between gap-4
                w-full
                transition-all duration-300
                hover:shadow-lg hover:-translate-y-1
              "
            >
              {/* Image */}
              <div className="flex-1 flex items-center justify-center">
                <Image
                  src={card.image}
                  alt={lang === "ar" ? card.ar : card.en}
                  style={{ width: card.width, height: "auto", maxWidth: "100%" }}
                  sizes={`${card.width}px`}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-center font-bold text-[14px] sm:text-[15px] md:text-[20px] text-[#0D154B] leading-tight">
                {lang === "ar" ? card.ar : card.en}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
