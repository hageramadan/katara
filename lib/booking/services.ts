import { bookingFlights } from "./data";
import type { ServiceSelection, FlightKey } from "./types";

export const flightKeys = ["outbound", "inbound"] as const;
export const serviceFlights = flightKeys.map((id) => ({
  id,
  ...bookingFlights[id],
  titleAr: id === "outbound" ? "رحلات الذهاب" : "رحلات العودة",
  titleEn: id === "outbound" ? "Outbound flights" : "Return flights"
}));
export const baggageOptions = [{ weight: 15, price: 20 }, { weight: 20, price: 20 }, { weight: 25, price: 20 }];
export const seatColumns = ["A", "B", "C", "J", "K", "L"] as const;
export const seatRows = Array.from({ length: 11 }, (_, index) => index + 30);
export const unavailableSeats = new Set(["32C", "34B", "36J", "38A", "40L"]);
export const baseBookingFare = 500;

export function serviceKey(flight: FlightKey, traveler: string) {
  return `${flight}:${traveler}`;
}

export function seatCategory(seat: string): "standard" | "comfort" | "preferred" {
  const row = Number.parseInt(seat, 10);
  if (row >= 35 && row <= 37) return "comfort";
  if (seat.endsWith("A") || seat.endsWith("L")) return "preferred";
  return "standard";
}

export function seatPrice(seat: string | null) {
  if (!seat) return 0;
  return {
    standard: 5,
    comfort: 15,
    preferred: 10
  }[seatCategory(seat)];
}

export function servicePrice(selection: ServiceSelection) {
  return seatPrice(selection.seat) + (baggageOptions.find((option) => option.weight === selection.baggage)?.price ?? 0);
}
