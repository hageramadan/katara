import { NextRequest, NextResponse } from "next/server";
import { parsePublicUser } from "@/lib/auth/session";

// Restores display information only; upstream APIs still authenticate the token.
export async function GET(request: NextRequest) {
  let user = null;
  try {
    if (request.cookies.get("katara_session")?.value) {
      user = parsePublicUser(JSON.parse(request.cookies.get("katara_user")?.value ?? "null"));
    }
  } catch { /* Malformed metadata is treated as signed out in the UI. */ }
  return NextResponse.json({ user }, { headers: { "Cache-Control": "no-store" } });
}
