"use client";
import { FiSearch } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

export default function ManageBookingForm() {
  const { lang } = useApp();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl text-[#0D0D0D]">
        {lang === "ar"
          ? "أدخل رقم الحجز للبحث عن رحلتك القادمة!"
          : "Enter your booking reference to search for your upcoming trip!"}
      </h1>

      <div className="flex flex-col md:flex-row md:items-stretch gap-3">
        {/* Booking Reference */}
        <div className="flex-1 bg-[#F7F7F7] rounded-xl px-4 py-3">
          <label className="text-base text-[#4A4A4A] block mb-2">
            {lang === "ar" ? "رقم الحجز" : "Booking Reference"}
          </label>
          <input
            placeholder="ABC123"
            className="bg-transparent outline-none w-full text-[#0D0D0D] font-bold text-base"
          />
        </div>

        {/* Last Name */}
        <div className="flex-1 bg-[#F7F7F7] rounded-xl px-4 py-3">
          <label className="text-base text-[#4A4A4A] block mb-2">
            {lang === "ar" ? "الاسم العائلة" : "Last Name"}
          </label>
          <input
            placeholder={lang === "ar" ? "العربان" : "Last Name"}
            className="bg-transparent outline-none w-full text-[#0D0D0D] font-bold text-base"
          />
        </div>

        {/* Search Button */}
        <button
          aria-label="go to search"
          className="shrink-0 cursor-pointer bg-primary text-white px-8 rounded-xl font-bold text-base hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          {/* <FiSearch className="text-lg" /> */}
          {lang === "ar" ? "بحث" : "Search"}
        </button>
      </div>
    </div>
  );
}