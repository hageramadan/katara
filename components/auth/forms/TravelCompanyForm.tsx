"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { countries } from "@/lib/countries";
import FormHeader from "../common/FormHeader";
import InputField from "../common/InputField";
import PhoneInput from "../common/PhoneInput";
import PasswordField from "../common/PasswordField";
import SelectField from "../common/SelectField";
import CheckboxField from "../common/CheckboxField";
import { FaTelegramPlane } from "react-icons/fa";

export default function TravelCompanyForm() {
  const { lang } = useApp();

  const [companyNameAr, setCompanyNameAr] = useState("");
  const [companyNameEn, setCompanyNameEn] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("+965");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("+965");
  const [managerName, setManagerName] = useState("");
  const [email, setEmail] = useState("");
  const [landline, setLandline] = useState("");
  const [landlineCode, setLandlineCode] = useState("+965");
  const [country, setCountry] = useState("");
  const [agencyType, setAgencyType] = useState("");
  const [iataNumber, setIataNumber] = useState("");
  const [iataType, setIataType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [agreed, setAgreed] = useState(false);

  const clearAll = () => {
    setCompanyNameAr("");
    setCompanyNameEn("");
    setWhatsapp("");
    setPhone("");
    setManagerName("");
    setEmail("");
    setLandline("");
    setCountry("");
    setAgencyType("");
    setIataNumber("");
    setIataType("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
    setAgreed(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      companyNameAr,
      companyNameEn,
      whatsapp,
      phone,
      managerName,
      email,
      landline,
      country,
      agencyType,
      iataNumber,
      iataType,
      password,
      username,
      agreed,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormHeader
        title={
          lang === "ar"
            ? "إنشاء حساب شركة سياحة وسفر"
            : "Create Travel Company Account"
        }
        onClear={clearAll}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InputField
          label={lang === "ar" ? "اسم الشركة (عربي)" : "Company Name (Arabic)"}
          required
          placeholder={
            lang === "ar" ? "اسم الشركة بالعربية" : "اسم الشركة بالعربية"
          }
          value={companyNameAr}
          onChange={setCompanyNameAr}
        />
        <InputField
          label={
            lang === "ar" ? "اسم الشركة (إنجليزي)" : "Company Name (English)"
          }
          required
          placeholder="Company Name in English"
          value={companyNameEn}
          onChange={setCompanyNameEn}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <InputField
          label={lang === "ar" ? "اسم المسؤول" : "Manager Name"}
          required
          value={managerName}
          onChange={setManagerName}
        />
        <PhoneInput
          label={lang === "ar" ? "رقم الجوال" : "Mobile Number"}
          required
          value={phone}
          dialCode={phoneCode}
          onValueChange={setPhone}
          onDialCodeChange={setPhoneCode}
          helper={
            lang === "ar"
              ? "يتعبأ اسم المسؤول تلقائياً من رقم الجوال"
              : "Manager name is filled from mobile"
          }
        />
        <PhoneInput
          label={lang === "ar" ? "رقم واتساب" : "WhatsApp"}
          required
          value={whatsapp}
          dialCode={whatsappCode}
          onValueChange={setWhatsapp}
          onDialCodeChange={setWhatsappCode}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PhoneInput
          label={lang === "ar" ? "رقم الهاتف الأرضي" : "Landline"}
          value={landline}
          dialCode={landlineCode}
          onValueChange={setLandline}
          onDialCodeChange={setLandlineCode}
        />
        <InputField
          label={lang === "ar" ? "البريد الإلكتروني" : "Email"}
          required
          type="email"
          placeholder="company@email.com"
          value={email}
          onChange={setEmail}
          helper={
            lang === "ar"
              ? "سيتم إرسال رسالة التأكيد على هذا البريد"
              : "A confirmation will be sent to this email"
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label={lang === "ar" ? "نوع الوكالة" : "Agency Type"}
          required
          value={agencyType}
          onChange={setAgencyType}
          options={[
            { value: "travel", label: lang === "ar" ? "سياحة وسفر" : "Travel" },
            {
              value: "ticketing",
              label: lang === "ar" ? "تذاكر" : "Ticketing",
            },
            {
              value: "hajj",
              label: lang === "ar" ? "حج وعمرة" : "Hajj & Umrah",
            },
          ]}
        />
        <SelectField
          label={lang === "ar" ? "الدولة" : "Country"}
          required
          value={country}
          onChange={setCountry}
          options={countries.map((c) => ({
            value: c.code,
            label: lang === "ar" ? c.nameAr : c.nameEn,
          }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label={lang === "ar" ? "نوع IATA" : "IATA Type"}
          required
          value={iataType}
          onChange={setIataType}
          options={[
            { value: "full", label: lang === "ar" ? "كامل" : "Full" },
            { value: "partial", label: lang === "ar" ? "جزئي" : "Partial" },
          ]}
          helper={lang === "ar" ? "رقم IATA الخاص بشركتك" : "Your company IATA"}
        />
        <InputField
          label={lang === "ar" ? "رقم IATA" : "IATA Number"}
          required
          placeholder={lang === "ar" ? "أدخل رقم IATA" : "Enter IATA"}
          value={iataNumber}
          onChange={setIataNumber}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label={lang === "ar" ? "اسم المستخدم" : "Username"}
          required
          placeholder="••••••••"
          value={username}
          onChange={setUsername}
        />
        <PasswordField
          label={lang === "ar" ? "كلمة المرور" : "Password"}
          required
          value={password}
          onChange={setPassword}
          helper={
            lang === "ar"
              ? "8 أحرف، حرف كبير، صغير، رقم"
              : "8 chars, upper, lower, number"
          }
        />
        <PasswordField
          label={lang === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
          required
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
      </div>

      <CheckboxField checked={agreed} onChange={setAgreed} required />
      <div className="flex justify-end">
        <button
          type="submit"
          className="w-full bg-[#109E9F] text-white py-3.5 rounded-full font-bold text-sm md:text-base hover:opacity-90 active:scale-[0.99] transition  lg:w-fit px-9 cursor-pointer"
        >
          {lang === "ar"
            ? "إنشاء الحساب وإرسال للمراجعة"
            : "Create & Submit for Review"}
          <FaTelegramPlane className="inline-block ms-2 w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
