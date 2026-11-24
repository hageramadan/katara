import type { Metadata } from "next";
import { Suspense } from "react";
import NotificationsPanel from "@/components/notifications/NotificationsPanel";

export const metadata: Metadata = { title: "الإشعارات | Katara Go", description: "تابع تحديثات الرحلات والحجوزات والعروض والمناسبات" };

export default function NotificationsPage() {
  return(
  <main className="min-h-[70vh] bg-white">
    <div className="mx-auto w-full max-w-7xl lg:shadow-md py-2 m-4 px-4 sm:px-6 lg:px-8 rounded-2xl">
      <Suspense fallback={<div className="min-h-[70vh]" />}>
        <NotificationsPanel />
      </Suspense>
      </div>
    </main>
    );
}
