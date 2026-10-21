import { flightResults } from "@/lib/flights/data";
import type { FlightResult, FlightSort } from "@/lib/flights/types";
import type { FlightFilterState } from "./FlightFilters";

export const initialFlightFilters: FlightFilterState = {
  airlines: [],
  refundableOnly: false,
  minPrice: 0,
  maxPrice: 3000,
  stops: "any",
  maxDuration: 360,
  departureTime: "any",
  departureWindow: [0, 24],
  arrivalWindow: [0, 24],
};

function sortFlights(flights: FlightResult[], sort: FlightSort) {
  return [...flights].sort((first, second) => {
    if (sort === "fastest") return first.durationMinutes - second.durationMinutes;
    if (sort === "departure") return first.outboundDeparture.localeCompare(second.outboundDeparture);
    if (sort === "arrival") return first.outboundArrival.localeCompare(second.outboundArrival);
    if (sort === "best") {
      return first.price / first.durationMinutes - second.price / second.durationMinutes;
    }
    return first.price - second.price;
  });
}

function isWithinWindow(value: number, [start, end]: [number, number]) {
  return start <= end ? value >= start && value <= end : value >= start || value <= end;
}

export function getVisibleFlights(filters: FlightFilterState, sort: FlightSort) {
  const filtered = flightResults.filter((flight) => {
    if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airlineEn)) return false;
    if (filters.refundableOnly && !flight.refundable) return false;
    if (flight.price < filters.minPrice || flight.price > filters.maxPrice) return false;
    if (filters.stops === "direct" && flight.stops !== 0) return false;
    if (filters.stops === "one" && flight.stops !== 1) return false;
    if (flight.durationMinutes > filters.maxDuration) return false;

    const departureHour = Number(flight.outboundDeparture.split(":")[0]);
    const arrivalHour = Number(flight.outboundArrival.split(":")[0]);
    if (!isWithinWindow(departureHour, filters.departureWindow)) return false;
    if (!isWithinWindow(arrivalHour, filters.arrivalWindow)) return false;
    if (filters.departureTime === "day" && (departureHour < 6 || departureHour >= 18)) return false;
    if (filters.departureTime === "night" && departureHour >= 6 && departureHour < 18) return false;
    return true;
  });

  return sortFlights(filtered, sort);
}
