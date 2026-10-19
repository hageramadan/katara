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
    <div role="tablist" className="grid w-full grid-cols-3 items-center gap-1.5 sm:flex sm:flex-wrap sm:gap-3 md:gap-6 mb-4 sm:mb-6">
      {travelers.map((t) => {
        const active = t.id === activeId;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            role="tab"
            aria-selected={active}
            className={`
              relative flex min-w-0 w-full items-center justify-center gap-1 sm:w-auto sm:gap-2
              px-1.5 sm:px-4 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-xl
              text-[11px] sm:text-sm md:text-base font-bold text-center leading-tight
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
                  absolute top-1/2 hidden -translate-y-1/2 -inset-e-4.5 sm:block
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
