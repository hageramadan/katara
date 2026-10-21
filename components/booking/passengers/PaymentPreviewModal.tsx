"use client";
import { FiX } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

type PaymentPreviewModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function PaymentPreviewModal({ open, onClose }: PaymentPreviewModalProps) {
  const { lang } = useApp();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[var(--color-primary)]/40 p-6"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-heading"
        className="relative max-w-[460px] rounded-2xl bg-white px-7 py-9 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose();
        }}
      >
        {/* ==================== Header: Title + Close ==================== */}
        <button
          type="button"
          autoFocus
          aria-label={lang === "ar" ? "إغلاق" : "Close"}
          className="absolute top-3.5 end-3.5 bg-transparent text-primary"
          onClick={onClose}
        >
          <FiX />
        </button>
        <h2
          id="preview-heading"
          className="mb-4 text-xl font-bold"
        >
          {lang === "ar" ? "متابعة إلى الدفع" : "Continue to payment"}
        </h2>
        {/* ==================== Preview Message ==================== */}
        <p className="mb-6 text-base leading-loose text-slate-500">
          {lang === "ar"
            ? "هذه صفحة مستقلة لمعاينة التصميم ببيانات تجريبية. هذه الخطوة تحتاج إلى الربط بنظام الحجز."
            : "This is a standalone design preview with sample data. This step needs to be connected to the booking system."}
        </p>
        <button
          type="button"
          className="w-full rounded-[7px] border-2 border-primary bg-primary px-6 py-3.5 text-base leading-relaxed font-bold text-white transition-colors hover:bg-[var(--color-primary-600)] sm:w-auto"
          onClick={onClose}
        >
          {lang === "ar"
            ? "العودة لبيانات المسافرين"
            : "Back to passenger details"}
        </button>
      </section>
    </div>
  );
}
