import type { RegistrationField, RegistrationValues } from "./types";

export function phoneCountryName(label: string): string {
  return label.replace(/\s*\(\+\d+\)\s*$/, "").trim();
}

export function updateRegistrationField(
  fields: RegistrationField[], previous: RegistrationValues,
  key: string, value: RegistrationValues[string],
): RegistrationValues {
  const next = { ...previous, [key]: value };
  const linkedCodeKeys = ["landline_country_code", "phone_country_code", "whatsapp_country_code"];
  if (linkedCodeKeys.includes(key)) {
    for (const field of fields) {
      if (linkedCodeKeys.includes(field.key)) next[field.key] = value;
    }
  }
  if (key !== "country_id") return next;
  const selected = fields.find((field) => field.key === key)?.options
    .find((option) => String(option.value) === String(value));
  if (!selected) return next;
  for (const field of fields) {
    if (!field.key.endsWith("_country_code")) continue;
    const code = field.options.find((option) => phoneCountryName(option.label) === selected.label.trim());
    if (code) next[field.key] = code.value;
  }
  return next;
}
