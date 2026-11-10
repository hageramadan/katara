import assert from "node:assert/strict";
import test from "node:test";
import { loadProjectModule } from "./helpers/load-project-module.mjs";
import { buildRegistrationPayload } from "../lib/auth/registration.ts";

const { getRegistrationFields, registerAccount, RegistrationApiError, loginAccount, LoginApiError, logoutAccount } = loadProjectModule("lib/auth/api.ts");
const payload = { email: " member@example.test ", password: " test1234 ", user_type: "member", fields: [{ field_id: 5, value: "1" }] };
const user = { id: 42, email: "member@example.test", display_name: "Member", user_type: "member", token: "test-only-token" };

test("logout authenticates the POST request and handles success, expired tokens and failures", async (t) => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "window");
  const values = new Map([["token", user.token], ["user", JSON.stringify(user)]]);
  Object.defineProperty(globalThis, "window", { configurable: true, value: { localStorage: { getItem: (key) => values.get(key) ?? null } } });
  t.after(() => { if (original) Object.defineProperty(globalThis, "window", original); else delete globalThis.window; });
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(url, "https://katara.tawajood.com/api/auth/logout");
    assert.equal(init.method, "POST");
    assert.equal(init.headers.Authorization, `Bearer ${user.token}`);
    assert.equal(init.headers["Accept-Language"], "ar");
    assert.equal(init.credentials, "omit");
    assert.equal(init.cache, "no-store");
    assert.equal(init.body, undefined);
    return Response.json({ result: true });
  });
  await logoutAccount("ar");
  for (const status of [204, 401]) {
    t.mock.method(globalThis, "fetch", async () => new Response(null, { status }));
    await logoutAccount("en");
  }
  for (const upstream of [
    () => Response.json({ result: false, message: "Try again" }),
    () => Response.json({ result: false }, { status: 403 }),
    () => new Response("Unavailable", { status: 503 }),
    () => { throw new TypeError("Network error"); },
  ]) {
    t.mock.method(globalThis, "fetch", upstream);
    await assert.rejects(logoutAccount("en"));
    assert.equal(values.get("token"), user.token);
  }
  values.delete("token");
  const mocked = t.mock.method(globalThis, "fetch", () => { throw new Error("Must not send an unauthenticated request"); });
  await logoutAccount("en");
  assert.equal(mocked.mock.callCount(), 0);
});

test("loads agency fields containing a logo file successfully", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json({ result: true, data: { fields: [
    { id: 12, key: "logo", label: "Logo", type: "file", is_required: 0, options: [], sort_order: 1 },
    { id: 13, key: "name_ar", label: "Name", type: "text", is_required: 1, options: [], sort_order: 2 },
  ] } }));
  const fields = await getRegistrationFields("agency_employee", "ar");
  assert.equal(fields.length, 2);
  assert.equal(fields[0].type, "file");
});

test("registration sends file bytes and array fields as multipart without setting the boundary manually", async (t) => {
  const file = new File(["image bytes"], "logo.png", { type: "image/png" });
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(url, "https://katara.tawajood.com/api/auth/register");
    assert.ok(init.body instanceof FormData);
    assert.equal(init.headers["Content-Type"], undefined);
    assert.equal(init.headers["Accept-Language"], "ar");
    assert.equal(init.body.get("email"), payload.email.trim());
    assert.equal(init.body.get("user_type"), "agency_employee");
    assert.equal(init.body.get("fields[0][field_id]"), "12");
    const uploaded = init.body.get("fields[0][value]");
    assert.equal(uploaded.name, "logo.png");
    assert.equal(await uploaded.text(), "image bytes");
    assert.deepEqual(init.body.getAll("fields[1][value][]"), ["1", "2"]);
    assert.deepEqual(init.body.getAll("fields[2][value][]"), ["1", "2"]);
    assert.equal(init.body.get("fields[2][value]"), null);
    return Response.json({ result: false, message: "Test validation response" }, { status: 422 });
  });
  const fields = [
    { id: 12, key: "logo", type: "file" },
    { id: 16, key: "services", type: "multiselect" },
    { id: 15, key: "agency_type", type: "multiselect" },
  ];
  const request = buildRegistrationPayload("agency_employee", payload.email, payload.password, fields,
    { logo: file, services: [1, 2], agency_type: [1, 2] });
  await assert.rejects(registerAccount(request, "ar"), RegistrationApiError);
});

