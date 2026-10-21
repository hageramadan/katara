"use client";
import { useApp } from "@/context/AppContext";

type ServiceFooterProps = {
  total: number;
  extrasTotal: number;
  onNext: () => void;
};

export default function ServiceFooter({
  total,
  extrasTotal,
  onNext
}: ServiceFooterProps) {
  const { lang } = useApp();

  return (
    <>
      {/* ==================== Price Summary and Next Flight ==================== */}
      <footer className="sticky bottom-0 z-40 border-t border-slate-200 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-sm sm:pt-4 sm:pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="container mx-auto flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="grid min-w-0 grid-cols-[1fr_auto] items-center gap-x-3 sm:block" aria-live="polite">
            <p className="text-xs text-slate-500">
              {lang === "ar" ? "إجمالي الحجز" : "Booking total"}
            </p>
            <p className="col-start-2 row-span-2 row-start-1 text-lg font-bold whitespace-nowrap sm:mt-1 sm:text-xl">
              <bdi>{total.toFixed(2)} KWD</bdi>
            </p>
            <p className="col-start-1 row-start-2 mt-1 text-xs text-slate-400">{lang === "ar" ? "الخدمات الإضافية" : "Extra services"}: <bdi>{extrasTotal.toFixed(2)} KWD</bdi></p>
          </div>
          <button
            type="button"
            onClick={onNext}
            className="min-h-12 w-full shrink-0 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--color-primary-600)] sm:w-auto sm:px-8"
          >
            {lang === "ar" ? "الرحلة التالية" : "Next flight"}
          </button>
        </div>
      </footer>
    </>
  );
}
