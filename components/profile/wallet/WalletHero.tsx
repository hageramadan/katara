"use client";
import { useState } from "react"
import { useApp } from "@/context/AppContext";
import WithdrawModal from "./WithdrawModal";
import RefundModal from "./RefundModal";
type WalletHeroProps = {
  name: string;
  balance: string;
  currency: string;
};

export default function WalletHero({ name, balance, currency }: WalletHeroProps) {
  const { lang } = useApp();
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);

  return (
    <section className="bg-[#0D154BEB] text-[#E8E8E8] rounded-2xl p-6 md:p-8 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 inset-e-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 inset-s-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

      <div className="relative">
        <p className="text-[#E8E8E8] text-sm md:text-base font-semibold mb-1 lg:mb-3">
          {lang === "ar" ? "الإسم" : "Name"}
        </p>
        <h2 className="text-base md:text-lg lg:text-[32px] font-bold lg:mb-6">{name}</h2>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="mt-3 lg:mt-4">
            <p className="text-[#E8E8E8] text-sm md:text-base font-semibold mb-1 lg:mb-3">
              {lang === "ar" ? "رصيدك الحالي" : "Current Balance"}
            </p>
            <p className="text-base md:text-lg lg:text-[32px] font-bold lg:mb-6" >
              {balance} <span className="text-xl md:text-3xl">{currency}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
               onClick={() => setWithdrawOpen(true)}
              className="flex items-center gap-2 bg-primary cursor-pointer hover:scale-105 border border-white/20 px-4 md:px-5 py-2.5 rounded-xl text-xs md:text-base font-bold hover:opacity-90 transition"
            >
              {/* <FiArrowUpCircle className="text-base" /> */}
              {lang === "ar" ? "سحب" : "Withdraw"}
            </button>
            <button
              type="button"
              onClick={() => setRefundOpen(true)}
              className="flex items-center gap-2 bg-primary cursor-pointer hover:scale-105 border border-white/20  px-4 md:px-5 py-2.5 rounded-xl text-xs md:text-base font-bold transition"
            >
              {/* <FiDownload className="text-base" /> */}
              {lang === "ar" ? "إسترداد" : "Refund"}
            </button>
            
          </div>
        </div>
      </div>
         {/* Modals */}
      <WithdrawModal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        currency={currency}
      />
      <RefundModal
        open={refundOpen}
        onClose={() => setRefundOpen(false)}
      />
    </section>
    
  );
}