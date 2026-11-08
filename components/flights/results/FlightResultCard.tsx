"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { localizeDigits } from "@/lib/flights/format";
import type { FlightResult } from "@/lib/flights/types";
import FlightCardActions from "./FlightCardActions";
import FlightBookingDetailsModal from "./FlightBookingDetailsModal";
import FlightCardHeader from "./FlightCardHeader";
import FlightSegments from "./FlightSegments";
import FlightSelectionNotice from "./FlightSelectionNotice";
import FlightFareOptions from "./FlightFareOptions";
import FlightMoreOptionsModal from "./FlightMoreOptionsModal";

export default function FlightResultCard({
  flight,
  availableFlights,
  tripKind = "round",
}: {
  flight: FlightResult;
  availableFlights?: FlightResult[];
  tripKind?: "multi" | "oneway" | "round";
}) {
  const { lang } = useApp();
  const router = useRouter();
  const ar = lang === "ar";
  const [selectedFlightId, setSelectedFlightId] = useState(flight.id);
  const [hasSelectedOutbound, setHasSelectedOutbound] = useState(false);
  const [hasSelectedReturn, setHasSelectedReturn] = useState(false);
  const [bookingClassesOpen, setBookingClassesOpen] = useState(false);
  const bookingClassesId = useId();
  const flightOptionsId = useId();
  const [optionsExpanded, setOptionsExpanded] = useState(false);
  const selectedFlight = availableFlights?.find((option) => option.id === selectedFlightId) ?? flight;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const airline = ar ? selectedFlight.airline : selectedFlight.airlineEn;
  const formattedPrice = localizeDigits(
    new Intl.NumberFormat("en-KW").format(selectedFlight.price),
    false,
  );

  return (
    <article className="rounded-2xl border border-[#E1E7EF] bg-white shadow-[0_4px_16px_rgba(15,23,42,0.05)] transition duration-200 hover:border-[#CCD5E2] hover:shadow-md">
        <FlightCardHeader
        flight={selectedFlight}
          airline={airline}
          formattedPrice={formattedPrice}
          ar={ar}
        />
        <FlightSegments
          optionsId={flightOptionsId}
          expanded={optionsExpanded}
          returnSelected={hasSelectedReturn}
          outboundSelected={hasSelectedOutbound}
          flight={selectedFlight}
          availableFlights={availableFlights}
          onSelectFlight={(option) => {
            setBookingClassesOpen(false);
            setSelectedFlightId(option.id);
            setHasSelectedOutbound(true);
            if (tripKind === "round" && hasSelectedReturn) {
              router.push("/passenger-details");
            }
          }}
          onSelectReturn={() => {
            setBookingClassesOpen(false);
            setHasSelectedReturn(true);
            if (tripKind === "round" && hasSelectedOutbound) {
              router.push("/passenger-details");
            }
          }}
          airline={airline}
          ar={ar}
          tripKind={tripKind}
        />
          <div id={bookingClassesId} hidden={!bookingClassesOpen}>
            <div className="grid grid-cols-1 gap-3 px-3 pb-3 sm:gap-4 sm:px-4 sm:pb-4">
            <FlightFareOptions flight={selectedFlight} direction="outbound" ar={ar} />
            {tripKind === "round" && <FlightFareOptions flight={selectedFlight} direction="return" ar={ar} />}
            </div>
          </div>
        <FlightSelectionNotice ar={ar} tripKind={tripKind} />
        <FlightCardActions
          ar={ar}
          isFavorite={isFavorite}
          bookingDetailsOpen={isBookingDetailsOpen}
          optionsExpanded={optionsExpanded}
          flightOptionsId={flightOptionsId}
          bookingClassesOpen={bookingClassesOpen}
          bookingClassesId={bookingClassesId}
          optionsModalOpen={isOptionsModalOpen}
          onToggleFavorite={() => setIsFavorite((value) => !value)}
          onShare={() => setIsBookingDetailsOpen(true)}
          onOpenBookingDetails={() => setIsOptionsModalOpen(true)}
          onToggleBookingClasses={() => setBookingClassesOpen((value) => !value)}
          onOpenOptions={() => setOptionsExpanded((value) => !value)}
        />
        <FlightBookingDetailsModal
        flight={selectedFlight}
          open={isBookingDetailsOpen}
          onClose={() => setIsBookingDetailsOpen(false)}
        />
        <FlightMoreOptionsModal
          flight={selectedFlight}
          open={isOptionsModalOpen}
          onClose={() => setIsOptionsModalOpen(false)}
          ar={ar}
        />
    </article>
  );
}
