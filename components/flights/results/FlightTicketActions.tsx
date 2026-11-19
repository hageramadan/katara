import { FaWhatsapp } from "react-icons/fa";
import { FiCalendar, FiExternalLink, FiHeart, FiInfo } from "react-icons/fi";

type FlightTicketActionsProps = {
  ar: boolean;
  isFavorite: boolean;
  shareOpen: boolean;
  detailsOpen: boolean;
  classesOpen: boolean;
  classesId: string;
  onToggleFavorite: () => void;
  onShare: () => void;
  onOpenDetails: () => void;
  onToggleClasses: () => void;
};

export default function FlightTicketActions({
  ar, isFavorite, shareOpen, detailsOpen, classesOpen, classesId,
  onToggleFavorite, onShare, onOpenDetails, onToggleClasses,
}: FlightTicketActionsProps) {
  const buttonClass = "inline-flex h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[3px] border border-[#35396E] bg-white px-3 text-base font-bold text-[#24275E] transition-colors hover:bg-[#F2F3F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35396E]";
  const iconClass = "inline-flex size-10 shrink-0 items-center justify-center rounded-[3px] border border-[#35396E] bg-white text-lg text-[#24275E] transition-colors hover:bg-[#F2F3F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35396E]";

  return (
    <div dir="ltr" role="group" aria-label={ar ? "إجراءات التذكرة" : "Ticket actions"} className="flex flex-wrap items-center gap-1.5">
      <a href="https://wa.me/971588250786" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[3px] border border-[#35396E] bg-[#22CC5F] px-3 text-base font-bold text-white transition-colors hover:bg-[#1CB052] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35396E]">
        <FaWhatsapp aria-hidden="true" />{ar ? "حجز واتساب" : "Book on WhatsApp"}
      </a>
      <button type="button" onClick={onOpenDetails} aria-haspopup="dialog" aria-expanded={detailsOpen} className={buttonClass}>
        {ar ? "تفاصيل وأسعار" : "Details & prices"}<FiInfo aria-hidden="true" />
      </button>
      <button type="button" onClick={onToggleClasses} aria-expanded={classesOpen} aria-controls={classesId} className={buttonClass}>
        {ar ? "فئات الحجز" : "Booking classes"}<FiCalendar aria-hidden="true" />
      </button>
      <button type="button" onClick={onShare} aria-label={ar ? "مشاركة الرحلة" : "Share flight"} aria-haspopup="dialog" aria-expanded={shareOpen} className={iconClass}>
        <FiExternalLink aria-hidden="true" />
      </button>
      <button type="button" onClick={onToggleFavorite} aria-label={ar ? "إضافة للمفضلة" : "Add to favorites"} aria-pressed={isFavorite} className={`${iconClass} ${isFavorite ? "bg-[#FCEDEF] text-[#D3314A]" : ""}`}>
        <FiHeart aria-hidden="true" fill={isFavorite ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
