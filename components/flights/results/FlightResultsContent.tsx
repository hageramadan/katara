"use client";

import { useMemo, useRef, useState } from "react";
import { flightResults } from "@/lib/flights/data";
import { flightLocations } from "@/lib/flights/locations";
import { localizeDigits } from "@/lib/flights/format";
import type { FlightSort } from "@/lib/flights/types";
import { useApp } from "@/context/AppContext";
import FlightSearchEditor from "./FlightSearchEditor";
import type { FlightSearchCriteria } from "./FlightSearchEditor";
import FlightFilters from "./FlightFilters";
import FlightPriceCalendarModal from "./FlightPriceCalendarModal";
import FlightResultsHeader from "./FlightResultsHeader";
import FlightResultsList from "./FlightResultsList";
import FlightResultsSummary from "./FlightResultsSummary";
import FlightSortControls from "./FlightSortControls";
import { getVisibleFlights, initialFlightFilters } from "./flightResultsLogic";

const initialSearch: FlightSearchCriteria = {
  from: "IST",
  to: "KWI",
  departure: "2026-09-21",
  returnDate: "2026-09-28",
  multiCityFlights: [],
  travelers: { adults: 1, children: 0, infants: 0, cabin: "business" },
  tripKind: "round",
};

function getPassengerLabel(search: FlightSearchCriteria, ar: boolean) {
  const passengers = [
    search.travelers.adults > 0 && `${localizeDigits(search.travelers.adults, false)} ${ar ? "بالغ" : "adult"}`,
    search.travelers.children > 0 && `${localizeDigits(search.travelers.children, false)} ${ar ? "طفل" : "child"}`,
    search.travelers.infants > 0 && `${localizeDigits(search.travelers.infants, false)} ${ar ? "رضيع" : "infant"}`,
  ].filter(Boolean).join(ar ? "، " : ", ");
  const cabin = search.travelers.cabin === "business"
    ? ar ? "درجة رجال الأعمال" : "Business Class"
    : ar ? "الدرجة الاقتصادية" : "Economy Class";

  return `${passengers} / ${cabin}`;
}

function formatSearchDate(date: string, ar: boolean) {
  if (!date) return ar ? "اختر تاريخ المغادرة" : "Select departure date";
  return new Intl.DateTimeFormat(ar ? "ar-EG-u-nu-latn" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function FlightResultsContent() {
  const { lang } = useApp();
  const ar = lang === "ar";
  const [filters, setFilters] = useState(initialFlightFilters);
  const [sort, setSort] = useState<FlightSort>("cheapest");
  const [isPriceCalendarOpen, setIsPriceCalendarOpen] = useState(false);
  const [search, setSearch] = useState(initialSearch);
  const searchEditorRef = useRef<HTMLDivElement>(null);

  const fromCity = flightLocations.find((location) => location.code === search.from);
  const toCity = flightLocations.find((location) => location.code === search.to);
  const visibleFlights = useMemo(() => getVisibleFlights(filters, sort), [filters, sort]);
  const displayedFlights = search.tripKind === "multi" || search.tripKind === "round"
    ? visibleFlights.slice(0, 1)
    : visibleFlights;

  const scrollToSearchEditor = () => {
    searchEditorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-3 py-5 sm:px-5 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FlightResultsHeader
          fromCity={ar ? fromCity?.ar : fromCity?.en}
          toCity={ar ? toCity?.ar : toCity?.en}
          dateLabel={localizeDigits(formatSearchDate(search.departure, ar), false)}
          passengerLabel={getPassengerLabel(search, ar)}
          ar={ar}
          onEditSearch={scrollToSearchEditor}
        />

        <div ref={searchEditorRef} className="mt-4 scroll-mt-5 sm:mt-5">
          <FlightSearchEditor
            onSearch={setSearch}
            onTripKindChange={(tripKind) => setSearch((current) => ({ ...current, tripKind }))}
          />
        </div>

        <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
          <FlightFilters
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(initialFlightFilters)}
          />

          <section className="min-w-0">
            <FlightResultsSummary
              count={visibleFlights.length}
              total={flightResults.length}
              ar={ar}
              onShowPriceCalendar={() => setIsPriceCalendarOpen(true)}
            />
            <FlightPriceCalendarModal
              open={isPriceCalendarOpen}
              onClose={() => setIsPriceCalendarOpen(false)}
              ar={ar}
              departureDate={search.departure}
              returnDate={search.returnDate}
              flights={flightResults}
              onDatesChange={(departure, returnDate) =>
                setSearch((current) => ({ ...current, departure, returnDate }))
              }
            />
            <FlightSortControls sort={sort} onSortChange={setSort} ar={ar} />
            <FlightResultsList
              flights={displayedFlights}
              availableFlights={visibleFlights}
              tripKind={search.tripKind}
              ar={ar}
              onResetFilters={() => setFilters(initialFlightFilters)}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
