"use client";
import { useState } from "react";
import TripTypeSelector, { TripType } from "./TripTypeSelector";
import RouteInputs from "./RouteInputs";
import DateInputs from "./DateInputs";
import TravelersDropdown from "./TravelersDropdown";
import FlightFilters from "./FlightFilters";
import { useApp } from "@/context/AppContext";
import { FiSearch } from "react-icons/fi";

export default function FlightBookingForm() {
  const { t } = useApp();
  const [tripType, setTripType] = useState<TripType>("round");
  const [filters, setFilters] = useState<string[]>([
    "baggage",
    "direct",
    "refundable",
    "flexible",
  ]);

  return (
    <div className="space-y-3 sm:space-y-5">
      {/* Trip Type */}
      <TripTypeSelector value={tripType} onChange={setTripType} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3">
        <RouteInputs className="md:col-span-5" />
        <DateInputs tripType={tripType} className="md:col-span-4" />
        <TravelersDropdown className="md:col-span-3" />
      </div>

      {/* Filters + Search Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 pt-1 sm:pt-2">
        {/* Filters */}
        <FlightFilters value={filters} onChange={setFilters} />

        {/* Search Button */}
        <button className="shrink-0 bg-primary text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-bold text-xs sm:text-sm hover:opacity-90 transition flex items-center justify-center gap-2">
          {/* <FiSearch className="text-lg" /> */}
          {t.hero.searchBtn}
        </button>
      </div>
    </div>
  );
}
