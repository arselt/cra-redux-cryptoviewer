import { test } from "node:test";
import assert from "node:assert/strict";
import { withRetry } from "./retry.js";

test("retries until success", async () => {
  let calls = 0;
  const result = await withRetry(async () => (++calls < 3 ? Promise.reject(new Error("429")) : "ok"), { delays: [0, 0] });
  assert.equal(result, "ok");
  assert.equal(calls, 3);
});

test("gives up after the last delay and skips non-retryable errors", async () => {
  let calls = 0;
  await assert.rejects(withRetry(async () => { calls++; throw new Error("x"); }, { delays: [0] }));
  assert.equal(calls, 2);
  calls = 0;
  await assert.rejects(withRetry(async () => { calls++; throw new Error("400"); }, { delays: [0, 0], isRetryable: () => false }));
  assert.equal(calls, 1);
});
