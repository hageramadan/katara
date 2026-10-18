"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi";
import { TravelerData } from "@/lib/travelers/types";
import { initialTravelers, createEmptyTraveler } from "@/lib/travelers/data";
import TravelerTabs from "./TravelerTabs";
import TravelerForm from "./TravelerForm";

export default function TravelersContent() {
  const { lang } = useApp();
  const [travelers, setTravelers] = useState<TravelerData[]>(initialTravelers);
  const [activeId, setActiveId] = useState(initialTravelers[0].id);

  const activeTraveler = travelers.find((t) => t.id === activeId)!;

  // ==================== Actions ====================
  const handleUpdate = (updated: TravelerData) => {
    setTravelers((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleAdd = () => {
    if (travelers.length >= 5) return;
    const newTraveler = createEmptyTraveler(travelers.length);
    setTravelers((prev) => [...prev, newTraveler]);
    setActiveId(newTraveler.id);
  };

  const handleDelete = () => {
    if (travelers.length === 1) return;
    const filtered = travelers.filter((t) => t.id !== activeId);
    setTravelers(filtered);
    setActiveId(filtered[0].id);
  };

  const handleSave = () => {
    console.log("Saving traveler:", activeTraveler);
    // TODO: API call
  };

  return (
    <div className="flex flex-col gap-6">

      {/* ==================== Tabs ==================== */}
      <TravelerTabs
        travelers={travelers}
        activeId={activeId}
        onChange={setActiveId}
      />

      {/* ==================== Form ==================== */}
      <TravelerForm traveler={activeTraveler} onChange={handleUpdate} />

     

    </div>
  );
}