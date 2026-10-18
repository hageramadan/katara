"use client";
import { useApp } from "@/context/AppContext";
import { TravelerData } from "@/lib/travelers/types";

type TravelerTabsProps = {
  travelers: TravelerData[];
  activeId: string;
  onChange: (id: string) => void;
};

export default function TravelerTabs({
  travelers,
  activeId,
  onChange,
}: TravelerTabsProps) {
  const { lang } = useApp();

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-6 mb-6">
      {travelers.map((t) => {
        const active = t.id === activeId;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`
              relative flex items-center gap-2
              px-4 md:px-12 py-2.5 md:py-3 rounded-xl
              text-sm md:text-base font-bold 
               cursor-pointer 
              ${
                active
                  ? "bg-[#E7F7F7] text-[#0D154B]  "
                  : "bg-white text-[#6F7E89]"
              }
            `}
          >
           

            <span>{lang === "ar" ? t.labelAr : t.labelEn}</span>

           
            {active && (
              <span
                className="
                  absolute top-1/2 -translate-y-1/2 -inset-e-4.5
                  w-0 h-0
                  border-y-22 border-y-transparent
                  border-e-22 border-e-[#E7F7F7]
                  rtl:border-e-0 rtl:border-s-22 rtl:border-s-[#E7F7F7]
                "
              />
            )}
          </button>
        );
      })}
    </div>
  );
}