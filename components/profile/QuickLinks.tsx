"use client";
import { useApp } from "@/context/AppContext";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";

export default function QuickLinks() {
  const { lang } = useApp();

  return (
    <section>
      <h2 className="text-base md:text-xl font-bold text-[#0D0D0D] mb-3">
        {lang === "ar" ? "الروابط السريعة" : "Quick Links"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
         {/* Call Us */}
        <a
          href="tel:+971588250786"
          className="
            group flex items-center gap-3 sm:flex-col sm:items-start sm:gap-3
            bg-white rounded-2xl p-3 sm:p-4 md:p-5
            border border-[#DCE3EC]
            hover:border-[#0D154B]/50 hover:shadow-md
            transition-all duration-200
          "
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#0D154B]/20 transition">
            <FiPhone className="text-[#0D154B] text-lg sm:text-xl" />
          </div>
          <div className="flex flex-col min-w-0 gap-1 sm:gap-3 w-full">
            <span className="text-sm sm:text-base md:text-lg font-bold text-[#0D0D0D]">
              {lang === "ar" ? "اتصل بنا" : "Call Us"}
            </span>
            <div className="flex items-center justify-between w-full gap-2">
              <span
                className="text-xs sm:text-sm md:text-base font-semibold underline text-[#A4A4A4]"
                dir="ltr"
              >
                +971 588250786
              </span>
              <FaAngleLeft className="text-[#A4A4A4] shrink-0" />
            </div>
          </div>
        </a>
        {/* WhatsApp */}
        <a
          href="https://wa.me/971588250786"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group flex items-center gap-3 sm:flex-col sm:items-start sm:gap-3
            bg-white rounded-2xl p-3 sm:p-4 md:p-5
            border border-[#DCE3EC]
            hover:border-[#25D366]/50 hover:shadow-md
            transition-all duration-200
          "
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 transition">
            <FaWhatsapp className="text-[#0D0D0D] text-xl sm:text-2xl" />
          </div>
          <div className="flex flex-col min-w-0 gap-1 sm:gap-3 w-full">
            <span className="text-sm sm:text-base md:text-lg font-bold text-[#0D0D0D]">
              WhatsApp
            </span>
            <div className="flex items-center justify-between w-full gap-2">
              <p
                className="text-xs sm:text-sm md:text-base font-semibold underline text-[#A4A4A4]"
                dir="ltr"
              >
                +971 588250786
              </p>
              <FaAngleLeft className="text-[#A4A4A4] shrink-0" />
            </div>
          </div>
        </a>

       
      </div>
    </section>
  );
}
