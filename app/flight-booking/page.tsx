import type { Metadata } from "next";
import FlightResultsContent from "@/components/flights/results/FlightResultsContent";

export const metadata: Metadata = {
  title: "حجز تذكرة طيران | Katra Go",
  description: "ابحث عن رحلات الطيران وقارن الأسعار وشروط الحجز واختر الرحلة المناسبة.",
};

export default function FlightBookingPage() {
  return <FlightResultsContent />;
}
