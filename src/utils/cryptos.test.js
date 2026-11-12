import { test } from "node:test";
import assert from "node:assert/strict";
import { filterCryptos, sortCryptos } from "./cryptos.js";

const coins = [
  { name: "Bitcoin", symbol: "btc", current_price: 70000, price_change_percentage_24h: -1, market_cap_rank: 1 },
  { name: "Ethereum", symbol: "eth", current_price: 2000, price_change_percentage_24h: null, market_cap_rank: 2 },
  { name: "Cardano", symbol: "ada", current_price: 0.4, price_change_percentage_24h: 3, market_cap_rank: null }
];

test("filter matches name or symbol, case-insensitive", () => {
  assert.deepEqual(filterCryptos(coins, " ETH ").map((c) => c.name), ["Ethereum"]);
  assert.deepEqual(filterCryptos(coins, "car").map((c) => c.name), ["Cardano"]);
  assert.equal(filterCryptos(coins, "").length, 3);
});

test("sort handles null values and unknown keys", () => {
  assert.deepEqual(sortCryptos(coins, "rank").map((c) => c.name), ["Bitcoin", "Ethereum", "Cardano"]);
  assert.deepEqual(sortCryptos(coins, "change").map((c) => c.name), ["Cardano", "Ethereum", "Bitcoin"]);
  assert.deepEqual(sortCryptos(coins, "name").map((c) => c.name), ["Bitcoin", "Cardano", "Ethereum"]);
  assert.equal(sortCryptos(coins, "nope")[0].name, "Bitcoin");
});
