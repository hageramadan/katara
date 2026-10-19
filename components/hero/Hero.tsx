"use client";
import { useState } from "react";
import HeroContent from "./HeroContent";
import MainTabs, { TabKey } from "./MainTabs";
import SubTabs, { SubTabKey } from "./SubTabs";
import FlightBookingForm from "./forms/FlightBookingForm";
import ManageBookingForm from "./forms/ManageBookingForm";
import FlightStatusForm from "./forms/FlightStatusForm";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<TabKey>("flights");
  const [activeSubTab, setActiveSubTab] = useState<SubTabKey>("book");

  return (
    <section className="relative flex min-h-[560px] flex-col rounded-2xl m-3 sm:m-5 lg:min-h-0 lg:h-187.5">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: "url('/hero.png')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center pt-10 pb-6 px-3 sm:pt-16 sm:px-4 sm:pb-10">
        <HeroContent />

        {/* Main Tabs */}
        <MainTabs active={activeTab} onChange={setActiveTab} />

        {/* Sub Tabs + Forms */}
        <div className="w-full container mt-5 sm:mt-6">
          <SubTabs active={activeSubTab} onChange={setActiveSubTab} />

          <div className="bg-white rounded-2xl lg:rounded-t-none shadow-2xl p-3 sm:p-5 lg:p-6 mt-0">
            {activeTab === "flights" && (
              <>
                {activeSubTab === "book" && <FlightBookingForm />}
                {activeSubTab === "manage" && <ManageBookingForm />}
                {activeSubTab === "status" && <FlightStatusForm />}
              </>
            )}
            {activeTab !== "flights" && (
              <div className="text-center text-gray-400 py-16">
                محتوى {activeTab} قيد التطوير
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
