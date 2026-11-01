// Used only by route handlers. The upstream address never comes from user input.
export function fetchKatara(path: string, language: string, init: RequestInit = {}) {
  const baseUrl = process.env.KATARA_API_BASE_URL ?? "https://katara.tawajood.com/api";
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  headers.set("Accept-Language", language);
  return fetch(`${baseUrl.replace(/\/$/, "")}/${path}`, {
    ...init, cache: "no-store",
    headers,
  });
}
