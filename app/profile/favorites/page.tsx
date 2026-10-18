"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/context/AppContext";
import TicketCard from "@/components/ui/TicketCard";
import FavoritesSortSelect from "@/components/profile/favorites/FavoritesSortSelect";

const favoriteFlights = [
  {
    id: 1,
    image: "/images/travel/istanbul-big.jpg",
    dateAr: "20 أكتوبر 2026",
    dateEn: "20 Oct 2026",
    tripTypeAr: "ذهاب وعودة",
    tripTypeEn: "Round Trip",
    travelers: 2,
    departureCode: "DOH",
    departureTime: "09:15",
    arrivalCode: "IST",
    arrivalTime: "13:40",
    duration: "4h 25m",
    baggageWeight: "30",
    stopsAr: "مباشر",
    stopsEn: "Direct",
  },
  {
    id: 2,
    image: "/images/travel/dubai-big-1.jpg",
    dateAr: "5 نوفمبر 2026",
    dateEn: "5 Nov 2026",
    tripTypeAr: "اتجاه واحد",
    tripTypeEn: "One Way",
    travelers: 1,
    departureCode: "DOH",
    departureTime: "14:20",
    arrivalCode: "DXB",
    arrivalTime: "15:35",
    duration: "1h 15m",
    baggageWeight: "20",
    stopsAr: "مباشر",
    stopsEn: "Direct",
  },
];

export default function FavoritesPage() {
  const { lang } = useApp();
  const [sortOrder, setSortOrder] = useState("newest");

  const sortedFlights = useMemo(
    () =>
      [...favoriteFlights].sort((a, b) =>
        sortOrder === "newest" ? b.id - a.id : a.id - b.id,
      ),
    [sortOrder],
  );

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 text-lg font-bold text-[#0D0D0D] md:text-xl">
            {lang === "ar" ? "المفضلة" : "Favorites"}
          </h1>
          <p className="text-xs text-[#A4A4A4] md:text-sm">
            {lang === "ar"
              ? "ماقمت بتفضيله"
              : "What I preferred"}
          </p>
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-[#6F7E89] md:text-sm">
          
          <FavoritesSortSelect value={sortOrder} onChange={setSortOrder} />
        </label>
      </header>

      <div className="flex flex-col gap-4 md:gap-5">
        {sortedFlights.map((flight) => (
          <TicketCard
            key={flight.id}
            image={flight.image}
            imageAlt={flight.arrivalCode}
            airlineLogo="/images/promo/Frame.png"
            date={lang === "ar" ? flight.dateAr : flight.dateEn}
            tripType={lang === "ar" ? flight.tripTypeAr : flight.tripTypeEn}
            travelers={flight.travelers}
            departureCode={flight.departureCode}
            departureTime={flight.departureTime}
            arrivalCode={flight.arrivalCode}
            arrivalTime={flight.arrivalTime}
            duration={flight.duration}
            stops={lang === "ar" ? flight.stopsAr : flight.stopsEn}
            baggageWeight={flight.baggageWeight}
            showFavorite
            isFavorite
          />
        ))}
      </div>
    </div>
  );
}
