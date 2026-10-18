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

export default function AgentForm() {
  const { lang } = useApp();

  const [nickname, setNickname] = useState("");
  const [agentNameAr, setAgentNameAr] = useState("");
  const [agentNameEn, setAgentNameEn] = useState("");
  const [country, setCountry] = useState("");
  const [agencyType, setAgencyType] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("+965");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("+965");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [agreed, setAgreed] = useState(false);

  const clearAll = () => {
    setNickname("");
    setAgentNameAr("");
    setAgentNameEn("");
    setCountry("");
    setAgencyType("");
    setEmail("");
    setWhatsapp("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
    setAgreed(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      nickname,
      agentNameAr,
      agentNameEn,
      country,
      agencyType,
      email,
      whatsapp,
      phone,
      password,
      username,
      agreed,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormHeader
        title={lang === "ar" ? "إنشاء حساب وكيل" : "Create Agent Account"}
        onClear={clearAll}
      />
      {/* 
      <InputField
        label={lang === "ar" ? "اسم الشهرة" : "Nickname"}
        required
        value={nickname}
        onChange={setNickname}
      /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label={lang === "ar" ? "اسم الوكيل (عربي)" : "Agent Name (Arabic)"}
          required
          placeholder={lang === "ar" ? "اسم الوكيل " : "اسم الوكيل "}
          value={agentNameAr}
          onChange={setAgentNameAr}
        />
        <InputField
          label={
            lang === "ar" ? "اسم الوكيل (English)" : "Agent Name (English)"
          }
          required
          placeholder={lang === "ar" ? "اسم الوكيل " : "اسم الوكيل "}
          value={agentNameEn}
          onChange={setAgentNameEn}
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

      <InputField
        label={lang === "ar" ? "البريد الإلكتروني" : "Email"}
        required
        type="email"
        placeholder="example@email.com"
        value={email}
        onChange={setEmail}
        helper={
          lang === "ar"
            ? "سيتم إرسال رسالة التأكيد على هذا البريد"
            : "A confirmation will be sent to this email"
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PhoneInput
          label={lang === "ar" ? "رقم الهاتف" : "Phone Number"}
          required
          value={phone}
          dialCode={phoneCode}
          onValueChange={setPhone}
          onDialCodeChange={setPhoneCode}
          helper={
            lang === "ar"
              ? "أدخل رقم الجوال بدون رمز الدولة"
              : "Enter phone without country code"
          }
        />
        <PhoneInput
          label={lang === "ar" ? "رقم واتساب" : "WhatsApp"}
          required
          value={whatsapp}
          dialCode={whatsappCode}
          onValueChange={setWhatsapp}
          onDialCodeChange={setWhatsappCode}
          helper={
            lang === "ar"
              ? "سيتم إرسال رسالة التأكيد على هذا الرقم"
              : "A confirmation will be sent to this number"
          }
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
          className="w-full bg-[#00A8B5] text-white py-3.5 rounded-full font-bold text-sm md:text-base hover:opacity-90 active:scale-[0.99] transition  lg:w-fit px-9 cursor-pointer"
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
