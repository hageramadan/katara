import assert from "node:assert/strict";
import test from "node:test";
import { loadProjectModule } from "./helpers/load-project-module.mjs";

const { registerAccount, RegistrationApiError, loginAccount, LoginApiError } = loadProjectModule("lib/auth/api.ts");
const payload = { email: " member@example.test ", password: " test1234 ", user_type: "member", fields: [{ field_id: 5, value: "1" }] };
const user = { id: 42, email: "member@example.test", display_name: "Member", user_type: "member", token: "test-only-token" };

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
