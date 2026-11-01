import { isRegistrationType } from "@/lib/auth/types";
import { parseRegistrationFields } from "@/lib/auth/registration-schema";
import { fetchKatara } from "@/lib/api/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const language = searchParams.get("lang") ?? "ar";
  const headers = { "Cache-Control": "no-store" };
  if (!isRegistrationType(type) || !["ar", "en"].includes(language)) {
    return Response.json({ message: "Invalid registration type or language" }, { status: 400, headers });
  }
  try {
    const response = await fetchKatara(`steps/all?type=${type}`, language);
    if (!response.ok) throw new Error("Registration service unavailable");
    const fields = parseRegistrationFields(await response.json());
    return Response.json({ fields }, { headers });
  } catch {
    return Response.json({ message: "Unable to load registration fields" }, { status: 502, headers });
  }
}
