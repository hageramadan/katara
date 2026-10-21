"use client";
import { useApp } from "@/context/AppContext";
import { useBookingFlow } from "@/context/BookingFlowContext";
import InputField from "@/components/auth/common/InputField";

export default function BookingContact() {
  const { lang } = useApp();
  const { contact, updateContact } = useBookingFlow();
  const isTraveler = contact.isTraveler;
  const setIsTraveler = (value: boolean) => updateContact({ isTraveler: value });
  const bookerName = contact.name;
  const bookerEmail = contact.email;
  const setBookerName = (value: string) => updateContact({ name: value });
  const setBookerEmail = (value: string) => updateContact({ email: value });
  return (
    <>
      {/* ==================== Booking Contact ==================== */}
      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 p-4.5 xl:flex-row xl:items-center [&>p]:text-sm [&>p]:font-semibold sm:[&>p]:text-base [&>div]:flex [&>div]:gap-2.5 [&_button]:min-h-11 [&_button]:min-w-14 [&_button]:rounded-full [&_button]:border [&_button]:border-slate-200 [&_button]:px-4 [&_button]:py-2 [&_button]:text-sm [&_button]:text-slate-500">
        <p>
          {lang === "ar"
            ? "هل الشخص الذي يدخل البيانات هو المسافر؟"
            : "Is the person entering these details a passenger?"}
        </p>
        <div>
          <button
            type="button"
            aria-pressed={isTraveler}
            className={isTraveler
              ? "border-[var(--color-secondary)]! bg-[var(--color-secondary-soft)]! text-[var(--color-primary)]!"
              : ""}
            onClick={() => setIsTraveler(true)}
          >
            {lang === "ar" ? "نعم" : "Yes"}
          </button>
          <button
            type="button"
            aria-pressed={!isTraveler}
            className={!isTraveler
              ? "border-[var(--color-secondary)]! bg-[var(--color-secondary-soft)]! text-[var(--color-primary)]!"
              : ""}
            onClick={() => setIsTraveler(false)}
          >
            {lang === "ar" ? "لا" : "No"}
          </button>
        </div>
      </div>
      {!isTraveler && (
        <div className="mt-4 rounded-xl border border-slate-200 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputField
              label={lang === "ar" ? "اسم مسؤول الحجز" : "Booking contact name"}
              placeholder={lang === "ar" ? "الاسم الكامل" : "Full name"}
              value={bookerName}
              onChange={setBookerName}
            />
            <InputField
              className="[&_input]:text-left [&_input]:[direction:ltr]"
              label={lang === "ar" ? "البريد الإلكتروني للتواصل" : "Contact email address"}
              type="email"
              placeholder="example@email.com"
              value={bookerEmail}
              onChange={setBookerEmail}
            />
          </div>
        </div>
      )}
    </>
  );
}
