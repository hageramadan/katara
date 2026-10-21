"use client";
import type { ReactNode } from "react";
import { FiChevronDown } from "react-icons/fi";

type PaymentAccordionProps = {
  title: string;
  children: ReactNode;
};

export default function PaymentAccordion({ title, children }: PaymentAccordionProps) {
  return (
    <details
      open
      className="group overflow-hidden rounded-xl border border-[var(--color-primary-300)] bg-white"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-[var(--color-primary-400)] px-4 py-3 text-sm font-bold text-white sm:text-base [&::-webkit-details-marker]:hidden">
        <h2>
          {title}
        </h2>
        <FiChevronDown
          aria-hidden="true"
          className="shrink-0 transition group-open:rotate-180"
        />
      </summary>
      <div className="min-w-0 p-2 sm:p-3">
        {children}
      </div>
    </details>
  );
}
