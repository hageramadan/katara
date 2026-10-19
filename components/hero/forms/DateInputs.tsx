"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { TripType } from "./TripTypeSelector";
import DatePicker from "@/components/ui/DatePicker";

export default function DateInputs({
  tripType,
  className = "",
}: {
  tripType: TripType;
  className?: string;
}) {
  const { lang } = useApp();
  const showReturn = tripType === "round";

  // ✅ الحالة الافتراضية: 2 سبتمبر 2025 و 3 سبتمبر 2025
  const [departure, setDeparture] = useState<Date | undefined>(
    new Date(2025, 8, 2)
  );
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    new Date(2025, 8, 3)
  );

  return (
    <div className={`flex gap-0 ${className}`}>
      {/* ==================== Departure ==================== */}
      <DatePicker
        value={departure}
        onChange={setDeparture}
        label={lang === "ar" ? "المغادرة" : "Departure"}
        placeholderAr="اختر تاريخ المغادرة"
        placeholderEn="Select departure date"
        align="start"
        className={`
          flex-1 bg-[#F7F7F7] rounded-xl
          ${showReturn ? "rounded-l-none" : ""}
        `}
      />

      {/* Divider (only in round trip) */}
      {showReturn && (
        <div className="flex items-center justify-center bg-[#F7F7F7] px-0.5">
          <div className="text-xl sm:text-3xl text-gray-300">|</div>
        </div>
      )}

      {/* ==================== Return ==================== */}
      {showReturn && (
        <DatePicker
          value={returnDate}
          onChange={setReturnDate}
          label={lang === "ar" ? "العودة" : "Return"}
          placeholderAr="اختر تاريخ العودة"
          placeholderEn="Select return date"
          align="end"
          className="flex-1 bg-[#F7F7F7] rounded-xl rounded-r-none"
        />
      )}
    </div>
  );
}
