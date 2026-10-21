"use client";
import { useApp } from "@/context/AppContext";
import { useBookingFlow, travelerName } from "@/context/BookingFlowContext";
import { FiUser } from "react-icons/fi";
import { travelerTypes } from "@/lib/booking/data";

type ServiceTravelersProps = {
  activeTraveler: string;
  onChange: (travelerId: string) => void;
};

export default function ServiceTravelers({ activeTraveler, onChange }: ServiceTravelersProps) {
  const { lang } = useApp();
  const { travelers } = useBookingFlow();
  return (
    <>
      {/* ==================== Passenger Selection ==================== */}
      <aside
        className="rounded-lg bg-white p-3 sm:p-5"
        aria-label={lang === "ar" ? "المسافرون" : "Passengers"}
      >
        <h2 className="mb-4 px-2 text-base font-bold text-neutral-900">
          {lang === "ar" ? "المسافرون" : "Passengers"}
        </h2>
        <div
          className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1"
          role="radiogroup"
          aria-label={lang === "ar" ? "المسافرون" : "Passengers"}
        >
          {travelers.map((person) => {
            const active = person.id === activeTraveler;
            const disabled = person.type === "infant";
            return (
              <label
                key={person.id}
                title={disabled
                  ? (lang === "ar" ? "يسافر الرضيع مع المسافر المرافق دون مقعد منفصل." : "Infants travel with an accompanying passenger without a separate seat.")
                  : undefined}
                className={`flex min-w-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-3 lg:min-w-0 ${disabled ? "cursor-not-allowed opacity-50" : active ? "bg-secondary-soft" : "hover:bg-slate-50"}`}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sky-600 text-white">
                  <FiUser aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 text-sm leading-relaxed text-neutral-900">
                  <b className="break-words">
                    {travelerName(person)}
                  </b>
                  <span className="ms-1">- {lang === "ar"
                    ? travelerTypes[person.type].labelAr
                    : travelerTypes[person.type].labelEn}</span>
                </span>
                <input
                  type="radio"
                  name="service-traveler"
                  value={person.id}
                  checked={active}
                  disabled={disabled}
                  onChange={() => onChange(person.id)}
                  className="size-4 shrink-0 accent-sky-500"
                />
              </label>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          {lang === "ar"
            ? "يسافر الرضيع مع المسافر المرافق دون مقعد منفصل."
            : "Infants travel with an accompanying passenger without a separate seat."}
        </p>
      </aside>
    </>
  );
}
