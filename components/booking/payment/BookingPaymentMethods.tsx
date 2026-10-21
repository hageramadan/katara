"use client";
import { FaCreditCard } from "react-icons/fa6";
import { useApp } from "@/context/AppContext";
import { bookingPaymentMethods } from "@/lib/booking/payment";
import type { BookingPaymentMethod } from "@/lib/booking/types";
import PaymentMethodIcon from "./PaymentMethodIcon";
import CustomSelect from "@/components/ui/CustomSelect";

type BookingPaymentMethodsProps = {
  value: BookingPaymentMethod;
  onChange: (method: BookingPaymentMethod) => void;
};

export default function BookingPaymentMethods({ value, onChange }: BookingPaymentMethodsProps) {
  const { lang } = useApp();
  const selected = bookingPaymentMethods.find((method) => method.id === value)!;

  return (
    <div>
      {/* ==================== Header: Payment + Other Methods ==================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 shadow-sm">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <FaCreditCard
            aria-hidden="true"
            className="text-teal-500"
          />
          {lang === "ar" ? "الدفع" : "Payment"}
        </h2>
        <CustomSelect
          value={value}
          ariaLabel={lang === "ar" ? "وسيلة دفع أخرى" : "Other payment methods"}
          placeholder={lang === "ar" ? "وسيلة دفع أخرى" : "Other payment methods"}
          onChange={(selectedValue) => {
            const method = bookingPaymentMethods.find((item) => item.id === selectedValue);
            if (method) onChange(method.id);
          }}
          options={bookingPaymentMethods.map((method) => ({
            value: method.id,
            label: lang === "ar" ? method.labelAr : method.labelEn,
          }))}
          width="w-full sm:w-64"
          className="min-w-0 [&_button]:min-h-11 [&_button]:text-sm"
        />
      </div>
      {/* ==================== Payment Methods ==================== */}
      <div
        role="radiogroup"
        aria-label={lang === "ar" ? "اختيار وسيلة الدفع" : "Select payment method"}
        className="my-5 grid grid-cols-2 gap-2 sm:my-6 sm:flex sm:flex-wrap"
      >
        {bookingPaymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex min-h-12 min-w-0 cursor-pointer items-center justify-center gap-2 rounded-full border px-2 sm:px-4 py-3 text-xs transition focus-within:ring-2 focus-within:ring-[var(--color-primary-200)] ${value === method.id ? "border-teal-500 bg-secondary-soft text-primary shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
          >
            <input
              type="radio"
              name="booking-payment-method"
              value={method.id}
              checked={value === method.id}
              onChange={() => onChange(method.id)}
              className="sr-only"
            />
            <PaymentMethodIcon method={method.id} />
            {lang === "ar" ? method.labelAr : method.labelEn}
          </label>
        ))}
      </div>
      {/* ==================== Selected Payment Method ==================== */}
      <div
        className="flex min-w-0 items-center justify-between gap-3 rounded-lg bg-slate-50 px-4 py-3"
        aria-live="polite"
      >
        <div className="min-w-0 break-words">
          <h3 className="text-sm font-bold">
            {lang === "ar" ? "الدفع باستخدام" : "Pay with"}{" "}
            {lang === "ar" ? selected.labelAr : selected.labelEn}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            {lang === "ar" ? "اختر وسيلة الدفع المناسبة" : "Choose your preferred payment method"}
          </p>
        </div>
        {value === "knet" ? <span className="shrink-0 rounded bg-slate-800 px-5 py-1.5 text-sm font-bold text-white">KIB</span> : <PaymentMethodIcon method={value} />}
      </div>
    </div>
  );
}
