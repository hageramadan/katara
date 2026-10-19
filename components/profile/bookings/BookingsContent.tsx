"use client";
import { useMemo, useState } from "react";
import { useApp } from "@/context/AppContext";
import { bookings } from "@/lib/bookings/data";
import { BookingCategory, BookingTab } from "@/lib/bookings/types";
import TicketCard from "@/components/ui/TicketCard";
import BookingFilterSelect from "./BookingFilterSelect";
import BookingTabs from "./BookingTabs";
import BookingEmptyState from "./BookingEmptyState";
import { useRouter } from "next/navigation";

export default function BookingsContent() {
  const { lang } = useApp();
  const router = useRouter();
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
    <div className="flex min-w-0 flex-col gap-4 sm:gap-6">

      {/* ==================== Header: Title + Filter ==================== */}
      <div className="flex min-w-0 flex-row items-center justify-between gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-[#0D0D0D] mb-1 sm:mb-2 lg:mb-4">
            {lang === "ar" ? "الحجوزات" : "Bookings"}
          </h1>
          <p className="text-[11px] sm:text-xs md:text-sm text-[#A4A4A4]">
            {lang === "ar"
              ? "التحقق من تفاصيل الحجز الخاصة بك أو استردادها."
              : "Check your booking details or request a refund."}
          </p>
        </div>

        <BookingFilterSelect
          value={category}
          onChange={setCategory}
          className="w-[46%] shrink-0 sm:w-auto"
        />
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
              compactMobile
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
              onCardClick={() => router.push(`/profile/bookings/${b.id}`)}
            />
          ))}
        </div>
      )}

    </div>
  );
}
