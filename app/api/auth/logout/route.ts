import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ message: "Invalid origin" }, { status: 403, headers });
  }
  const response = NextResponse.json({ success: true }, { headers });
  const options = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: 0 };
  response.cookies.set("katara_session", "", options);
  response.cookies.set("katara_user", "", options);
  return response;
}
