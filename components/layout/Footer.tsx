"use client";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { FiLinkedin, FiYoutube } from "react-icons/fi";

import { FaFacebookF } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";

// ==================== Services (4 columns) ====================
const servicesCol1 = [
  { ar: "رحلات طيران", en: "Flights" },
  { ar: "فنادق وشقق فندقية", en: "Hotels & Apartments" },
  { ar: "سيارات", en: "Cars" },
  { ar: "رحلات كروز", en: "Cruises" },
];

const servicesCol2 = [
  { ar: "التأمين", en: "Insurance" },
  { ar: "التأشيرات", en: "Visas" },
  { ar: "العمرة", en: "Umrah" },
  { ar: "قطارات", en: "Trains" },
];

const servicesCol3 = [
  { ar: "الشركة", en: "Company" },
  { ar: "عن الأفضل", en: "About Al-Afdal" },
  { ar: "الدعم", en: "Support" },
];

const socials = [
  { id: "linkedin", icon: FaLinkedinIn, url: "#" },
  { id: "twitter", icon: RiTwitterXFill, url: "#" },
  { id: "instagram", icon: PiInstagramLogoFill, url: "#" },
  { id: "facebook", icon: FaFacebookF, url: "#" },
];

export default function Footer() {
  const { lang, setLang } = useApp();

  return (
    <footer className="bg-[#0D154BEB] text-white">
      <div className="container mx-auto px-4 py-10 md:py-14">
        {/* ==================== Row 1: Logo + Payment Partners ==================== */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-8">
  {/* ==================== 75% — Logo + Services ==================== */}
  <div className="w-full md:w-3/4 flex flex-col gap-4">
    {/* Logo */}
    <div className="flex items-center gap-3">
      <Image
        src="/images/footer/logo-white.png"
        alt="Katra Go"
        width={120}
        height={50}
        className="w-10 md:w-10 h-auto object-contain"
      />
      <p className="text-[#7ABA4C] font-extrabold text-3xl">UCORNOS</p>
    </div>

    {/* Services */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-6">
      {/* Column 1 */}
      <div>
        <h3 className="font-bold text-base md:text-lg mb-4">
          {lang === "ar" ? "خدماتنا" : "Our Services"}
        </h3>
        <ul className="flex flex-col gap-3 text-sm md:text-base text-white">
          {servicesCol1.map((s) => (
            <li key={s.en}>
              <a href="#" className="hover:text-secondary transition">
                {lang === "ar" ? s.ar : s.en}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 2 */}
      <div>
        <h3 className="font-bold text-base md:text-lg mb-4 invisible hidden lg:block">
          &nbsp;
        </h3>
        <ul className="flex flex-col gap-3 text-sm md:text-base text-white">
          {servicesCol2.map((s) => (
            <li key={s.en}>
              <a href="#" className="hover:text-secondary transition">
                {lang === "ar" ? s.ar : s.en}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 3 */}
      <div>
        <h3 className="font-bold text-base md:text-lg mb-4 invisible hidden lg:block">
          &nbsp;
        </h3>
        <ul className="flex flex-col gap-3 text-sm md:text-base text-white">
          {servicesCol3.map((s) => (
            <li key={s.en}>
              <a href="#" className="hover:text-secondary transition">
                {lang === "ar" ? s.ar : s.en}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>

  {/* ==================== 25% — Payment Partners + QR ==================== */}
  <div className="w-full md:w-1/4 flex flex-col gap-6">
    {/* Payment Partners */}
    <div className="flex flex-col gap-3">
      <p className="text-sm md:text-xl font-medium text-[#E5E7EB]">
        {lang === "ar" ? "شركاء الدفع" : "Payment Partners"}
      </p>
      <Image
        src="/images/footer/part.png"
        alt="parteners"
        width={500}
        height={100}
        className="w-full max-w-[250px] h-auto object-contain"
      />
    </div>

    {/* QR + Store Buttons */}
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-[#E5E7EB] text-base md:text-lg">
        {lang === "ar"
          ? "امسح الرمز ونزّل تطبيق سعف"
          : "Scan & download Saaf App"}
      </h3>

      <div className="flex items-start gap-3">
        {/* QR Code */}
        <div>
          <Image
            src="/images/footer/qr.png"
            alt="QR Code"
            width={800}
            height={800}
            className="w-24 h-24 md:w-28 md:h-28 object-contain"
          />
        </div>

        {/* Store Buttons */}
        <div className="flex flex-col gap-2">
          <button>
            <Image
              src="/images/footer/google-play.png"
              alt="Google Play"
              width={400}
              height={400}
              className="w-[140px] md:w-[155px] h-auto object-contain"
            />
          </button>
          <button>
            <Image
              src="/images/footer/app-store.png"
              alt="App Store"
              width={400}
              height={400}
              className="w-[140px] md:w-[155px] h-auto object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* ==================== Row 3: Language + Terms + Socials ==================== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 pt-8">
          {/* ==================== Language + Links ==================== */}
          <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
            {/* Language Switcher with Image */}
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="
        flex items-center gap-2
        bg-white text-[#0D154B]
        px-2 py-1.5 rounded-xl
        hover:shadow-lg transition
      "
            >
              {/* Globe Image */}
              <Image
                src="/images/footer/globe.png"
                alt="Language"
                width={40}
                height={40}
                className="w-5 h-5 md:w-6 md:h-6 object-contain"
              />
              <span className="text-xs md:text-sm font-medium">
                {lang === "ar" ? "AR" : "EN"}
              </span>
            </button>

            {/* Terms */}
            <a
              href="#"
              className="text-sm md:text-base text-white hover:text-secondary transition"
            >
              {lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
            </a>

            {/* Privacy */}
            <a
              href="#"
              className="text-sm md:text-base text-white hover:text-secondary transition"
            >
              {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </a>
          </div>

          {/* ==================== Social Icons (Black on White) ==================== */}
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.id}
                  href={s.url}
                  aria-label={s.id}
                  className="
            w-9 h-9 rounded-xl
            bg-white text-black
            hover:bg-secondary hover:text-[#0D154B]
            flex items-center justify-center transition
          "
                >
                  <Icon className="text-base md:text-lg" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
