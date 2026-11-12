import axios from "axios";
import { withRetry } from "../utils/retry";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  headers: { "Content-Type": "application/json; charset=utf-8" }
});

// Values accepted as vs_currency; all are ISO 4217 codes so Intl can format them
export const CURRENCIES = ["usd", "eur", "mxn", "gbp", "jpy", "cad", "brl"];
export const CHART_RANGES = [7, 30, 90];

const CACHE_TTL_MS = 60_000;
const cache = new Map();

// The public API rate-limits hard (and omits CORS headers on 429), so: cache briefly,
// share in-flight requests, and retry network/429/5xx failures with backoff.
const get = (path, params) => {
  const key = `${path}?${new URLSearchParams(params)}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.promise;

  const promise = withRetry(() => api.get(path, { params }).then((response) => response.data), {
    isRetryable: (error) => !error.response || error.response.status === 429 || error.response.status >= 500
  });
  cache.set(key, { at: Date.now(), promise });
  promise.catch(() => cache.delete(key)); // never cache failures
  return promise;
};

const assertCurrency = (currency) => {
  if (!CURRENCIES.includes(currency)) throw new Error(`Unsupported currency: ${currency}`);
};

export const getCrypto = async (locale = "en", currency = "usd") => {
  assertCurrency(currency);
  try {
    return await get("/coins/markets", {
      vs_currency: currency,
      order: "market_cap_desc",
      per_page: 250,
      page: 1,
      sparkline: false,
      locale
    });
  } catch (error) {
    console.error("Error fetching crypto data:", error.message);
    throw error;
  }
};

export const getCryptoDetails = async (cryptoId, days = 30, currency = "usd") => {
  if (!CHART_RANGES.includes(days)) throw new Error(`Unsupported range: ${days}`);
  assertCurrency(currency);
  try {
    return await get(`/coins/${encodeURIComponent(cryptoId)}/market_chart`, {
      vs_currency: currency,
      days,
      interval: "daily",
      precision: 6
    });
  } catch (error) {
    console.error("Error fetching crypto detail data:", error.message);
    throw error;
  }
};
