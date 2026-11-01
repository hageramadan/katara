import type { RegistrationField, RegistrationType, RegistrationPayload, RegistrationSuccess, RegistrationErrors, LoginPayload, AuthSuccess } from "./types";
import { normalizeRegistrationErrors } from "./registration";
import { parseRegistrationFields } from "./registration-schema";
import { parsePublicUser } from "./public-user";
import { storeAuthToken } from "@/lib/auth/storage";

function kataraUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_KATARA_API_BASE_URL ?? "https://katara.tawajood.com/api";
  return `${baseUrl.replace(/\/$/, "")}/${path}`;
}

export class RegistrationApiError extends Error {
  constructor(message: string, public errors: RegistrationErrors = {}) {
    super(message);
    this.name = "RegistrationApiError";
  }
}

export class LoginApiError extends Error {
  constructor(message: string, public errors: RegistrationErrors = {}) {
    super(message);
    this.name = "LoginApiError";
  }
}

export async function loginAccount(payload: LoginPayload, language: "ar" | "en"): Promise<AuthSuccess> {
  const fallback = language === "ar" ? "تعذر تسجيل الدخول. حاولي مرة أخرى." : "Unable to sign in. Please try again.";
  const response = await fetch(kataraUrl(`auth/login?lang=${language}`), {
    method: "POST", credentials: "omit", cache: "no-store",
    headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded", "Accept-Language": language },
    body: new URLSearchParams({ ...payload, email: payload.email.trim() }).toString(),
  });
  const body = await response.json();
  const message = typeof body?.message === "string" ? body.message : fallback;
  if (!response.ok || body?.result !== true) {
    throw new LoginApiError(message, normalizeRegistrationErrors(body?.errors ?? body?.data?.errors ?? body?.data));
  }
  const user = parsePublicUser(body.data?.user);
  const token = body.data?.user?.token;
  if (!user || typeof token !== "string" || !token) throw new LoginApiError(fallback);
  storeAuthToken(token);
  return { user, token, message: typeof body.message === "string" ? body.message : (language === "ar" ? "تم تسجيل الدخول بنجاح." : "Login successful.") };
}

export async function registerAccount(payload: RegistrationPayload, language: "ar" | "en"): Promise<RegistrationSuccess> {
  const fallback = language === "ar" ? "تعذر إنشاء الحساب. حاولي مرة أخرى." : "Unable to create your account. Please try again.";
  const response = await fetch(kataraUrl("auth/register"), {
    method: "POST", credentials: "omit", cache: "no-store",
    headers: { Accept: "application/json", "Content-Type": "application/json", "Accept-Language": language },
    body: JSON.stringify({ ...payload, email: payload.email.trim() }),
  });
  const body = await response.json();
  const message = typeof body?.message === "string" ? body.message : fallback;
  if (!response.ok || body?.result !== true) {
    throw new RegistrationApiError(message, normalizeRegistrationErrors(body?.errors ?? body?.data?.errors ?? body?.data));
  }
  const user = parsePublicUser(body.data?.user);
  const token = body.data?.user?.token;
  if (!user || typeof token !== "string" || !token) throw new RegistrationApiError(fallback);
  storeAuthToken(token);
  return { user, token, message: typeof body.message === "string" ? body.message : (language === "ar" ? "تم إنشاء الحساب بنجاح." : "Registration successful.") };
}

const pendingFields = new Map<string, Promise<RegistrationField[]>>();

export function getRegistrationFields(
  type: RegistrationType, language: "ar" | "en",
): Promise<RegistrationField[]> {
  const key = `${type}:${language}`;
  const pending = pendingFields.get(key);
  if (pending) return pending;

  // Share active requests across effect re-runs; allow fresh loads after settlement.
  const request = fetchRegistrationFields(type, language).finally(() => {
    pendingFields.delete(key);
  });
  pendingFields.set(key, request);
  return request;
}

async function fetchRegistrationFields(
  type: RegistrationType, language: "ar" | "en",
): Promise<RegistrationField[]> {
  const query = new URLSearchParams({ type });
  const response = await fetch(kataraUrl(`steps/all?${query}`), {
    headers: { Accept: "application/json", "Accept-Language": language },
    credentials: "omit", cache: "no-store",
  });
  if (!response.ok) throw new Error("Unable to load registration fields");
  return parseRegistrationFields(await response.json());
}
