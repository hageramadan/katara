"use client";
import { useApp } from "@/context/AppContext";
import { pointsMeta } from "@/lib/wallet/meta";
import { PointsEntry } from "@/lib/wallet/types";

type PointsItemProps = {
  entry: PointsEntry;
};

export default function PointsItem({ entry }: PointsItemProps) {
  const { lang } = useApp();
  const meta = pointsMeta[entry.type];
  const Icon = meta.icon;

  const amountColor =
    entry.type === "add" ? "text-[#39D700]" : "text-[#FC0F15]";

  return (
    <li className="flex items-center gap-3 md:gap-4 px-5 md:px-6 py-4 border-b border-[#DCE3EC] last:border-b-0 hover:bg-[#FAFCFE] transition">
      <div
        className="w-9 h-9 md:w-9.5 md:h-9.5 rounded-lg flex items-center justify-center shrink-0 bg-[#F3F4F6]"

      >
        <Icon className="text-lg md:text-xl" style={{ color: meta.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm md:text-base font-bold text-[#172B35]">
          {lang === "ar" ? meta.ar : meta.en}
        </p>
          <div className="text-[#9CA3AF] font-medium text-xs md:text-sm" >
          {entry.time}
        </div>
      
      </div>

      <p className={`text-sm md:text-base font-extrabold shrink-0 ${amountColor}`}>
        {entry.amount}
      </p>
    </li>
  );
}