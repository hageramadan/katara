import { NextResponse } from "next/server";
import { fetchKatara } from "@/lib/api/server";
import { isRegistrationType } from "@/lib/auth/types";
import { isRegistrationPayload, normalizeRegistrationErrors } from "@/lib/auth/registration";
import { createAuthResponse } from "@/lib/auth/session";

const headers = { "Cache-Control": "no-store" };

export async function POST(request: Request) {
  const language = new URL(request.url).searchParams.get("lang") ?? "ar";
  const fallback = language === "ar" ? "تعذر إنشاء الحساب. حاولي مرة أخرى." : "Unable to create your account. Please try again.";
  if (request.headers.get("origin") && request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ message: fallback }, { status: 403, headers });
  }
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: fallback }, { status: 400, headers });
  }
  if (!["ar", "en"].includes(language) || !isRegistrationPayload(payload) || !isRegistrationType(payload.user_type)) {
    return NextResponse.json({ message: fallback }, { status: 422, headers });
  }
  try {
    const upstream = await fetchKatara("auth/register", language, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: payload.email.trim(), password: payload.password, user_type: payload.user_type,
        fields: payload.fields.map(({ field_id, value }) => ({ field_id, value })),
      }),
    });
    const body = await upstream.json();
    if (!upstream.ok || body.result !== true) {
      const status = upstream.status >= 400 && upstream.status < 500 ? upstream.status : upstream.ok ? 422 : 502;
      return NextResponse.json({
        message: typeof body.message === "string" ? body.message : fallback,
        errors: normalizeRegistrationErrors(body.errors ?? body.data?.errors ?? body.data),
      }, { status, headers });
    }
    return createAuthResponse(body.data?.user,
      typeof body.message === "string" ? body.message : (language === "ar" ? "تم إنشاء الحساب بنجاح." : "Registration successful."), 201);
  } catch {
    return NextResponse.json({ message: fallback }, { status: 502, headers });
  }
}
