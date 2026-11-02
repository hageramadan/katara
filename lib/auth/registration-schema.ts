import type { RegistrationField, RegistrationOption } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeOptions(value: unknown): RegistrationOption[] {
  if (isRecord(value)) {
    return Object.entries(value).map(([key, label]) => {
      if (typeof label !== "string") throw new Error("Invalid field options");
      return { value: key, label };
    });
  }
  if (!Array.isArray(value)) throw new Error("Invalid field options");
  return value.map((option: unknown) => {
    if (!isRecord(option) || typeof option.label !== "string" ||
      (typeof option.value !== "string" && typeof option.value !== "number")) {
      throw new Error("Invalid field option");
    }
    return { value: option.value, label: option.label };
  });
}

// Validate the remote contract at the boundary instead of casting untrusted JSON.
export function parseRegistrationFields(payload: unknown): RegistrationField[] {
  if (!isRecord(payload) || payload.result !== true || !isRecord(payload.data) ||
    !Array.isArray(payload.data.fields) || !payload.data.fields.length) {
    throw new Error("Invalid registration fields response");
  }
  const keys = new Set<string>();
  const supported = ["text", "tel", "date", "email", "number", "select", "multiselect", "file"];
  return payload.data.fields.map((field: unknown): RegistrationField => {
    if (!isRecord(field) || typeof field.id !== "number" ||
      typeof field.key !== "string" || !/^[a-z][a-z0-9_]*$/.test(field.key) ||
      keys.has(field.key) || typeof field.label !== "string" ||
      typeof field.type !== "string" || !supported.includes(field.type) ||
      ![0, 1, false, true].includes(field.is_required as number | boolean) ||
      typeof field.sort_order !== "number") {
      throw new Error("Invalid registration field");
    }
    keys.add(field.key);
    return {
      id: field.id, key: field.key, label: field.label,
      type: field.type as RegistrationField["type"],
      is_required: Boolean(field.is_required),
      options: normalizeOptions(field.options), sort_order: field.sort_order,
    };
  }).sort((a, b) => a.sort_order - b.sort_order);
}
