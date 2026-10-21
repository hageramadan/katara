"use client";

import { useState } from "react";
import { FiClock, FiDollarSign } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { TbDatabaseFilled } from "react-icons/tb";
import { localizeDigits } from "@/lib/flights/format";
import type { FlightSort } from "@/lib/flights/types";
import Modal from "@/components/ui/Modal";

const featuredSortOptions = [
  { key: "best", icon: FaStar, ar: "الأفضل قيمة", en: "Best value", price: 1832 },
  { key: "fastest", icon: MdAccessTimeFilled, ar: "الأسرع", en: "Fastest", price: 2079 },
  { key: "cheapest", icon: TbDatabaseFilled, ar: "الأرخص", en: "Cheapest", price: 1832 },
] as const;

const allSortOptions: { key: FlightSort; ar: string; en: string }[] = [
  { key: "best", ar: "مقترحة", en: "Recommended" },
  { key: "cheapest", ar: "أفضل سعر", en: "Best price" },
  { key: "fastest", ar: "مدة الرحلة", en: "Duration" },
  { key: "departure", ar: "وقت المغادرة", en: "Departure time" },
  { key: "arrival", ar: "وقت الوصول", en: "Arrival time" },
];

function getSortLabel(sort: FlightSort, ar: boolean) {
  const option = allSortOptions.find(({ key }) => key === sort);
  return ar ? option?.ar : option?.en;
}

export default function FlightSortControls({
  sort,
  onSortChange,
  ar,
}: {
  sort: FlightSort;
  onSortChange: (sort: FlightSort) => void;
  ar: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draftSort, setDraftSort] = useState(sort);

  const openModal = () => {
    setDraftSort(sort);
    setIsModalOpen(true);
  };

  const applySort = () => {
    onSortChange(draftSort);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mb-3 rounded-2xl border border-[#E5EAF0] bg-white p-3 sm:mb-4 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="grid w-full grid-cols-3 gap-1.5 overflow-hidden rounded-xl border border-gray-200 sm:flex sm:w-auto sm:shrink-0 sm:items-center sm:gap-2">
            {featuredSortOptions.map((option) => {
              const Icon = option.icon;
              const active = sort === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => onSortChange(option.key)}
                  aria-pressed={active}
                  className={`inline-flex min-w-0 items-center justify-between gap-1 px-2 py-2.5 text-start transition sm:min-w-[120px] sm:gap-2 sm:px-3 ${active ? "bg-[#E8F5F3]" : "bg-white hover:bg-[#F8F9FC]"}`}
                >
                  <span className="flex min-w-0 flex-col items-center gap-1">
                    <span className="truncate text-[10px] text-[#0D0D0D] sm:text-[11px]">{ar ? option.ar : option.en}</span>
                    <span dir="ltr" className="text-[10px] font-extrabold text-[#172B35] sm:text-xs">
                      KWD {localizeDigits(option.price.toLocaleString("en-US"), false)}
                    </span>
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5F3]">
                    <Icon className="shrink-0 text-sm text-[#0D154B] sm:text-lg" />
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={openModal}
            className="flex w-full items-center justify-between rounded-xl border border-[#E4E8EE] bg-[#F8F9FB] px-3 py-2.5 text-start text-[#263142] transition hover:border-[#AAB4C2] sm:w-[210px] sm:shrink-0"
          >
            <span className="flex min-w-0 flex-1 flex-col items-start gap-1">
              <span className="text-[11px] font-medium text-[#77808D] sm:text-xs">{ar ? "ترتيب حسب" : "Sort by"}</span>
              <span className="w-full truncate text-xs font-bold text-[#263142] sm:text-sm">{getSortLabel(sort, ar)}</span>
            </span>
            <FiClock className="ms-2 shrink-0 text-[#0D154B]" />
          </button>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={ar ? "ترتيب حسب" : "Sort by"}
        maxWidth="max-w-md"
      >
        <div className="space-y-1" dir={ar ? "rtl" : "ltr"}>
          {allSortOptions.map((option) => (
            <label
              key={option.key}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-sm transition ${draftSort === option.key ? "border-[#0D154B] bg-[#F5F7FC] text-[#0D154B]" : "border-transparent text-[#354052] hover:bg-[#F7F8FA]"}`}
            >
              <input
                type="radio"
                name="flight-sort"
                value={option.key}
                checked={draftSort === option.key}
                onChange={() => setDraftSort(option.key)}
                className="h-4 w-4 accent-[#0D154B]"
              />
              <span className="font-semibold">{ar ? option.ar : option.en}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#ECEEF2] pt-3">
          
           <button
            type="button"
            onClick={applySort}
            className="rounded-xl bg-[#0D154B] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#17235F]"
          >
            {ar ? "تطبيق" : "Apply"}
          </button>
          <button
            type="button"
            onClick={() => setDraftSort("best")}
            className="rounded-xl border border-[#0D154B] px-3 py-3 text-sm font-semibold text-[#0D154B] transition hover:bg-[#F5F6FA]"
          >
            {ar ? "إعادة ضبط الجميع" : "Reset all"}
          </button>
         
        </div>
      </Modal>
    </>
  );
}
