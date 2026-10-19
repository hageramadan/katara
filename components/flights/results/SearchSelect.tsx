"use client";

import { FiCheck } from "react-icons/fi";
import Dropdown from "@/components/ui/Dropdown";

export type SearchSelectOption = {
  value: string;
  label: string;
};

export default function SearchSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: SearchSelectOption[];
  onChange: (value: string) => void;
}) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Dropdown
      width="w-full"
      align="start"
      className="min-w-0"
      triggerClassName="w-full min-w-0 justify-between rounded-xl border border-[#E4E8EE] bg-[#F8F9FB] px-3 py-2.5 text-start transition hover:border-[#AAB4C2] sm:px-4 sm:py-3"
      panelClassName="max-h-64 overflow-y-auto"
      trigger={
        <span className="flex min-w-0 flex-1 flex-col items-start gap-1">
          <span className="text-[11px] font-medium text-[#77808D] sm:text-xs">{label}</span>
          <span className="w-full truncate text-sm font-bold text-[#263142] sm:text-base">
            {selectedOption?.label}
          </span>
        </span>
      }
    >
      {(close) => (
        <div className="py-1">
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  close();
                }}
                className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-start text-xs transition sm:px-4 sm:text-sm ${selected ? "bg-[#E7F7F7] font-bold text-[#0D154B]" : "text-[#354052] hover:bg-[#F7F8FA]"}`}
              >
                <span className="truncate">{option.label}</span>
                {selected && <FiCheck className="shrink-0 text-[#0D154B]" />}
              </button>
            );
          })}
        </div>
      )}
    </Dropdown>
  );
}
