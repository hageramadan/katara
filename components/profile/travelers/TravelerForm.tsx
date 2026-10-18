"use client";
import { useApp } from "@/context/AppContext";
import { TravelerData } from "@/lib/travelers/types";
import FloatingLabelInput from "@/components/auth/common/FloatingLabelInput";
import FloatingLabelDate from "@/components/auth/common/FloatingLabelDate";
import FloatingLabelPhone from "@/components/auth/common/FloatingLabelPhone";
import { FaTrash } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

type TravelerFormProps = {
  traveler: TravelerData;
  onChange: (updated: TravelerData) => void;
};

export default function TravelerForm({ traveler, onChange }: TravelerFormProps) {
  const { lang } = useApp();

  // helper
  const update = <K extends keyof TravelerData>(key: K, value: TravelerData[K]) => {
    onChange({ ...traveler, [key]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#DCE3EC] overflow-hidden">

      {/* ==================== Section 1: Personal Details ==================== */}
      <div className="p-6 md:p-8 border-b border-[#DCE3EC]">
        <h2 className="text-lg md:text-xl font-bold text-[#0D0D0D] mb-2 md:mb-5 ">
          {lang === "ar" ? "البيانات الشخصية" : "Personal Information"}
        </h2>
        <h3 className="text-sm md:text-base font-bold text-[#172B35] mb-2">
          {lang === "ar" ? "تفاصيل شخصية" : "Personal Details"}
        </h3>
        <p className="text-[11px] md:text-xs text-[#A4A4A4] leading-relaxed mb-10">
          <span className="text-[#D1454A] font-bold">*</span>{" "}
          {lang === "ar"
            ? "جميع الحقول إلزامية. أدخل الأسماء تمامًا كما هي مسجلة في جواز سفرك / بطاقتك، وذلك لتفادي أي عقبات أثناء تسجيل الدخول."
            : "All fields are required. Enter names exactly as they appear on your passport/ID to avoid any issues during check-in."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingLabelInput
            label={lang === "ar" ? "الإسم الأول" : "First Name"}
            required
            value={traveler.firstName}
            onChange={(v) => update("firstName", v)}
          />
          <FloatingLabelInput
            label={lang === "ar" ? "إسم العائلة" : "Last Name"}
            required
            value={traveler.lastName}
            onChange={(v) => update("lastName", v)}
          />
         
          
          <FloatingLabelInput
            label={lang === "ar" ? "الجنسية" : "Nationality"}
            required
            value={traveler.nationality}
            onChange={(v) => update("nationality", v)}
          />
          <FloatingLabelDate
            label={lang === "ar" ? "تاريخ الميلاد" : "Birth Date"}
            required
            value={traveler.birthDate}
            onChange={(v) => update("birthDate", v)}
          />
        </div>

        {/* Gender */}
        <div className="mt-8">
          <label className="block text-xs md:text-sm font-semibold text-[#1E2A3A] mb-2">
            {lang === "ar" ? "الجنس" : "Gender"}
            <span className="text-[#D1454A] font-bold ms-1">*</span>
          </label>
          <div className="flex items-center gap-6">
            {[
              { value: "female" as const, ar: "أنثى", en: "Female" },
              { value: "male" as const, ar: "ذكر", en: "Male" },
            ].map((g) => {
              const active = traveler.gender === g.value;
              return (
                <label
                  key={g.value}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="radio"
                    name={`gender-${traveler.id}`}
                    value={g.value}
                    checked={active}
                    onChange={() => update("gender", g.value)}
                    className="sr-only"
                  />
                  <span
                    className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center transition
                      ${
                        active
                          ? "border-[#0D154B] bg-[#0D154B]"
                          : "border-gray-300 bg-white"
                      }
                    `}
                  >
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

      {/* ==================== Section 2: Contact ==================== */}
      <div className="p-6 md:p-8 border-b border-[#DCE3EC]">
        <h2 className="text-base md:text-lg font-bold text-[#0D0D0D] mb-2 ">
          {lang === "ar" ? "معلومات الاتصال" : "Contact Information"}
        </h2>
        <p className="text-[11px] md:text-xs text-[#A4A4A4] leading-relaxed mb-10">
          {lang === "ar"
            ? "قم بملء معلومات الاتصال الخاصة بك لتجربة حجز أكثر سلاسة."
            : "Fill in your contact info for a smoother booking experience."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 lg:gap-6">
          <FloatingLabelPhone
            label={lang === "ar" ? "رقم الهاتف" : "Phone Number"}
            required
            value={traveler.phone}
            dialCode={traveler.dialCode}
            onValueChange={(v) => update("phone", v)}
            onDialCodeChange={(v) => update("dialCode", v)}
          />
          <FloatingLabelInput
            label={lang === "ar" ? "البريد الإلكتروني" : "Email"}
            required
            type="email"
            value={traveler.email}
            onChange={(v) => update("email", v)}
          />
        </div>
      </div>

      {/* ==================== Section 3: Travel Documents ==================== */}
      <div className="p-6 md:p-8">
        <h2 className="text-base md:text-lg font-bold text-[#0D0D0D] mb-2 ">
          {lang === "ar" ? "ملفات السفر" : "Travel Documents"}
        </h2>
        <p className="text-[11px] md:text-xs text-[#A4A4A4] leading-relaxed mb-10">
          {lang === "ar"
            ? "يرجى التأكد من أنك تحمل وثائق صحيحة وصالحة. (اختياري)"
            : "Please ensure you carry valid documents. (Optional)"}
        </p>

        <h3 className="text-sm md:text-base font-bold text-[#172B35] mb-3 flex items-center gap-2">
          
          {lang === "ar" ? "جواز السفر" : "Passport"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FloatingLabelInput
            label={lang === "ar" ? "رقم جواز السفر" : "Passport Number"}
            value={traveler.passportNumber}
            onChange={(v) => update("passportNumber", v)}
          />
          <FloatingLabelDate
            label={lang === "ar" ? "تاريخ انتهاء الصلاحية" : "Expiry Date"}
            value={traveler.passportExpiry}
            onChange={(v) => update("passportExpiry", v)}
          />
        </div>

        <h3 className="text-sm md:text-base font-bold text-[#172B35] mb-3 flex items-center gap-2">
          
          {lang === "ar" ? "الهوية الوطنية" : "National ID"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingLabelInput
            label={lang === "ar" ? "رقم الهوية الوطنية" : "National ID Number"}
            value={traveler.nationalIdNumber}
            onChange={(v) => update("nationalIdNumber", v)}
          />
          <FloatingLabelDate
            label={lang === "ar" ? "تاريخ انتهاء الصلاحية" : "Expiry Date"}
            value={traveler.nationalIdExpiry}
            onChange={(v) => update("nationalIdExpiry", v)}
          />
        </div>
      </div>

       {/* ==================== Actions ==================== */}
      <div className="p-6 md:p-8  flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">

       

        {/* Add + Save (right) */}
        <div className="flex flex-col sm:flex-row gap-3">
           {/* Delete (left) */}
        <button
          type="button"
       
          className="
          cursor-pointer
            inline-flex items-center justify-center gap-2
            bg-[#FC0F151A] text-[#D1454A] font-bold
            text-sm md:text-base px-6 py-3 rounded-xl
            hover:bg-[#D1454A] hover:text-white transition
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#D1454A]
          "
        >
          <FaTrash/>
         
          {lang === "ar" ? "حذف المسافر" : "Delete Traveler"}
        </button>
          <button
            type="button"
            
            className="
              inline-flex items-center justify-center gap-2
              cursor-pointer
               text-[#0D154B] font-bold
              text-sm md:text-base px-6 py-3 rounded-xl
               hover:bg-[#0D154B] hover:text-white transition
              disabled:opacity-40 disabled:cursor-not-allowed
              bg-[#E7F7F7]
            "
          >
           <FaCirclePlus/>
            {lang === "ar" ? "أضف مسافر آخر" : "Add Another Traveler"}
          </button>

          <button
            type="button"
           
            className="
            cursor-pointer
              inline-flex items-center justify-center gap-2
              bg-[#0D154B] text-white font-bold
              text-sm md:text-base px-10 py-3 rounded-xl border border-white
              hover:bg-white hover:text-[#0D154B] hover:border-[#0D154B]/40 active:scale-[0.99] transition
            "
          >
          
            {lang === "ar" ? "حفظ" : "Save"}
          </button>
        </div>
      </div>

    </div>
  );
}