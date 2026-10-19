export type FlightResult = {
  id: string;
  airline: string;
  airlineEn: string;
  price: number;
  seatsLeft: number;
  refundable: boolean;
  durationMinutes: number;
  stops: number;
  outboundFlight: string;
  returnFlight: string;
  outboundDeparture: string;
  outboundArrival: string;
  returnDeparture: string;
  returnArrival: string;
  baggage: number;
};

export type FlightSort = "cheapest" | "fastest" | "best";

export type CabinClass = "economy" | "business";

export type TravelerSelection = {
  adults: number;
  children: number;
  infants: number;
  cabin: CabinClass;
};
