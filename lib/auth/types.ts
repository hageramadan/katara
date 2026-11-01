export const registrationTypes = [
  "member", "agency_employee", "broker", "travel_company", "company", "third_party_partner",
] as const;

export type RegistrationType = (typeof registrationTypes)[number];
export type AuthRoleKey = "members" | "agents" | "travelCompanies" | "brokers" | "companies" | "partners";
export const userTypeByRole: Record<AuthRoleKey, RegistrationType> = {
  members: "member", agents: "agency_employee", travelCompanies: "travel_company",
  brokers: "broker", companies: "company", partners: "third_party_partner",
};
export type LoginPayload = { email: string; password: string; user_type: RegistrationType };
export type RegistrationOption = { value: string | number; label: string };
export type RegistrationField = {
  id: number;
  key: string;
  label: string;
  type: "text" | "tel" | "date" | "email" | "number" | "select" | "multiselect";
  is_required: boolean;
  options: RegistrationOption[];
  sort_order: number;
};
export type RegistrationValues = Record<string, string | number | (string | number)[]>;

export type RegistrationPayload = {
  email: string;
  password: string;
  user_type: RegistrationType;
  fields: { field_id: number; value: string | string[] }[];
};

export type RegistrationUser = {
  id: string | number;
  email: string;
  display_name: string;
  user_type: string;
  phone?: string;
  country_code?: string;
  created_at?: string;
  updated_at?: string;
};

export type RegistrationSuccess = { message: string; user: RegistrationUser; token: string };
export type AuthSuccess = RegistrationSuccess;
export type RegistrationErrors = Record<string, string[]>;

export function isRegistrationType(value: unknown): value is RegistrationType {
  return registrationTypes.some((type) => type === value);
}
