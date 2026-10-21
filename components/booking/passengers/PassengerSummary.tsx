"use client";
import Link from "next/link";
import { FiChevronDown, FiEdit2 } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import FlightSummary from "./FlightSummary";

type PassengerSummaryProps = {
  onBookingDetails: () => void;
  onCancellationPolicy: () => void;
};

export default function PassengerSummary({ onBookingDetails, onCancellationPolicy }: PassengerSummaryProps) {
  const { lang, dir } = useApp();
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
        <button
          type="button"
          onClick={onBookingDetails}
          aria-haspopup="dialog"
          className="mt-4 flex w-full items-center justify-between gap-3 rounded-lg bg-primary-50 px-3 py-2.5 text-sm font-semibold text-primary transition hover:bg-[var(--color-primary-100)]"
        >
          {lang === "ar" ? "تفاصيل الحجز" : "Booking details"}
          <FiChevronDown aria-hidden="true" />
        </button>
        {/* ==================== Flight Details ==================== */}
        <FlightSummary />
        <FlightSummary returning />
        <button
          type="button"
          onClick={onCancellationPolicy}
          aria-haspopup="dialog"
          className="mt-4 flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-primary underline underline-offset-4 transition hover:bg-[var(--color-primary-50)]"
        >
          {lang === "ar" ? "سياسة الإلغاء" : "Cancellation policy"}
          <FiChevronDown aria-hidden="true" />
        </button>
        {/* ==================== Fare + Taxes + Total ==================== */}
        <div className="mt-3.5 border-t border-slate-100 pt-3.5 text-sm">
          <details className="mb-2.75">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-1">
                {lang === "ar" ? "سعر التذكرة" : "Ticket fare"}
                <FiChevronDown />
              </span>
              <b
                dir="ltr"
                className="shrink-0 whitespace-nowrap font-[family-name:var(--font-inter)] text-sm font-normal text-primary"
              >400.00 KWD</b>
            </summary>
            <p className="pt-2.5 text-xs leading-loose text-slate-500">
              {lang === "ar" ? "بالغان: 300.00 KWD" : "2 adults: 300.00 KWD"}
              <br />
              {lang === "ar" ? "طفل: 80.00 KWD" : "Child: 80.00 KWD"}
              <br />
              {lang === "ar" ? "رضيع: 20.00 KWD" : "Infant: 20.00 KWD"}
            </p>
          </details>
          <details className="mb-2.75">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden text-slate-500">
              <span className="flex items-center gap-1">
                {lang === "ar" ? "الضرائب والرسوم" : "Taxes and fees"}
                <FiChevronDown />
              </span>
              <b
                dir="ltr"
                className="shrink-0 whitespace-nowrap font-[family-name:var(--font-inter)] text-sm font-normal text-primary"
              >100.00 KWD</b>
            </summary>
            <p className="pt-2.5 text-xs leading-loose text-slate-500">
              {lang === "ar"
                ? "إجمالي الضرائب ورسوم المطارات لجميع المسافرين."
                : "Total taxes and airport fees for all passengers."}
            </p>
          </details>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-primary pt-2.5 text-base text-primary">
            <strong>
              {lang === "ar" ? "الإجمالي النهائي" : "Total price"}
            </strong>
            <strong
              dir="ltr"
              className="font-[family-name:var(--font-inter)]"
            >500.00 KWD</strong>
          </div>
        </div>
      </div>
    </aside>
  );
}
