"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { BookingTraveler, ServiceSelection } from "@/lib/booking/types";
import { initialTravelers, emptyServiceSelection } from "@/lib/booking/data";

type BookingContact = {
  isTraveler: boolean;
  name: string;
  email: string;
};

type BookingFlow = {
  travelers: BookingTraveler[];
  updateTraveler: (id: string, patch: Partial<BookingTraveler>) => void;
  contact: BookingContact;
  updateContact: (patch: Partial<BookingContact>) => void;
  services: Record<string, ServiceSelection>;
  updateService: (key: string, patch: Partial<ServiceSelection>) => void;
  promoCode: string;
  updatePromoCode: (code: string) => void;
  previewComplete: boolean;
  completePreview: () => void;
};

type BookingFlowProviderProps = {
  children: ReactNode;
};

const BookingFlowContext = createContext<BookingFlow | null>(null);

export function BookingFlowProvider({ children }: BookingFlowProviderProps) {
  const [travelers, setTravelers] = useState(initialTravelers);
  const [contact, setContact] = useState<BookingContact>({
    isTraveler: true,
    name: "",
    email: "",
  });
  const [services, setServices] = useState<Record<string, ServiceSelection>>({});
  const [promoCode, setPromoCode] = useState("");
  const [previewComplete, setPreviewComplete] = useState(false);

  // ✅ تحديث بيانات مسافر واحد مع الاحتفاظ بباقي بيانات الحجز
  function updateTraveler(id: string, patch: Partial<BookingTraveler>) {
    setPreviewComplete(false);
    setTravelers((current) => {
      return current.map((traveler) => {
        return traveler.id === id ? { ...traveler, ...patch } : traveler;
      });
    });
  }

  function updateContact(patch: Partial<BookingContact>) {
    setPreviewComplete(false);
    setContact((current) => ({ ...current, ...patch }));
  }

  // ✅ حفظ اختيارات الخدمات لكل مسافر ولكل رحلة بشكل مستقل
  function updateService(key: string, patch: Partial<ServiceSelection>) {
    setPreviewComplete(false);
    setServices((current) => ({
      ...current,
      [key]: {
        ...emptyServiceSelection,
        ...current[key],
        ...patch,
      },
    }));
  }

  function updatePromoCode(code: string) {
    setPromoCode(code.trim().toUpperCase());
    setPreviewComplete(false);
  }

  return (
    <BookingFlowContext.Provider
      value={{
        travelers,
        updateTraveler,
        contact,
        updateContact,
        services,
        updateService,
        promoCode,
        updatePromoCode,
        previewComplete,
        completePreview: () => setPreviewComplete(true),
      }}
    >
      {children}
    </BookingFlowContext.Provider>
  );
}

export function useBookingFlow() {
  const context = useContext(BookingFlowContext);

  if (!context) {
    throw new Error("useBookingFlow must be used within BookingFlowProvider");
  }

  return context;
}

export function travelerName(traveler: BookingTraveler) {
  return `${traveler.firstName} ${traveler.lastName}`.trim() || traveler.name;
}
