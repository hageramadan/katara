import type { BookingPaymentMethod, BookingPricing, ServiceSelection } from "./types";
import { baggageOptions, baseBookingFare, seatPrice } from "./services";

export const bookingPaymentMethods: {
  id: BookingPaymentMethod;
  labelAr: string;
  labelEn: string;
}[] = [
  { id: "knet", labelAr: "كي نت", labelEn: "KNET" },
  { id: "visa", labelAr: "فيزا", labelEn: "Visa" },
  { id: "mastercard", labelAr: "ماستركارد", labelEn: "Mastercard" },
  { id: "applepay", labelAr: "أبل باي", labelEn: "Apple Pay" },
  { id: "mada", labelAr: "مدى", labelEn: "Mada" },
  { id: "wallet", labelAr: "المحفظة", labelEn: "Wallet" },
];

export function calculateBookingPricing(services: Record<string, ServiceSelection>, promoCode = ""): BookingPricing {
  const selections = Object.values(services);
  const baggage = selections.reduce((sum, item) => {
    return sum + (baggageOptions.find((option) => option.weight === item.baggage)?.price ?? 0);
  }, 0);
  const seats = selections.reduce((sum, item) => sum + seatPrice(item.seat), 0);
  const extras = baggage + seats;
  const subtotal = baseBookingFare + extras;
  const discount = promoCode.trim().toUpperCase() === "SAVE20" ? Math.min(20, subtotal) : 0;

  return {
    fare: baseBookingFare - 100,
    taxes: 100,
    baggage,
    seats,
    extras,
    subtotal,
    discount,
    total: subtotal - discount,
  };
}
