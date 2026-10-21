"use client";

import type { FlightResult } from "@/lib/flights/types";
import FlightBaggageContent from "./FlightBaggageContent";
import FlightFareOptionsContent, { type FareKey } from "./FlightFareOptionsContent";
import FlightRouteContent from "./FlightRouteContent";
import FlightTermsContent from "./FlightTermsContent";

export type TabKey = "fares" | "route" | "baggage" | "terms";
export type TermsTab = "fees" | "conditions";
export type { FareKey };

export default function FlightMoreOptionsContent({ flight, ar, activeTab, termsTab, onTermsTabChange, selectedFareKey, onFareChange }: {
  flight: FlightResult; ar: boolean; activeTab: TabKey; termsTab: TermsTab; onTermsTabChange: (tab: TermsTab) => void; selectedFareKey: FareKey; onFareChange: (key: FareKey) => void;
}) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-[#F7F8FA] p-3 sm:p-5">
      {activeTab === "fares" && <FlightFareOptionsContent ar={ar} selectedFareKey={selectedFareKey} onFareChange={onFareChange} />}
      {activeTab === "route" && <FlightRouteContent flight={flight} ar={ar} />}
      {activeTab === "baggage" && <FlightBaggageContent flight={flight} ar={ar} />}
      {activeTab === "terms" && <FlightTermsContent flight={flight} ar={ar} termsTab={termsTab} onTermsTabChange={onTermsTabChange} />}
    </div>
  );
}
