import { FaWhatsapp } from "react-icons/fa";
import { FiChevronDown, FiHeart, FiInfo, FiShare2 } from "react-icons/fi";
import { MdOutlineWindow } from "react-icons/md";
export default function FlightCardActions({
  ar,
  isFavorite,
  bookingDetailsOpen,
  bookingClassesOpen,
  bookingClassesId,
  optionsModalOpen,
  optionsExpanded,
  flightOptionsId,
  onToggleFavorite,
  onShare,
  onOpenBookingDetails,
  onToggleBookingClasses,
  onOpenOptions,
}: {
  ar: boolean;
  isFavorite: boolean;
  bookingDetailsOpen: boolean;
  bookingClassesOpen: boolean;
  bookingClassesId: string;
  optionsModalOpen: boolean;
  optionsExpanded: boolean;
  flightOptionsId: string;
  onToggleFavorite: () => void;
  onShare: () => void;
  onOpenBookingDetails: () => void;
  onToggleBookingClasses: () => void;
  onOpenOptions: () => void;
}) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#EEF1F5] p-3 sm:p-4">
      <button
        type="button"
        onClick={onOpenOptions}
        aria-controls={flightOptionsId}
        aria-expanded={optionsExpanded}
        className="flex items-center justify-between gap-1.5 rounded-xl border border-[#DCE3EC] bg-[#F8FAFC] px-3 py-2.5 text-xs font-bold text-[#354052] transition hover:bg-[#F1F4F8] sm:text-sm"
      >
        {optionsExpanded ? (ar ? "إظهار خيارات أقل" : "Show fewer options") : (ar ? "إظهار المزيد من الخيارات" : "Show more options")}
        <FiChevronDown className={`text-sm transition-transform ${optionsExpanded ? "rotate-180" : ""}`} />
      </button>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label={ar ? "إضافة للمفضلة" : "Add to favorites"}
          aria-pressed={isFavorite}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCE3EC] transition ${isFavorite ? "bg-[#FCEDEF] text-[#D3314A]" : "bg-white text-[#596474] hover:bg-[#F7F8FA]"}`}
        >
          <FiHeart fill={isFavorite ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          onClick={onShare}
          aria-label={ar ? "مشاركة الرحلة" : "Share flight"}
          aria-haspopup="dialog"
          aria-expanded={bookingDetailsOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCE3EC] bg-white text-[#596474] transition hover:bg-[#F7F8FA]"
        >
          <FiShare2 />
        </button>
          <button
          type="button"
          onClick={onToggleBookingClasses}
          aria-controls={bookingClassesId}
          aria-expanded={bookingClassesOpen}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-[11px] font-bold text-[#354052] transition hover:bg-[#F7F8FA] sm:text-xs"
        >
          <MdOutlineWindow />
          {ar ? "فئات الحجز" : "Booking classes"}
        </button>
        <button
          type="button"
          onClick={onOpenBookingDetails}
          aria-haspopup="dialog"
          aria-expanded={optionsModalOpen}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DCE3EC] px-3 py-2.5 text-[11px] font-bold text-[#354052] transition hover:bg-[#F7F8FA] sm:text-xs"
        >
          <FiInfo />
          {ar ? "تفاصيل وأسعار" : "Details & prices"}
        </button>
        <a
          href="https://wa.me/971588250786"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#24B75A] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#1DA34F] sm:text-sm"
        >
          <FaWhatsapp className="text-base" />
          {ar ? "حجز واتساب" : "Book on WhatsApp"}
        </a>
      </div>
    </footer>
  );
}
