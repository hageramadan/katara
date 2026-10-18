"use client";
import Image from "next/image";
import { useApp } from "@/context/AppContext";

const cards = [
  {
    key: "offers",
    image: "/images/why-us/offers.png",
    width: 185,
    height: 119,
    ar: "أفضل عروض السفر في الكويت",
    en: "Best Travel Offers in Kuwait",
  },
  {
    key: "flights",
    image: "/images/why-us/flights.png",
    width: 101,
    height: 117,
    ar: "آلاف من عروض الرحلات والفنادق",
    en: "Thousands of Flight & Hotel Offers",
  },
  {
    key: "experts",
    image: "/images/why-us/experts.png",
    width: 121,
    height: 120,
    ar: "إرشادات الخبراء",
    en: "Expert Guidance",
  },
  {
    key: "value",
    image: "/images/why-us/value.png",
    width: 102,
    height: 120,
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
        <h2 className="text-center font-bold text-[24px] md:text-[32px] lg:text-[40px] text-[#333333] mb-3 lg:mb-12">
          {lang === "ar"
            ? "لماذا تستخدم منصة الأفضل"
            : "Why Use Al-Afdal Platform"}
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
                  width={card.width}
                  height={card.height}
                  className="object-contain max-w-full h-auto"
                />
              </div>

              {/* Title */}
              <h3 className="text-center font-bold text-[16px] md:text-[20px] text-[#0D154B] leading-tight">
                {lang === "ar" ? card.ar : card.en}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}