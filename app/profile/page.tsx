"use client";
import QuickLinks from "@/components/profile/QuickLinks";
import BookingsSection from "@/components/profile/BookingsSection";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <QuickLinks />
      <BookingsSection />
    </div>
  );
}
