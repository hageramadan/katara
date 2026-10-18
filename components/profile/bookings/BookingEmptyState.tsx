"use client";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { FiSearch } from "react-icons/fi";

export default function BookingEmptyState() {
  const { lang } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-[#DCE3EC] py-12 md:py-16 px-6 text-center">
      {/* Illustration */}
      <div className="w-27.5 h-27.5 mx-auto mb-6 relative bg-[#EFF3F2] rounded-full flex items-center justify-center">
        <Image
          src="/images/bookings/empty.png"
          alt={lang === "ar" ? "لا توجد حجوزات" : "No bookings"}
          width={200}
          height={200}
          className="object-contain w-14 h-14"
          
        />
      </div>

      {/* Title */}
      <h3 className="text-base md:text-lg font-extrabold text-[#163B45] mb-2">
        {lang === "ar" ? "ليس لديك أي حجز حتى الآن" : "You have no bookings yet"}
      </h3>

      {/* Description */}
      <p className="text-xs md:text-sm text-[#6F7E89] leading-relaxed max-w-md mx-auto mb-6">
        {lang === "ar"
          ? "بمجرد الحجز، ستتمكن من الوصول إلى التذاكر التي حجزتها هنا."
          : "Once you book, you'll be able to access your tickets here."}
      </p>

      {/* CTA */}
      <button
        type="button"
        className="
          inline-flex items-center justify-center gap-2
          bg-[#0D154B] text-white font-bold
          text-sm md:text-base px-8 py-3 rounded-xl
          hover:opacity-90 active:scale-[0.99] transition
        "
      >
        
        {lang === "ar" ? "البحث عن تذكرة طيران" : "Search for a Flight Ticket"}
      </button>
    </div>
  );
}