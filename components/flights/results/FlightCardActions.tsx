import { FiChevronDown } from "react-icons/fi";
import FlightTicketActions from "./FlightTicketActions";

export default function FlightCardActions({
  ar, isFavorite, bookingDetailsOpen, bookingClassesOpen, bookingClassesId,
  optionsModalOpen, optionsExpanded, flightOptionsId, onToggleFavorite,
  onShare, onOpenBookingDetails, onToggleBookingClasses, onOpenOptions,
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
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EEF1F5] p-3 sm:p-4">
      <button type="button" onClick={onOpenOptions} aria-controls={flightOptionsId} aria-expanded={optionsExpanded} className="flex min-h-10 items-center justify-between gap-1.5 rounded-[3px] border border-[#35396E] bg-[#EFEFF3] px-3 text-base font-bold text-[#24275E] transition-colors hover:bg-[#E4E5EC]">
        {optionsExpanded ? (ar ? "إظهار خيارات أقل" : "Show fewer options") : (ar ? "إظهار المزيد من الخيارات" : "Show more options")}
        <FiChevronDown aria-hidden="true" className={`text-sm transition-transform ${optionsExpanded ? "rotate-180" : ""}`} />
      </button>
      <FlightTicketActions
        ar={ar}
        isFavorite={isFavorite}
        shareOpen={bookingDetailsOpen}
        detailsOpen={optionsModalOpen}
        classesOpen={bookingClassesOpen}
        classesId={bookingClassesId}
        onToggleFavorite={onToggleFavorite}
        onShare={onShare}
        onOpenDetails={onOpenBookingDetails}
        onToggleClasses={onToggleBookingClasses}
      />
    </footer>
  );
}
