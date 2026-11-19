import type { Metadata } from "next";
import NotificationsPanel from "@/components/notifications/NotificationsPanel";

export const metadata: Metadata = { title: "الإشعارات | Katara Go", description: "تابع تحديثات الرحلات والحجوزات والعروض والمناسبات" };

export default function NotificationsPage() {
  return(
  <main className="min-h-[70vh] bg-white">
    <div className="mx-auto w-full max-w-7xl shadow-2xl py-5 px-4 sm:px-6 lg:px-8 my-5 rounded-2xl">
      <NotificationsPanel />
      </div>
    </main>
    );
}
