"use client";
import { useApp } from "@/context/AppContext";
import type { TravelerDetails } from "@/lib/booking/types";
import InputField from "@/components/auth/common/InputField";
import DateField from "@/components/auth/common/DateField";

type PassengerDocumentFieldsProps = {
  details: TravelerDetails;
  onChange: (field: keyof TravelerDetails, value: string) => void;
};

export default function PassengerDocumentFields({ details, onChange }: PassengerDocumentFieldsProps) {
  const { lang } = useApp();

  return (
    <>
      {/* ==================== Travel Document ==================== */}
      <div className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2">
        <InputField
          label={lang === "ar" ? "رقم جواز السفر" : "Passport number"}
          placeholder={lang === "ar" ? "رقم جواز السفر" : "Passport number"}
          value={details.passport}
          onChange={(value) => onChange("passport", value)}
        />
        <DateField
          label={lang === "ar" ? "تاريخ انتهاء الجواز" : "Passport expiry date"}
          value={details.passportExpiry}
          onChange={(value) => onChange("passportExpiry", value)}
        />
        <InputField
          label={lang === "ar" ? "الجنسية" : "Nationality"}
          placeholder={lang === "ar" ? "الجنسية" : "Nationality"}
          value={details.nationality}
          onChange={(value) => onChange("nationality", value)}
        />
        <InputField
          label={lang === "ar" ? "بلد الإصدار" : "Issuing country"}
          placeholder={lang === "ar" ? "بلد الإصدار" : "Issuing country"}
          value={details.issuingCountry}
          onChange={(value) => onChange("issuingCountry", value)}
        />
      </div>
    </>
  );
}
