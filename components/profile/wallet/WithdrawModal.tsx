"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import Modal from "@/components/ui/Modal";
import FloatingLabelInput from "@/components/auth/common/FloatingLabelInput";
import PaymentMethodSelector, {
  PaymentMethod,
} from "@/components/ui/PaymentMethodSelector";

type WithdrawModalProps = {
  open: boolean;
  onClose: () => void;
  currency: string;
};

export default function WithdrawModal({
  open,
  onClose,
  currency,
}: WithdrawModalProps) {
  const { lang } = useApp();

  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("visa");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ amount, cardNumber, cardName, cvv, expiry, method });
    onClose();
  };

  const formatCard = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={lang === "ar" ? "سحب رصيد" : "Withdraw"}
      description={
        lang === "ar"
          ? "قم بإضافة المبلغ الذي تريد سحبه وبيانات الحساب الخاص بك."
          : "Add the amount you want to withdraw and your account details."
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Amount */}
        <FloatingLabelInput
          label={`${lang === "ar" ? "المبلغ" : "Amount"} (${currency})`}
          required
          type="number"
          value={amount}
          onChange={setAmount}
        />

        {/* Payment Method */}
        <PaymentMethodSelector value={method} onChange={setMethod} />

        {/* Card Number */}
        <FloatingLabelInput
          label={lang === "ar" ? "رقم بطاقة الإئتمان" : "Card Number"}
          required
          value={cardNumber}
          onChange={(v) => setCardNumber(formatCard(v))}
        />

        {/* Card Name */}
        <FloatingLabelInput
          label={lang === "ar" ? "الإسم على البطاقة" : "Cardholder Name"}
          required
          value={cardName}
          onChange={setCardName}
        />

        {/* CVV + Expiry */}
        <div className="grid grid-cols-2 gap-3">
         
          <FloatingLabelInput
            label={lang === "ar" ? "تاريخ الإنتهاء" : "Expiry Date"}
            required
            // placeholder="MM/YY"
            value={expiry}
            onChange={(v) => {
              const digits = v.replace(/\D/g, "").slice(0, 4);
              const formatted =
                digits.length > 2
                  ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                  : digits;
              setExpiry(formatted);
            }}
          />
           <FloatingLabelInput
            label="CVV"
            required
            value={cvv}
            onChange={(v) => setCvv(v.replace(/\D/g, "").slice(0, 4))}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full flex items-center justify-center gap-2
            bg-[#0D154B] text-white font-bold cursor-pointer text-sm md:text-base
            py-3.5 rounded-xl mt-2
            hover:opacity-90 active:scale-[0.99] transition
          "
        >
          {/* <FiArrowUpCircle className="text-lg" /> */}
          {lang === "ar" ? "سحب" : "Withdraw"}
        </button>
      </form>
    </Modal>
  );
}