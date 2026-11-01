import { NextResponse } from "next/server";
import { fetchKatara } from "@/lib/api/server";
import { isRegistrationType } from "@/lib/auth/types";
import { createAuthResponse } from "@/lib/auth/session";
import { normalizeRegistrationErrors } from "@/lib/auth/registration";

const headers = { "Cache-Control": "no-store" };

export async function POST(request: Request) {
  const language = new URL(request.url).searchParams.get("lang") ?? "ar";
  const fallback = language === "ar" ? "تعذر تسجيل الدخول. حاولي مرة أخرى." : "Unable to sign in. Please try again.";
  if (request.headers.get("origin") && request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ message: fallback }, { status: 403, headers });
  }
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: fallback }, { status: 400, headers });
  }
  if (!["ar", "en"].includes(language) || !payload || typeof payload.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim()) ||
    typeof payload.password !== "string" || !payload.password || !isRegistrationType(payload.user_type)) {
    return NextResponse.json({ message: fallback }, { status: 422, headers });
  }
  try {
    const upstream = await fetchKatara("auth/login", language, {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email: payload.email.trim(), password: payload.password, user_type: payload.user_type }).toString(),
    });
    const body = await upstream.json();
    if (!upstream.ok || body.result !== true) {
      const status = upstream.status >= 400 && upstream.status < 500 ? upstream.status : upstream.ok ? 401 : 502;
      return NextResponse.json({ message: typeof body.message === "string" ? body.message : fallback,
        errors: normalizeRegistrationErrors(body.errors ?? body.data?.errors ?? body.data),
      }, { status, headers });
    }
    return createAuthResponse(body.data?.user,
      typeof body.message === "string" ? body.message : (language === "ar" ? "تم تسجيل الدخول بنجاح." : "Login successful."), 200);
  } catch {
    return NextResponse.json({ message: fallback }, { status: 502, headers });
  }
}
