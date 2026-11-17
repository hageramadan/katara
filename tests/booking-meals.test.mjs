import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";

const nodeRequire = createRequire(import.meta.url);
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const loadedModule = { exports: {} };
  cache.set(file, loadedModule);
  const code = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInThisContext(`(function(require,module,exports){${code}\n})`, { filename: file })(
    (id) => id.startsWith(".") ? load(resolve(dirname(file), `${id}.ts`)) : nodeRequire(id),
    loadedModule, loadedModule.exports,
  );
  return loadedModule.exports;
}

const { meals, mealsPrice, selectedMeals } = load(resolve("lib/booking/meals.ts"));
const { emptyServiceSelection } = load(resolve("lib/booking/data.ts"));
const { servicePrice, serviceKey, baseBookingFare } = load(resolve("lib/booking/services.ts"));
const { calculateBookingPricing } = load(resolve("lib/booking/payment.ts"));

test("meal pricing ignores unknown IDs and does not charge twice for duplicates", () => {
  assert.equal(mealsPrice([meals[0].id, meals[0].id, "unknown"]), 3);
  assert.equal(selectedMeals(["unknown"]).length, 0);
  assert.equal(mealsPrice(), 0);
});

test("checkout includes meals for each passenger and flight alongside baggage and seats", () => {
  const services = {
    [serviceKey("outbound", "adult-1")]: { ...emptyServiceSelection, seat: "30A", baggage: 15, meals: [meals[0].id] },
    [serviceKey("inbound", "adult-1")]: { ...emptyServiceSelection, meals: [meals[0].id] },
    [serviceKey("outbound", "child-1")]: { ...emptyServiceSelection, meals: [meals[1].id] },
  };
  const pricing = calculateBookingPricing(services, "SAVE20");
  assert.equal(pricing.meals, 9);
  assert.equal(pricing.seats, 10);
  assert.equal(pricing.baggage, 20);
  assert.equal(pricing.extras, 39);
  assert.equal(pricing.total, baseBookingFare + 39 - 20);
  assert.equal(Object.values(services).reduce((sum, item) => sum + servicePrice(item), 0), pricing.extras);
});

test("removing a meal affects only its passenger and flight", () => {
  const first = serviceKey("outbound", "adult-1");
  const second = serviceKey("inbound", "adult-1");
  const services = {
    [first]: { ...emptyServiceSelection, meals: [meals[0].id] },
    [second]: { ...emptyServiceSelection, meals: [meals[0].id] },
  };
  const updated = { ...services, [first]: { ...services[first], meals: [] } };
  assert.equal(calculateBookingPricing(updated).meals, 3);
  assert.equal(services[first].meals.length, 1);
  assert.equal(updated[second].meals.length, 1);
});
