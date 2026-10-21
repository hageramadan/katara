"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useBookingFlow } from "@/context/BookingFlowContext";
import { bookingPaymentMethods, calculateBookingPricing } from "@/lib/booking/payment";
import type { BookingPaymentMethod } from "@/lib/booking/types";
import BookingSteps from "../BookingSteps";
import PaymentTravelers from "./PaymentTravelers";
import PaymentFlights from "./PaymentFlights";
import PaymentPriceDetails from "./PaymentPriceDetails";
import BookingPaymentMethods from "./BookingPaymentMethods";

export default function BookingPaymentContent() {
  const { lang, dir } = useApp();
  const router = useRouter();
  const { services, promoCode, completePreview } = useBookingFlow();
  const [method, setMethod] = useState<BookingPaymentMethod>("knet");
  const selected = bookingPaymentMethods.find((item) => item.id === method)!;

  // ✅ توحيد حساب السعر في تفاصيل الحجز وموجز المدفوعات
  const pricing = useMemo(() => {
    return calculateBookingPricing(services, promoCode);
  }, [services, promoCode]);

  useEffect(() => {
    document.title = `${lang === "ar" ? "مراجعة الحجز والدفع" : "Booking review and payment"} | Katra Go`;
  }, [lang]);

  function previewPayment() {
    completePreview();
    router.push("/booking-success");
  }

  return (
    <main
      dir={dir}
      className="min-w-0 px-3 pt-5 pb-8 text-primary sm:px-4 sm:pt-7 sm:pb-12"
    >
      <div className="mx-auto container">
        <BookingSteps current={3} />
        {/* ==================== Booking Review ==================== */}
        <div className="mx-auto max-w-7xl space-y-3">
          <h1 className="sr-only">
            {lang === "ar" ? "مراجعة الحجز والدفع" : "Booking review and payment"}
          </h1>
          <PaymentTravelers />
          <PaymentFlights />
          <PaymentPriceDetails pricing={pricing} />
        </div>
        {/* ==================== Payment Methods and Summary ==================== */}
        <section
          className="mx-auto mt-5 max-w-7xl rounded-xl border border-slate-100 min-w-0 bg-white p-3 sm:p-5"
          aria-label={lang === "ar" ? "الدفع" : "Payment"}
        >
          <BookingPaymentMethods
            value={method}
            onChange={setMethod}
          />
          <div className="mt-4 rounded-xl border border-slate-200 p-3 text-sm sm:p-4">
            <h2 className="mb-4 text-sm font-bold">
              {lang === "ar" ? "موجز المدفوعات" : "Payment summary"}
            </h2>
            <dl className="space-y-3 text-slate-400">
              <div className="flex items-center justify-between gap-3">
                <dt>
                  {lang === "ar" ? "إجمالي الحجز" : "Booking subtotal"}
                </dt>
                <dd className="shrink-0 whitespace-nowrap">
                  <bdi>{pricing.subtotal.toFixed(2)} KWD</bdi>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 text-teal-500">
                <dt>
                  {lang === "ar" ? "خصم الكود" : "Code discount"}
                </dt>
                <dd className="shrink-0 whitespace-nowrap">
                  <bdi>-{pricing.discount.toFixed(2)} KWD</bdi>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-3 text-sm font-bold text-primary">
                <dt>
                  {lang === "ar" ? "المبلغ المستحق" : "Amount due"}
                </dt>
                <dd className="shrink-0 whitespace-nowrap">
                  <bdi>{pricing.total.toFixed(2)} KWD</bdi>
                </dd>
              </div>
            </dl>
          </div>
          <p className="my-4 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-500">
            {lang === "ar"
              ? "وضع المعاينة: لن يتم خصم أي مبلغ أو إصدار تذكرة."
              : "Preview mode: no payment will be taken and no ticket will be issued."}
          </p>
          <button
            type="button"
            onClick={previewPayment}
            className="w-full rounded-lg bg-primary px-5 py-3.5 text-sm text-white transition hover:bg-[var(--color-primary-600)]"
          >
            {lang === "ar" ? "ادفع باستخدام" : "Pay with"}{" "}
            {lang === "ar" ? selected.labelAr : selected.labelEn}
            {lang === "ar" ? " (معاينة)" : " (preview)"}
          </button>
        </section>
      </div>
    </main>
  );
}
