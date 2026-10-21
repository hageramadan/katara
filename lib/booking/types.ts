export type TravelerDetails = {
  birthDate: string;
  mobile: string;
  mobileCode: string;
  whatsapp: string;
  whatsappCode: string;
  email: string;
  guardian: string;
  passport: string;
  passportExpiry: string;
  nationality: string;
  issuingCountry: string;
};

export type BookingTraveler = {
  id: string;
  name: string;
  type: "adult" | "child" | "infant";
  number: number;
  firstName: string;
  lastName: string;
  gender: string;
  save: boolean;
  file: string;
  details: TravelerDetails;
};

export type ServiceSelection = {
  seat: string | null;
  baggage: number;
  wheelchair: boolean;
};

export type FlightKey = "outbound" | "inbound";
export type ServiceTab = "seats" | "baggage";

export type BookingPaymentMethod = "knet" | "visa" | "mastercard" | "applepay" | "mada" | "wallet";

export type BookingPricing = {
  fare: number;
  taxes: number;
  baggage: number;
  seats: number;
  extras: number;
  subtotal: number;
  discount: number;
  total: number;
};
