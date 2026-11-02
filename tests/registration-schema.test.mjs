import assert from "node:assert/strict";
import test from "node:test";
import { parseRegistrationFields } from "../lib/auth/registration-schema.ts";

const field = (overrides = {}) => ({
  id: 1, key: "first_name", label: "First name", type: "text",
  is_required: 1, options: [], sort_order: 1, ...overrides,
});
const response = (fields) => ({ result: true, data: { fields } });

test("accepts an optional logo file without rejecting the remaining agency fields", () => {
  const fields = parseRegistrationFields(response([
    field({ id: 12, key: "logo", type: "file", is_required: 0 }),
    field({ id: 13, key: "name_ar", sort_order: 2 }),
  ]));
  assert.equal(fields.length, 2);
  assert.equal(fields[0].type, "file");
  assert.equal(fields[0].is_required, false);
});

test("accepts both option formats and preserves numeric IDs", () => {
  const fields = parseRegistrationFields(response([
    field({ key: "iata_type", type: "select", options: { agency: "Agency", standard: "Standard" } }),
    field({ id: 2, key: "country_id", type: "select", options: [{ value: 50, label: "Egypt" }] }),
  ]));
  assert.deepEqual(fields[0].options, [{ value: "agency", label: "Agency" }, { value: "standard", label: "Standard" }]);
  assert.equal(fields[1].options[0].value, 50);
});

test("retains optional fields, multiple selections and empty nationality options", () => {
  const fields = parseRegistrationFields(response([
    field({ key: "last_name", is_required: 0 }),
    field({ key: "services", type: "multiselect", options: [{ value: "flights", label: "Flights" }] }),
    field({ key: "nationality_id", type: "select" }),
  ]));
  assert.equal(fields[0].is_required, false);
  assert.equal(fields[1].type, "multiselect");
  assert.deepEqual(fields[2].options, []);
});

test("sorts fields without changing the original order of ties", () => {
  const fields = parseRegistrationFields(response([
    field({ key: "phone", sort_order: 4 }),
    field({ key: "gender", sort_order: 1 }),
    field({ key: "phone_country_code", sort_order: 1 }),
  ]));
  assert.deepEqual(fields.map(({ key }) => key), ["gender", "phone_country_code", "phone"]);
});

test("rejects failed, empty, malformed, duplicate and unsupported schemas", () => {
  for (const payload of [
    null, { result: false }, response([]), response([field({ type: "script" })]),
    response([field(), field()]), response([field({ is_required: "0" })]),
    response([field({ options: [{ value: null, label: "Invalid" }] })]),
  ]) assert.throws(() => parseRegistrationFields(payload));
});
