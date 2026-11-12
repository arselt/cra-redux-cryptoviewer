import en from "./en.js";
import es from "./es.js";

export const DICTIONARIES = { en, es };
export const LANGUAGE_NAMES = { en: "English", es: "Español" };
// BCP 47 tag used for Intl number/date formatting
export const LOCALES = { en: "en-US", es: "es-MX" };

export const translate = (lang, key, vars = {}) =>
  (DICTIONARIES[lang]?.[key] ?? en[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");