test("login posts directly to the API and stores the validated token", async (t) => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "window");
  const values = new Map();
  Object.defineProperty(globalThis, "window", { configurable: true, value: { localStorage: { setItem: (key, value) => values.set(key, value) } } });
  t.after(() => { if (original) Object.defineProperty(globalThis, "window", original); else delete globalThis.window; });
  const loginPayload = { email: payload.email, password: " test+&1234 ", user_type: "member" };
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(url, "https://katara.tawajood.com/api/auth/login?lang=ar");
    assert.equal(init.method, "POST");
    assert.equal(init.credentials, "omit");
    assert.equal(init.headers["Accept-Language"], "ar");
    assert.equal(init.headers["Content-Type"], "application/x-www-form-urlencoded");
    assert.deepEqual(Object.fromEntries(new URLSearchParams(init.body)), { ...loginPayload, email: payload.email.trim() });
    return Response.json({ result: true, message: "Signed in", data: { user } });
  });
  const result = await loginAccount(loginPayload, "ar");
  assert.equal(values.get("token"), user.token);
  assert.equal(result.token, user.token);
  assert.equal(result.user.token, undefined);
  assert.equal(result.user.id, user.id);
});

test("login rejects API errors and incomplete success without replacing a saved token", async (t) => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "window");
  const values = new Map([["token", "existing-token"]]);
  Object.defineProperty(globalThis, "window", { configurable: true, value: { localStorage: { setItem: (key, value) => values.set(key, value) } } });
  t.after(() => { if (original) Object.defineProperty(globalThis, "window", original); else delete globalThis.window; });
  for (const status of [200, 422]) {
    t.mock.method(globalThis, "fetch", async () => Response.json({ result: false, message: "Invalid login", data: { errors: { email: ["Invalid credentials"] } } }, { status }));
    await assert.rejects(loginAccount(payload, "en"), (error) => {
      assert.ok(error instanceof LoginApiError);
      assert.deepEqual(error.errors, { email: ["Invalid credentials"] });
      return true;
    });
  }
  for (const invalidUser of [{ ...user, token: null }, { ...user, id: null }]) {
    t.mock.method(globalThis, "fetch", async () => Response.json({ result: true, data: { user: invalidUser } }));
    await assert.rejects(loginAccount(payload, "en"), LoginApiError);
  }
  assert.equal(values.get("token"), "existing-token");
});

test("registration posts directly and normalizes the upstream user and token", async (t) => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "window");
  const values = new Map();
  Object.defineProperty(globalThis, "window", { configurable: true, value: { localStorage: { setItem: (key, value) => values.set(key, value) } } });
  t.after(() => { if (original) Object.defineProperty(globalThis, "window", original); else delete globalThis.window; });
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(url, "https://katara.tawajood.com/api/auth/register");
    assert.equal(init.method, "POST");
    assert.equal(init.credentials, "omit");
    assert.equal(init.headers["Accept-Language"], "ar");
    assert.deepEqual(JSON.parse(init.body), { ...payload, email: payload.email.trim() });
    return Response.json({ result: true, message: "Created", data: { user } }, { status: 201 });
  });
  const result = await registerAccount(payload, "ar");
  assert.equal(values.get("token"), user.token);
  assert.equal(result.token, user.token);
  assert.equal(result.user.id, user.id);
  assert.equal(result.user.token, undefined);
});

test("registration handles HTTP and business validation errors and malformed success", async (t) => {
  for (const status of [200, 422]) {
    t.mock.method(globalThis, "fetch", async () => Response.json({ result: false, message: "Invalid email", data: { errors: { email: ["Already used"] } } }, { status }));
    await assert.rejects(registerAccount(payload, "en"), (error) => {
      assert.ok(error instanceof RegistrationApiError);
      assert.deepEqual(error.errors, { email: ["Already used"] });
      return true;
    });
  }
  t.mock.method(globalThis, "fetch", async () => Response.json({ result: true, data: { user: { ...user, token: null } } }));
  await assert.rejects(registerAccount(payload, "en"), RegistrationApiError);
});

test("registration preserves field errors returned directly inside data", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json({
    result: false, errNum: 422, message: "Validation failed.",
    data: { field_14: ["The value field must be a string."] },
  }));
  await assert.rejects(registerAccount(payload, "en"), (error) => {
    assert.ok(error instanceof RegistrationApiError);
    assert.deepEqual(error.errors, { field_14: ["The value field must be a string."] });
    return true;
  });
});
