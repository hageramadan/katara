"use client";

import { useId } from "react";
import { useApp } from "@/context/AppContext";
import type { RegistrationField as Field, RegistrationValues } from "@/lib/auth/types";
import SelectField from "../common/SelectField";
import MultiSelectField from "../common/MultiSelectField";

type Props = {
  field: Field;
  value: RegistrationValues[string] | undefined;
  onChange: (value: RegistrationValues[string]) => void;
  error?: string;
};

const inputClass = "w-full rounded-[10px] border border-[#DCE3EC] bg-[#FAFCFE] px-4 py-3 text-sm font-medium text-[#0D154B] outline-none focus:ring-2 focus:ring-[#0D154B]/20 disabled:opacity-60";

export default function RegistrationField({ field, value, onChange, error }: Props) {
  const { lang } = useApp();
  const id = useId();
  const label = <>{field.label}{field.is_required && <span aria-hidden="true" className="ms-1 text-[#D1454A]">*</span>}</>;
  const emptyOptions = ["select", "multiselect"].includes(field.type) && !field.options.length;
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : undefined;
  const options = field.options.map((option) => ({ value: String(option.value), label: option.label }));
  const helper = emptyOptions ? (lang === "ar" ? "لا توجد خيارات متاحة حاليًا" : "No options are currently available") : undefined;

  if (field.type === "select") return (
    <SelectField label={field.label} name={field.key} required={field.is_required}
      value={Array.isArray(value) ? "" : String(value ?? "")} options={options}
      disabled={emptyOptions} error={error} helper={helper}
      onChange={(selected) => onChange(field.options.find((option) => String(option.value) === selected)?.value ?? "")} />
  );

  if (field.type === "multiselect") {
    return (
      <MultiSelectField label={field.label} required={field.is_required}
        value={Array.isArray(value) ? value.map(String) : []} options={options}
        disabled={emptyOptions} error={error} helper={helper}
        onChange={(selected) => onChange(field.options.filter((option) => selected.includes(String(option.value))).map((option) => option.value))} />
    );
  }

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold text-[#1E2A3A] md:text-sm">{label}</label>
      <input id={id} name={field.key} type={field.type} required={field.is_required}
          aria-invalid={Boolean(error)} aria-describedby={describedBy}
          className={inputClass} value={Array.isArray(value) ? "" : value ?? ""}
          dir={field.type === "tel" || field.key.endsWith("_country_code") ? "ltr" : undefined}
          onChange={(event) => onChange(event.target.value)} />
      {error && <p id={errorId} className="mt-1.5 text-xs text-red-700">{error}</p>}
    </div>
  );
}
