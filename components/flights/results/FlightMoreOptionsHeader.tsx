import { FiX } from "react-icons/fi";
import { FaPlaneDeparture } from "react-icons/fa6";
export default function FlightMoreOptionsHeader({
  ar,
  onClose,
}: {
  ar: boolean;
  onClose: () => void;
}) {
  const directionTitle = ar ? "الدوحة · الكويت" : "Doha · Kuwait";
  const dateLabel = ar ? "6 سبتمبر 2025 · درجة رجال الأعمال" : "September 6, 2025 · Business class";

  return (
    <header className="flex shrink-0 items-center justify-between gap-4 bg-[#0D154B] px-4 py-3 text-white sm:px-6 sm:py-4">
      <div className="flex items-center gap-3">
         <FaPlaneDeparture className="shrink-0 w-6 h-6  -scale-x-100 " />
        <div className="min-w-0">
        <h2 className="truncate text-lg font-extrabold sm:text-xl">{directionTitle}</h2>
        <p className="mt-1 text-xs font-medium text-white/80 sm:text-sm">{dateLabel}</p>
      </div>
      
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={ar ? "إغلاق" : "Close"}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
      >
        <FiX className="text-lg" />
      </button>
    </header>
  );
}
