import { FiEdit2, FiUsers } from "react-icons/fi";
import { FaRegCalendar } from "react-icons/fa6";

export default function FlightResultsHeader({
  fromCity,
  toCity,
  dateLabel,
  passengerLabel,
  ar,
  onEditSearch,
}: {
  fromCity?: string;
  toCity?: string;
  dateLabel: string;
  passengerLabel: string;
  ar: boolean;
  onEditSearch: () => void;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 sm:mb-6">
      <div className="min-w-0">
        <h1 className="truncate text-xl font-extrabold text-[#172B35] sm:text-2xl">
          {fromCity} {ar ? "إلى" : "to"} {toCity}
        </h1>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#77808D] sm:mt-2 sm:gap-3 sm:text-sm">
          <span>{dateLabel}</span>
          <FaRegCalendar className="shrink-0" />
          <span aria-hidden="true" className="text-[#B8C0CB]">|</span>
          <span className="inline-flex items-center gap-1.5">
            {passengerLabel}
            <FiUsers className="shrink-0" />
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onEditSearch}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-[#0D154B] px-3 py-2 text-xs font-bold text-[#0D154B] transition hover:bg-[#0D154B] hover:text-white sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
      >
        <FiEdit2 />
        {ar ? "تعديل البحث" : "Edit search"}
      </button>
    </div>
  );
}
