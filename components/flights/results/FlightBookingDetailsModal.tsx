"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaStarOfLife } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import Modal from "@/components/ui/Modal";
import SearchSelect from "./SearchSelect";
import type { FlightResult } from "@/lib/flights/types";

type MessageLanguage = "ar" | "en";

type FlightLegData = {
  key: "outbound" | "return";
  title: string;
  summary: string;
  date: string;
  dateLabel: string;
  from: string;
  to: string;
  arrivalCity: string;
  boardingTime: string;
  departureTime: string;
  arrivalTime: string;
};

const flightLegs: Record<MessageLanguage, FlightLegData[]> = {
  ar: [
    {
      key: "outbound",
      title: "رحلة الذهاب",
      summary:
        "مباشر · رحلة طيران على الخطوط الكويتية من الكويت إلى القاهرة، والسفر بأمر الله تعالى من الكويت.",
      date: "15 ديسمبر 2025",
      dateLabel: "تاريخ الذهاب",
      from: "الكويت",
      to: "القاهرة",
      arrivalCity: "الكويت",
      boardingTime: "11:30 ظهراً",
      departureTime: "02:30 ظهراً",
      arrivalTime: "05:30 مساءً",
    },
    {
      key: "return",
      title: "رحلة العودة",
      summary:
        "7 ساعات ترانزيت · رحلة طيران ترانزيت على الخطوط الكويتية من القاهرة إلى الكويت، والسفر بأمر الله تعالى من القاهرة.",
      date: "16 ديسمبر 2025",
      dateLabel: "تاريخ العودة",
      from: "القاهرة",
      to: "الكويت",
      arrivalCity: "الكويت",
      boardingTime: "11:30 ظهراً",
      departureTime: "02:30 ظهراً",
      arrivalTime: "05:30 مساءً",
    },
  ],
  en: [
    {
      key: "outbound",
      title: "Outbound flight",
      summary:
        "Nonstop · Kuwait Airways flight from Kuwait to Cairo. Have a safe journey.",
      date: "December 15, 2025",
      dateLabel: "Departure date",
      from: "Kuwait",
      to: "Cairo",
      arrivalCity: "Kuwait",
      boardingTime: "11:30 AM",
      departureTime: "2:30 PM",
      arrivalTime: "5:30 PM",
    },
    {
      key: "return",
      title: "Return flight",
      summary:
        "7-hour transit · Kuwait Airways connecting flight from Cairo to Kuwait. Have a safe journey.",
      date: "December 16, 2025",
      dateLabel: "Return date",
      from: "Cairo",
      to: "Kuwait",
      arrivalCity: "Kuwait",
      boardingTime: "11:30 AM",
      departureTime: "2:30 PM",
      arrivalTime: "5:30 PM",
    },
  ],
};

const copy = {
  ar: {
    title: "تفاصيل الحجز",
    language: "لغة الرسالة",
    arabic: "عربي",
    english: "إنجليزي",
    from: "من",
    to: "إلى",
    boarding: "التواجد بالمطار الساعة",
    departure: "الإقلاع الساعة",
    arrival: "وصول",
    baggage: "الوزن",
    baggageAmount: "23 + 23 + 7 كجم",
    ticketRefundable: "التذكرة مسترجعة",
    ticketNonRefundable: "التذكرة غير مسترجعة",
    active: "نشطة",
    ticket: "التذكرة",
    breakage: "رفع الكسر",
    commission: "العمولة",
    included: "شامل",
    excluded: "غير شامل",
    airfare: "تذاكر الطيران",
    currency: "العملة",
    total: "إجمالي السعر",
    shareEmail: "شير عن طريق الميل",
    shareWhatsApp: "شير واتساب",
  },
  en: {
    title: "Booking details",
    language: "Message language",
    arabic: "Arabic",
    english: "English",
    from: "From",
    to: "To",
    boarding: "Be at the airport at",
    departure: "Departure at",
    arrival: "Arrival in",
    baggage: "Baggage",
    baggageAmount: "23 + 23 + 7 kg",
    ticketRefundable: "Refundable ticket",
    ticketNonRefundable: "Non-refundable ticket",
    active: "Active",
    ticket: "Ticket",
    breakage: "Change fee waiver",
    commission: "Commission",
    included: "Included",
    excluded: "Not included",
    airfare: "Airfare",
    currency: "Currency",
    total: "Total price",
    shareEmail: "Share by email",
    shareWhatsApp: "Share on WhatsApp",
  },
};

