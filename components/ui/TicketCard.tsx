"use client";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { FaPlane } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";

// ==================== Types ====================
export type TicketCardProps = {
  // Image
  image: string;
  imageAlt?: string;

  // Airline
  airlineLogo?: string;
  airlineName?: string;

  // Date
  date: string;

  // Trip info
  tripType: string; // "اتجاه واحد" / "ذهاب وعودة"
  travelers: number;

  // Times
  departureCode: string; // "CAI"
  departureTime: string; // "01:50"
  arrivalCode: string; // "KWI"
  arrivalTime: string; // "04:10"

  // Duration & stops
  duration: string; // "3h 15m"
  stops?: string; // "مباشر" / "1 توقف"

  // Baggage
  baggageWeight: string; // "45"
  baggageUnit?: string; // "كجم" / "kg"
  carryOnWeight?: string; // "W" (اختياري)

  // Benefits
  benefits?: {
    icon: string;
    title: string;
    description: string;
  }[];

  // CTA
  ctaText?: string;
  onCtaClick?: () => void;

  // ❤️ Favorite (اختياري)
  showFavorite?: boolean; // يظهر القلب أو لا
  isFavorite?: boolean; // الحالة
  onFavoriteToggle?: () => void; // عند الضغط

  className?: string;
  onCardClick?: () => void;
};

