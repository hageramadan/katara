"use client";

type HistoryGroupProps = {
  date: string;
  children: React.ReactNode;
};

export default function HistoryGroup({ date, children }: HistoryGroupProps) {
  return (
    <div>
      <div className="px-5 md:px-6 py-2.5 bg-[#FAFCFE] border-b border-[#DCE3EC]">
        <span className="text-sm md:text-base font-medium text-[#6B7280]">{date}</span>
      </div>
      <ul>{children}</ul>
    </div>
  );
}