export const flightFares = [
  { name: "3B|Flex", price: 210, baggage: "three" },
  { name: "3B|Saver", price: 195, baggage: "three" },
  { name: "2B|Flex", price: 180, baggage: "two" },
  { name: "2B|Saver", price: 165, baggage: "two" },
  { name: "1B|Flex", price: 145, baggage: "one" },
  { name: "1B|Saver", price: 130, baggage: "one" },
  { name: "M|EC", price: 110, baggage: "none" },
  { name: "L|EC", price: 125, baggage: "none" },
] as const;

export type FlightFareCode = (typeof flightFares)[number]["name"];
export type FlightFareDirection = "outbound" | "return";
export type FlightFareSelections = Record<string, Partial<Record<FlightFareDirection, FlightFareCode>>>;
