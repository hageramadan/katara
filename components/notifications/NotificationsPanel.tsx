"use client";
import { useState } from "react";
import Link from "next/link";
import { FiCheck, FiCheckCircle, FiClock, FiMapPin, FiXCircle } from "react-icons/fi";
import BookingChange from "./BookingChange";
import { useApp } from "@/context/AppContext";
import { useNotifications } from "@/context/NotificationsContext";
import { filterNotifications, isNotificationUnread, notifications, type NotificationFilter, type NotificationItem } from "@/lib/notifications";

const tabs: { id: NotificationFilter; ar: string; en: string }[] = [
  { id: "all", ar: "الكل", en: "All" },
  { id: "unread", ar: "غير المقروءة", en: "Unread" },
  { id: "offers", ar: "عروض", en: "Offers" },
  { id: "flights", ar: "تغيير الرحلة", en: "Flight changes" },
  { id: "occasions", ar: "مناسبات", en: "Occasions" },
];
const icons = { delay: FiClock, gate: FiMapPin, confirmed: FiCheckCircle, cancelled: FiXCircle };
const iconColors = { delay: "bg-[#5C4700] text-[#D2B34B]", gate: "bg-[#273C49] text-[#B3CBD3]", confirmed: "bg-[#D1F2F3] text-[#69B942]", cancelled: "bg-[#541800] text-[#B64B1D]" };

