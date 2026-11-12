import { test } from "node:test";
import assert from "node:assert/strict";
import { DICTIONARIES, translate } from "./index.js";

const placeholders = (text) => [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

test("every dictionary defines exactly the English keys and placeholders", () => {
  for (const [lang, dictionary] of Object.entries(DICTIONARIES)) {
    assert.deepEqual(Object.keys(dictionary).sort(), Object.keys(DICTIONARIES.en).sort(), lang);
    for (const key of Object.keys(dictionary)) {
      assert.deepEqual(placeholders(dictionary[key]), placeholders(DICTIONARIES.en[key]), `${lang}:${key}`);
    }
  }
});

test("translate interpolates, and falls back to English then to the key", () => {
  assert.equal(translate("es", "toolbar.count", { shown: 3, total: 9 }), "3 de 9 monedas");
  assert.equal(translate("xx", "toolbar.refresh"), "Refresh");
  assert.equal(translate("en", "missing.key"), "missing.key");
});
