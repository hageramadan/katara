import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { loadProjectModule } from "./helpers/load-project-module.mjs";

const { NextRequest } = createRequire(import.meta.url)("next/server");
const { POST } = loadProjectModule("app/api/auth/login/route.ts");
const { GET } = loadProjectModule("app/api/auth/session/route.ts");
const { userTypeByRole } = loadProjectModule("lib/auth/types.ts");
const url = "http://localhost:3000/api/auth/login?lang=en";
const payload = { email: " user@example.test ", password: " pass+&=word ", user_type: "member" };
const user = { id: 1, email: payload.email.trim(), display_name: "Test User", user_type: "member", token: "login-test-token",
  phone: "109859950522", country_code: "+20", created_at: "2026-10-28T21:48:42.000000Z", updated_at: "2026-10-29T08:00:00.000000Z" };
const send = (body = payload, headers = {}, endpoint = url) => POST(new Request(endpoint, {
  method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body),
}));

test("maps every sidebar role and forwards form fields with password characters intact", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.match(String(url), /\/auth\/login$/);
    assert.equal(init.method, "POST");
    assert.equal(init.headers.get("Accept-Language"), "en");
    assert.equal(init.headers.get("Content-Type"), "application/x-www-form-urlencoded");
    const fields = new URLSearchParams(init.body);
    assert.equal(fields.get("email"), payload.email.trim());
    assert.equal(fields.get("password"), payload.password);
    assert.deepEqual([...fields.keys()].sort(), ["email", "password", "user_type"]);
    return Response.json({ result: true, errNum: 200, message: "Login successful.", data: { user: { ...user, user_type: fields.get("user_type") } } });
  });
  assert.deepEqual(Object.values(userTypeByRole).sort(), ["member", "agency_employee", "broker", "travel_company", "company", "third_party_partner"].sort());
  for (const user_type of Object.values(userTypeByRole)) {
    const response = await send({ ...payload, user_type });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.user.user_type, user_type);
    assert.equal(body.user.phone, user.phone);
    assert.equal(body.user.country_code, user.country_code);
    assert.equal(body.user.created_at, user.created_at);
    assert.equal(body.token, user.token);
    assert.equal(body.user.token, undefined);
    assert.match(response.headers.get("set-cookie"), /HttpOnly/i);
    assert.match(response.headers.get("set-cookie"), /SameSite=lax/i);
    assert.equal(response.headers.get("cache-control"), "no-store");
  }
});

test("invalid credentials and validation failures do not set or replace session cookies", async (t) => {
  for (const status of [200, 401, 422, 429]) {
    t.mock.method(globalThis, "fetch", async () => Response.json({ result: false, message: "Invalid credentials", errors: { email: ["Invalid credentials"] } }, { status }));
    const response = await send();
    assert.equal(response.status, status === 200 ? 401 : status);
    assert.equal(response.headers.get("set-cookie"), null);
    assert.equal((await response.json()).errors.email[0], "Invalid credentials");
  }
});

test("rejects invalid inputs, unsupported languages and cross-origin requests without calling upstream", async (t) => {
  const mocked = t.mock.method(globalThis, "fetch", () => { throw new Error("Must not call upstream"); });
  for (const body of [null, {}, { ...payload, email: "invalid" }, { ...payload, password: "" }, { ...payload, user_type: "admin" }]) {
    assert.equal((await send(body)).status, 422);
  }
  assert.equal((await send(payload, {}, url.replace("lang=en", "lang=fr"))).status, 422);
  assert.equal((await send(payload, { Origin: "https://other.test" })).status, 403);
  assert.equal((await POST(new Request(url, { method: "POST", body: "{" }))).status, 400);
  assert.equal(mocked.mock.callCount(), 0);
});

test("handles connection errors, HTML error pages and missing tokens without creating a session", async (t) => {
  for (const upstream of [
    () => { throw new Error("Offline"); },
    () => new Response("Unavailable", { status: 503 }),
    () => Response.json({ result: true, data: { user: { ...user, token: null } } }),
  ]) {
    t.mock.method(globalThis, "fetch", upstream);
    const response = await send();
    assert.equal(response.status, 502);
    assert.equal(response.headers.get("set-cookie"), null);
  }
});

test("restores only public user metadata and requires a session token cookie", async () => {
  const cookie = `katara_session=${user.token}; katara_user=${encodeURIComponent(JSON.stringify(user))}`;
  const response = await GET(new NextRequest("http://localhost:3000/api/auth/session", { headers: { cookie } }));
  const body = await response.json();
  assert.equal(body.user.display_name, user.display_name);
  assert.equal(body.user.token, undefined);
  for (const cookie of ["", `katara_user=${encodeURIComponent(JSON.stringify(user))}`, "katara_session=token; katara_user=invalid"]) {
    const response = await GET(new NextRequest("http://localhost:3000/api/auth/session", { headers: { cookie } }));
    assert.equal((await response.json()).user, null);
  }
});

test("session cookies are Secure in production", async (t) => {
  const previous = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  t.after(() => { if (previous === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = previous; });
  t.mock.method(globalThis, "fetch", () => Response.json({ result: true, data: { user } }));
  assert.match((await send()).headers.get("set-cookie"), /Secure/);
});
