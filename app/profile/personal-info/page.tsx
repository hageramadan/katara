"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { FiLock } from "react-icons/fi";
import FloatingLabelInput from "@/components/auth/common/FloatingLabelInput";
import FloatingLabelDate from "@/components/auth/common/FloatingLabelDate";
import FloatingLabelPhone from "@/components/auth/common/FloatingLabelPhone";
import { MdVpnKey } from "react-icons/md";

export default function PersonalInfoPage() {
  const { lang } = useApp();

  const [lastName, setLastName] = useState("Elrawy");
  const [firstName, setFirstName] = useState("Mo3tz");
  const [birthDate, setBirthDate] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("female");

  const [phone, setPhone] = useState("1068622014");
  const [phoneCode, setPhoneCode] = useState("+20");
  const [email, setEmail] = useState("mo3tzelrawy111@gmail.com");

  const [passportNumber, setPassportNumber] = useState("");
  const [passportExpiry, setPassportExpiry] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idExpiry, setIdExpiry] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ lastName, firstName, birthDate, nationality, gender, phone, phoneCode, email, passportNumber, passportExpiry, idNumber, idExpiry });
  };

  return (
    <form
      onSubmit={handleSave}
      className="bg-white rounded-2xl shadow-sm border border-[#DCE3EC] overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-[#DCE3EC]">
        <h1 className="text-lg md:text-xl font-bold text-[#0D0D0D] mb-2 lg:mb-4">
          {lang === "ar" ? "البيانات الشخصية" : "Personal Information"}
        </h1>
        {/* <p className="text-xs md:text-sm text-[#6F7E89]">
          {lang === "ar" ? "إدارة بياناتك الشخصية ومعلومات الاتصال" : "Manage your personal info"}
        </p> */}
      </div>

      {/* Section 1: Personal Details */}
      <div className="p-6 md:p-8 border-b border-[#DCE3EC]">
        <h2 className="text-base md:text-lg font-bold text-[#0D0D0D] mb-1 lg:mb-3">
          {lang === "ar" ? "تفاصيل شخصية" : "Personal Details"}
        </h2>
        <p className="text-[11px] md:text-xs text-[#A4A4A4] leading-relaxed mb-5">
          <span className="text-[#D1454A] font-bold">*</span>{" "}
          {lang === "ar" ?"جميع الحقول إلزامية. أدخل الأسماء تماما كما هي مسجلة في جواز سفرك/ بطاقتك وذلك لتفادي أي عقبات أثناء تسجيل الدخول.": "All fields are mandatory. Please enter your names exactly as they appear on your passport or ID card to avoid any issues during the check-in process."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-7">
          
          <FloatingLabelInput
            label={lang === "ar" ? "الإسم الأول" : "First Name"}
            required
            value={firstName}
            onChange={setFirstName}
          />
          <FloatingLabelInput
            label={lang === "ar" ? "اسم العائلة" : "Last Name"}
            required
            value={lastName}
            onChange={setLastName}
          />
          <FloatingLabelInput
            label={lang === "ar" ? "الجنسية" : "Nationality"}
            required
            value={nationality}
            onChange={setNationality}
          />
           <FloatingLabelDate
            label={lang === "ar" ? "تاريخ الميلاد" : "Birth Date"}
            required
            value={birthDate}
            onChange={setBirthDate}
          />
        </div>

        {/* Gender */}
        <div className="mt-4 lg:mt-6">
          <label className="block text-sm md:text-base font-semibold text-[#0D0D0D] mb-2 lg:mb-5">
            {lang === "ar" ? "الجنس" : "Gender"}
            <span className="text-[#D1454A] font-bold ms-1">*</span>
          </label>
          <div className="flex items-center gap-6">
            {[
              { value: "female", ar: "أنثى", en: "Female" },
              { value: "male", ar: "ذكر", en: "Male" },
            ].map((g) => {
              const active = gender === g.value;
              return (
                <label key={g.value} className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="radio" name="gender" value={g.value} checked={active} onChange={() => setGender(g.value)} className="sr-only" />
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${active ? "border-[#0D154B] bg-[#0D154B]" : "border-gray-300 bg-white"}`}>
                    {active && <span className="w-2 h-2 rounded-full bg-white" />}
                  </span>
                  <span className="text-sm md:text-base text-[#172B35] font-medium">
                    {lang === "ar" ? g.ar : g.en}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 2: Contact */}
      <div className="p-6 md:p-8 border-b border-[#DCE3EC]">
        <h2 className="text-base md:text-lg font-bold text-[#0D0D0D] mb-1 lg:mb-3">
          {lang === "ar" ? "معلومات الاتصال" : "Contact Information"}
        </h2>
        <p className="text-[11px] md:text-xs text-[#A4A4A4] leading-relaxed mb-5">
          {lang === "ar" ? "قم بملء معلومات الاتصال الخاصة بك لتجربة حجز أكثر سلاسة." : "Fill in your contact information for a smoother booking experience."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-3 lg:mt-6">
          <FloatingLabelPhone
            label={lang === "ar" ? "رقم الهاتف" : "Phone Number"}
            required
            value={phone}
            dialCode={phoneCode}
            onValueChange={setPhone}
            onDialCodeChange={setPhoneCode}
          />
          <FloatingLabelInput
            label={lang === "ar" ? "البريد الإلكتروني" : "Email"}
            required
            type="email"
            value={email}
            onChange={setEmail}
          />
        </div>
      </div>

      {/* Section 3: Travel Documents */}
      <div className="p-6 md:p-8 border-b border-[#DCE3EC]">
        <h2 className="text-base md:text-lg font-bold text-[#0D0D0D] mb-1 lg:mb-3">
          {lang === "ar" ? "ملفات السفر" : "Travel Documents"}
        </h2>
        <p className="text-[11px] md:text-xs text-[#A4A4A4] leading-relaxed mb-5">
          {lang === "ar" ? "يرجى التأكد من أنك تحمل وثائق صحيحة وصالحة. (اختياري)" : "Please ensure valid documents. (Optional)"}
        </p>

        <h3 className="text-sm md:text-base font-bold text-[#172B35] mb-3 flex items-center gap-2">
          
          {lang === "ar" ? "جواز السفر" : "Passport"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FloatingLabelInput
            label={lang === "ar" ? "رقم جواز السفر" : "Passport Number"}
            value={passportNumber}
            onChange={setPassportNumber}
          />
          <FloatingLabelDate
            label={lang === "ar" ? "تاريخ انتهاء الصلاحية" : "Expiry Date"}
            value={passportExpiry}
            onChange={setPassportExpiry}
          />
        </div>

        <h3 className="text-sm md:text-base font-bold text-[#172B35] mb-3 flex items-center gap-2">
          
          {lang === "ar" ? "الهوية الوطنية" : "National ID"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingLabelInput
            label={lang === "ar" ? "رقم الهوية الوطنية" : "National ID Number"}
            value={idNumber}
            onChange={setIdNumber}
          />
          <FloatingLabelDate
            label={lang === "ar" ? "تاريخ انتهاء الصلاحية" : "Expiry Date"}
            value={idExpiry}
            onChange={setIdExpiry}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 md:p-8 bg-[#FAFCFE] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center gap-2 border-2 border-[#0D154B] text-[#0D154B] font-semibold text-sm md:text-base px-6 py-3 rounded-xl hover:bg-[#0D154B] hover:text-white transition"
        >
          <MdVpnKey className="text-2xl" />
          {lang === "ar" ? "تغيير كلمة المرور" : "Change Password"}
        </button>
        <button
          type="submit"
          className="inline-flex items-center cursor-pointer justify-center gap-2 bg-[#0D154B] text-white font-bold text-sm md:text-base px-10 py-3 rounded-xl hover:opacity-90 active:scale-[0.99] transition"
        >
          {lang === "ar" ? "حفظ" : "Save"}
        </button>
      </div>
    </form>
  );
}