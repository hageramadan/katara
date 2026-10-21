import { useState } from "react";

import { BiSolidPlaneTakeOff } from "react-icons/bi";


const routes = [
  { ar: "إسطنبول ← دبي", en: "Istanbul ← Dubai" },
  { ar: "دبي ← الكويت", en: "Dubai ← Kuwait" },
  { ar: "إسطنبول ← الكويت", en: "Istanbul ← Kuwait" },
];

export default function FlightRouteTabs({ ar }: { ar: boolean }) {
  const [activeRoute, setActiveRoute] = useState(2);

  return (
    <div
      role="tablist"
      aria-label={ar ? "اختيار مسار الرحلة" : "Select flight route"}
      className="flex gap-2 px-4"
    >
      {routes.map((route, index) => {
        const active = activeRoute === index;

        return (
          <button
            key={route.en}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setActiveRoute(index)}
            className={`inline-flex min-w-0 items-center justify-center gap-2 
              rounded-2xl rounded-b-none  border   
                px-3 py-2.5 text-sm font-bold shadow-[0_4px_16px_rgba(15,23,42,0.05)] 
                transition duration-200 hover:border-[#CCD5E2] hover:scale-105
               ${active ? 
                 "text-[#0D154B]  bg-[#E7E8ED] border-[#0D154B] border-b-0"
                : 
                "text-[#445064] border-[#E1E7EF] "}`}
          > 
            
            <span className="truncate">{ar ? route.ar : route.en}</span>
            <div className={` ${active?"bg-primary text-white":"bg-gray-200 text-primary"} p-1 rounded-full`}>
              <BiSolidPlaneTakeOff className="-scale-x-100 text-2xl"/>
            </div>
            

          </button>
        );
      })}
    </div>
  );
}
