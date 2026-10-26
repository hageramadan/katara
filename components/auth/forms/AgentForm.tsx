"use client";
import { useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import { countries } from "@/lib/countries";
import { EG, US, SA, KW } from "country-flag-icons/react/3x2";
import FormHeader from "../common/FormHeader";
import InputField from "../common/InputField";
import PhoneInput from "../common/PhoneInput";
import PasswordField from "../common/PasswordField";
import SelectField from "../common/SelectField";
import MultiSelectField from "../common/MultiSelectField";
import CheckboxField from "../common/CheckboxField";
import { FaTelegramPlane } from "react-icons/fa";

export default function AgentForm() {
  const { lang } = useApp();
  const [agentNameAr, setAgentNameAr] = useState("");
  const [agentNameEn, setAgentNameEn] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [agencyTypes, setAgencyTypes] = useState<string[]>([]);
  const [currencies, setCurrencies] = useState<string[]>(["KWD"]);
  const [iataType, setIataType] = useState("");
  const [iataNumber, setIataNumber] = useState("");
  const [email, setEmail] = useState("");
  const [landline, setLandline] = useState("");
  const [landlineCode, setLandlineCode] = useState("+965");
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("+965");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("+965");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const logoInput = useRef<HTMLInputElement>(null);
  const [agreed, setAgreed] = useState(false);

  const clearAll = () => {
    setAgentNameAr(""); setAgentNameEn("");
    setFirstName(""); setLastName(""); setGender("");
    setCountry(""); setAgencyTypes([]); setCurrencies(["KWD"]);
    setIataType(""); setIataNumber(""); setEmail("");
    setLandline(""); setLandlineCode("+965");
    setWhatsapp(""); setWhatsappCode("+965");
    setPhone(""); setPhoneCode("+965");
    setPassword(""); setConfirmPassword(""); setAgreed(false);
    setLogo(null);
    if (logoInput.current) logoInput.current.value = "";
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ agentNameAr, agentNameEn, firstName, lastName, gender,
      country, agencyTypes, currencies, iataType, iataNumber, email,
      landline, landlineCode, phone, phoneCode, whatsapp, whatsappCode,
      logo, agreed });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="relative border-b border-[#E5EBEE] pb-4">
        <FormHeader title={lang === "ar" ? "إنشاء حساب الوكيل" : "Create Agent Account"} onClear={clearAll} />
        <div className="mt-3 flex items-center justify-center md:absolute md:start-1/2 md:top-0 md:mt-0 md:-translate-x-1/2 rtl:md:translate-x-1/2">
          <label className="flex max-w-36 cursor-pointer flex-col items-center gap-1 rounded-lg bg-[#F7F7F7] px-4 py-3 text-center text-xs font-bold text-[#1E2A3A] focus-within:ring-2 focus-within:ring-[#0D154B]/20">
            {lang === "ar" ? "الشعار" : "Logo"}
            <input ref={logoInput} type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(event) => setLogo(event.target.files?.[0] ?? null)} />
            {logo && <span className="max-w-full truncate text-[10px] font-normal" title={logo.name}>{logo.name}</span>}
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField label={lang === "ar" ? "اسم شركة الوكيل (عربي)" : "Agent Company Name (Arabic)"} required placeholder="اسم الشركة بالعربية" value={agentNameAr} onChange={setAgentNameAr} />
        <InputField label={lang === "ar" ? "اسم شركة الوكيل (إنجليزي)" : "Agent Company Name (English)"} required placeholder="Company Name in English" value={agentNameEn} onChange={setAgentNameEn} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SelectField label={lang === "ar" ? "النوع" : "Gender"} required value={gender} onChange={setGender} placeholder={lang === "ar" ? "اختر النوع" : "Select gender"} options={[
          { value: "male", label: lang === "ar" ? "ذكر" : "Male" },
          { value: "female", label: lang === "ar" ? "أنثى" : "Female" },
        ]} />
        <InputField label={lang === "ar" ? "الاسم الأول" : "First Name"} required placeholder={lang === "ar" ? "أدخل الاسم الأول" : "Enter first name"} value={firstName} onChange={setFirstName} />
        <InputField label={lang === "ar" ? "الاسم الأخير" : "Last Name"} required placeholder={lang === "ar" ? "أدخل الاسم الأخير" : "Enter last name"} value={lastName} onChange={setLastName} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <PhoneInput label={lang === "ar" ? "رقم أرضي" : "Landline"} required value={landline} dialCode={landlineCode} onValueChange={setLandline} onDialCodeChange={setLandlineCode} />
        <PhoneInput label={lang === "ar" ? "رقم الجوال" : "Mobile Number"} required value={phone} dialCode={phoneCode} onValueChange={setPhone} onDialCodeChange={setPhoneCode} />
        <PhoneInput label={lang === "ar" ? "رقم واتساب" : "WhatsApp"} required value={whatsapp} dialCode={whatsappCode} onValueChange={setWhatsapp} onDialCodeChange={setWhatsappCode} helper={lang === "ar" ? "يفضل مطابقته مع رقم الجوال" : "Preferably the same as your mobile number"} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SelectField label={lang === "ar" ? "الدولة" : "Country"} required value={country} onChange={setCountry} options={countries.map((item) => ({ value: item.code, label: lang === "ar" ? item.nameAr : item.nameEn }))} />
        <InputField label={lang === "ar" ? "البريد الإلكتروني" : "Email"} required type="email" placeholder="company@email.com" value={email} onChange={setEmail} helper={lang === "ar" ? "سيتم إرسال رسالة التأكيد على هذا البريد" : "A confirmation will be sent to this email"} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <MultiSelectField label={lang === "ar" ? "نوع الوكالة" : "Agency Type"} required value={agencyTypes} onChange={setAgencyTypes} selectAll options={[
          { value: "flights", label: lang === "ar" ? "تذاكر طيران" : "Flight Tickets" },
          { value: "hotels", label: lang === "ar" ? "فنادق" : "Hotels" },
          { value: "cars", label: lang === "ar" ? "سيارات" : "Cars" },
        ]} />
        <MultiSelectField label={lang === "ar" ? "العملة" : "Currency"} required value={currencies} onChange={setCurrencies} options={[
          { value: "EGP", label: lang === "ar" ? "الجنيه المصري · EGP" : "Egyptian Pound · EGP", icon: <EG className="h-3 w-5 shrink-0" /> },
          { value: "USD", label: lang === "ar" ? "الدولار الأمريكي · USD" : "US Dollar · USD", icon: <US className="h-3 w-5 shrink-0" /> },
          { value: "SAR", label: lang === "ar" ? "الريال السعودي · SAR" : "Saudi Riyal · SAR", icon: <SA className="h-3 w-5 shrink-0" /> },
          { value: "KWD", label: lang === "ar" ? "الدينار الكويتي · KWD" : "Kuwaiti Dinar · KWD", icon: <KW className="h-3 w-5 shrink-0" /> },
        ]} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SelectField label={lang === "ar" ? "نوع IATA" : "IATA Type"} required value={iataType} onChange={setIataType} options={[
          { value: "easy-pay", label: lang === "ar" ? "إيزي باي" : "Easy Pay" },
          { value: "standard", label: lang === "ar" ? "ستاندر" : "Standard" },
        ]} />
        <SelectField label={lang === "ar" ? "رقم IATA" : "IATA Number"} required value={iataNumber} onChange={setIataNumber} placeholder={lang === "ar" ? "اختر رقم IATA" : "Select IATA number"} helper={lang === "ar" ? "رقم IATA الخاص بشركتك" : "Your company's IATA number"} options={[
          { value: "KWIKT 9T52", label: "KWIKT 9T52" },
          { value: "KWIKT 54R5", label: "KWIKT 54R5" },
        ]} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <PasswordField label={lang === "ar" ? "كلمة المرور" : "Password"} required value={password} onChange={setPassword} helper={lang === "ar" ? "8 أحرف، حرف كبير، صغير، رقم" : "8 chars, upper, lower, number"} />
        <PasswordField label={lang === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"} required value={confirmPassword} onChange={setConfirmPassword} />
      </div>
      <div className="mt-5"><CheckboxField checked={agreed} onChange={setAgreed} required /></div>
      <div className="flex justify-end">
        <button type="submit" className="w-full cursor-pointer rounded-full bg-[#00A8B5] px-9 py-3.5 text-sm font-bold text-white transition hover:opacity-90 active:scale-[0.99] md:text-base lg:w-fit">
          {lang === "ar" ? "إنشاء الحساب وإرسال للمراجعة" : "Create & Submit for Review"}
          <FaTelegramPlane className="ms-2 inline-block h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
