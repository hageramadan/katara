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

export default function CompanyForm() {
  const { lang } = useApp();

  const [companyNameAr, setCompanyNameAr] = useState("");
  const [companyNameEn, setCompanyNameEn] = useState("");
  const [landline1, setLandline1] = useState("");
  const [landline1Code, setLandline1Code] = useState("+965");
  const [landline2, setLandline2] = useState("");
  const [landline2Code, setLandline2Code] = useState("+965");
  const [managerName, setManagerName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("+965");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("+965");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [agreed, setAgreed] = useState(false);

  const clearAll = () => {
    setCompanyNameAr(""); setCompanyNameEn(""); setLandline1(""); setLandline2("");
    setManagerName(""); setWhatsapp(""); setPhone(""); setCountry("");
    setIndustry(""); setEmail(""); setPassword(""); setConfirmPassword("");
    setUsername(""); setAgreed(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ companyNameAr, companyNameEn, landline1, landline2, managerName, whatsapp, phone, country, industry, email, password, username, agreed });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormHeader
        title={lang === "ar" ? "إنشاء حساب شركة" : "Create Company Account"}
        onClear={clearAll}
      />
      <div  className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <InputField
        label={lang === "ar" ? "اسم الشركة (عربي)" : "Company Name (Arabic)"}
        required
        placeholder={lang === "ar" ? "اسم الشركة بالعربية" : "اسم الشركة بالعربية"}
        value={companyNameAr}
        onChange={setCompanyNameAr}
      />
   <InputField
        label={lang === "ar" ? "اسم الشركة (إنجليزي)" : "Company Name (English)"}
        required
        placeholder="Company Name"
        value={companyNameEn}
        onChange={setCompanyNameEn}
      />
      </div>

     
     

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PhoneInput
          label={lang === "ar" ? "رقم الهاتف الأرضي 1" : "Landline 1"}
          required
          value={landline1}
          dialCode={landline1Code}
          onValueChange={setLandline1}
          onDialCodeChange={setLandline1Code}
          placeholder="12345678"
          helper={lang === "ar" ? "لكل رقم كود دولة خاص به" : "Each number has its own country code"}
        />
        <PhoneInput
          label={lang === "ar" ? "رقم الهاتف الأرضي 2" : "Landline 2"}
          value={landline2}
          dialCode={landline2Code}
          onValueChange={setLandline2}
          onDialCodeChange={setLandline2Code}
          placeholder="12345678"
        />
      </div>

      <div className=" pt-4 mt-1">
        <h3 className="text-sm md:text-base font-bold text-[#163B45] mb-3">
          
          {lang === "ar" ? "بيانات المسؤول" : "Manager Information"}
          <span className="text-[#D1454A] font-bold ms-1">*</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
         
          <InputField
            label={lang === "ar" ? "اسم المسؤول" : "Manager Name"}
            required
            placeholder={lang === "ar" ? "الاسم الكامل للمسؤول" : "Full manager name"}
            value={managerName}
            onChange={setManagerName}
          />
           <PhoneInput
            label={lang === "ar" ? "رقم الجوال" : "Mobile"}
            value={phone}
            dialCode={phoneCode}
            onValueChange={setPhone}
            onDialCodeChange={setPhoneCode}
            helper={lang === "ar" ? "يتعبأ اسم المسؤول تلقائياً من رقم الجوال" : "Manager name is filled from mobile"}
          />
            <PhoneInput
            label={lang === "ar" ? "رقم واتساب" : "WhatsApp"}
            value={whatsapp}
            dialCode={whatsappCode}
            onValueChange={setWhatsapp}
            onDialCodeChange={setWhatsappCode}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       
        <InputField
          label={lang === "ar" ? "مجال العمل / Industry" : "Industry"}
          value={industry}
          onChange={setIndustry}
          placeholder={lang === "ar" ? "مجال العمل" : "Industry"}
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

      <InputField
        label={lang === "ar" ? "بريد الشركة" : "Company Email"}
        required
        type="email"
        placeholder="company@email.com"
        value={email}
        onChange={setEmail}
        helper={lang === "ar" ? "سيتم إرسال رسالة التأكيد على هذا البريد" : "A confirmation will be sent to this email"}
      />

      

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
          helper={lang === "ar" ? "8 أحرف، حرف كبير، صغير، رقم" : "8 chars, upper, lower, number"}
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
        {lang === "ar" ? "إنشاء الحساب وإرسال للمراجعة" : "Create & Submit for Review"}
        <FaTelegramPlane className="inline-block ms-2 w-5 h-5" />
      </button>
          </div>
    
    </form>
  );
}