function createShareMessage(language: MessageLanguage, refundable: boolean) {
  const labels = copy[language];
  const legs = flightLegs[language];
  const lines = legs.flatMap((leg) => [
    `${leg.title} · ${leg.date}`,
    leg.summary,
    `${labels.boarding} ${leg.boardingTime}`,
    `${labels.departure} ${leg.departureTime}`,
    `${labels.arrival} ${leg.arrivalCity} ${leg.arrivalTime}`,
    `${labels.baggage}: ${labels.baggageAmount}`,
  ]);

  return [
    labels.title,
    ...lines,
    refundable ? labels.ticketRefundable : labels.ticketNonRefundable,
    `${labels.airfare}: 2000 KWD`,
    `${labels.currency}: 100 KWD`,
    `${labels.total}: 2100 KWD`,
  ].join("\n");
}

function FlightLegCard({
  leg,
  language,
}: {
  leg: FlightLegData;
  language: MessageLanguage;
}) {
  const labels = copy[language];
  return (
    <section className="rounded-2xl  bg-white p-1.5">
      <h3 className="font-bold text-[#0D154B]">{leg.title}</h3>
    <div className="flex items-center gap-2 my-2">
      <p className="text-sm font-semibold md:text-base text-[#606060]">{leg.dateLabel}</p>
        <p className="text-sm lg:tetx-base font-bold text-[#0D0D0D]">{leg.date}</p>
      
    </div>
      <div className="my-2" />
      <div className="space-y-1 text-sm font-semibold leading-5 text-[#333333] md:space-y-2 sm:text-base">
        <p className="flex items-center gap-2">
          <FaStarOfLife aria-hidden="true" className="shrink-0 text-xs text-[#0D154B]" />
          <span>{labels.boarding} <bdi dir="ltr">{leg.boardingTime}</bdi></span>
        </p>
        <p className="flex items-center gap-2">
          <FaStarOfLife aria-hidden="true" className="shrink-0 text-xs text-[#0D154B]" />
          <span>{labels.departure} <bdi dir="ltr">{leg.departureTime}</bdi></span>
        </p>
        <p className="flex items-center gap-2">
          <FaStarOfLife aria-hidden="true" className="shrink-0 text-xs text-[#0D154B]" />
          <span>{labels.arrival} {leg.arrivalCity} <bdi dir="ltr">{leg.arrivalTime}</bdi></span>
        </p>
        <p className="flex items-center gap-2">
          <FaStarOfLife aria-hidden="true" className="shrink-0 text-xs text-[#0D154B]" />
          <span>{labels.baggage}: {labels.baggageAmount}</span>
        </p>
      </div>
    </section>
  );
}

