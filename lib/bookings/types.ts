export type BookingCategory = "flights" | "hotels";

export type BookingTab =
  | "all"
  | "upcoming"
  | "past"
  | "cancelled";

export type BookingStatus = "upcoming" | "past" | "cancelled";

export type Booking = {
  id: number;
  category: BookingCategory;
  status: BookingStatus;
  tripTypeAr: string;
  tripTypeEn: string;
  travelers: number;
  dateAr: string;
  dateEn: string;
  fromCode: string;
  fromTime: string;
  toCode: string;
  toTime: string;
  duration: string;
  stopsAr: string;
  stopsEn: string;
  baggage: string;
  image: string;
};