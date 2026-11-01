import type { RegistrationField, RegistrationValues, RegistrationPayload, RegistrationType, RegistrationErrors } from "./types";

export function buildRegistrationPayload(
  type: RegistrationType, email: string, password: string,
  fields: RegistrationField[], values: RegistrationValues,
): RegistrationPayload {
  return {
    email: email.trim(), password, user_type: type,
    fields: fields.flatMap((field) => {
      const value = values[field.key];
      if (value === undefined || value === "" || (Array.isArray(value) && !value.length)) return [];
      // The agency_type field is advertised as multiselect but accepts a string.
      // Other multiselect fields, including services, require actual arrays.
      const serialized = Array.isArray(value)
        ? type === "agency_employee" && field.key === "agency_type"
          ? JSON.stringify(value.map(String))
          : value.map(String)
        : String(value);
      return [{ field_id: field.id, value: serialized }];
    }),
  };
}

export function validateRegistration(
  fields: RegistrationField[], values: RegistrationValues, email: string,
  password: string, confirmation: string, agreed: boolean, language: "ar" | "en",
): RegistrationErrors {
  const errors: RegistrationErrors = {};
  const required = language === "ar" ? "هذا الحقل مطلوب." : "This field is required.";
  for (const field of fields) {
    const value = values[field.key];
    const empty = value === undefined || (typeof value === "string" && !value.trim()) || (Array.isArray(value) && !value.length);
    if (field.is_required && empty) {
      errors[field.key] = [required];
    } else if (!empty && (field.type === "select" || field.type === "multiselect")) {
      const selected = Array.isArray(value) ? value : [value];
      if ((field.type === "multiselect" && !Array.isArray(value)) ||
        (field.type === "select" && Array.isArray(value)) ||
        selected.some((item) => !field.options.some((option) => option.value === item))) {
        errors[field.key] = [language === "ar" ? "اختاري قيمة من الخيارات المتاحة." : "Choose an available option."];
      }
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = [language === "ar" ? "أدخلي بريدًا إلكترونيًا صحيحًا." : "Enter a valid email address."];
  if (password.length < 8) errors.password = [language === "ar" ? "كلمة المرور يجب ألا تقل عن 8 أحرف أو أرقام." : "Password must have at least 8 characters."];
  if (!confirmation || password !== confirmation) errors.password_confirmation = [language === "ar" ? "تأكيد كلمة المرور غير مطابق." : "Passwords do not match."];
  if (!agreed) errors.terms = [language === "ar" ? "يجب الموافقة على الشروط والأحكام." : "Please accept the terms and conditions."];
  return errors;
}

// Indexed paths use submitted positions; field_<id> keys use schema field IDs.
export function mapRegistrationErrors(errors: RegistrationErrors, payload: RegistrationPayload, fields: RegistrationField[]): RegistrationErrors {
  const mapped: RegistrationErrors = {};
  for (const [key, messages] of Object.entries(errors)) {
    const match = /^fields\.(\d+)(?:\.value(?:\.\d+)?)?$/.exec(key);
    const submitted = match ? payload.fields[Number(match[1])] : undefined;
    const idMatch = /^field_(\d+)$/.exec(key);
    const fieldId = idMatch ? Number(idMatch[1]) : submitted?.field_id;
    const field = fields.find((item) => item.id === fieldId);
    const mappedKey = field?.key ?? key;
    mapped[mappedKey] = [...(mapped[mappedKey] ?? []), ...messages];
  }
  return mapped;
}

export function isRegistrationPayload(value: unknown): value is RegistrationPayload {
  if (typeof value !== "object" || value === null) return false;
  const body = value as RegistrationPayload;
  if (typeof body.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim()) ||
    typeof body.password !== "string" || body.password.length < 8 ||
    !Array.isArray(body.fields) || !body.fields.length) return false;
  const ids = new Set<number>();
  return body.fields.every((field) => {
    if (!field || !Number.isSafeInteger(field.field_id) || field.field_id <= 0 || ids.has(field.field_id)) return false;
    ids.add(field.field_id);
    return typeof field.value === "string" || (Array.isArray(field.value) && field.value.every((item) => typeof item === "string"));
  });
}

export function normalizeRegistrationErrors(value: unknown): RegistrationErrors {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).flatMap(([key, messages]) => {
    const list = typeof messages === "string" ? [messages] : Array.isArray(messages) ? messages.filter((message): message is string => typeof message === "string") : [];
    return list.length ? [[key, list]] : [];
  }));
}
