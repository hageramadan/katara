"use client";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function Counter({
  value,
  onChange,
  min = 0,
  max = 9,
  formatValue = String,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  formatValue?: (value: number) => string;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full cursor-pointer border border-primary/20 flex items-center justify-center bg-primary text-whitehover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary"
      >
        <FiMinus className="text-xs sm:text-base text-white" />
      </button>

      <span className="w-5 sm:w-6 text-center text-xs sm:text-base font-semibold text-primary">
        {formatValue(value)}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-primary/20 cursor-pointer flex items-center justify-center bg-primary text-whitehover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary"
      >
        <FiPlus className="text-xs sm:text-base text-white" />
      </button>
    </div>
  );
}
