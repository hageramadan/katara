"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import type { FlightResult } from "@/lib/flights/types";
import FlightMoreOptionsContent, { type FareKey, type TabKey, type TermsTab } from "./FlightMoreOptionsContent";
import { getFarePrice } from "./FlightFareOptionsContent";
import FlightMoreOptionsFooter from "./FlightMoreOptionsFooter";
import FlightMoreOptionsHeader from "./FlightMoreOptionsHeader";
import FlightMoreOptionsTabs from "./FlightMoreOptionsTabs";

export default function FlightMoreOptionsModal({
  flight,
  open,
  onClose,
  ar,
}: {
  flight: FlightResult;
  open: boolean;
  onClose: () => void;
  ar: boolean;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("fares");
  const [termsTab, setTermsTab] = useState<TermsTab>("fees");
  const [selectedFare, setSelectedFare] = useState<FareKey>("basic");
  const displayedPrice = activeTab === "terms" ? flight.price : getFarePrice(selectedFare);

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-5xl">
      <div className="-mx-5 -my-3 flex max-h-[90vh] min-h-[70vh] flex-col overflow-hidden rounded-2xl md:-mx-6">
        <FlightMoreOptionsHeader ar={ar} onClose={onClose} />
        <FlightMoreOptionsTabs activeTab={activeTab} onTabChange={setActiveTab} ar={ar} />
        <FlightMoreOptionsContent
          flight={flight}
          ar={ar}
          activeTab={activeTab}
          termsTab={termsTab}
          onTermsTabChange={setTermsTab}
          selectedFareKey={selectedFare}
          onFareChange={setSelectedFare}
        />
        <FlightMoreOptionsFooter
          ar={ar}
          activeTab={activeTab}
          price={displayedPrice}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
}
