"use client";
import { useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import { FaBellConcierge } from "react-icons/fa6";
import { useApp } from "@/context/AppContext";
import { useBookingFlow } from "@/context/BookingFlowContext";
import type { BookingPricing } from "@/lib/booking/types";
import InputField from "@/components/auth/common/InputField";
import PaymentAccordion from "./PaymentAccordion";

type PaymentPriceDetailsProps = {
  pricing: BookingPricing;
};

export default function PaymentPriceDetails({ pricing }: PaymentPriceDetailsProps) {
  const { lang } = useApp();
  const { promoCode, updatePromoCode } = useBookingFlow();
  const [code, setCode] = useState(promoCode);
  const [invalidCode, setInvalidCode] = useState(false);

  function applyCode() {
    if (code.trim().toUpperCase() !== "SAVE20") {
      setInvalidCode(true);
      return;
    }

    updatePromoCode(code);
    setInvalidCode(false);
  }

  return (
    <PaymentAccordion title={lang === "ar" ? "تفاصيل السعر" : "Price details"}>
      <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500 sm:p-4 [&_dt]:min-w-0 [&_dt]:leading-relaxed [&_dd]:shrink-0 [&_dd]:whitespace-nowrap">
        {/* ==================== Fare + Taxes ==================== */}
        <dl className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <dt>
              {lang === "ar" ? "السعر (FARE)" : "Fare"}
            </dt>
            <dd className="text-primary">
              <bdi>{pricing.fare.toFixed(2)} KWD</bdi>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt>
              {lang === "ar" ? "الضريبة (Taxes)" : "Taxes"}
            </dt>
            <dd className="text-primary">
              <bdi>{pricing.taxes.toFixed(2)} KWD</bdi>
            </dd>
          </div>
        </dl>
        {/* ==================== Extra Services ==================== */}
        <details
          open
          className="group/extras mt-4 rounded-lg bg-slate-100 p-3 sm:p-4"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-primary [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2">
              <FaBellConcierge aria-hidden="true" />
              {lang === "ar" ? "الخدمات الإضافية" : "Extra services"}
            </span>
            <FiChevronDown
              aria-hidden="true"
              className="transition group-open/extras:rotate-180"
            />
          </summary>
          <dl className="mt-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <dt>
                {lang === "ar" ? "إضافة أمتعة (وزن + سعر)" : "Extra baggage"}
              </dt>
              <dd className="text-primary">
                <bdi>{pricing.baggage.toFixed(2)} KWD</bdi>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt>
                {lang === "ar" ? "تغيير مقعدك (رقم المقعد)" : "Seat selection"}
              </dt>
              <dd className="text-primary">
                <bdi>{pricing.seats.toFixed(2)} KWD</bdi>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
              <dt>
                {lang === "ar" ? "إجمالي الخدمات" : "Services total"}
              </dt>
              <dd className="text-primary">
                <bdi>{pricing.extras.toFixed(2)} KWD</bdi>
              </dd>
            </div>
          </dl>
        </details>
        {/* ==================== Discount Code ==================== */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <span>
            {lang === "ar" ? "الإجمالي" : "Subtotal"}
          </span>
          <bdi className="shrink-0 whitespace-nowrap text-primary">{pricing.subtotal.toFixed(2)} KWD</bdi>
        </div>
        {promoCode ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-slate-200 pt-4">
            <span className="flex flex-wrap items-center gap-3">
              {lang === "ar" ? "كود الخصم" : "Discount code"}
              <span className="rounded bg-green-400 px-3 py-1 text-neutral-950">
                <bdi>
                  {promoCode}
                </bdi>
              </span>
              <button
                type="button"
                className="grid min-h-11 min-w-11 place-items-center"
                aria-label={lang === "ar" ? "إزالة كود الخصم" : "Remove discount code"}
                onClick={() => { updatePromoCode(""); setCode(""); }}
              >
                <FiX />
              </button>
            </span>
            <bdi className="text-green-600">-{pricing.discount.toFixed(2)} KWD</bdi>
          </div>
        ) : (
          <div className="mt-4 border-t border-dashed border-slate-200 pt-4">
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-end">
              <InputField
                className="min-w-0 flex-1 [&_input]:text-base [&_input]:uppercase sm:[&_input]:text-sm"
                label={lang === "ar" ? "كود الخصم" : "Discount code"}
                placeholder="SAVE20"
                value={code}
                onChange={(value) => { setCode(value); setInvalidCode(false); }}
              />
              <button
                type="button"
                disabled={!code.trim()}
                onClick={applyCode}
                className="min-h-12 shrink-0 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {lang === "ar" ? "تطبيق" : "Apply"}
              </button>
            </div>
            {invalidCode && (
              <p
                role="alert"
                className="mt-2 text-xs text-red-600"
              >
                {lang === "ar" ? "كود الخصم غير صالح. جربي SAVE20 في المعاينة." : "Invalid discount code. Try SAVE20 in the preview."}
              </p>
            )}
          </div>
        )}

        {/* ==================== Net Total ==================== */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t-2 border-primary pt-3 text-sm font-bold">
          <span>
            {lang === "ar" ? "الصافي" : "Net total"}
          </span>
          <bdi className="shrink-0 whitespace-nowrap text-primary">{pricing.total.toFixed(2)} KWD</bdi>
        </div>
      </div>
    </PaymentAccordion>
  );
}
