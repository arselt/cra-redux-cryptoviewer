import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CURRENCIES } from "./api";
import { formatCompactMoney, formatMoney } from "./utils/format";
import { DICTIONARIES, LOCALES, translate } from "./i18n";
import { usePersistedState } from "./hooks/usePersistedState";

export const THEME_MODES = ["system", "light", "dark"];

const PrefsContext = createContext(null);
export const usePrefs = () => useContext(PrefsContext);

export const PrefsProvider = ({ children }) => {
  const [storedMode, setThemeMode] = usePersistedState("theme", "system");
  const themeMode = THEME_MODES.includes(storedMode) ? storedMode : "system";
  const [storedLang, setLang] = usePersistedState("lang", navigator.language?.startsWith("es") ? "es" : "en");
  const lang = storedLang in DICTIONARIES ? storedLang : "en";
  const [storedCurrency, setCurrency] = usePersistedState("currency", "usd");
  const currency = CURRENCIES.includes(storedCurrency) ? storedCurrency : "usd";
  const t = useCallback((key, vars) => translate(lang, key, vars), [lang]);
  const [isSystemDark, setIsSystemDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setIsSystemDark(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const theme = themeMode === "system" ? (isSystemDark ? "dark" : "light") : themeMode;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      theme,
      lang,
      setLang,
      t,
      locale: LOCALES[lang],
      currency,
      setCurrency,
      money: (amount) => formatMoney(amount, LOCALES[lang], currency.toUpperCase()),
      compactMoney: (amount) => formatCompactMoney(amount, LOCALES[lang], currency.toUpperCase()),
      // Pure toggle on the resolved theme; "system" is only the initial default
      toggleTheme: () => setThemeMode(theme === "dark" ? "light" : "dark")
    }),
    [theme, setThemeMode, lang, setLang, t, currency, setCurrency]
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
};
