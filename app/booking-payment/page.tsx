import type { Metadata } from "next";
import BookingPaymentContent from "@/components/booking/payment/BookingPaymentContent";

export const metadata: Metadata = {
  title: "مراجعة الحجز والدفع | Katra Go",
  description: "مراجعة بيانات المسافرين وتفاصيل الرحلة والسعر واختيار وسيلة الدفع",
};

export default function BookingPaymentPage() {
  return <BookingPaymentContent />;
}
