"use client";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const services = [
  {
    id: "hotels",
    image: "/images/services/hotels-bg.png",
    icon: "/images/services/hotels-icon.png",
    ar: "فنادق",
    en: "Hotels",
    descAr: "تقدر تحجز غرف بجميع أنواعها!",
    descEn: "Book rooms of all types!",
  },
  {
    id: "cars",
    image: "/images/services/cars-bg.png",
    icon: "/images/services/cars-icon.png",
    ar: "سيارات",
    en: "Cars",
    descAr: "تقدر تأجر سيارات بجميع أنواعها!",
    descEn: "Rent cars of all types!",
  },
  {
    id: "visa",
    image: "/images/services/visa-bg.png",
    icon: "/images/services/visa-icon.png",
    ar: "التأشيرة الإلكترونية",
    en: "E-Visa",
    descAr: "تقدر تحجز تأشيرتك الإلكترونية من هنا!",
    descEn: "Book your e-visa from here!",
  },
];

export default function BookAndOrganize() {
  const { lang, dir } = useApp();

  return (
    <section className="relative py-12 md:py-16 px-4 bg-[#0D154BEB] text-white overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          {/* ==================== Right Side: Content ==================== */}
          <div className="flex flex-col gap-5 md:gap-6">
            <h2 className="font-extrabold text-[22px] sm:text-[24px] md:text-[36px] lg:text-[54px] leading-tight">
              {lang === "ar"
                ? "احجز ونظم رحلتك مع خدمات الأفضل"
                : "Book and Organize Your Trip with Al-Afdal Services"}
            </h2>

            <p className="text-white text-sm md:text-lg leading-relaxed font-semibold">
              {lang === "ar"
                ? "الأفضل شركة مساهمة في جميع خطواتك نحو النجاح!"
                : "Al-Afdal is a partner in all your steps toward success!"}
            </p>

            <div>
              <button
                className="
                  inline-flex items-center gap-3
                  bg-primary text-white font-bold text-sm md:text-base
                  px-6 md:px-8 py-3 md:py-3.5 rounded-xl
                  transition hover:shadow-lg cursor-pointer active:scale-[0.98]
                "
              >
                {lang === "ar" ? "سجل حساب جديد" : "Create New Account"}
                {dir === "rtl" ? <FiArrowLeft /> : <FiArrowRight />}
              </button>
            </div>
          </div>

          {/* ==================== Left Side: 3 Service Cards ==================== */}
          <div className="flex flex-col gap-4 md:gap-5">
            {services.map((service) => (
              <div
                key={service.id}
                className="
                  group relative rounded-2xl overflow-hidden
                  w-full max-w-[567px] mx-auto
                  aspect-[567/331]
                  cursor-pointer transition-transform duration-300 hover:scale-[1.02]
                "
              >
                {/* Background Image */}
                <Image
                  src={service.image}
                  alt={lang === "ar" ? service.ar : service.en}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-1.5 md:gap-2 px-4">
                  <Image
                    src={service.icon}
                    alt=""
                    width={60}
                    height={60}
                    className="w-9 h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 object-contain"
                  />

                  <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold underline underline-offset-4 decoration-2">
                    {lang === "ar" ? service.ar : service.en}
                  </h3>

                  <p className="text-white/85 text-xs md:text-sm">
                    {lang === "ar" ? service.descAr : service.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
