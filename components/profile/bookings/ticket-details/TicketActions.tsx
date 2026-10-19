"use client";

import { useApp } from "@/context/AppContext";
import { FaWhatsapp } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";

export default function TicketActions() {
  const { lang } = useApp();
  return (
    <div dir="ltr" className="flex items-center justify-start gap-3">
      <button type="button" aria-label={lang === "ar" ? "مشاركة التذكرة" : "Share ticket"} className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#0D154B] bg-[#0D154B] text-lg text-white shadow-sm">
        <FiShare2 aria-hidden="true" />
      </button>
      <button type="button" aria-label={lang === "ar" ? "تواصل عبر واتساب" : "Contact on WhatsApp"} className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366] text-xl text-white shadow-sm">
        <FaWhatsapp aria-hidden="true" />
      </button>
    </div>
  );
}
