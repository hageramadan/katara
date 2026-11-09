import QuickLinks from "@/components/profile/QuickLinks";
import BookingsSection from "@/components/profile/BookingsSection";

// The parent layout waits for browser authentication before rendering this page.
export const instant = false;

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <QuickLinks />
      <BookingsSection />
    </div>
  );
}
