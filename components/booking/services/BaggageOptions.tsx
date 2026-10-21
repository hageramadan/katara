"use client";
import { useApp } from "@/context/AppContext";
import { FaSuitcaseRolling } from "react-icons/fa6";
import { baggageOptions } from "@/lib/booking/services";

type BaggageOptionsProps = {
  value: number;
  selectionKey: string;
  onChange: (weight: number) => void;
};

export default function BaggageOptions({ value, selectionKey, onChange }: BaggageOptionsProps) {
  const { lang } = useApp();

  return (
    <>
      {/* ==================== Baggage Allowance and Upgrades ==================== */}
      <div className="px-4 pt-7 pb-6 sm:px-6 lg:px-8">
        <h2 className="text-base font-bold text-neutral-800">
          {lang === "ar" ? "إضافة وترقية الأمتعة" : "Add and upgrade baggage"}
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
          {lang === "ar"
            ? "اختر وزناً إضافياً يناسب رحلتك، لتصل الحمولة الإجمالية إلى 50 كجم. تطبق الرسوم على المسافر والرحلة المحددين."
            : "Choose extra baggage to bring your total allowance up to 50 kg. Fees apply to the selected passenger and flight."}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-50 px-4 py-5 text-sm font-semibold text-neutral-700 sm:mt-7">
          <span>
            {lang === "ar"
              ? "الحمولة المجانية المسموح بها"
              : "Included cabin baggage"}
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <FaSuitcaseRolling aria-hidden="true" />
            {lang === "ar" ? "حقيبة 7 كجم" : "7 kg bag"}
          </span>
        </div>
        <p className="mt-7 text-sm font-semibold text-neutral-800">
          {lang === "ar"
            ? "قم بالترقية إلى وزن يصل إلى 50 كجم:"
            : "Upgrade your baggage allowance to up to 50 kg:"}
        </p>
        <div
          className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-5"
          role="radiogroup"
          aria-label={lang === "ar" ? "إضافة وترقية الأمتعة" : "Add and upgrade baggage"}
        >
          {baggageOptions.map((option) => {
            const selected = value === option.weight;
            return (
              <label
                key={option.weight}
                className={`grid min-h-20 cursor-pointer grid-cols-[1fr_auto_auto] items-center gap-x-4 gap-y-1 rounded-lg border px-4 py-3 transition sm:flex sm:flex-col sm:gap-3 sm:px-2 sm:py-6 ${selected ? "border-primary bg-secondary-soft ring-1 ring-[var(--color-primary)]" : "border-slate-200 hover:border-[var(--color-primary-200)]"}`}
              >
                <span className="text-sm font-bold text-neutral-900 sm:text-base">
                  <bdi>+{option.weight}</bdi>
                  {lang === "ar" ? "كجم" : "kg"}
                </span>
                <FaSuitcaseRolling
                  aria-hidden="true"
                  className="col-start-2 row-span-2 row-start-1 text-3xl text-cyan-400 sm:my-1 sm:text-6xl"
                />
                <input
                  type="radio"
                  name={`baggage-${selectionKey}`}
                  value={option.weight}
                  checked={selected}
                  onChange={() => onChange(option.weight)}
                  className="col-start-3 row-span-2 row-start-1 size-5 accent-[var(--color-primary)]"
                />
                <bdi className="text-sm font-bold text-neutral-900 sm:text-base">{option.price} KWD</bdi>
              </label>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => onChange(0)}
          className="mt-3 min-h-11 text-sm underline underline-offset-4"
        >
          {lang === "ar" ? "بدون أمتعة إضافية" : "No extra baggage"}
        </button>
      </div>
    </>
  );
}
