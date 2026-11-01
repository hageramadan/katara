import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import ts from "typescript";

// Load real route handlers and their project aliases without a dev server.
const cache = new Map();
export function loadProjectModule(path) {
  const filename = resolve(path);
  if (cache.has(filename)) return cache.get(filename).exports;
  const loaded = { exports: {} };
  cache.set(filename, loaded);
  const localRequire = createRequire(filename);
  const require = (name) => name.startsWith("@/")
    ? loadProjectModule(`${name.slice(2)}.ts`)
    : name.startsWith(".")
      ? loadProjectModule(resolve(dirname(filename), name.endsWith(".ts") ? name : `${name}.ts`))
      : localRequire(name);
  const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  new Function("require", "module", "exports", compiled)(require, loaded, loaded.exports);
  return loaded.exports;
}
