export type NotificationCategory = "flights" | "bookings" | "offers" | "occasions";
export type NotificationFilter = "all" | "unread" | "read" | NotificationCategory;
export type NotificationItem = {
  id: string;
  category: NotificationCategory;
  kind: "delay" | "gate" | "confirmed" | "cancelled" | "offer" | "birthday";
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  time: { ar: string; en: string };
  day: "today" | "yesterday";
  unread: boolean;
};

// Reference content transcribed from the supplied notification designs.
export const notifications: NotificationItem[] = [
  { id: "flight-delay", category: "flights", kind: "delay", title: { ar: "رحلتك KU77 اتأخرت 45 دقيقة", en: "Your flight KU77 is delayed by 45 minutes" }, description: { ar: "الإقلاع الجديد من الكويت الساعة 14:25.", en: "New departure from Kuwait at 14:25." }, time: { ar: "من 10 دقائق", en: "10 minutes ago" }, day: "today", unread: true },
  { id: "gate-change", category: "flights", kind: "gate", title: { ar: "اتغيرت بوابة الصعود", en: "Your boarding gate has changed" }, description: { ar: "البوابة الجديدة B12 بدل A4", en: "New gate B12 instead of A4" }, time: { ar: "من ساعة", en: "1 hour ago" }, day: "today", unread: true },
  { id: "booking-confirmed", category: "bookings", kind: "confirmed", title: { ar: "تم تأكيد حجزك", en: "Your booking is confirmed" }, description: { ar: "القاهرة – الكويت · 5 ديسمبر · رقم الحجز SB48MK2", en: "Cairo – Kuwait · 5 December · Booking SB48MK2" }, time: { ar: "من 10 دقائق", en: "10 minutes ago" }, day: "today", unread: true },
  { id: "booking-change", category: "bookings", kind: "cancelled", title: { ar: "اتلغت الرحلة الكويتية (الكويت – القاهرة)", en: "Kuwait Airways flight cancelled (Kuwait – Cairo)" }, description: { ar: "رقم الرحلة - KU 512 - تاريخ الرحلة 2027-1-1", en: "Flight KU512 · 1 January 2027" }, time: { ar: "أمس", en: "Yesterday" }, day: "yesterday", unread: false },
  { id: "kuwait-offer", category: "offers", kind: "offer", title: { ar: "كود الخصم", en: "Discount code" }, description: { ar: "أي رحلة متجهة إلى الكويت عليها خصم 5%", en: "5% off any flight to Kuwait" }, time: { ar: "", en: "" }, day: "today", unread: false },
  { id: "birthday", category: "occasions", kind: "birthday", title: { ar: "كل سنة وأنت طيب يا محمود سمير", en: "Happy birthday, Mahmoud Samir" }, description: { ar: "نتمنالك سنة مليانة سعادة ونجاح", en: "Wishing you a year full of happiness and success" }, time: { ar: "30 سنة", en: "30 years" }, day: "today", unread: false },
];

export function isNotificationUnread(item: NotificationItem, readIds: readonly string[]) {
  return item.unread && !readIds.includes(item.id);
}

export function filterNotifications(filter: NotificationFilter, readIds: readonly string[]) {
  return notifications.filter((item) => filter === "all" ? item.kind !== "offer" && item.kind !== "birthday" :
    (filter === "unread" ? isNotificationUnread(item, readIds) :
      filter === "read" ? !isNotificationUnread(item, readIds) : item.category === filter));
}

