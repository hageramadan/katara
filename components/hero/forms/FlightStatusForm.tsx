"use client";
import { useState } from "react";
import { FiSearch, FiMapPin, FiHash } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import DatePicker from "@/components/ui/DatePicker";

type Mode = "route" | "flightNumber";

export default function FlightStatusForm() {
  const { lang } = useApp();
  const [mode, setMode] = useState<Mode>("route");
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 8, 2));

  const options: { key: Mode; icon: React.ElementType; ar: string; en: string }[] = [
    { key: "route", icon: FiMapPin, ar: "حدد مسار الرحلة", en: "By Route" },
    { key: "flightNumber", icon: FiHash, ar: "حدد رقم الرحلة", en: "By Flight Number" },
  ];

  return (
    <div className="space-y-5">
      {/* ============ Mode Selector ============ */}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const Icon = opt.icon;
          const active = opt.key === mode;
          return (
            <button
              key={opt.key}
              onClick={() => setMode(opt.key)}
              className={`
                flex items-center gap-2 cursor-pointer px-5 py-2.5 rounded-xl text-sm font-semibold
                transition-all duration-200
                ${
                  active
                    ? "bg-primary text-white shadow-md"
                    : "bg-[#C4EAEB66] text-[#0D154B] hover:bg-[#c4eaebad]"
                }
              `}
            >
              {lang === "ar" ? opt.ar : opt.en}
            </button>
          );
        })}
      </div>

      {/* ============ Content: By Route ============ */}
      {mode === "route" && (
        <div className="flex flex-col md:flex-row md:items-stretch gap-3">
          {/* From */}
          <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3">
            <label className="text-base text-[#4A4A4A] block mb-2">
              {lang === "ar" ? "من" : "From"}
            </label>
            <input
              defaultValue={lang === "ar" ? "القاهرة" : "Cairo"}
              className="bg-transparent outline-none w-full text-[#0D0D0D] font-bold text-base"
            />
          </div>

          {/* To */}
          <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3">
            <label className="text-base text-[#4A4A4A] block mb-2">
              {lang === "ar" ? "إلى" : "To"}
            </label>
            <input
              defaultValue={lang === "ar" ? "جدة" : "Jeddah"}
              className="bg-transparent outline-none w-full text-[#0D0D0D] font-bold text-base"
            />
          </div>

          {/* Date Picker */}
          <DatePicker
            value={date}
            onChange={setDate}
            label={lang === "ar" ? "تاريخ الرحلة" : "Flight Date"}
            className="flex-1"
          />

          {/* Search Button */}
          <button
            aria-label="search"
            className="shrink-0 bg-primary text-white px-8 rounded-xl font-bold text-base hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <FiSearch className="text-lg" />
            {lang === "ar" ? "بحث" : "Search"}
          </button>
        </div>
      )}

      {/* ============ Content: By Flight Number ============ */}
      {mode === "flightNumber" && (
        <div className="flex flex-col md:flex-row md:items-stretch gap-3">
          {/* Flight Number */}
          <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3">
            <label className="text-base text-[#4A4A4A] block mb-2">
              {lang === "ar" ? "رقم الرحلة" : "Flight Number"}
            </label>
            <input
              placeholder="MS 123"
              className="bg-transparent outline-none w-full text-[#0D0D0D] font-bold text-base"
            />
          </div>

          {/* Date Picker */}
          <DatePicker
            value={date}
            onChange={setDate}
            label={lang === "ar" ? "تاريخ الرحلة" : "Flight Date"}
            className="flex-1"
          />

          {/* Search Button */}
          <button
            aria-label="search"
            className="shrink-0 bg-primary text-white px-8 rounded-xl font-bold text-base hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <FiSearch className="text-lg" />
            {lang === "ar" ? "بحث" : "Search"}
          </button>
        </div>
      )}
    </div>
  );
}