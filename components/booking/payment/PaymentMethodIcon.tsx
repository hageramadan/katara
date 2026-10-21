"use client";
import { FaApplePay, FaBuildingColumns, FaCcMastercard, FaCcVisa, FaCreditCard, FaWallet } from "react-icons/fa6";
import type { BookingPaymentMethod } from "@/lib/booking/types";

type PaymentMethodIconProps = {
  method: BookingPaymentMethod;
};

export default function PaymentMethodIcon({ method }: PaymentMethodIconProps) {
  const icons = {
    knet: FaBuildingColumns,
    visa: FaCcVisa,
    mastercard: FaCcMastercard,
    applepay: FaApplePay,
    mada: FaCreditCard,
    wallet: FaWallet,
  };
  const colors = {
    knet: "text-teal-500",
    visa: "text-primary",
    mastercard: "text-red-500",
    applepay: "text-neutral-950",
    mada: "text-blue-600",
    wallet: "text-amber-500",
  };
  const Icon = icons[method];

  return <Icon
    aria-hidden="true"
    className={`shrink-0 text-xl ${colors[method]}`}
  />;
}
