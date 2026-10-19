"use client";

import { useMemo, useRef, useState } from "react";
import {
  FiCheck,
  FiClock,
  FiDollarSign,
  FiEdit2,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { TbDatabaseFilled } from "react-icons/tb";

import { FaCalendarDays } from "react-icons/fa6";
import { flightResults } from "@/lib/flights/data";
import { localizeDigits } from "@/lib/flights/format";
import { flightLocations } from "@/lib/flights/locations";
import { FlightResult, FlightSort } from "@/lib/flights/types";
import { useApp } from "@/context/AppContext";
import FlightSearchEditor from "./FlightSearchEditor";
import type { FlightSearchCriteria } from "./FlightSearchEditor";
import FlightFilters, { FlightFilterState } from "./FlightFilters";
import FlightResultCard from "./FlightResultCard";
import { FaRegCalendar } from "react-icons/fa6";
import Dropdown from "@/components/ui/Dropdown";
const initialFilters: FlightFilterState = {
  airlines: [],
  refundableOnly: false,
  maxPrice: 3000,
  stops: "any",
  maxDuration: 360,
  departureTime: "any",
};

const sortOptions: {
  key: FlightSort;
  icon: typeof FiDollarSign;
  ar: string;
  en: string;
  price: number;
}[] = [
  {
    key: "best",
    icon: FaStar,
    ar: "الأفضل قيمة",
    en: "Best value",
    price: 1832,
  },
  { key: "fastest", icon: MdAccessTimeFilled, ar: "الأسرع", en: "Fastest", price: 2079 },
  {
    key: "cheapest",
    icon: TbDatabaseFilled,
    ar: "الأرخص",
    en: "Cheapest",
    price: 1832,
  },
];

function getSortedFlights(flights: FlightResult[], sort: FlightSort) {
  return [...flights].sort((first, second) => {
    if (sort === "fastest")
      return first.durationMinutes - second.durationMinutes;
    if (sort === "best") {
      return (
        first.price / first.durationMinutes -
        second.price / second.durationMinutes
      );
    }
    return first.price - second.price;
  });
}

export default function FlightResultsContent() {
  const { lang } = useApp();
  const ar = lang === "ar";
  const [filters, setFilters] = useState<FlightFilterState>(initialFilters);
  const [sort, setSort] = useState<FlightSort>("cheapest");
  const [priceCalendar, setPriceCalendar] = useState(false);
  const searchEditorRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState<FlightSearchCriteria>({
    from: "IST",
    to: "KWI",
    departure: "2026-09-21",
    travelers: { adults: 1, children: 0, infants: 0, cabin: "business" },
    tripKind: "round",
  });

  const searchDate = search.departure
    ? new Intl.DateTimeFormat(ar ? "ar-EG-u-nu-latn" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(`${search.departure}T12:00:00`))
    : ar
      ? "اختر تاريخ المغادرة"
      : "Select departure date";
  const fromCity = flightLocations.find(
    (location) => location.code === search.from,
  );
  const toCity = flightLocations.find(
    (location) => location.code === search.to,
  );
  const passengerDetails = [
    search.travelers.adults > 0 &&
      `${localizeDigits(search.travelers.adults, false)} ${ar ? "بالغ" : "adult"}`,
    search.travelers.children > 0 &&
      `${localizeDigits(search.travelers.children, false)} ${ar ? "طفل" : "child"}`,
    search.travelers.infants > 0 &&
      `${localizeDigits(search.travelers.infants, false)} ${ar ? "رضيع" : "infant"}`,
  ]
    .filter(Boolean)
    .join(ar ? "، " : ", ");
  const passengerLabel = ar
    ? `${passengerDetails} / ${search.travelers.cabin === "business" ? "درجة رجال الأعمال" : "الدرجة الاقتصادية"}`
    : `${passengerDetails} / ${search.travelers.cabin === "business" ? "Business Class" : "Economy Class"}`;
  const selectedSortOption = sortOptions.find((option) => option.key === sort);
  const selectedSortLabel =
    sort === "cheapest"
      ? ar
        ? "السعر من الأقل إلى الأعلى"
        : "Price: low to high"
      : ar
        ? selectedSortOption?.ar
        : selectedSortOption?.en;
  const visibleFlights = useMemo(() => {
    const filtered = flightResults.filter((flight) => {
      if (
        filters.airlines.length > 0 &&
        !filters.airlines.includes(flight.airlineEn)
      )
        return false;
      if (filters.refundableOnly && !flight.refundable) return false;
      if (flight.price > filters.maxPrice) return false;
      if (filters.stops === "direct" && flight.stops !== 0) return false;
      if (filters.stops === "one" && flight.stops !== 1) return false;
      if (flight.durationMinutes > filters.maxDuration) return false;
      const hour = Number(flight.outboundDeparture.split(":")[0]);
      if (filters.departureTime === "day" && (hour < 6 || hour >= 18))
        return false;
      if (filters.departureTime === "night" && hour >= 6 && hour < 18)
        return false;
      return true;
    });
    return getSortedFlights(filtered, sort);
  }, [filters, sort]);

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-3 py-5 sm:px-5 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between gap-3 sm:mb-6">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-extrabold text-[#172B35] sm:text-2xl">
              {ar ? fromCity?.ar : fromCity?.en} {ar ? "إلى" : "to"}{" "}
              {ar ? toCity?.ar : toCity?.en}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#77808D] sm:mt-2 sm:gap-3 sm:text-sm">
              <span>{localizeDigits(searchDate, false)}</span>
              <FaRegCalendar className="shrink-0" />
              <span aria-hidden="true" className="text-[#B8C0CB]">
                |
              </span>
              <span className="inline-flex items-center gap-1.5">
                {passengerLabel}
                <FiUsers className="shrink-0" />
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              searchEditorRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-[#0D154B] px-3 py-2 text-xs font-bold text-[#0D154B] transition hover:bg-[#0D154B] hover:text-white sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <FiEdit2 />
            {ar ? "تعديل البحث" : "Edit search"}
          </button>
        </div>

        <div ref={searchEditorRef} className="scroll-mt-5 mt-4 sm:mt-5">
          <FlightSearchEditor onSearch={setSearch} />
        </div>

        <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
          <FlightFilters
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(initialFilters)}
          />

          <section className="min-w-0">
            <div className=" flex flex-col gap-3 p-4  sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <button
                type="button"
                onClick={() => setPriceCalendar((open) => !open)}
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#DCE3EC] px-3 py-2 text-xs md:text-[13px] font-medium text-[#0D154B] transition hover:border-[#0D154B] sm:self-auto"
              >
                {ar ? "عرض تقويم الأسعار" : "View price calendar"}

                <FaCalendarDays className="text-[#0D154B]" />
              </button>
              <div>
                <h2 className="text-xs font-medium text-[#6C757D] sm:text-sm">
                  {ar
                    ? `عرض ${localizeDigits(visibleFlights.length, false)} نتيجة من ${localizeDigits(flightResults.length, false)}`
                    : `Showing ${visibleFlights.length} of ${flightResults.length} results`}
                </h2>
              </div>
            </div>

            {priceCalendar && (
              <div className="mb-3 grid grid-cols-3 gap-2 rounded-2xl border border-[#E5EAF0] bg-white p-3 sm:mb-4 sm:grid-cols-5 sm:p-4">
                {[
                  "19 سبتمبر",
                  "20 سبتمبر",
                  "21 سبتمبر",
                  "22 سبتمبر",
                  "23 سبتمبر",
                ].map((date, index) => (
                  <button
                    key={date}
                    type="button"
                    className={`rounded-xl px-2 py-2 text-center text-[10px] font-semibold sm:text-xs ${index === 2 ? "bg-[#0D154B] text-white" : "bg-[#F5F6F9] text-[#596474]"}`}
                  >
                    <span className="block">
                      {ar ? localizeDigits(date, false) : `Sep ${19 + index}`}
                    </span>
                    <span className="mt-1 block">
                      KWD {localizeDigits(1832 + index * 45, false)}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="mb-3 rounded-2xl border border-[#E5EAF0] bg-white p-3 sm:mb-4 sm:p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="grid w-full grid-cols-3 gap-1.5 sm:flex sm:w-auto sm:shrink-0 sm:items-center sm:gap-2 overflow-hidden  border border-gray-200 rounded-xl">
                  {sortOptions.map((option) => {
                    const Icon = option.icon;
                    const active = sort === option.key;
                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => setSort(option.key)}
                        aria-pressed={active}
                        className={`inline-flex min-w-0 items-center  justify-between gap-1  px-2 py-2.5 text-start transition sm:min-w-[120px] sm:gap-2 sm:px-3 ${active ? "bg-[#E8F5F3]" : "bg-white hover:bg-[#F8F9FC]"}`}
                      >
                        <span className="flex min-w-0 flex-col gap-1 items-center">
                          <span className="truncate text-[10px]  text-[#0D0D0D] sm:text-[11px]">
                            {ar ? option.ar : option.en}
                          </span>
                          <span
                            dir="ltr"
                            className="text-[10px] font-extrabold text-[#172B35] sm:text-xs"
                          >
                            KWD{" "}
                            {localizeDigits(
                              option.price.toLocaleString("en-US"),
                              false,
                            )}
                          </span>
                        </span>
                        <div className="flex items-center justify-center bg-[#E8F5F3] w-8 h-8 rounded-full">
                             <Icon className="shrink-0 text-sm text-[#0D154B] sm:text-lg" />
                        </div>
                       
                      </button>
                    );
                  })}
                </div>
                <Dropdown
                  align="end"
                  width="w-64"
                  className="w-full sm:w-auto sm:shrink-0"
                  triggerClassName="w-full justify-between rounded-xl border border-[#E4E8EE] bg-[#F8F9FB] px-3 py-2.5 text-start text-[#263142] hover:border-[#AAB4C2] sm:w-[210px]"
                  panelClassName="!inset-s-auto !inset-e-0 mt-2 max-w-[calc(100vw-2rem)]"
                  trigger={
                    <span className="flex min-w-0 flex-1 flex-col items-start gap-1">
                      <span className="text-[11px] font-medium text-[#77808D] sm:text-xs">
                        {ar ? "ترتيب حسب" : "Sort by"}
                      </span>
                      <span className="w-full truncate text-xs font-bold text-[#263142] sm:text-sm">
                        {selectedSortLabel}
                      </span>
                    </span>
                  }
                >
                  {(close) => (
                    <div className="py-1">
                      {sortOptions.map((option) => {
                        const selected = sort === option.key;
                        const label =
                          option.key === "cheapest"
                            ? ar
                              ? "السعر من الأقل إلى الأعلى"
                              : "Price: low to high"
                            : ar
                              ? option.ar
                              : option.en;
                        return (
                          <button
                            key={option.key}
                            type="button"
                            onClick={() => {
                              setSort(option.key);
                              close();
                            }}
                            className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-start text-xs transition sm:px-4 sm:text-sm ${selected ? "bg-[#E7F7F7] font-bold text-[#0D154B]" : "text-[#354052] hover:bg-[#F7F8FA]"}`}
                          >
                            <span>{label}</span>
                            {selected && (
                              <FiCheck className="shrink-0 text-[#0D154B]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </Dropdown>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {visibleFlights.length > 0 ? (
                visibleFlights.map((flight) => (
                  <FlightResultCard key={flight.id} flight={flight} />
                ))
              ) : (
                <div className="rounded-2xl border border-[#E5EAF0] bg-white px-4 py-12 text-center">
                  <p className="text-sm font-bold text-[#354052]">
                    {ar
                      ? "لا توجد رحلات تطابق خيارات التصفية"
                      : "No flights match these filters"}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFilters(initialFilters)}
                    className="mt-3 text-xs font-bold text-[#0D154B] underline"
                  >
                    {ar ? "إعادة تعيين الفلاتر" : "Reset filters"}
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
