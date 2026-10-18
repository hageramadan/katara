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

// ✅ قائمة الخدمات كـ options للـ SelectField
const serviceTypes = [
  { value: "hotels", ar: "فنادق", en: "Hotels" },
  { value: "flights", ar: "رحلات طيران", en: "Flights" },
  { value: "visas", ar: "تأشيرات", en: "Visas" },
  { value: "cars", ar: "سيارات", en: "Cars" },
  { value: "cruises", ar: "رحلات بحرية", en: "Cruises" },
];

export default function BrokerForm() {
  const { lang } = useApp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [serviceType, setServiceType] = useState(""); // ✅ string بدل array
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("+965");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("+965");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [agreed, setAgreed] = useState(false);

  const clearAll = () => {
    setFirstName("");
    setLastName("");
    setServiceType(""); // ✅ تفريغ سلسلة نصية
    setPhone("");
    setCountry("");
    setEmail("");
    setWhatsapp("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
    setAgreed(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      serviceType,
      phone,
      country,
      email,
      whatsapp,
      password,
      username,
      agreed,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormHeader
        title={lang === "ar" ? "إنشاء حساب بروكر" : "Create Broker Account"}
        onClear={clearAll}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label={lang === "ar" ? "الاسم الأول" : "First Name"}
          required
          value={firstName}
          onChange={setFirstName}
        />
        <InputField
          label={lang === "ar" ? "اسم العائلة" : "Last Name"}
          required
          value={lastName}
          onChange={setLastName}
        />
      </div>

      {/* ✅ نوع الخدمة كـ SelectField */}
      <SelectField
        label={lang === "ar" ? "نوع الخدمة" : "Service Type"}
        required
        value={serviceType}
        onChange={setServiceType}
        placeholder={
          lang === "ar" ? "اختر نوع الخدمة..." : "Select service type..."
        }
        helper={
          lang === "ar"
            ? "اختر نوع الخدمة التي تقدمها"
            : "Choose the service you provide"
        }
        options={serviceTypes.map((s) => ({
          value: s.value,
          label: lang === "ar" ? s.ar : s.en,
        }))}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <PhoneInput
          label={lang === "ar" ? "رقم الجوال" : "Mobile Number"}
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
