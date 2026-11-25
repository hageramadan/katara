"use client";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FiBell } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { useNotifications } from "@/context/NotificationsContext";
import NotificationsPanel from "./NotificationsPanel";
import type { NotificationFilter } from "@/lib/notifications";

export default function NotificationBell() {
  const { lang, dir } = useApp();
  const { unreadCount } = useNotifications();
  const [open, setOpen] = useState(false);
  const [initialFilter, setInitialFilter] = useState<NotificationFilter>("all");
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const pathname = usePathname();

  useEffect(() => {
    const openFromLink = () => {
      if (!ref.current?.getClientRects().length) return;
      const hash = window.location.hash;
      if (hash !== "#notifications" && hash !== "#notification-offers") return;
      setInitialFilter(hash === "#notification-offers" ? "offers" : "all");
      setOpen(true);
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    const frame = requestAnimationFrame(openFromLink);
    window.addEventListener("hashchange", openFromLink);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", openFromLink); };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const outside = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); buttonRef.current?.focus(); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);

  return (
    <div ref={ref} className="relative" onBlur={(event) => {
      if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
    <button ref={buttonRef} type="button" aria-expanded={open} aria-controls={open ? id : undefined} aria-haspopup="dialog" onClick={() => { setInitialFilter("all"); setOpen(!open); }} aria-label={lang === "ar" ? "الإشعارات" : "Notifications"} className="relative grid size-9 place-items-center rounded-full bg-[#A4A4A4] text-lg text-white transition hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-blue-500">
      <FiBell aria-hidden="true" />
      {unreadCount > 0 && <span aria-label={`${unreadCount} ${lang === "ar" ? "غير مقروءة" : "unread"}`} className="absolute end-1 top-1 size-2 rounded-full border border-white bg-red-500" />}
    </button>
    {open && <div ref={panelRef} id={id} role="dialog" aria-label={lang === "ar" ? "الإشعارات" : "Notifications"} dir={dir} tabIndex={-1} className="absolute end-0 top-full z-50 mt-3 max-h-[calc(100svh-6rem)] w-[min(28rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-2xl border border-slate-200 bg-white shadow-2xl outline-none">
      <NotificationsPanel initialFilter={initialFilter} />
    </div>}
    </div>
  );
}
