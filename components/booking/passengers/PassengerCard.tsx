"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useBookingFlow } from "@/context/BookingFlowContext";
import type { BookingTraveler } from "@/lib/booking/types";
import { travelerTypes } from "@/lib/booking/data";
import PassengerContactFields from "./PassengerContactFields";
import PassengerDocumentFields from "./PassengerDocumentFields";
import InputField from "@/components/auth/common/InputField";
import DateField from "@/components/auth/common/DateField";
import SelectField from "@/components/auth/common/SelectField";
import { FiChevronDown, FiChevronUp, FiPaperclip, FiPlus, FiX } from "react-icons/fi";

type PassengerCardProps = {
  passenger: BookingTraveler;
  index: number;
  open: boolean;
  onToggle: () => void;
};

export default function PassengerCard({
  passenger,
  index,
  open,
  onToggle
}: PassengerCardProps) {
  const { lang } = useApp();
  const { travelers: passengers, updateTraveler } = useBookingFlow();
  const [documentOpen, setDocumentOpen] = useState(false);
  const {
    save,
    gender,
    file,
    firstName,
    lastName,
    details
  } = passenger;
  const setSave = (value: boolean) => updateTraveler(passenger.id, { save: value });
  const setGender = (value: string) => updateTraveler(passenger.id, { gender: value });
  const setFile = (value: string) => updateTraveler(passenger.id, { file: value });
  const setFirstName = (value: string) => updateTraveler(passenger.id, { firstName: value });
  const setLastName = (value: string) => updateTraveler(passenger.id, { lastName: value });
  const updateDetails = (field: keyof BookingTraveler["details"], value: string) => {
    updateTraveler(passenger.id, { details: { ...details, [field]: value } });
  };
  const name = firstName || lastName ? `${firstName} ${lastName}`.trim() : passenger.name;
  const id = `passenger-${index}`;
  return (
    <section className={`rounded-xl border border-slate-200 bg-white shadow-[0_3px_8px_#0d154b02] ${open ? "border-primary" : ""}`}>
      {/* ==================== Passenger Header + Save Details ==================== */}
      <div className="relative flex min-h-16 flex-col items-start sm:block">
        <button
          type="button"
          className="relative flex min-h-16 w-full items-center bg-transparent py-4 ps-4 pe-12 text-start text-primary sm:pe-40"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
        >
          {open
            ? (
              <span className="text-sm font-semibold">
                {`${(lang === "ar" ? travelerTypes[passenger.type].labelAr : travelerTypes[passenger.type].labelEn)} ${passenger.number}`}
              </span>
            )
            : (
              <span className="flex min-w-0 flex-col gap-0.5 break-words">
                <b
                  className="font-[family-name:var(--font-inter)] text-sm font-bold leading-normal sm:text-base"
                  dir="ltr"
                >{gender === "female" ? "MS" : "MR"}: {name}</b>
                <small className="text-xs text-slate-500">
                  {lang === "ar"
                    ? travelerTypes[passenger.type].labelAr
                    : travelerTypes[passenger.type].labelEn}
                  {index === 3 && (
                    <span> - <b
                      className="font-[family-name:var(--font-inter)]"
                      dir="ltr"
                    >MR: {details.guardian}</b></span>
                  )}
                </small>
              </span>
            )}

          <span className="absolute top-1/2 end-3 flex -translate-y-1/2 text-xl text-primary">
            {open ? <FiChevronUp /> : <FiChevronDown />}
          </span>
        </button>
        <button
          type="button"
          role="switch"
          aria-checked={save}
          aria-label={`${(lang === "ar" ? "حفظ البيانات خلال الجلسة للمسافر" : "Save details for this session for")} ${passenger.name}`}
          className="mx-4 mb-3 flex min-h-11 items-center gap-1.5 rounded-full bg-slate-50 px-2 py-2 text-xs text-primary sm:absolute sm:top-1/2 sm:end-11 sm:mx-0 sm:mb-0 sm:-translate-y-1/2 sm:gap-2.5 sm:px-3"
          onClick={() => setSave(!save)}
        >
          <span>
            {lang === "ar" ? "حفظ البيانات" : "Save details"}
          </span>
          <span className={`flex h-5 w-9 shrink-0 items-center justify-end rounded-full bg-slate-300 p-0.5 transition-colors ${save ? "!justify-start bg-[var(--color-primary)]!" : ""}`}>
            <span className="block size-3.5 rounded-full bg-white" />
          </span>
        </button>
      </div>
      <div
        id={id}
        hidden={!open}
      >
        <div className="px-3.5 sm:px-5">
          <div className="mt-3 mb-7 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center sm:gap-4">
            <strong
              className="min-w-0 max-w-full self-center break-words text-center font-[family-name:var(--font-inter)] text-lg font-bold sm:flex-1"
              dir="ltr"
            >{gender === "female" ? "MS" : "MR"}: {name}</strong>
            <label className="relative flex min-h-11 max-w-full cursor-pointer items-center justify-center gap-2 self-center overflow-hidden rounded-full border border-primary bg-primary-50 px-5 py-2 text-xs text-primary focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--color-primary)] sm:self-auto">
              <FiPaperclip />
              {lang === "ar" ? "رفع البيانات تلقائي" : "Upload traveler details"}
              <input
                className="absolute inset-0 w-full cursor-pointer opacity-0"
                type="file"
                accept="image/*,.pdf"
                onChange={(event) => setFile(event.target.files?.[0]?.name ?? "")}
              />
            </label>
          </div>
          {file && (
            <p className="mb-3 text-sm break-all text-slate-500">
              {lang === "ar" ? "الملف المختار:" : "Selected file:"}
              {file}
            </p>
          )}

          <div
            className="mb-6 flex gap-2"
            aria-label={lang === "ar" ? "النوع" : "Gender"}
          >
            <button
              type="button"
              aria-pressed={gender === "male"}
              className={`min-h-11 min-w-16 rounded-full border border-primary px-4 py-1.5 text-sm text-primary ${gender === "male" ? "bg-[var(--color-primary)]! !text-white" : ""}`}
              onClick={() => setGender("male")}
            >
              {lang === "ar" ? "ذكر" : "Male"}
            </button>
            <button
              type="button"
              aria-pressed={gender === "female"}
              className={`min-h-11 min-w-16 rounded-full border border-primary px-4 py-1.5 text-sm text-primary ${gender === "female" ? "bg-[var(--color-primary)]! !text-white" : ""}`}
              onClick={() => setGender("female")}
            >
              {lang === "ar" ? "أنثى" : "Female"}
            </button>
          </div>
          {/* ==================== Personal Details ==================== */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputField
              label={lang === "ar" ? "الاسم الأول" : "First name"}
              required
              placeholder={lang === "ar" ? "الاسم الأول" : "First name"}
              value={firstName}
              onChange={setFirstName}
            />
            <InputField
              label={lang === "ar" ? "اسم العائلة" : "Last name"}
              required
              placeholder={lang === "ar" ? "اسم العائلة" : "Last name"}
              value={lastName}
              onChange={setLastName}
            />
            <DateField
              label={lang === "ar" ? "تاريخ الميلاد" : "Date of birth"}
              required
              value={details.birthDate}
              onChange={(value) => updateDetails("birthDate", value)}
              max="2026-10-21"
            />
          </div>
          {index === 3 && (
            <div className="mt-4">
              <SelectField
                label={lang === "ar" ? "المسافر المرافق" : "Accompanying passenger"}
                value={details.guardian}
                onChange={(value) => updateDetails("guardian", value)}
                options={passengers.filter((person) => person.type === "adult").map((person) => ({ value: person.name, label: person.name }))}
              />
            </div>
          )}

          <PassengerContactFields
            details={details}
            onChange={updateDetails}
          />
          <button
            type="button"
            className="mt-5 flex w-full items-center justify-between gap-3 border-t border-slate-100 bg-transparent py-4 text-sm font-semibold text-primary"
            aria-expanded={documentOpen}
            aria-controls={`${id}-document`}
            onClick={() => setDocumentOpen(!documentOpen)}
          >
            {lang === "ar"
              ? "تفاصيل إضافية (وثيقة السفر)"
              : "Additional details (travel document)"}
            <span className="grid size-6 shrink-0 place-items-center rounded-full border border-slate-200 text-xl text-slate-400">
              {documentOpen ? <FiX /> : <FiPlus />}
            </span>
          </button>
          <div
            id={`${id}-document`}
            hidden={!documentOpen}
          >
            <PassengerDocumentFields
              details={details}
              onChange={updateDetails}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
