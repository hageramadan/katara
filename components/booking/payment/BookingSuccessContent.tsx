"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { useBookingFlow } from "@/context/BookingFlowContext";

export default function BookingSuccessContent() {
  const { lang, dir } = useApp();
  const { previewComplete } = useBookingFlow();
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = `${lang === "ar" ? "تأكيد الحجز" : "Booking confirmation"} | Katra Go`;
  }, [lang]);

  async function shareApp() {
    const url = window.location.origin;

    try {
      if (navigator.share) {
        await navigator.share({ title: "Katra Go", url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setMessage(lang === "ar" ? "تم نسخ رابط التطبيق." : "App link copied.");
      } else {
        setMessage(url);
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setMessage(lang === "ar" ? "تعذّرت المشاركة. يمكنك نسخ رابط الموقع من المتصفح." : "Sharing is unavailable. You can copy the site address from your browser.");
    }
  }

  return (
    <main
      dir={dir}
      className="flex min-h-[70vh] items-center justify-center bg-slate-50/30 px-4 py-16 text-center"
    >
      <div className="mx-auto w-full max-w-2xl">
        {!previewComplete ? (
          <>
            <h1 className="text-xl font-bold text-neutral-900">
              {lang === "ar" ? "راجعي الحجز قبل تجربة الدفع" : "Review your booking before previewing payment"}
            </h1>
            <Link
              href="/booking-payment"
              className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 text-sm text-white"
            >
              {lang === "ar" ? "العودة للدفع" : "Back to payment"}
            </Link>
          </>
        ) : (
          <>
            {/* ==================== Confirmation Preview ==================== */}
           
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-green-600 text-white">
              <FiCheck
                aria-hidden="true"
                className="text-5xl stroke-4"
              />
            </div>
            <h1 className="mt-12 text-2xl leading-relaxed font-bold text-neutral-950 sm:text-3xl">
              {lang === "ar" ? "لقد قمت بحجز رحلتك بنجاح" : "Your trip has been booked successfully"}
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-loose text-slate-400">
              {lang === "ar" ? "تم إرسال تذكرة الطيران  علي الإيميل الخاص بك و رقم الجوال" : "The flight ticket has been sent to your email address and mobile number."}
            </p>
            {/* ==================== Share App ==================== */}
            <button
              type="button"
              onClick={shareApp}
              className="mt-10 w-full max-w-sm rounded-lg bg-primary px-6 py-3 text-base font-bold text-white transition hover:bg-[var(--color-primary-600)]"
            >
              {lang === "ar" ? "شير التطبيق واربح نقاط" : "Share the app and earn points"}
            </button>
          
            <p
              role="status"
              className="mt-4 text-sm text-primary"
            >
              {message}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
