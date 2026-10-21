import type { FlightResult } from "@/lib/flights/types";
import type { FlightSearchCriteria } from "./FlightSearchEditor";
import FlightResultCard from "./FlightResultCard";
import FlightRouteTabs from "./FlightRouteTabs";

export default function FlightResultsList({
  flights,
  availableFlights,
  tripKind,
  ar,
  onResetFilters,
}: {
  flights: FlightResult[];
  availableFlights: FlightResult[];
  tripKind: FlightSearchCriteria["tripKind"];
  ar: boolean;
  onResetFilters: () => void;
}) {
  return (
    <>
      {tripKind === "multi" && <FlightRouteTabs ar={ar} />}
      <div className="space-y-3 sm:space-y-4">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <FlightResultCard
              key={flight.id}
              flight={flight}
              availableFlights={availableFlights}
              tripKind={tripKind}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-[#E5EAF0] bg-white px-4 py-12 text-center">
            <p className="text-sm font-bold text-[#354052]">
              {ar ? "لا توجد رحلات تطابق خيارات التصفية" : "No flights match these filters"}
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-3 text-xs font-bold text-[#0D154B] underline"
            >
              {ar ? "إعادة تعيين الفلاتر" : "Reset filters"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
