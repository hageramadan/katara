import type { Metadata } from "next";
import PassengerDetailsContent from "@/components/booking/passengers/PassengerDetailsContent";

export const metadata: Metadata = {
  title: "بيانات المسافرين | Katra Go",
  description: "بيانات المسافرين وملخص رحلة الطيران",
};

export default function PassengerDetailsPage() {
  return <PassengerDetailsContent />;
}
