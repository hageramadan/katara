"use client";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { FaPlane } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

export default function PromoSection() {
  const { lang } = useApp();
  const router = useRouter();

  return (
    <section className="py-10 px-4 bg-white">
      <div className="container mx-auto">
        {/* ============ Title & Description ============ */}
        <div className="mb-3 lg:mb-10">
          <h1 className="font-bold text-[20px] sm:text-[22px] md:text-[32px] lg:text-[40px] text-[#0D0D0D] mb-2 sm:mb-3 leading-tight">
            {lang === "ar"
              ? "هل زيارة لندن ما تزال ضمن خططك؟"
              : "Is Your London Trip Still on the Agenda?"}
          </h1>
          <p className="text-[#8E8E8E] text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-semibold">
            {lang === "ar"
              ? "عدد المقاعد المتوفرة محدود. استكمل حجزك لضمان حصولك على مقعد والانطلاق نحو مغامرة جديدة."
              : "Seats are limited. Complete your booking to secure your seat and embark on a new adventure."}
          </p>
        </div>

        {/* ============ Card ============ */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-3">
          {/* ============ Image Side ============ */}
          <div className="relative h-48 md:h-auto md:min-h-105">
            <Image
              src="/images/promo/plane.jpg"
              alt="Flight"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* ============ Content Side (Blue) ============ */}
          <div className="md:col-span-2 bg-[#0D154BEB] text-white p-4 md:p-6 lg:py-5 lg:px-8 flex flex-col justify-between gap-4">
            {/* -------- Header: Logo + Date + Route + Travelers -------- */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3 pb-3 md:pb-4">
              {/* Logo */}
              <div className="shrink-0">
                <Image
                  src="/images/promo/Qatar_Logo.png"
                  alt="Airline Logo"
                  width={590}
                  height={536}
                  className="object-contain w-14 md:w-17.5 lg:w-22.5 h-auto"
                />
              </div>

              {/* Date */}
              <div className="text-xs md:text-sm lg:text-lg font-semibold flex items-center gap-1.5">
                <span>.</span>
                <span>13 {lang === "ar" ? "سبتمبر" : "Sep"} 2025</span>
                <span>.</span>
              </div>

              {/* Route + Travelers */}
              <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm lg:text-lg font-semibold">
                <span>{lang === "ar" ? "اتجاه واحد" : "One Way"}</span>
                <span className="text-white/40">/</span>
                <span className="flex items-center gap-1">
                  1<span>{lang === "ar" ? " مسافر" : " Traveler"}</span>
                </span>
              </div>
            </div>

            {/* -------- Flight Times -------- */}
            <div className="flex items-center justify-between gap-2 md:gap-4 py-3 md:py-6">
              {/* Departure */}
              <div className="text-center shrink-0">
                <p className="text-xs md:text-sm lg:text-base font-bold">CAI</p>
                <p className="text-lg md:text-2xl font-bold">01:50</p>
              </div>

              {/* Middle: Direct + Duration + Line + Plane */}
              <div className="flex-1 flex flex-col items-center min-w-0 px-1 md:px-4">
                <p className="text-[10px] md:text-sm lg:text-base font-bold text-white mb-2 whitespace-nowrap">
                  {lang === "ar" ? "مباشر" : "Direct"} · 3h 15m
                </p>

                {/* Line: Dot —— Plane */}
                <div className="flex items-center justify-center gap-1 md:gap-2 w-full max-w-full">
                  {/* Dot */}
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shrink-0" />

                  {/* Line: responsive */}
                  <span
                    className="bg-white shrink-0 w-25 sm:w-40 md:w-50 lg:w-69.25"
                    style={{ height: "2px" }}
                  />

                  {/* Plane */}
                  <FaPlane className="text-white text-base md:text-xl lg:text-2xl shrink-0 rtl:rotate-180" />
                </div>

                <div className="text-[10px] md:text-sm lg:text-base font-bold text-white mt-2 flex items-center gap-1.5 md:gap-3 flex-wrap justify-center">
                  <Image
                    src="/images/promo/w.png"
                    alt="W"
                    width={60}
                    height={60}
                    className="shrink-0 w-4 h-4 md:w-5 md:h-5"
                  />
                  <p className="text-[#39D700]">W</p>
                  <span>.</span>
                  <Image
                    src="/images/promo/bag.png"
                    alt="Bag"
                    width={60}
                    height={60}
                    className="shrink-0 w-3 h-4 md:w-[13.5px] md:h-[21.5px]"
                  />
                  <span>45 {lang === "ar" ? "كجم" : "kg"}</span>
                </div>
              </div>

              {/* Arrival */}
              <div className="text-center shrink-0">
                <p className="text-xs md:text-sm lg:text-base font-bold">KWI</p>
                <p className="text-lg md:text-2xl font-bold">04:10</p>
              </div>
            </div>

            {/* -------- Benefits + Button -------- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-10 items-stretch md:items-end pt-3 md:pt-4 border-t border-white/10">
              {/* Cancellation */}
              <div className="flex flex-col gap-2 md:gap-3.5">
                <Image
                  src="/images/promo/cancellation.png"
                  alt="Cancellation"
                  width={60}
                  height={60}
                  className="shrink-0 w-6 h-6 md:w-8 md:h-[30.0625px]"
                />
                <p className="font-extrabold text-sm md:text-base lg:text-lg">
                  {lang === "ar"
                    ? "إلغاء الحجز خلال 24 ساعة"
                    : "Cancel within 24 hours"}
                </p>
                <p className="text-xs md:text-sm text-white font-medium leading-relaxed">
                  {lang === "ar"
                    ? "استمتع بميزة إلغاء الحجز بدون رسوم، لفئات معينة من التذاكر."
                    : "Enjoy free cancellation on selected ticket classes."}
                </p>
              </div>

              {/* Booking Benefits */}
              <div className="flex flex-col gap-2 md:gap-3.5">
                <Image
                  src="/images/promo/booking.png"
                  alt="Booking Benefits"
                  width={60}
                  height={60}
                  className="shrink-0 w-6 h-6 md:w-7.75 md:h-8"
                />
                <p className="font-extrabold text-sm md:text-base lg:text-lg">
                  {lang === "ar" ? "مزايا الحجز معنا" : "Booking Benefits"}
                </p>
                <p className="text-xs md:text-sm text-white font-medium leading-relaxed">
                  {lang === "ar"
                    ? "استمتع بمزايا حصرية عند الحجز معنا عبر الإنترنت."
                    : "Enjoy exclusive benefits when you book online."}
                </p>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => router.push("/flight-booking")}
                className="
                  w-full h-fit flex cursor-pointer items-center justify-center gap-2 md:gap-3
                  bg-primary text-white font-bold text-sm md:text-base
                  py-3 lg:py-5 rounded-xl transition hover:shadow-lg
                "
              >
                {lang === "ar" ? "إستكمل الحجز" : "Continue Booking"}
                <FaArrowLeft className={lang === "en" ? "rotate-180" : ""} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
