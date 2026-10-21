"use client";
import { useApp } from "@/context/AppContext";
import type { TravelerDetails } from "@/lib/booking/types";
import InputField from "@/components/auth/common/InputField";
import PhoneInput from "@/components/auth/common/PhoneInput";
import { FiPhone } from "react-icons/fi";

type PassengerContactFieldsProps = {
  details: TravelerDetails;
  onChange: (field: keyof TravelerDetails, value: string) => void;
};

export default function PassengerContactFields({ details, onChange }: PassengerContactFieldsProps) {
  const { lang } = useApp();

  return (
    <>
      {/* ==================== Contact Information ==================== */}
      <h3 className="mt-9 mb-3 flex items-center gap-1.5 text-sm font-semibold">
        {lang === "ar" ? "معلومات الاتصال" : "Contact information"}
        <FiPhone />
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PhoneInput
          label={lang === "ar" ? "رقم الجوال" : "Mobile number"}
          required
          value={details.mobile}
          dialCode={details.mobileCode}
          onValueChange={(value) => onChange("mobile", value)}
          onDialCodeChange={(value) => onChange("mobileCode", value)}
        />
        <PhoneInput
          label={lang === "ar" ? "رقم الواتس" : "WhatsApp number"}
          required
          value={details.whatsapp}
          dialCode={details.whatsappCode}
          onValueChange={(value) => onChange("whatsapp", value)}
          onDialCodeChange={(value) => onChange("whatsappCode", value)}
        />
        <InputField
          className="col-span-full [&_input]:text-left [&_input]:[direction:ltr]"
          label={lang === "ar" ? "البريد الإلكتروني" : "Email address"}
          type="email"
          placeholder="example@email.com"
          value={details.email}
          onChange={(value) => onChange("email", value)}
        />
      </div>
    </>
  );
}