export default function FlightBookingDetailsModal({
  flight,
  open,
  onClose,
}: {
  flight: FlightResult;
  open: boolean;
  onClose: () => void;
}) {
  const [language, setLanguage] = useState<MessageLanguage>("ar");
  const [breakage, setBreakage] = useState("included");
  const [commission, setCommission] = useState("included");
  const [isTicketRefundable, setIsTicketRefundable] = useState(flight.refundable);
  const labels = copy[language];
  const legs = flightLegs[language];
  const message = encodeURIComponent(
    createShareMessage(language, isTicketRefundable),
  );
  const emailHref = `mailto:?subject=${encodeURIComponent(labels.title)}&body=${message}`;
  const whatsappHref = `https://wa.me/?text=${message}`;

  return (
    <Modal open={open} onClose={onClose} title={labels.title} maxWidth="max-w-3xl">
      <div dir={language === "ar" ? "rtl" : "ltr"} className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E8EDF3] pt-3">
          <span className="text-sm font-bold text-[#354052]">{labels.language}</span>
          <div className="w-48">
            <SearchSelect
              label={labels.language}
              value={language}
              onChange={(value) => setLanguage(value as MessageLanguage)}
              hideLabel
              options={[
                { value: "ar", label: labels.arabic },
                { value: "en", label: labels.english },
              ]}
            />
          </div>
        </div>

        <div className="space-y-2">
          {legs.map((leg) => (
            <div key={leg.key} className="rounded-xl p-1.5">
              <h3 className="text-[#4A4A4A] font-semibold text-sm md:text-base">{leg.title}</h3>
              <p className="mt-0.5 text-xs leading-5 text-[#596474]">{leg.summary}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {legs.map((leg) => (
            <FlightLegCard key={leg.key} leg={leg} language={language} />
          ))}
        </div>

        <div className="flex flex-wrap justify-between items-center gap-2 mt-2 md:mt-4">
          <span className="text-sm font-bold text-[#354052]">
            {isTicketRefundable ? labels.ticketRefundable : labels.ticketNonRefundable}
          </span>
         
          <button
            type="button"
            role="switch"
            aria-checked={isTicketRefundable}
            aria-label={labels.ticketRefundable}
            onClick={() => setIsTicketRefundable((value) => !value)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D154B] focus-visible:ring-offset-2 ${isTicketRefundable ? "bg-[#24B75A]" : "bg-[#C7CDD6]"}`}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${language === "ar" ? (isTicketRefundable ? "translate-x-0" : "-translate-x-6") : isTicketRefundable ? "translate-x-6" : "translate-x-0"}`}
            />
          </button>
        </div>

        <div className="border-t border-dashed border-[#BFC8D5] flex flex-col gap-3 pt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[#4A4A4A] font-semibold text-sm md:text-base">{labels.ticket}</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              <SearchSelect
                label={labels.breakage}
                value={breakage}
                onChange={setBreakage}
                hideLabel
                options={[
                  { value: "included", label: `${labels.included} ${labels.breakage}` },
                  { value: "excluded", label: `${labels.excluded} ${labels.breakage}` },
                ]}
              />
              <SearchSelect
                label={labels.commission}
                value={commission}
                onChange={setCommission}
                hideLabel
                options={[
                  { value: "included", label: `${labels.included} ${labels.commission}` },
                  { value: "excluded", label: `${labels.excluded} ${labels.commission}` },
                ]}
              />
            </div>
          </div>

          

          
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[#4A4A4A] font-semibold text-sm md:text-base">{labels.airfare}</h3>
              <bdi dir="ltr" className="font-extrabold text-[#263142]">2000 KWD</bdi>
            </div>
            <div className="flex justify-between items-center gap-3 ">
              <span className="text-[#4A4A4A] font-semibold text-sm md:text-base">{labels.currency}</span>
              <div className="flex items-center gap-2">
                <SearchSelect
                label={labels.currency}
                value="KWD"
                hideLabel
                onChange={() => undefined}
                options={[{ value: "KWD", label: "KWD" }]}
              />
              <bdi dir="ltr" className="font-extrabold text-[#263142]">100 KWD</bdi>
              </div>
            </div>
       

          <div className="flex items-center justify-between gap-4  text-base  font-bold text-[#0D154B]  border-b border-dashed border-gray-300 pb-3">
            <span className="text-[#4A4A4A] font-semibold text-sm md:text-base">{labels.total}</span>
            <bdi dir="ltr">2100 KWD</bdi>
          </div>
        </div>

        <div className="flex justify-center md:justify-end gap-2">
           <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#24B75A] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1DA34F]">
            
            {labels.shareWhatsApp}
            <FaWhatsapp className="text-2xl"/>
          </a>
          <a href={emailHref} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DCE3EC] px-4 py-3 text-sm font-bold text-white bg-[#02C3E1] transition hover:bg-[#059eb6]">
            {/* <FiMail /> */}
            {labels.shareEmail}
          </a>
         
        </div>
      </div>
    </Modal>
  );
}
