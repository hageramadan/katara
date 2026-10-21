"use client";
import { useApp } from "@/context/AppContext";
import { FaWheelchair } from "react-icons/fa6";

type WheelchairServiceProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function WheelchairService({ checked, onChange }: WheelchairServiceProps) {
  const { lang } = useApp();

  return (
    <>
      {/* ==================== Wheelchair Assistance ==================== */}
      <div className="mt-8 flex items-center justify-between gap-5 rounded-lg px-1 py-4">
        <p className="flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold">
          <FaWheelchair aria-hidden="true" className="shrink-0" />
          {lang === "ar"
            ? "إضافة كرسي متحرك للمسافر المحدد"
            : "Add wheelchair assistance for the selected passenger"}
         
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={lang === "ar"
            ? "إضافة كرسي متحرك للمسافر المحدد"
            : "Add wheelchair assistance for the selected passenger"}
          onClick={() => onChange(!checked)}
          className={`relative flex h-6 w-12 shrink-0 items-center rounded-full p-0.5 transition before:absolute before:-inset-y-2.5 before:inset-x-0 ${checked ? "justify-end bg-green-500" : "justify-start bg-slate-300"}`}
        >
          <span className="size-5 rounded-full bg-white shadow-sm" />
        </button>
      </div>
    </>
  );
}