// ==================== Component ====================
export default function TicketCard({
  image,
  imageAlt = "Flight",
  airlineLogo,
  airlineName,
  date,
  tripType,
  travelers,
  departureCode,
  departureTime,
  arrivalCode,
  arrivalTime,
  duration,
  stops,
  baggageWeight,
  baggageUnit,
  carryOnWeight,
  benefits = [],
  ctaText,
  onCtaClick,
  showFavorite = false,
  isFavorite = false,
  onFavoriteToggle,
  className = "",
  onCardClick,
}: TicketCardProps) {
  const { lang } = useApp();

  const defaultCta = lang === "ar" ? "إستكمل الحجز" : "Continue Booking";
  const defaultUnit = lang === "ar" ? "كجم" : "kg";
  const defaultStops = lang === "ar" ? "مباشر" : "Direct";

  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden 
        grid grid-cols-1 md:grid-cols-4
        bg-white border border-[#E8E8E8]
        ${className} ${onCardClick ? "cursor-pointer transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-[#0D154B]" : ""}
      `}
      onClick={onCardClick}
      onKeyDown={onCardClick ? (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onCardClick(); } } : undefined}
      role={onCardClick ? "link" : undefined}
      tabIndex={onCardClick ? 0 : undefined}
    >
      {/* ==================== Image Side ==================== */}
      <div className="relative h-48 md:h-60">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover m-0 p-0"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* ❤️ Favorite (اختياري) */}
      </div>

      {/* ==================== Content Side (White) ==================== */}
      <div className="relative md:col-span-3 bg-white text-[#172B35] p-4 md:p-6 lg:py-5 lg:px-8 flex flex-col justify-between gap-4">
        {showFavorite && (
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); onFavoriteToggle?.(); }}
            aria-label="Toggle favorite"
            className={`
              absolute top-3 inset-e-3
              w-10 h-10 rounded-full
              flex items-center justify-center
              transition-all duration-200
              backdrop-blur-sm 
              ${
                isFavorite
                  ? "bg-white/95 text-[#0D154B]"
                  : "bg-white/80 text-[#6F7E89] hover:text-[#0D154B]"
              }
              hover:scale-110 cursor-pointer
            `}
          >
            <FiHeart
              className="text-xl"
              fill={isFavorite ? "currentColor" : "none"}
              strokeWidth={2}
            />
          </button>
        )}
        {/* -------- Header: Logo + Date + Route + Travelers -------- */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 pb-3 md:pb-4">
          {/* <div className="shrink-0">
            <Image
              src="/images/promo/Qatar_Logo.png"
              alt="Airline Logo"
              width={590}
              height={536}
              className="object-contain w-14 md:w-17.5 lg:w-22.5 h-auto"
            />
          </div> */}
          {/* Logo */}
          {airlineLogo && (
            <div className="shrink-0">
              <Image
                src={airlineLogo}
                alt={airlineName || "Airline"}
                width={590}
                height={536}
                className="object-contain w-14 md:w-17.5 lg:w-22.5 h-auto"
              />
            </div>
          )}

          {/* Date */}
          <div className="text-xs md:text-sm lg:text-lg font-medium flex items-center gap-1.5 text-[#777777]">
            <span className="">.</span>
            <span>{date}</span>
            <span className="">.</span>
          </div>

          {/* Route + Travelers */}
          <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm lg:text-lg font-medium  text-[#777777]">
            <span>{tripType}</span>
            <span className="">/</span>
            <span className="flex items-center gap-1">
              {travelers}
              <span>
                {lang === "ar"
                  ? travelers > 1
                    ? " مسافرون"
                    : " مسافر"
                  : travelers > 1
                    ? " Travelers"
                    : " Traveler"}
              </span>
            </span>
          </div>
        </div>

        {/* -------- Flight Times -------- */}
        <div className="flex items-center justify-between gap-2 md:gap-4 py-3 md:py-6">
          {/* Departure */}
          <div className="text-center shrink-0 flex flex-col gap-2">
            <p className="text-xs md:text-sm lg:text-base font-bold text-[#4A4A4A]">
              {departureCode}
            </p>
            <p className="text-lg md:text-2xl font-bold text-[#0D0D0D]">
              {departureTime}
            </p>
          </div>

          {/* Middle: Stops + Duration + Line + Plane */}
          <div className="flex-1 flex flex-col items-center min-w-0 px-1 md:px-4">
            <p className="text-[10px] md:text-sm lg:text-base font-bold text-[#8E8E8E] mb-2 whitespace-nowrap">
              {stops || defaultStops} · {duration}
            </p>

            {/* Line: Dot —— Plane */}
            <div className="flex items-center justify-center gap-1 md:gap-2 w-full max-w-full">
              {/* Dot */}
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#D9D9D9] shrink-0" />

              {/* Line */}
              <span
                className="bg-[#D9D9D9] shrink-0 w-25 sm:w-40 md:w-50 lg:w-69.25"
                style={{ height: "2px" }}
              />

              {/* Plane */}
              <FaPlane className="text-[#D9D9D9] text-base md:text-xl lg:text-2xl shrink-0 rtl:rotate-180" />
            </div>

            {/* Baggage */}
            <div className="text-[10px] md:text-sm lg:text-base font-bold text-[#8E8E8E] mt-2 flex items-center gap-1.5 md:gap-3 flex-wrap justify-center">
              <Image
                src="/images/promo/w.png"
                alt="W"
                width={60}
                height={60}
                className="shrink-0 w-4 h-4 md:w-5 md:h-5"
              />
              <p className="text-[#39D700]">{carryOnWeight || "W"}</p>
              <span className="text-lg">.</span>
              <Image
                src="/images/promo/pag2.png"
                alt="Bag"
                width={120}
                height={120}
                className="shrink-0 w-5 h-5 md:w-6 md:h-6"
              />
              <span>
                {baggageWeight} {baggageUnit || defaultUnit}
              </span>
            </div>
          </div>

          {/* Arrival */}
          <div className="text-center shrink-0 flex flex-col gap-2">
            <p className="text-xs md:text-sm lg:text-base font-bold text-[#4A4A4A]">
              {arrivalCode}
            </p>
            <p className="text-lg md:text-2xl font-bold text-[#0D0D0D]">
              {arrivalTime}
            </p>
          </div>
        </div>

        {/* -------- Benefits + Button -------- */}
        {(benefits.length > 0 || ctaText) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-10 items-stretch md:items-end pt-3 md:pt-4 border-t border-gray-100">
            {/* Benefits */}
            {benefits.map((b, i) => (
              <div key={i} className="flex flex-col gap-2 md:gap-3.5">
                <Image
                  src={b.icon}
                  alt={b.title}
                  width={60}
                  height={60}
                  className="shrink-0 w-6 h-6 md:w-8 md:h-[30.0625px]"
                />
                <p className="font-extrabold text-sm md:text-base lg:text-lg text-[#163B45]">
                  {b.title}
                </p>
                <p className="text-xs md:text-sm text-[#6F7E89] font-medium leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}

            {/* CTA Button */}
            {ctaText && (
              <button
                type="button"
                onClick={onCtaClick}
                className="
                  w-full h-fit flex cursor-pointer items-center justify-center gap-2 md:gap-3
                  bg-[#0D154B] text-white font-bold text-sm md:text-base
                  py-3 lg:py-5 rounded-xl transition hover:shadow-lg hover:opacity-95
                "
              >
                {ctaText || defaultCta}
                <FaArrowLeft className={lang === "en" ? "rotate-180" : ""} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
