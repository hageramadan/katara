import type { Metadata } from "next";
import BookingSuccessContent from "@/components/booking/payment/BookingSuccessContent";

export const metadata: Metadata = {
  title: "تأكيد الحجز | Katra Go",
  description: "معاينة تأكيد حجز رحلة الطيران",
};

export default function BookingSuccessPage() {
  return <BookingSuccessContent />;
}
