"use client";
import Image from "next/image";
import { FiCheck } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

export type PaymentMethod = "amex" | "visa";

type PaymentMethodSelectorProps = {
  value: PaymentMethod;
  onChange: (v: PaymentMethod) => void;
};

const methods: {
  value: PaymentMethod;
  ar: string;
  en: string;
  image: string;
}[] = [
  {
    value: "amex",
    ar: "أميركان إكسبريس",
    en: "American Express",
    image: "/images/payments/amex.png",
  },
  {
    value: "visa",
    ar: "ماستر كارد / فيزا",
    en: "MasterCard / Visa",
    image: "/images/payments/visa-master.png",
  },
];

export default function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  const { lang } = useApp();

  return (
    <div>
        <h1 className="text-base md:text-lg text-[#0D0D0D] font-bold mb-2 lg:mb-3">{lang==='ar' ? 'الدفع عن طريق بطاقة الإئتمان' : 'Payment by credit card'}</h1>
      <label className="block text-sm md:text-base font-medium text-[#A4A4A4] mb-2 lg:mb-5">
        {lang === "ar" ? "إختر وسيلة الدفع الآتية." : "Choose a payment method."}
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {methods.map((m) => {
          const active = m.value === value;
          return (
            <button
              key={m.value}
              type="button"
              onClick={() => onChange(m.value)}
              className={`
                flex items-center justify-between gap-3
                p-3 md:p-4 rounded-xl border-2
                transition-all
                ${
                  active
                    ? "border-[#187AA7] bg-[#187AA7]/5"
                    : "border-[#DCE3EC] bg-white hover:border-[#187AA7]/40"
                }
              `}
            >
                 <span
                className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center transition shrink-0
                  ${
                    active
                      ? "border-[#187AA7] bg-[#187AA7]"
                      : "border-gray-300 bg-white"
                  }
                `}
              >
                {active && (
                  <FiCheck className="text-white text-xs" strokeWidth={3} />
                )}
              </span>
              <div className="flex items-center gap-3 min-w-0">
                 <span className="text-xs md:text-sm font-bold text-[#172B35] truncate">
                  {lang === "ar" ? m.ar : m.en}
                </span>
                <div className="shrink-0 w-12 h-8 flex items-center justify-center">
                  <Image
                    src={m.image}
                    alt={lang === "ar" ? m.ar : m.en}
                    width={200}
                    height={200}
                    className="w-12 h-8 object-contain"
                  />
                </div>

             
              </div>

             
            </button>
          );
        })}
      </div>
    </div>
  );
}