"use client";
import { useState, useRef, useEffect } from "react";
import {FiChevronDown } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import Counter from "./Counter";
import { localizeDigits } from "@/lib/flights/format";
import { CabinClass, TravelerSelection } from "@/lib/flights/types";

type TravelersDropdownProps = {
  className?: string;
  initialSelection?: TravelerSelection;
  onSelectionChange?: (selection: TravelerSelection) => void;
  englishDigits?: boolean;
};

export default function TravelersDropdown({
  className = "",
  initialSelection,
  onSelectionChange,
  englishDigits = false,
}: TravelersDropdownProps) {
  const { lang } = useApp();
  const ar = lang === "ar";
  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(initialSelection?.adults ?? 1);
  const [children, setChildren] = useState(initialSelection?.children ?? 0);
  const [infants, setInfants] = useState(initialSelection?.infants ?? 0);
  const [cabin, setCabin] = useState<CabinClass>(initialSelection?.cabin ?? "economy");
  const ref = useRef<HTMLDivElement>(null);

  const updateAdults = (value: number) => {
    setAdults(value);
    onSelectionChange?.({ adults: value, children, infants, cabin });
  };
  const updateChildren = (value: number) => {
    setChildren(value);
    onSelectionChange?.({ adults, children: value, infants, cabin });
  };
  const updateInfants = (value: number) => {
    setInfants(value);
    onSelectionChange?.({ adults, children, infants: value, cabin });
  };
  const updateCabin = (value: CabinClass) => {
    setCabin(value);
    onSelectionChange?.({ adults, children, infants, cabin: value });
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const total = adults + children + infants;
  const formatCount = (value: string | number) =>
    localizeDigits(value, ar && !englishDigits);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-gray-50 rounded-xl px-3 py-2 sm:px-4 sm:py-3 hover:bg-gray-100 transition text-start"
      >
        <label className="text-xs sm:text-base text-[#4A4A4A] block mb-1 sm:mb-2 cursor-pointer">
          {lang === "ar" ? "المسافرون /درجة السفر" : "Travelers & Class"}
        </label>
        <div className="flex items-center justify-between">
          <span className="text-primary font-semibold text-xs sm:text-sm flex items-center gap-2">
            {/* <FiUsers className="text-primary" /> */}
            {formatCount(total)} {lang === "ar" ? "مسافر" : "Traveler"}
            <span className="text-xs sm:text-xs text-[#333333] fot-extrabold">
              / {lang === "ar"
                ? cabin === "economy" ? "اقتصادية" : "درجة رجال أعمال"
                : cabin === "economy" ? "Economy" : "Business"}
            </span>
          </span>
          <FiChevronDown
            className={`text-primary transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div className="absolute top-full mt-2 inset-s-0 w-full lg:w-91 bg-white rounded-xl shadow-2xl p-3 sm:p-5 z-50">
          {/* Adults */}
          <div className="flex items-center justify-between py-1 sm:py-2">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-primary">
                {lang === "ar" ? "بالغ" : "Adult"}
              </p>
              {/* <p className="text-xs text-gray-400">
                {lang === "ar" ? "12 سنة وأكثر" : "12+ years"}
              </p> */}
            </div>
            <Counter value={adults} onChange={updateAdults} min={1} max={9} formatValue={formatCount} />
          </div>

          {/* Children */}
          <div className="flex items-center justify-between py-1 sm:py-2">
            <div className="flex items-center gap-1">
              <p className="text-xs sm:text-sm font-semibold text-primary">
                {lang === "ar" ? "طفل" : "Child"}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">
                ({lang === "ar" ? "2 - 12 العمر" : "2 - 12 years"})
              </p>
            </div>
            <Counter value={children} onChange={updateChildren} min={0} max={8} formatValue={formatCount} />
          </div>

          {/* Infants */}
          <div className="flex items-center justify-between py-1 sm:py-2">
            <div className="flex items-center gap-1">
              <p className="text-xs sm:text-sm font-semibold text-primary">
                {lang === "ar" ? "رضيع" : "Infant"}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">
                ({lang === "ar" ? "0 - 2 العمر" : "0 - 2 years"})
              </p>
            </div>
            <Counter value={infants} onChange={updateInfants} min={0} max={4} formatValue={formatCount} />
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-2 sm:my-3 sm:mb-5" />

          {/* Cabin Class */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => updateCabin("economy")}
              className={`
                py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer transition
                ${
                  cabin === "economy"
                     ? "bg-[#E0FBFB] text-primary border border-primary/20"
                    : " text-gray-600 hover:bg-[#E0FBFB] border border-gray-400"
                }
              `}
            >
              {lang === "ar" ? "الدرجة الاقتصادية" : "Economy"}
            </button>
            <button
              type="button"
              onClick={() => updateCabin("business")}
              className={`
                py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm cursor-pointer font-semibold transition
                ${
                  cabin === "business"
                    ? "bg-[#E0FBFB] text-primary border border-primary/20"
                    : " text-gray-600 hover:bg-[#E0FBFB] border border-gray-400"
                }
              `}
            >
              {lang === "ar" ? "درجة الأعمال" : "Business"}
            </button>
          </div>

          {/* Done */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full mt-3 sm:mt-4 bg-primary text-white py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold hover:opacity-90 transition"
          >
            {lang === "ar" ? "موافق" : "Done"}
          </button>
        </div>
      )}
    </div>
  );
}
