import assert from "node:assert/strict";
import test from "node:test";
import { clearStoredAuthUser, storeAuthToken, storeAuthUser, readStoredAuthUser } from "../lib/auth/storage.ts";

function mockWindow(t, localStorage) {
  const original = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", { configurable: true, value: { localStorage } });
  t.after(() => {
    if (original) Object.defineProperty(globalThis, "window", original);
    else delete globalThis.window;
  });
}

test("local logout removes authentication and preserves unrelated preferences without requests", (t) => {
  const values = new Map([["token", "test-token"], ["user", JSON.stringify({ id: 1, email: "user@example.test", display_name: "Test", user_type: "member" })], ["lang", "ar"]]);
  mockWindow(t, {
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => values.delete(key),
  });
  const fetchMock = t.mock.method(globalThis, "fetch", () => { throw new Error("Logout must be local"); });
  clearStoredAuthUser();
  assert.equal(values.has("token"), false);
  assert.equal(values.has("user"), false);
  assert.equal(values.get("lang"), "ar");
  assert.equal(readStoredAuthUser(), null);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("stores the complete token under the token key and replaces a previous token", (t) => {
  const values = new Map([["token", "old-token"]]);
  mockWindow(t, { setItem: (key, value) => values.set(key, value) });
  assert.equal(storeAuthToken("33|test-token"), true);
  assert.equal(values.get("token"), "33|test-token");
});

test("handles restricted browser storage without breaking successful authentication", (t) => {
  mockWindow(t, { setItem: () => { throw new Error("Storage blocked"); } });
  assert.equal(storeAuthToken("test-token"), false);
});

test("does not access browser storage during server rendering", () => {
  assert.equal(storeAuthToken("test-token"), false);
  assert.equal(readStoredAuthUser(), null);
});

test("restores the logged-in user from localStorage without a session request", (t) => {
  const values = new Map();
  mockWindow(t, { setItem: (key, value) => values.set(key, value), getItem: (key) => values.get(key) ?? null });
  const user = { id: 1, email: "user@example.test", display_name: "Test User", user_type: "member",
    phone: "109859950522", country_code: "+20", created_at: "2026-10-28T21:48:42.000000Z", updated_at: "2026-10-29T08:00:00.000000Z" };
  storeAuthToken("test-token");
  storeAuthUser(user);
  assert.deepEqual(readStoredAuthUser(), user);
  values.delete("token");
  assert.equal(readStoredAuthUser(), null);
});

test("invalid or inaccessible localStorage does not break session restoration", (t) => {
  mockWindow(t, { getItem: (key) => key === "token" ? "test-token" : "invalid JSON" });
  assert.equal(readStoredAuthUser(), null);
});
