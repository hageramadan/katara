import assert from "node:assert/strict";
import test from "node:test";
import { buildRegistrationPayload, validateRegistration, mapRegistrationErrors, isRegistrationPayload, normalizeRegistrationErrors } from "../lib/auth/registration.ts";

const fields = [
  { id: 5, key: "country_id", label: "Country", type: "select", is_required: true, options: [{ value: 1, label: "Country" }], sort_order: 1 },
  { id: 20, key: "services", label: "Services", type: "multiselect", is_required: true, options: [{ value: "flights", label: "Flights" }], sort_order: 2 },
  { id: 99, key: "last_name", label: "Last name", type: "text", is_required: false, options: [], sort_order: 3 },
];
const values = { country_id: 1, services: ["flights"] };

test("preserves selected files, omits an unselected optional logo and validates required uploads", () => {
  const logo = { id: 12, key: "logo", label: "Logo", type: "file", is_required: false, options: [], sort_order: 1 };
  const file = new File(["image bytes"], "logo.png", { type: "image/png" });
  assert.deepEqual(buildRegistrationPayload("agency_employee", "user@example.com", "test1234", [logo], {}).fields, []);
  const payload = buildRegistrationPayload("agency_employee", "user@example.com", "test1234", [logo], { logo: file });
  assert.equal(payload.fields[0].value, file);
  assert.deepEqual(validateRegistration([logo], { logo: file }, "user@example.com", "test1234", "test1234", true, "en"), {});
  assert.ok(validateRegistration([{ ...logo, is_required: true }], {}, "user@example.com", "test1234", "test1234", true, "en").logo);
  assert.ok(validateRegistration([logo], { logo: "fake path" }, "user@example.com", "test1234", "test1234", true, "en").logo);
});

test("serializes scalar IDs as strings, preserves multiselect arrays and omits empty optional values and unknown keys", () => {
  for (const type of ["member", "agency_employee", "broker", "travel_company", "company", "third_party_partner"]) {
    const payload = buildRegistrationPayload(type, " user@example.com ", "test1234", fields, { ...values, ignored: "never sent" });
    assert.deepEqual(payload, {
      email: "user@example.com", password: "test1234", user_type: type,
      fields: [{ field_id: 5, value: "1" }, { field_id: 20, value: ["flights"] }],
    });
    assert.equal(isRegistrationPayload(payload), true);
  }
});

test("agency registration sends agency_type and services as arrays together", () => {
  const agencyFields = [{ ...fields[1], id: 14, key: "agency_type" }, { ...fields[1], id: 15 }];
  const payload = buildRegistrationPayload("agency_employee", "user@example.com", "12345678", agencyFields, { agency_type: ["flights", "hotels"], services: ["flights", "hotels"] });
  assert.deepEqual(payload.fields[0].value, ["flights", "hotels"]);
  assert.deepEqual(payload.fields[1], { field_id: 15, value: ["flights", "hotels"] });
  assert.equal(isRegistrationPayload(payload), true);
  assert.deepEqual(mapRegistrationErrors({ field_14: ["The value field must be a string."] }, payload, agencyFields), {
    agency_type: ["The value field must be a string."],
  });
});

test("validates empty selections, unavailable options, password confirmation and consent", () => {
  const invalid = validateRegistration(fields, { country_id: 999, services: [] }, "invalid", "short", "different", false, "en");
  assert.deepEqual(Object.keys(invalid).sort(), ["country_id", "services", "email", "password", "password_confirmation", "terms"].sort());
  assert.deepEqual(validateRegistration(fields, values, "user@example.com", "test1234", "test1234", true, "ar"), {});
  assert.ok(validateRegistration(fields, { ...values, services: "flights" }, "user@example.com", "test1234", "test1234", true, "en").services);
});

test("maps API errors by submitted position even when field IDs and optional entries have gaps", () => {
  const payload = buildRegistrationPayload("member", "user@example.com", "test1234", fields, values);
  assert.deepEqual(mapRegistrationErrors({ "fields.1.value.0": ["Invalid service"], email: ["Already exists"] }, payload, fields), {
    services: ["Invalid service"], email: ["Already exists"],
  });
});

test("passwords accept eight or more digits or letters and reject fewer than eight", () => {
  for (const password of ["", "1234567", "abcdefg"]) {
    assert.ok(validateRegistration(fields, values, "user@example.com", password, password, true, "ar").password);
  }
  for (const password of ["12345678", "abcdefgh", "abc12345", "123456789"]) {
    assert.equal(validateRegistration(fields, values, "user@example.com", password, password, true, "ar").password, undefined);
    assert.equal(isRegistrationPayload(buildRegistrationPayload("member", "user@example.com", password, fields, values)), true);
  }
});

test("rejects invalid request bodies and normalizes validation responses", () => {
  const payload = buildRegistrationPayload("member", "user@example.com", "test1234", fields, values);
  for (const invalid of [null, {}, { ...payload, password: "short" }, { ...payload, fields: [] },
    { ...payload, fields: [payload.fields[0], payload.fields[0]] },
    { ...payload, fields: [{ field_id: 5, value: { unexpected: true } }] },
    { ...payload, fields: [{ field_id: 15, value: [42] }] }]) {
    assert.equal(isRegistrationPayload(invalid), false);
  }
  assert.deepEqual(normalizeRegistrationErrors({ email: "Already exists", password: ["Too short", 42], invalid: 42 }), {
    email: ["Already exists"], password: ["Too short"],
  });
});
