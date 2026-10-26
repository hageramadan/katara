"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { countries } from "@/lib/countries";
import FormHeader from "../common/FormHeader";
import InputField from "../common/InputField";
import PhoneInput from "../common/PhoneInput";
import PasswordField from "../common/PasswordField";
import SelectField from "../common/SelectField";
import DateField from "../common/DateField";
import CheckboxField from "../common/CheckboxField";
import { FaTelegramPlane } from "react-icons/fa";

const nationalityOptions = [
  { value: "EG", ar: "مصري", en: "Egyptian" },
  { value: "KW", ar: "كويتي", en: "Kuwaiti" },
  { value: "SA", ar: "سعودي", en: "Saudi" },
  { value: "AE", ar: "إماراتي", en: "Emirati" },
];

export default function PartnerForm() {
  const { lang } = useApp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [landline, setLandline] = useState("");
  const [landlineCode, setLandlineCode] = useState("+965");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("+965");
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("+965");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const clearAll = () => {
    setFirstName("");
    setLastName("");
    setGender("");
    setNationality("");
    setEmail("");
    setCountry("");
    setLandline("");
    setLandlineCode("+965");
    setPhone("");
    setPhoneCode("+965");
    setWhatsapp("");
    setWhatsappCode("+965");
    setBirthDate("");
    setPassword("");
    setConfirmPassword("");
    setAgreed(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ firstName, lastName, gender, nationality, email, country,
      landline, landlineCode, phone, phoneCode, whatsapp, whatsappCode,
      birthDate, agreed });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
      <FormHeader title={lang === "ar" ? "إنشاء حساب شريك ثالث" : "Create Third-Party Partner Account"} onClear={clearAll} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,2fr)]">
        <SelectField label={lang === "ar" ? "النوع" : "Gender"} required
          value={gender} onChange={setGender} placeholder={lang === "ar" ? "حدد النوع" : "Select gender"}
          options={[
            { value: "male", label: lang === "ar" ? "ذكر" : "Male" },
            { value: "female", label: lang === "ar" ? "أنثى" : "Female" },
          ]} />
        <InputField label={lang === "ar" ? "الاسم الأول" : "First Name"} required
          placeholder={lang === "ar" ? "الاسم الأول" : "First name"}
          value={firstName} onChange={setFirstName} />
        <InputField label={lang === "ar" ? "اسم العائلة" : "Last Name"} required
          placeholder={lang === "ar" ? "اسم العائلة" : "Last name"}
          value={lastName} onChange={setLastName} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:mt-4 md:grid-cols-2 md:gap-x-6">
        <SelectField label={lang === "ar" ? "الجنسية" : "Nationality"} required
          value={nationality} onChange={setNationality}
          placeholder={lang === "ar" ? "اختر الجنسية (على سبيل المثال مصري)" : "Select nationality (e.g. Egyptian)"}
          options={nationalityOptions.map((item) => ({ value: item.value, label: lang === "ar" ? item.ar : item.en }))} />
        <InputField label={lang === "ar" ? "البريد الإلكتروني" : "Email"} required type="email"
          placeholder="example@email.com" value={email} onChange={setEmail}
          helper={lang === "ar" ? "سيتم إرسال رسالة التأكيد على هذا البريد" : "A confirmation will be sent to this email"} />
        <SelectField label={lang === "ar" ? "الدولة" : "Country"} required
          value={country} onChange={setCountry}
          placeholder={lang === "ar" ? "اختر الدولة (على سبيل المثال الكويت)" : "Select country (e.g. Kuwait)"}
          options={countries.map((item) => ({ value: item.code, label: lang === "ar" ? item.nameAr : item.nameEn }))} />
        <PhoneInput label={lang === "ar" ? "رقم الأرضي" : "Landline"} required
          value={landline} dialCode={landlineCode} onValueChange={setLandline} onDialCodeChange={setLandlineCode} />
        <PhoneInput label={lang === "ar" ? "رقم الهاتف" : "Phone Number"} required
          value={phone} dialCode={phoneCode} onValueChange={setPhone} onDialCodeChange={setPhoneCode} />
        <PhoneInput label={lang === "ar" ? "رقم واتساب" : "WhatsApp"} required
          value={whatsapp} dialCode={whatsappCode} onValueChange={setWhatsapp} onDialCodeChange={setWhatsappCode}
          helper={lang === "ar" ? "سيتم إرسال رسالة التأكيد على هذا الرقم" : "A confirmation will be sent to this number"} />
        <DateField label={lang === "ar" ? "تاريخ الميلاد" : "Birth Date"} required
          value={birthDate} onChange={setBirthDate} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-6">
        <PasswordField label={lang === "ar" ? "كلمة المرور" : "Password"} required
          value={password} onChange={setPassword}
          helper={lang === "ar" ? "8 أحرف، حرف كبير، صغير، رقم" : "8 chars, upper, lower, number"} />
        <PasswordField label={lang === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"} required
          value={confirmPassword} onChange={setConfirmPassword} />
      </div>

      <div className="mt-4"><CheckboxField checked={agreed} onChange={setAgreed} required /></div>
      <div className="flex justify-end">
        <button type="submit" className="w-full cursor-pointer rounded-full bg-[#00A8B5] px-9 py-3.5 text-sm font-bold text-white transition hover:opacity-90 active:scale-[0.99] md:text-base lg:w-fit">
          {lang === "ar" ? "إنشاء الحساب" : "Create Account"}
          <FaTelegramPlane className="ms-2 inline-block h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
