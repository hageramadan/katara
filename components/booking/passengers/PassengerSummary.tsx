"use client";
import Link from "next/link";
import { FiChevronDown, FiEdit2 } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { useBookingFlow } from "@/context/BookingFlowContext";
import { calculateBookingPricing } from "@/lib/booking/payment";
import FlightSummary from "./FlightSummary";

type PassengerSummaryProps = {
  onBookingDetails: () => void;
  onCancellationPolicy: () => void;
};

export default function PassengerSummary({ onBookingDetails, onCancellationPolicy }: PassengerSummaryProps) {
  const { lang, dir } = useApp();
  const { services, promoCode } = useBookingFlow();
  const pricing = calculateBookingPricing(services, promoCode);
  return (
    <aside className="min-w-0 w-full">
      {/* ==================== Heading + Edit Trip ==================== */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 lg:mb-6">
        <h2 className="text-lg font-bold">
          {lang === "ar" ? "ملخص الرحلة" : "Trip summary"}
        </h2>
        <Link
          href="/flight-booking"
          className="flex min-h-11 items-center gap-2 text-sm text-gray-500 underline"
        >
          <FiEdit2 />
          {lang === "ar" ? "تعديل الرحلة" : "Edit trip"}
        </Link>
      </div>
      <div className="rounded-xl border border-slate-200 px-3.5 pt-6 pb-3.5">
        <div className="mb-4 border-b border-slate-100 pb-4 text-sm text-slate-500">
          <span>
            {lang === "ar" ? "المسافرون" : "Passengers"}
            <strong className="ms-1 font-[family-name:var(--font-inter)] text-base text-primary">4</strong>
          </span>
          <p className="mt-1.5 text-xs">
            {lang === "ar"
              ? "(2 بالغ)  (1 طفل)  (1 رضيع)"
              : "(2 adults)  (1 child)  (1 infant)"}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-1 py-2 text-center text-sm font-semibold">
          {lang === "ar" ? "القاهرة" : "Cairo"}
          <span className="mx-2 text-xl leading-none text-primary">
            {dir === "rtl" ? "←" : "→"}
          </span>
          {lang === "ar" ? "الكويت" : "Kuwait"}
          <span className="mx-2 text-xl leading-none text-primary">
            {dir === "rtl" ? "←" : "→"}
          </span>
          {lang === "ar" ? "القاهرة" : "Cairo"}
        </div>
        <div className="mt-2 flex flex-wrap justify-around gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-1.5 py-2.5 text-xs text-slate-500">
          <span>
            {lang === "ar" ? "الذهاب:" : "Departure:"}
            <b className="font-medium text-primary">
              {lang === "ar" ? "23 سبتمبر 2026" : "23 September 2026"}
            </b>
          </span>
          <span>
            {lang === "ar" ? "العودة:" : "Return:"}
            <b className="font-medium text-primary">
              {lang === "ar" ? "24 سبتمبر 2026" : "24 September 2026"}
            </b>
          </span>
        </div>
        {/* ==================== Flight Details ==================== */}
        <FlightSummary />
        <FlightSummary returning />
        <div className="grid grid-cols-2 gap-3 py-2 text-xs font-semibold text-[#4757B8]">
          <button
            type="button"
            onClick={onCancellationPolicy}
            aria-haspopup="dialog"
            className="min-h-8 rounded underline underline-offset-2 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {lang === "ar" ? "سياسة الإلغاء" : "Cancellation policy"}
          </button>
          <button
            type="button"
            onClick={onBookingDetails}
            aria-haspopup="dialog"
            className="min-h-8 rounded underline underline-offset-2 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {lang === "ar" ? "عرض التفاصيل" : "View details"}
          </button>
        </div>
        {/* ==================== Fare + Taxes + Total ==================== */}
        <section aria-label={lang === "ar" ? "تفاصيل سعر التذكرة" : "Ticket price details"} className="mt-2 rounded-xl bg-[#dcdde5] p-3 text-sm text-slate-500 shadow-[0_16px_24px_-14px_rgba(0,0,0,0.45)]">
          <h3 className="mb-1 rounded-lg bg-primary px-3 py-3 text-center text-base font-semibold text-white">
            {lang === "ar" ? "تفاصيل سعر التذكرة" : "Ticket price details"}
          </h3>
          <details className="group/fare">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-1">
                {lang === "ar" ? "تكلفة التذاكر (الفير)" : "Ticket fare"}
                <FiChevronDown aria-hidden="true" className="shrink-0 transition-transform group-open/fare:rotate-180" />
              </span>
              <b
                dir="ltr"
                className="shrink-0 whitespace-nowrap font-[family-name:var(--font-inter)] text-sm font-normal text-primary"
              >{pricing.fare.toFixed(2)} KWD</b>
            </summary>
            <p className="pt-2.5 text-xs leading-loose text-slate-500">
              {lang === "ar" ? "بالغان: 300.00 KWD" : "2 adults: 300.00 KWD"}
              <br />
              {lang === "ar" ? "طفل: 80.00 KWD" : "Child: 80.00 KWD"}
              <br />
              {lang === "ar" ? "رضيع: 20.00 KWD" : "Infant: 20.00 KWD"}
            </p>
          </details>
          <details className="group/taxes">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden text-slate-500">
              <span className="flex items-center gap-1">
                {lang === "ar" ? "الضرائب والرسوم" : "Taxes and fees"}
                <FiChevronDown aria-hidden="true" className="shrink-0 transition-transform group-open/taxes:rotate-180" />
              </span>
              <b
                dir="ltr"
                className="shrink-0 whitespace-nowrap font-[family-name:var(--font-inter)] text-sm font-normal text-primary"
              >{pricing.taxes.toFixed(2)} KWD</b>
            </summary>
            <p className="pt-2.5 text-xs leading-loose text-slate-500">
              {lang === "ar"
                ? "إجمالي الضرائب ورسوم المطارات لجميع المسافرين."
                : "Total taxes and airport fees for all passengers."}
            </p>
          </details>
          <details className="group/services">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-1">
                {lang === "ar" ? "مصاريف خدمة" : "Service charges"}
                <FiChevronDown aria-hidden="true" className="shrink-0 transition-transform group-open/services:rotate-180" />
              </span>
              <bdi className="shrink-0 whitespace-nowrap font-[family-name:var(--font-inter)] text-primary">{pricing.extras.toFixed(2)} KWD</bdi>
            </summary>
            <dl className="space-y-2 py-2 text-xs">
              {[
                { label: lang === "ar" ? "الأمتعة الإضافية" : "Extra baggage", amount: pricing.baggage },
                { label: lang === "ar" ? "اختيار المقاعد" : "Seat selection", amount: pricing.seats },
                { label: lang === "ar" ? "الوجبات" : "Meals", amount: pricing.meals },
              ].map(({ label, amount }) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <dt>{label}</dt>
                  <dd className="shrink-0 whitespace-nowrap"><bdi>{amount.toFixed(2)} KWD</bdi></dd>
                </div>
              ))}
            </dl>
          </details>
          <div className="flex min-h-11 flex-wrap items-center justify-between gap-2">
            <span className="flex flex-wrap items-center gap-2">
              {lang === "ar" ? "كود الخصم" : "Discount code"}
              <bdi className="rounded-lg bg-slate-500 px-2.5 py-1 text-xs font-bold text-white">{promoCode || pricing.discount.toFixed(2)}</bdi>
            </span>
            <bdi className="shrink-0 whitespace-nowrap font-[family-name:var(--font-inter)] text-primary">{pricing.discount > 0 ? "−" : ""}{pricing.discount.toFixed(2)} KWD</bdi>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t-2 border-primary pt-2.5 text-base text-primary">
            <strong>
              {lang === "ar" ? "الإجمالي النهائي" : "Total price"}
            </strong>
            <strong
              dir="ltr"
              className="font-[family-name:var(--font-inter)]"
            >{pricing.total.toFixed(2)} KWD</strong>
          </div>
        </section>
      </div>
    </aside>
  );
}
