"use client";
import Link from "next/link";
import { FiBell } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { useNotifications } from "@/context/NotificationsContext";

export default function NotificationBell() {
  const { lang } = useApp();
  const { unreadCount } = useNotifications();
  return (
    <Link href="/notifications" aria-label={lang === "ar" ? "الإشعارات" : "Notifications"} className="relative grid size-9 place-items-center rounded-full bg-[#A4A4A4] text-lg text-white transition hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-blue-500">
      <FiBell aria-hidden="true" />
      {unreadCount > 0 && <span aria-label={`${unreadCount} ${lang === "ar" ? "غير مقروءة" : "unread"}`} className="absolute end-1 top-1 size-2 rounded-full border border-white bg-red-500" />}
    </Link>
  );
}
