import { NextResponse } from "next/server";
import { parsePublicUser } from "@/lib/auth/public-user";
export { parsePublicUser } from "@/lib/auth/public-user";

export function createAuthResponse(value: unknown, message: string, status: number) {
  const user = parsePublicUser(value);
  const token = value && typeof value === "object" && "token" in value ? value.token : null;
  if (!user || typeof token !== "string" || !token) throw new Error("Invalid authentication response");
  const response = NextResponse.json({ user, token, message }, { status, headers: { "Cache-Control": "no-store" } });
  const options = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/" };
  response.cookies.set("katara_session", token, options);
  // Display metadata only. Never use this cookie to authorize API operations.
  response.cookies.set("katara_user", JSON.stringify(user), options);
  return response;
}
