"use client";
import { useApp } from "@/context/AppContext";
import { txMeta } from "@/lib/wallet/meta";
import { Transaction } from "@/lib/wallet/types";

type TransactionItemProps = {
  tx: Transaction;
};

export default function TransactionItem({ tx }: TransactionItemProps) {
  const { lang } = useApp();
  const meta = txMeta[tx.type];
  const Icon = meta.icon;

  const amountColor =
    tx.type === "deposit"
      ? "text-[#39D700]"
      : tx.type === "refund"
      ? "text-[#D97706]"
      : "text-[#FC0F15]";

  return (
    <li className="flex items-center gap-3 md:gap-4 px-5 md:px-6 py-4 border-b border-[#DCE3EC] last:border-b-0 hover:bg-[#FAFCFE] transition">
      <div
        className="w-9 h-9 md:w-9.5 md:h-9.5 rounded-lg flex items-center justify-center shrink-0 bg-[#F3F4F6]"
        
      >
        <Icon className="text-lg md:text-xl" style={{ color: meta.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm md:text-base font-bold text-[#0D0D0D]">
          {lang === "ar" ? meta.ar : meta.en}
        </p>
        <div className="flex items-center gap-2 text-[11px] md:text-xs text-[#6F7E89] mt-0.5">
          
          <span className="text-[#9CA3AF] font-semibold text-xs md:text-sm" dir="ltr">{tx.card}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className={`text-sm md:text-base font-extrabold shrink-0  ${amountColor}`}>
        {tx.amount}
      </p>
      <span dir="ltr" className="text-[#9CA3AF] font-semibold text-xs md:text-sm">{tx.time}</span>
      </div>
    </li>
  );
}