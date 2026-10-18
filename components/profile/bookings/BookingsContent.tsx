"use client";
import { useMemo, useState } from "react";
import { useApp } from "@/context/AppContext";
import { bookings } from "@/lib/bookings/data";
import { BookingCategory, BookingTab } from "@/lib/bookings/types";
import TicketCard from "@/components/ui/TicketCard";
import BookingFilterSelect from "./BookingFilterSelect";
import BookingTabs from "./BookingTabs";
import BookingEmptyState from "./BookingEmptyState";

export default function BookingsContent() {
  const { lang } = useApp();
  const [category, setCategory] = useState<BookingCategory>("flights");
  const [activeTab, setActiveTab] = useState<BookingTab>("all");

  // ✅ فلترة حسب الفئة + التاب
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (b.category !== category) return false;
      if (activeTab === "all") return true;
      return b.status === activeTab;
    });
  }, [category, activeTab]);

  return (
    <div className="flex flex-col gap-6">

      {/* ==================== Header: Title + Filter ==================== */}
      <div className="flex flex-wrap items-start md:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#0D0D0D] mb-2 lg:mb-4">
            {lang === "ar" ? "الحجوزات" : "Bookings"}
          </h1>
          <p className="text-xs md:text-sm text-[#A4A4A4]">
            {lang === "ar"
              ? "التحقق من تفاصيل الحجز الخاصة بك أو استردادها."
              : "Check your booking details or request a refund."}
          </p>
        </div>

        <BookingFilterSelect value={category} onChange={setCategory} />
      </div>

      {/* ==================== Tabs ==================== */}
      <BookingTabs active={activeTab} onChange={setActiveTab} />

      {/* ==================== Content ==================== */}
      {filteredBookings.length === 0 ? (
        <BookingEmptyState />
      ) : (
        <div className="flex flex-col gap-4 md:gap-5">
          {filteredBookings.map((b) => (
            <TicketCard
              key={b.id}
              image={b.image}
              
              airlineLogo="/images/promo/Frame.png"
              imageAlt="Booking"
              date={lang === "ar" ? b.dateAr : b.dateEn}
              tripType={lang === "ar" ? b.tripTypeAr : b.tripTypeEn}
              travelers={b.travelers}
              departureCode={b.fromCode}
              departureTime={b.fromTime}
              arrivalCode={b.toCode}
              arrivalTime={b.toTime}
              duration={b.duration}
              stops={lang === "ar" ? b.stopsAr : b.stopsEn}
              baggageWeight={b.baggage}
              showFavorite={true}
              isFavorite={false}
              onFavoriteToggle={() => console.log("Toggle fav", b.id)}
            />
          ))}
        </div>
      )}

    </div>
  );
}