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

export default function MemberForm() {
  const { lang } = useApp();

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [landline, setLandline] = useState("");
  const [landlineCode, setLandlineCode] = useState("+965");
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("+965");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("+965");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const clearAll = () => {
    setLastName("");
    setFirstName("");
    setCountry("");
    setEmail("");
    setGender("");
    setBirthDate("");
    setLandline("");
    setLandlineCode("+965");
    setWhatsapp("");
    setWhatsappCode("+965");
    setPhone("");
    setPhoneCode("+965");
    setPassword("");
    setConfirmPassword("");
    setAgreed(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      lastName,
      firstName,
      country,
      email,
      gender,
      birthDate,
      landline,
      landlineCode,
      whatsapp,
      whatsappCode,
      phone,
      phoneCode,
      agreed,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-6">
      <FormHeader
        title={lang === "ar" ? "إنشاء حساب عضو" : "Create Member Account"}
        onClear={clearAll}
      />

      <div className="mb-3 grid grid-cols-1 gap-4 md:mb-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,2fr)]">
        <SelectField
          label={lang === "ar" ? "النوع" : "Gender"}
          required
          value={gender}
          onChange={setGender}
          placeholder={lang === "ar" ? "حدد النوع" : "Select gender"}
          options={[
            { value: "male", label: lang === "ar" ? "ذكر" : "Male" },
            { value: "female", label: lang === "ar" ? "أنثى" : "Female" },
          ]}
        />
        <InputField
          label={lang === "ar" ? "الاسم الأول" : "First Name"}
          required
          placeholder={lang === "ar" ? "الاسم الأول" : "First name"}
          value={firstName}
          onChange={setFirstName}
        />
        <InputField
          label={lang === "ar" ? "الاسم الأخير" : "Last Name"}
          required
          placeholder={lang === "ar" ? "اسم العائلة" : "Last name"}
          value={lastName}
          onChange={setLastName}
        />
      </div>

      {/* البريد + الدولة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* البريد */}
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
        {/* تاريخ الميلاد */}
        <DateField
          label={lang === "ar" ? "تاريخ الميلاد" : "Birth Date"}
          required
          value={birthDate}
          onChange={setBirthDate}
        />
        <PhoneInput
          label={lang === "ar" ? "رقم الأرضي" : "Landline"}
          required
          value={landline}
          dialCode={landlineCode}
          onValueChange={setLandline}
          onDialCodeChange={setLandlineCode}
        />
        <PhoneInput
          label={lang === "ar" ? "رقم الهاتف" : "Phone Number"}
          required
          value={phone}
          dialCode={phoneCode}
          onValueChange={setPhone}
          onDialCodeChange={setPhoneCode}
        />
        {/* واتساب + هاتف */}
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
      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2">
        {/* الباسورد + تأكيد */}

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
          className="w-full lg:w-fit px-9 rounded-full  bg-[#00A8B5] text-white py-3 cursor-pointer hover:scale-105  font-bold text-sm md:text-base hover:opacity-90 active:scale-[0.99] transition  "
        >
          {lang === "ar" ? "إنشاء الحساب" : "Create Account"}
          <FaTelegramPlane className="inline-block ms-2 w-5 h-5" />
        </button>
      </div>
      {/* Submit */}
    </form>
  );
}
