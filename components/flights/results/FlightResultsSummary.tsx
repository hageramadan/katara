import { FaCalendarDays } from "react-icons/fa6";
import { localizeDigits } from "@/lib/flights/format";

export default function FlightResultsSummary({
  count,
  total,
  ar,
  onShowPriceCalendar,
}: {
  count: number;
  total: number;
  ar: boolean;
  onShowPriceCalendar: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <button
        type="button"
        onClick={onShowPriceCalendar}
        className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#DCE3EC] px-3 py-2 text-xs font-medium text-[#0D154B] transition hover:border-[#0D154B] sm:self-auto md:text-[13px]"
      >
        {ar ? "عرض تقويم الأسعار" : "View price calendar"}
        <FaCalendarDays className="text-[#0D154B]" />
      </button>
      <h2 className="text-xs font-medium text-[#6C757D] sm:text-sm">
        {ar
          ? `عرض ${localizeDigits(count, false)} نتيجة من ${localizeDigits(total, false)}`
          : `Showing ${count} of ${total} results`}
      </h2>
    </div>
  );
}
