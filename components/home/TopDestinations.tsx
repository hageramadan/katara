"use client";
import Image from "next/image";
import { useApp } from "@/context/AppContext";

const destinations = [
  {
    id: 1,
    image: "/images/destinations/istanbul.png",
    price: 12,
    ar: "الكويت إلى إسطنبول",
    en: "Kuwait to Istanbul",
  },
  {
    id: 2,
    image: "/images/destinations/dubai.png",
    price: 12,
    ar: "الكويت إلى إسطنبول",
    en: "Kuwait to Istanbul",
  },
  {
    id: 3,
    image: "/images/destinations/cairo.png",
    price: 12,
     ar: "الكويت إلى إسطنبول",
    en: "Kuwait to Istanbul",
  },
  {
    id: 4,
    image: "/images/destinations/cairo.png",
    price: 12,
     ar: "الكويت إلى إسطنبول",
    en: "Kuwait to Istanbul",
  },
  {
    id: 5,
    image: "/images/destinations/paris.png",
    price: 12,
     ar: "الكويت إلى إسطنبول",
    en: "Kuwait to Istanbul",
  },
  {
    id: 6,
    image: "/images/destinations/bali.png",
    price: 12,
     ar: "الكويت إلى إسطنبول",
    en: "Kuwait to Istanbul",
  },
];

export default function TopDestinations() {
  const { lang } = useApp();

  return (
    <section className="py-5 md:py-12 px-4 bg-white">
      <div className="container mx-auto">
        {/* ============ Title ============ */}
        <h2 className="font-bold text-[20px] sm:text-[22px] lg:text-[32px] text-[#0D0D0D] mb-3 md:mb-8">
          {lang === "ar"
            ? "اكتشف أفضل الوجهات السياحية"
            : "Discover the Best Travel Destinations"}
        </h2>

        {/* ============ Cards Grid ============ */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="
                group relative rounded-2xl overflow-hidden cursor-pointer
                h-50 md:h-80 lg:h-90
                transition-transform duration-300 hover:scale-[1.02]
              "
            >
              {/* ============ Background Image ============ */}
              <Image
                src={dest.image}
                alt={lang === "ar" ? dest.ar : dest.en}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* ============ Gradient Overlay ============ */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

              {/* ============ Content ============ */}
              <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-6">
                {/* Price Badge */}
                <div className="flex justify-start mb-1.5 lg:mb-3">
                  <span className="bg-white text-[#4A4A4A] text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 py-1.5 rounded-full shadow-md">
                    {lang === "ar" ? "إبتداء من" : "Starting from"}{" "}
                    <span >
                      {dest.price} KWD
                    </span>
                  </span>
                </div>

                {/* Destination Name */}
                <h3 className="text-white text-xs sm:text-sm lg:text-lg mt-2 font-bold text-start">
                  {lang === "ar" ? dest.ar : dest.en}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
