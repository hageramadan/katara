import type { RegistrationUser } from "./types";

export function clearStoredAuthUser(): void {
  if (typeof window === "undefined") return;
  for (const key of ["token", "user"]) {
    try {
      window.localStorage.removeItem(key);
    } catch { /* Browser storage may be unavailable. */ }
  }
}

export function storeAuthUser(user: RegistrationUser): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("user", JSON.stringify({
      id: user.id, email: user.email, display_name: user.display_name, user_type: user.user_type,
      phone: user.phone, country_code: user.country_code, created_at: user.created_at, updated_at: user.updated_at,
    }));
  } catch { /* Browser storage may be unavailable. */ }
}

/** Restore display information locally; API authorization still uses the token. */
export function readStoredAuthUser(): RegistrationUser | null {
  if (typeof window === "undefined") return null;
  try {
    if (!window.localStorage.getItem("token")) return null;
    const user = JSON.parse(window.localStorage.getItem("user") ?? "null");
    if (!user || !["string", "number"].includes(typeof user.id) ||
      typeof user.email !== "string" || typeof user.display_name !== "string" ||
      typeof user.user_type !== "string") return null;
    const publicUser: RegistrationUser = { id: user.id, email: user.email, display_name: user.display_name, user_type: user.user_type };
    for (const key of ["phone", "country_code", "created_at", "updated_at"] as const) {
      if (typeof user[key] === "string") publicUser[key] = user[key];
    }
    return publicUser;
  } catch {
    return null;
  }
}

/** Persist the API token after a successful login or registration. */
export function storeAuthToken(token: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem("token", token);
    return true;
  } catch {
    // Storage restrictions must not turn a successful cookie login into a failure.
    return false;
  }
}
