"use client";
import { useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import { countries } from "@/lib/countries";
import InputField from "../common/InputField";
import PhoneInput from "../common/PhoneInput";
import PasswordField from "../common/PasswordField";
import SelectField from "../common/SelectField";
import CheckboxField from "../common/CheckboxField";
import { FaTelegramPlane } from "react-icons/fa";
import { CgTrashEmpty } from "react-icons/cg";

export default function CompanyForm() {
  const { lang } = useApp();
  const [companyNameAr, setCompanyNameAr] = useState("");
  const [companyNameEn, setCompanyNameEn] = useState("");
  const [landline, setLandline] = useState("");
  const [landlineCode, setLandlineCode] = useState("+965");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("+965");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("+965");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
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
    setCompanyNameAr("");
    setCompanyNameEn("");
    setLandline("");
    setLandlineCode("+965");
    setFirstName("");
    setLastName("");
    setWhatsapp("");
    setWhatsappCode("+965");
    setPhone("");
    setPhoneCode("+965");
    setCountry("");
    setGender("");
    setIndustry("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAgreed(false);
    setLogo(null);
    if (logoInput.current) logoInput.current.value = "";
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ companyNameAr, companyNameEn, landline, landlineCode,
      firstName, lastName, whatsapp, whatsappCode, phone, phoneCode,
      country, gender, industry, email, logo, agreed });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
      <div className="grid grid-cols-2 items-center gap-3 border-b border-[#E5EBEE] pb-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <h1 className="col-span-2 text-lg font-extrabold text-[#163B45] sm:col-span-1 md:text-xl">
          {lang === "ar" ? "إنشاء حساب شركة" : "Create Company Account"}
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
        <InputField label={lang === "ar" ? "اسم الشركة (عربي)" : "Company Name (Arabic)"} required
          placeholder="اسم الشركة بالعربية" value={companyNameAr} onChange={setCompanyNameAr} />
        <InputField label={lang === "ar" ? "اسم الشركة (إنجليزي)" : "Company Name (English)"} required
          placeholder="Company Name" value={companyNameEn} onChange={setCompanyNameEn} />
      </div>

      <PhoneInput label={lang === "ar" ? "رقم الهاتف الأرضي" : "Landline"}
        value={landline} dialCode={landlineCode} onValueChange={setLandline} onDialCodeChange={setLandlineCode}
        helper={lang === "ar" ? "أدخل رقم الهاتف الأرضي بدون رمز الدولة" : "Enter the landline number without country code"} />

      <fieldset className="min-w-0">
        <legend className="mb-4 text-sm font-bold text-[#163B45] md:text-base">
          {lang === "ar" ? "بيانات المسؤول" : "Manager Information"}
          <span className="ms-1 font-bold text-[#D1454A]">*</span>
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InputField label={lang === "ar" ? "الاسم الأول" : "First Name"} required
            placeholder={lang === "ar" ? "الاسم الأول" : "First name"}
            value={firstName} onChange={setFirstName} />
          <InputField label={lang === "ar" ? "الاسم الأخير" : "Last Name"} required
            placeholder={lang === "ar" ? "الاسم الأخير" : "Last name"}
            value={lastName} onChange={setLastName} />
          <PhoneInput label={lang === "ar" ? "رقم الجوال" : "Mobile Number"}
            value={phone} dialCode={phoneCode} onValueChange={handlePhoneChange} onDialCodeChange={handlePhoneCodeChange} />
          <PhoneInput label={lang === "ar" ? "رقم واتساب" : "WhatsApp"}
            value={whatsapp} dialCode={whatsappCode} onValueChange={setWhatsapp} onDialCodeChange={setWhatsappCode}
            helper={lang === "ar" ? "يُعبأ تلقائيًا من رقم الجوال ويمكن تعديله" : "Filled from your mobile number; you can edit it"} />
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InputField label={lang === "ar" ? "مجال الشركة (تخصص الشركة)" : "Company Industry (Specialty)"}
          value={industry} onChange={setIndustry} placeholder={lang === "ar" ? "مجال العمل" : "Industry"} />
        <SelectField label={lang === "ar" ? "النوع" : "Gender"} required
          value={gender} onChange={setGender} placeholder={lang === "ar" ? "النوع" : "Gender"}
          options={[
            { value: "male", label: lang === "ar" ? "ذكر" : "Male" },
            { value: "female", label: lang === "ar" ? "أنثى" : "Female" },
          ]} />
        <SelectField label={lang === "ar" ? "الدولة" : "Country"} required
          value={country} onChange={setCountry}
          options={countries.map((item) => ({ value: item.code, label: lang === "ar" ? item.nameAr : item.nameEn }))} />
      </div>

      <InputField label={lang === "ar" ? "بريد الشركة" : "Company Email"} required type="email"
        placeholder="company@email.com" value={email} onChange={setEmail}
        helper={lang === "ar" ? "سيتم إرسال رسالة التأكيد على هذا البريد" : "A confirmation will be sent to this email"} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <PasswordField label={lang === "ar" ? "كلمة المرور" : "Password"} required
          value={password} onChange={setPassword}
          helper={lang === "ar" ? "8 أحرف، حرف كبير، صغير، رقم" : "8 chars, upper, lower, number"} />
        <PasswordField label={lang === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"} required
          value={confirmPassword} onChange={setConfirmPassword} />
      </div>

      <CheckboxField checked={agreed} onChange={setAgreed} required />
      <div className="flex justify-end">
        <button type="submit" className="w-full cursor-pointer rounded-full bg-[#109E9F] px-9 py-3.5 text-sm font-bold text-white transition hover:opacity-90 active:scale-[0.99] md:text-base lg:w-fit">
          {lang === "ar" ? "إنشاء الحساب وإرسال للمراجعة" : "Create & Submit for Review"}
          <FaTelegramPlane className="ms-2 inline-block h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
