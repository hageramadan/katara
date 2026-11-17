import BookingsContent from "@/components/profile/bookings/BookingsContent";

// The profile layout waits for browser-stored authentication before rendering
// this page, so its initial UI cannot be validated as an instant navigation.
export const instant = false;

export default function BookingsPage() {
  return <BookingsContent />;
}
