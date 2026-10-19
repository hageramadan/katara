"use client";

import { useState } from "react";
import { FiRepeat, FiSearch } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import SearchSelect, { SearchSelectOption } from "./SearchSelect";
import { flightLocations } from "@/lib/flights/locations";
import TravelersDropdown from "@/components/hero/forms/TravelersDropdown";
import { TravelerSelection } from "@/lib/flights/types";

type TripKind = "multi" | "oneway" | "round";
export type FlightSearchCriteria = {
  from: string;
  to: string;
  departure: string;
  travelers: TravelerSelection;
  tripKind: TripKind;
};

export default function FlightSearchEditor({
  onSearch,
}: {
  onSearch: (criteria: FlightSearchCriteria) => void;
}) {
  const { lang } = useApp();
  const ar = lang === "ar";
  const [tripKind, setTripKind] = useState<TripKind>("round");
  const [from, setFrom] = useState("IST");
  const [to, setTo] = useState("KWI");
  const [departure, setDeparture] = useState("2026-09-21");
  const [travelers, setTravelers] = useState<TravelerSelection>({
    adults: 1,
    children: 0,
    infants: 0,
    cabin: "business",
  });
  const cityOptions: SearchSelectOption[] = flightLocations.map((city) => ({
    value: city.code,
    label: `${city.code} · ${ar ? city.ar : city.en}`,
  }));
  const tripOptions: { key: TripKind; ar: string; en: string }[] = [
    { key: "round", ar: "ذهاب وعودة", en: "Round trip" },

    { key: "oneway", ar: "اتجاه واحد", en: "One way" },
    { key: "multi", ar: "متعدد الوجهات", en: "Multi-city" },
  ];

  const fieldClass =
    "min-w-0 rounded-xl border border-[#E4E8EE] bg-[#F8F9FB] px-3 py-2.5 transition focus-within:border-[#0D154B] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0D154B]/10 sm:px-4 sm:py-3";
  const labelClass =
    "mb-1 block text-[11px] font-medium text-[#77808D] sm:text-xs";
  const inputClass =
    "w-full bg-transparent text-sm font-bold text-[#263142] outline-none sm:text-base";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch({ from, to, departure, travelers, tripKind });
      }}
      className="rounded-2xl border border-[#E5EAF0] bg-white p-4 shadow-sm sm:p-5"
    >
      {/* <h2 className="mb-4 text-sm font-extrabold text-[#172B35] sm:text-base">
        {ar ? "تعديل البحث" : "Edit search"}
      </h2> */}
      <div className="mb-4 flex flex-wrap gap-2">
        {tripOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => setTripKind(option.key)}
            className={`rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${tripKind === option.key ? "bg-[#0D154B] text-white" : "bg-[#F2F4F8] text-[#445064] hover:bg-[#E7EAF0]"}`}
          >
            {ar ? option.ar : option.en}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-[1.2fr_auto_1.2fr_1fr_1fr_1.2fr_auto] xl:items-end">
        <SearchSelect label={ar ? "من" : "From"} value={from} options={cityOptions} onChange={setFrom} />
        <button type="button" aria-label={ar ? "تبديل المدن" : "Swap cities"} onClick={() => { setFrom(to); setTo(from); }} className="hidden h-10 w-10 items-center justify-center self-center rounded-full border border-[#DCE3EC] bg-white text-[#0D154B] transition hover:bg-[#F5F6FA] xl:flex">
          <FiRepeat />
        </button>
        <SearchSelect label={ar ? "إلى" : "To"} value={to} options={cityOptions} onChange={setTo} />
        <label className={fieldClass}>
          <span className={labelClass}>{ar ? "المغادرة" : "Departure"}</span>
          <input
            className={inputClass}
            type="date"
            value={departure}
            onChange={(event) => setDeparture(event.target.value)}
          />
        </label>
        {tripKind === "round" && (
          <label className={fieldClass}>
            <span className={labelClass}>{ar ? "العودة" : "Return"}</span>
            <input
              className={inputClass}
              type="date"
              defaultValue="2026-09-28"
            />
          </label>
        )}
        <TravelersDropdown
          className="min-w-0"
          initialSelection={travelers}
          onSelectionChange={setTravelers}
          englishDigits
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0D154B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#17245F]"
        >
          <FiSearch /> {ar ? "بحث" : "Search"}
        </button>
      </div>
    </form>
  );
}
