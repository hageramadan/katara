"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { countries } from "@/lib/countries";
import FormHeader from "../common/FormHeader";
import InputField from "../common/InputField";
import PhoneInput from "../common/PhoneInput";
import PasswordField from "../common/PasswordField";
import SelectField from "../common/SelectField";
import MultiSelectField from "../common/MultiSelectField";
import DateField from "../common/DateField";
import CheckboxField from "../common/CheckboxField";
import { FaTelegramPlane } from "react-icons/fa";

const serviceOptions = [
  { value: "hotels", ar: "فنادق", en: "Hotels" },
  { value: "flights", ar: "رحلات طيران", en: "Flights" },
  { value: "visas", ar: "تأشيرات", en: "Visas" },
  { value: "cars", ar: "سيارات", en: "Cars" },
  { value: "cruises", ar: "رحلات بحرية", en: "Cruises" },
];

const nationalityOptions = [
  { value: "EG", ar: "مصري", en: "Egyptian" },
  { value: "KW", ar: "كويتي", en: "Kuwaiti" },
  { value: "SA", ar: "سعودي", en: "Saudi" },
  { value: "AE", ar: "إماراتي", en: "Emirati" },
];

export default function BrokerForm() {
  const { lang } = useApp();
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");
  const [nationality, setNationality] = useState("");
  const [landline, setLandline] = useState("");
  const [landlineCode, setLandlineCode] = useState("+965");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("+965");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("+965");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const clearAll = () => {
    setGender("");
    setFirstName("");
    setLastName("");
    setServiceTypes([]);
    setBirthDate("");
    setCountry("");
    setNationality("");
    setLandline("");
    setLandlineCode("+965");
    setPhone("");
    setPhoneCode("+965");
    setEmail("");
    setWhatsapp("");
    setWhatsappCode("+965");
    setPassword("");
    setConfirmPassword("");
    setAgreed(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ gender, firstName, lastName, serviceTypes, birthDate,
      country, nationality, landline, landlineCode, phone, phoneCode,
      email, whatsapp, whatsappCode, agreed });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
      <div className="border-b border-[#E5EBEE] pb-3">
        <FormHeader title={lang === "ar" ? "إنشاء حساب بروكر" : "Create Broker Account"} onClear={clearAll} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,2fr)]">
        <SelectField
          label={lang === "ar" ? "النوع" : "Gender"}
          required value={gender} onChange={setGender}
          placeholder={lang === "ar" ? "حدد النوع" : "Select gender"}
          options={[
            { value: "male", label: lang === "ar" ? "ذكر" : "Male" },
            { value: "female", label: lang === "ar" ? "أنثى" : "Female" },
          ]}
        />
        <InputField label={lang === "ar" ? "الاسم الأول" : "First Name"} required
          placeholder={lang === "ar" ? "الاسم الأول" : "First name"}
          value={firstName} onChange={setFirstName} />
        <InputField label={lang === "ar" ? "اسم العائلة" : "Last Name"} required
          placeholder={lang === "ar" ? "اسم العائلة" : "Last name"}
          value={lastName} onChange={setLastName} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <MultiSelectField label={lang === "ar" ? "نوع الخدمة" : "Service Type"} required
          value={serviceTypes} onChange={setServiceTypes}
          placeholder={lang === "ar" ? "اختر نوع الخدمة..." : "Select service type..."}
          helper={lang === "ar" ? "يمكنك اختيار أكثر من خدمة" : "You can select more than one service"}
          options={serviceOptions.map((service) => ({ value: service.value, label: lang === "ar" ? service.ar : service.en }))} />
        <DateField label={lang === "ar" ? "تاريخ الميلاد" : "Birth Date"}
          value={birthDate} onChange={setBirthDate}
          helper={lang === "ar" ? "أدخل تاريخ الميلاد" : "Enter your birth date"} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SelectField label={lang === "ar" ? "الدولة" : "Country"} required
          value={country} onChange={setCountry}
          options={countries.map((item) => ({ value: item.code, label: lang === "ar" ? item.nameAr : item.nameEn }))} />
        <SelectField label={lang === "ar" ? "الجنسية" : "Nationality"} required
          value={nationality} onChange={setNationality}
          options={nationalityOptions.map((item) => ({ value: item.value, label: lang === "ar" ? item.ar : item.en }))} />
        <PhoneInput label={lang === "ar" ? "رقم أرضي" : "Landline"} required
          value={landline} dialCode={landlineCode} onValueChange={setLandline} onDialCodeChange={setLandlineCode}
          helper={lang === "ar" ? "أدخل الرقم بدون رمز الدولة" : "Enter the number without country code"} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <PhoneInput label={lang === "ar" ? "رقم الواتساب" : "WhatsApp"} required
          value={whatsapp} dialCode={whatsappCode} onValueChange={setWhatsapp} onDialCodeChange={setWhatsappCode}
          helper={lang === "ar" ? "سيتم إرسال رسالة التأكيد على هذا الرقم" : "A confirmation will be sent to this number"} />
        <PhoneInput label={lang === "ar" ? "رقم الهاتف" : "Phone Number"} required
          value={phone} dialCode={phoneCode} onValueChange={setPhone} onDialCodeChange={setPhoneCode}
          helper={lang === "ar" ? "سيتم إرسال رسالة التأكيد على هذا الرقم" : "A confirmation will be sent to this number"} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InputField label={lang === "ar" ? "البريد الإلكتروني" : "Email"} required type="email"
          placeholder="example@email.com" value={email} onChange={setEmail}
          helper={lang === "ar" ? "سيتم إرسال رسالة التأكيد على هذا البريد" : "A confirmation will be sent to this email"} />
        <PasswordField label={lang === "ar" ? "كلمة المرور" : "Password"} required
          value={password} onChange={setPassword}
          helper={lang === "ar" ? "8 أحرف، حرف كبير، صغير، رقم" : "8 chars, upper, lower, number"} />
        <PasswordField label={lang === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"} required
          value={confirmPassword} onChange={setConfirmPassword} />
      </div>

      <CheckboxField checked={agreed} onChange={setAgreed} required />
      <div className="flex justify-end">
        <button type="submit" className="w-full cursor-pointer rounded-full bg-[#00A8B5] px-9 py-3.5 text-sm font-bold text-white transition hover:opacity-90 active:scale-[0.99] md:text-base lg:w-fit">
          {lang === "ar" ? "إنشاء الحساب" : "Create Account"}
          <FaTelegramPlane className="ms-2 inline-block h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
