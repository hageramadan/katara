"use client";

import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

type BookingStepsProps = {
  current?: number;
};

export default function BookingSteps({ current = 1 }: BookingStepsProps) {
  const { lang } = useApp();
  const steps = [
    { label: (lang === "ar" ? "البحث" : "Search"), href: "/flight-booking" },
    { label: (lang === "ar" ? "معلومات المسافرين" : "Passenger information"), href: "/passenger-details" },
    { label: (lang === "ar" ? "خدمات إضافية" : "Extra services"), href: "/additional-services" },
    { label: (lang === "ar" ? "الدفع" : "Payment"), href: "/booking-payment" },
  ];

  return (
    <nav
      aria-label={lang === "ar" ? "مراحل الحجز" : "Booking steps"}
      className="mb-7 grid grid-cols-4 items-start gap-1 sm:mb-10 md:mx-3 md:flex md:items-center md:gap-0 xl:mx-10"
    >
      {steps.map((step, index) => (
        <div
          key={index}
          className="relative flex min-w-0 flex-1 justify-center md:items-center md:justify-start md:last:flex-none"
        >
          <div
            aria-current={current === index ? "step" : undefined}
            className={`relative z-10 flex min-w-0 flex-col-reverse items-center gap-1 text-center text-xs font-semibold md:flex-row md:gap-2 lg:text-sm xl:text-base ${index <= current ? "text-primary" : "text-slate-400"}`}
          >
            {step.href
              ? (
                <Link
                  href={step.href}
                  className="flex min-h-11 items-center justify-center rounded px-1 leading-relaxed hover:underline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]"
                >
                  {step.label}
                </Link>
              )
              : <span>
                {step.label}
              </span>}

            <span className={`grid size-6 shrink-0 place-items-center rounded-full border text-xs ${index < current || index < 2 ? "border-primary bg-primary text-white" : "border-current"}`}>
              {index < current || index < 2
                ? (
                  <FiCheck
                    aria-hidden="true"
                    className="stroke-3"
                  />
                )
                : `0${index + 1}`}
            </span>
          </div>
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={`absolute start-[calc(50%+1rem)] top-3 h-0.5 w-[calc(100%-1.75rem)] rounded-full md:static md:mx-3 md:w-auto md:min-w-2 md:flex-1 ${index < current ? "bg-primary" : "bg-slate-200"}`}
            />
          )}
        </div>
      ))}
    </nav>
  );
}
