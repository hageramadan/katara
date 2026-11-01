import assert from "node:assert/strict";
import test from "node:test";
import { loadProjectModule } from "./helpers/load-project-module.mjs";

const { POST } = loadProjectModule("app/api/auth/register/route.ts");
const url = "http://localhost:3000/api/auth/register?lang=en";
const payload = { email: "success@example.test", password: "test1234", user_type: "member", fields: [{ field_id: 5, value: "1" }] };
const send = (body, headers = {}) => POST(new Request(url, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) }));

test("forwards all six types and returns a token for browser storage alongside the session cookie", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.match(String(url), /\/auth\/register$/);
    assert.equal(init.headers.get("Accept-Language"), "en");
    assert.equal(init.method, "POST");
    const body = JSON.parse(init.body);
    assert.deepEqual(body.fields, payload.fields);
    assert.equal(body.password, payload.password);
    assert.equal(body.email, payload.email);
    return Response.json({ result: true, errNum: 201, message: "Registration successful.", data: {
      user: { id: 42, email: body.email, display_name: "Test User", user_type: body.user_type, token: "test-only-token" },
    } }, { status: 201 });
  });
  for (const user_type of ["member", "agency_employee", "broker", "travel_company", "company", "third_party_partner"]) {
    const response = await send({ ...payload, user_type });
    assert.equal(response.status, 201);
    assert.equal(response.headers.get("cache-control"), "no-store");
    const cookie = response.headers.get("set-cookie");
    assert.match(cookie, /katara_session=test-only-token/);
    assert.match(cookie, /HttpOnly/i);
    assert.match(cookie, /SameSite=lax/i);
    const body = await response.json();
    assert.equal(body.user.user_type, user_type);
    assert.equal(body.user.token, undefined);
    assert.equal(body.token, "test-only-token");
  }
});

test("preserves API validation errors for both HTTP and business failures", async (t) => {
  for (const status of [200, 422]) {
    t.mock.method(globalThis, "fetch", async () => Response.json({
      result: false, errNum: 422, message: "Email already exists", errors: { email: ["Email already exists"] },
    }, { status }));
    const response = await send(payload);
    assert.equal(response.status, 422);
    assert.equal(response.headers.get("set-cookie"), null);
    assert.deepEqual((await response.json()).errors.email, ["Email already exists"]);
  }
});

test("rejects malformed input, unknown types and cross-origin requests before forwarding", async (t) => {
  const mocked = t.mock.method(globalThis, "fetch", () => { throw new Error("Must not call upstream"); });
  assert.equal((await send({})).status, 422);
  assert.equal((await send({ ...payload, user_type: "admin" })).status, 422);
  assert.equal((await send(payload, { Origin: "https://other.example" })).status, 403);
  assert.equal((await POST(new Request(url, { method: "POST", body: "invalid JSON" }))).status, 400);
  assert.equal(mocked.mock.callCount(), 0);
});

test("handles unavailable, non-JSON and incomplete upstream responses without setting a cookie", async (t) => {
  for (const upstream of [
    () => { throw new Error("Connection failed"); },
    () => new Response("Unavailable", { status: 503 }),
    () => Response.json({ result: true, data: { user: { id: 42 } } }),
  ]) {
    t.mock.method(globalThis, "fetch", upstream);
    const response = await send(payload);
    assert.equal(response.status, 502);
    assert.equal(response.headers.get("set-cookie"), null);
    assert.equal(typeof (await response.json()).message, "string");
  }
});
