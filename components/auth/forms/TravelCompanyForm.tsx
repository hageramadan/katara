"use client";
import { useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import { countries } from "@/lib/countries";
import { EG, US, SA, KW } from "country-flag-icons/react/3x2";
import InputField from "../common/InputField";
import PhoneInput from "../common/PhoneInput";
import PasswordField from "../common/PasswordField";
import SelectField from "../common/SelectField";
import MultiSelectField from "../common/MultiSelectField";
import CheckboxField from "../common/CheckboxField";
import { FaTelegramPlane } from "react-icons/fa";
import { CgTrashEmpty } from "react-icons/cg";

export default function TravelCompanyForm() {
  const { lang } = useApp();
  const [companyNameAr, setCompanyNameAr] = useState("");
  const [companyNameEn, setCompanyNameEn] = useState("");
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

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (whatsapp === phone) setWhatsapp(value);
  };

  const handlePhoneCodeChange = (value: string) => {
    setPhoneCode(value);
    if (whatsappCode === phoneCode) setWhatsappCode(value);
  };

  const clearAll = () => {
    setCompanyNameAr(""); setCompanyNameEn("");
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
    console.log({ companyNameAr, companyNameEn, firstName, lastName, gender,
      country, agencyTypes, currencies, iataType, iataNumber, email,
      landline, landlineCode, phone, phoneCode, whatsapp, whatsappCode,
      logo, agreed });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-2 items-center gap-3 border-b border-[#E5EBEE] pb-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <h1 className="col-span-2 text-lg font-extrabold text-[#163B45] sm:col-span-1 md:text-xl">
          {lang === "ar" ? "إنشاء حساب شركة سياحة وسفر" : "Create Travel Company Account"}
        </h1>
        <div className="flex items-center justify-center justify-self-start sm:justify-self-center">
          <label className="flex max-w-36 cursor-pointer flex-col items-center gap-1 rounded-lg bg-[#F7F7F7] px-4 py-3 text-center text-xs font-bold text-[#1E2A3A] focus-within:ring-2 focus-within:ring-[#0D154B]/20">
            {lang === "ar" ? "الشعار" : "Logo"}
            <input ref={logoInput} type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(event) => setLogo(event.target.files?.[0] ?? null)} />
            {logo && <span className="max-w-full truncate text-[10px] font-normal" title={logo.name}>{logo.name}</span>}
          </label>
        </div>
        <button type="button" onClick={clearAll} className="flex cursor-pointer items-center gap-1.5 justify-self-end rounded-lg border border-[#FF4D4F] bg-[#FFF1F0] px-4 py-2 text-xs font-bold text-[#FF4D4F] transition hover:scale-105">
          <CgTrashEmpty className="text-sm" />
          {lang === "ar" ? "مسح البيانات" : "Clear"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField label={lang === "ar" ? "اسم شركة السياحة والسفر (عربي)" : "Travel Company Name (Arabic)"} required placeholder="اسم الشركة بالعربية" value={companyNameAr} onChange={setCompanyNameAr} />
        <InputField label={lang === "ar" ? "اسم شركة السياحة والسفر (إنجليزي)" : "Travel Company Name (English)"} required placeholder="Company Name in English" value={companyNameEn} onChange={setCompanyNameEn} />
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
        <PhoneInput label={lang === "ar" ? "رقم الجوال" : "Mobile Number"} required value={phone} dialCode={phoneCode} onValueChange={handlePhoneChange} onDialCodeChange={handlePhoneCodeChange} />
        <PhoneInput label={lang === "ar" ? "رقم واتساب" : "WhatsApp"} required value={whatsapp} dialCode={whatsappCode} onValueChange={setWhatsapp} onDialCodeChange={setWhatsappCode} helper={lang === "ar" ? "يُعبأ تلقائيًا من رقم الجوال ويمكن تعديله" : "Filled from your mobile number; you can edit it"} />
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
        <InputField label={lang === "ar" ? "رقم IATA" : "IATA Number"} required value={iataNumber} onChange={setIataNumber} placeholder={lang === "ar" ? "أدخل رقم IATA" : "Enter IATA number"} helper={lang === "ar" ? "رقم IATA الخاص بشركتك" : "Your company's IATA number"} />
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