export default function NotificationsPanel({ initialFilter = "all" }: { initialFilter?: NotificationFilter }) {
  const { lang, dir } = useApp();
  const { readIds, markRead, unreadCount } = useNotifications();
  const [filter, setFilter] = useState<NotificationFilter>(initialFilter);
  const [selected, setSelected] = useState<string[]>([]);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [allView, setAllView] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const ar = lang === "ar";
  const selecting = selected.length > 0;
  const items = filterNotifications(filter, readIds).filter((item) => filter !== "flights" || item.kind === "delay");

  function toggleSelection(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  }

  function openNotification(item: NotificationItem) {
    if (selecting) { toggleSelection(item.id); return; }
    markRead([item.id]);
    if (item.category === "flights" || item.category === "bookings") setBookingOpen(true);
  }

  async function copyOffer() {
    try { await navigator.clipboard.writeText("مجلد التذكرة"); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  }

  return (
    <section dir={dir} aria-label={ar ? "الإشعارات" : "Notifications"} className="overflow-hidden bg-white text-[#26285C] [&_button]:cursor-pointer [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-[#648DF1]">
      <header className="flex flex-wrap items-center justify-between gap-4 px-4 pb-8 pt-7 sm:px-8">
        <h1 className="text-xl font-extrabold sm:text-3xl">{ar ? "الاشعارات" : "Notifications"}</h1>
        {allView ? <span className="text-lg font-bold text-[#777]">{ar ? "كل الاشعارات" : "All notifications"}</span> : <button type="button" disabled={!unreadCount} onClick={() => { markRead(notifications.map((item) => item.id)); setSelected([]); }} className={`min-h-10 rounded-full px-2 text-xs font-bold text-[#7398F8] sm:text-lg disabled:cursor-default disabled:opacity-50 ${selecting ? "bg-[#A4A4A4]" : ""}`}>{ar ? "تحديد الكل كمقروء" : "Mark all as read"}</button>}
      </header>
      <div aria-label={ar ? "تصفية الإشعارات" : "Filter notifications"} className="flex flex-nowrap items-center justify-between gap-x-3 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-[#D2D2D2] px-3.5 pb-2 pt-1 sm:px-7">
        {tabs.map((tab) => {
          const count = filterNotifications(tab.id, readIds).filter((item) => tab.id !== "flights" || item.kind === "delay").length;
          return <button key={tab.id} type="button" aria-pressed={!bookingOpen && filter === tab.id} onClick={() => { setFilter(tab.id); setSelected([]); setBookingOpen(false); }} className={`flex min-h-11 shrink-0 flex-row items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 text-[calc(0.75rem+1px)] sm:gap-1.5 sm:px-2 sm:text-lg ${filter === tab.id && !selecting && !bookingOpen ? "bg-[#A4A4A4] text-[#7398F8]" : "text-[#A4A4A4]"}`}>
            {tab[lang]}<span className="grid min-h-5 min-w-5 shrink-0 place-items-center rounded-full bg-[#648DF1] px-1 text-[calc(0.75rem+1px)] font-bold text-white sm:min-h-6 sm:min-w-6 sm:text-base">{count}</span>
          </button>;
        })}
      </div>
      {bookingOpen ? <BookingChange /> : filter === "offers" ? <div className="py-5">
        <div className="rounded-s-xl bg-gradient-to-l from-[#DFDFDF] to-white px-3 py-4 text-xs leading-relaxed text-[#666] sm:px-6 sm:py-3 sm:text-lg">
          <h2 className="mb-3 text-sm font-bold sm:mb-2 sm:text-lg">{ar ? "كود الخصم" : "Discount code"}</h2>
          <div className="grid grid-cols-[auto_auto_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1.5 text-[11px] leading-5 sm:flex sm:text-lg">
            <span className="rounded-full border border-[#BEBEBE] px-1.5 py-1" dir="ltr">1,000</span>
            <button type="button" onClick={copyOffer} className="min-h-9 whitespace-nowrap rounded-full border border-[#A8BDC3] bg-[#DDF7FA] px-2 py-1">{copied ? ar ? "تم النسخ" : "Copied" : ar ? "نسخ" : "Copy"}</button>
            <span aria-hidden="true">←</span><span className="min-w-0 rounded-xl bg-[#26285C] px-2 py-2 text-center font-bold text-white sm:flex-1 sm:rounded-full sm:py-1.5">{ar ? "مجلد التذكرة" : "Ticket folder"}</span><span aria-hidden="true">←</span><span className="min-w-0 text-center font-bold">{ar ? "لصق في المجلد" : "Paste in folder"}</span>
          </div>
          <p className="mt-3 leading-6 sm:mt-2 sm:leading-7">{ar ? "أي رحلة متجهة إلى الكويت عليها خصم 5%" : "5% off any flight to Kuwait"} <Link href="/terms?from=notification-offers" className="block text-[#7398F8] sm:inline">{ar ? "للاطلاع على الشروط والأحكام" : "View terms and conditions"}</Link></p>
          {copyError && <p role="alert" className="text-red-600">{ar ? "تعذر النسخ" : "Copy failed"}</p>}
        </div>
      </div> : filter === "occasions" ? <BirthdayCard /> : <div>
        {items.length === 0 && <p role="status" className="px-6 py-12 text-center text-lg text-[#A4A4A4]">{ar ? "لا توجد إشعارات" : "No notifications"}</p>}
        {(["today", "yesterday"] as const).map((day) => {
          const dayItems = items.filter((item) => item.day === day && item.kind !== "offer" && item.kind !== "birthday");
          if (!dayItems.length) return null;
          return <div key={day}>
            {filter !== "flights" && <h2 className="px-6 py-3 text-lg text-[#CCC]">{day === "today" ? ar ? "اليوم" : "Today" : ar ? "امس" : "Yesterday"}</h2>}
            <ul>
              {dayItems.map((item) => {
                if (item.kind === "offer" || item.kind === "birthday") return null;
                const unread = isNotificationUnread(item, readIds);
                const chosen = selected.includes(item.id);
                const dark = (filter === "unread" && unread) || (selecting && day === "today");
                const Icon = icons[item.kind];
                return <li key={item.id} className={`group flex items-center gap-2 py-5 pe-2 ps-4 sm:gap-4 sm:pe-6 sm:ps-8 ${dark || chosen ? "bg-[#171D63] text-white" : "bg-white text-[#777]"}`}>
                  {selecting && day === "today" && <span className="relative me-1 size-6 shrink-0 sm:me-5"><input type="checkbox" checked={chosen} onChange={() => toggleSelection(item.id)} aria-label={`${ar ? "تحديد" : "Select"} ${item.title[lang]}`} className="size-6 appearance-none rounded-[2px] border-2 border-[#A9B3D8] bg-transparent focus-visible:outline-2 focus-visible:outline-[#648DF1]" />{chosen && <FiCheck aria-hidden="true" className="pointer-events-none absolute inset-1 size-4 text-[#8AD348]" />}</span>}
                  <button type="button" onClick={() => openNotification(item)} className="flex min-w-0 flex-1 items-start gap-2 text-start sm:gap-3">
                    <span className={`mt-1 grid size-9 shrink-0 place-items-center rounded-full ${iconColors[item.kind]}`}><Icon aria-hidden="true" className="text-xl" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold leading-6 sm:text-xl sm:leading-8">{item.title[lang]}</span>
                      <span className={`block text-xs leading-5 sm:text-base sm:leading-7 ${dark || chosen ? "text-[#949BC1]" : "text-[#C6C6C6]"}`}>{item.description[lang]}</span>
                      <span className={`block text-xs leading-5 sm:text-base sm:leading-7 ${dark || chosen ? "text-[#949BC1]" : "text-[#C6C6C6]"}`}>{item.time[lang]}</span>
                    </span>
                  </button>
                  <button type="button" aria-label={`${ar ? "تحديد" : "Select"} ${item.title[lang]}`} onClick={() => toggleSelection(item.id)} className={`grid size-6 shrink-0 place-items-center rounded ${dark ? "" : "opacity-0 group-hover:opacity-100 focus:opacity-100"}`}><span className="size-2 rounded-full bg-[#548CE7]" /></button>
                </li>;
              })}
            </ul>
            {selecting && day === "today" && <div className="flex gap-6 bg-white px-3.5 pb-0 pt-5 sm:px-7">
              <button type="button" onClick={() => { markRead(selected); setSelected([]); }} className="min-h-12 flex-1 rounded-xl bg-[#12154D] text-lg font-bold text-white">{ar ? "موافق" : "Confirm"}</button>
              <button type="button" onClick={() => setSelected([])} className="min-h-12 flex-1 rounded-xl border border-[#A4ADBF] bg-[#DFFAFD] text-lg font-bold text-[#747B9A]">{ar ? "الغاء" : "Cancel"}</button>
            </div>}
          </div>;
        })}
      </div>}
      <footer className="mt-2 border-t border-[#D2D2D2] px-6 py-2 text-center">
        <button type="button" onClick={() => { setAllView(bookingOpen ? true : !allView); setFilter("all"); setBookingOpen(false); setSelected([]); }} className="min-h-8 text-sm font-bold text-[#7398F8] sm:text-xl">{allView && !bookingOpen ? ar ? "رجوع" : "Back" : ar ? "عرض كل الاشعارات" : "View all notifications"}</button>
      </footer>
    </section>
  );
}

function BirthdayCard() {
  const { lang } = useApp();
  const ar = lang === "ar";
  return <div className="p-6"><div className="relative isolate overflow-hidden rounded-xl bg-gradient-to-br from-[#62208A] via-[#9021E8] to-[#B31C73] px-6 py-8 text-center text-white">
    {[{x:"5%",y:"32%",c:"from-yellow-200 to-amber-500",s:31},{x:"3%",y:"63%",c:"from-cyan-300 to-cyan-600",s:24},{x:"14%",y:"52%",c:"from-white to-slate-300",s:30},{x:"86%",y:"32%",c:"from-yellow-200 to-amber-500",s:31},{x:"92%",y:"63%",c:"from-cyan-300 to-cyan-600",s:24},{x:"78%",y:"52%",c:"from-white to-slate-300",s:30}].map((balloon) => <span key={balloon.x} aria-hidden="true" className="absolute -z-10" style={{left:balloon.x,top:balloon.y}}><span className={`block rounded-[50%] bg-gradient-to-br ${balloon.c}`} style={{width:balloon.s,height:balloon.s*1.4}} /><span className="mx-auto block h-10 w-px rotate-6 bg-white/30" /></span>)}
    {[8,16,23,34,43,61,72,81,90].map((left,i)=><span key={left} aria-hidden="true" className="absolute h-1 w-1.5 rotate-45 rounded-sm bg-yellow-200/70" style={{left:`${left}%`,top:`${8+(i%3)*6}%`}} />)}
    <p className="mb-5 text-base text-[#F1BDDF]">🎉 {ar ? "عيد ميلاد سعيد" : "Happy birthday"} 🎉</p>
    <h2 className="text-xl font-bold leading-7">{ar ? "كل سنة وأنت طيب يا محمود سمير" : "Happy birthday, Mahmoud Samir"}</h2>
    <span className="my-3 inline-block rounded-full bg-white/20 px-5 py-1 text-base">{ar ? "30 سنة" : "30 years"}</span>
    <p className="text-base text-[#E6D9F3]">✨ {ar ? "نتمنالك سنة مليانة سعادة ونجاح" : "Wishing you a year full of happiness and success"}</p>
  </div></div>;
}

