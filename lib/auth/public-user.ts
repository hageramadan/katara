import { isRegistrationType, type RegistrationUser } from "./types";

export function parsePublicUser(value: unknown): RegistrationUser | null {
  if (!value || typeof value !== "object") return null;
  const user = value as Record<string, unknown>;
  if (!["string", "number"].includes(typeof user.id) || typeof user.email !== "string" ||
    typeof user.display_name !== "string" || !isRegistrationType(user.user_type)) return null;
  const publicUser: RegistrationUser = { id: user.id as string | number, email: user.email, display_name: user.display_name, user_type: user.user_type };
  for (const key of ["phone", "country_code", "created_at", "updated_at"] as const) {
    if (typeof user[key] === "string") publicUser[key] = user[key];
  }
  return publicUser;
}
