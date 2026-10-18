"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { FiRefreshCw } from "react-icons/fi";
import Modal from "@/components/ui/Modal";
import FloatingLabelInput from "@/components/auth/common/FloatingLabelInput";

type RefundModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function RefundModal({ open, onClose }: RefundModalProps) {
  const { lang } = useApp();
  const [bookingRef, setBookingRef] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ bookingRef });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={lang === "ar" ? "إسترداد الأموال" : "Refund"}
      description={
        lang === "ar"
          ? "قم بإضافة رقم الحجز الذي تريد إسترداد قيمته."
          : "Enter the booking reference you want to refund."
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Booking Reference */}
        <FloatingLabelInput
          label={lang === "ar" ? "رقم الحجز" : "Booking Reference"}
          required
          value={bookingRef}
          onChange={setBookingRef}
        />

        

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full flex items-center justify-center gap-2
            bg-[#0D154B] text-white font-bold text-sm md:text-base
            py-3.5 rounded-xl cursor-pointer mt-2
            hover:opacity-90 active:scale-[0.99] transition
          "
        >
          {/* <FiRefreshCw className="text-lg" /> */}
          {lang === "ar" ? "إسترداد" : "Refund"}
        </button>
      </form>
    </Modal>
  );
}