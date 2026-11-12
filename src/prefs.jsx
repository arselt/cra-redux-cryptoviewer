import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePersistedState } from "./hooks/usePersistedState";

export const THEME_MODES = ["system", "light", "dark"];

const PrefsContext = createContext(null);
export const usePrefs = () => useContext(PrefsContext);

export const PrefsProvider = ({ children }) => {
  const [storedMode, setThemeMode] = usePersistedState("theme", "system");
  const themeMode = THEME_MODES.includes(storedMode) ? storedMode : "system";
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

  const value = useMemo(
    () => ({
      theme,
      themeMode,
      cycleTheme: () => setThemeMode(THEME_MODES[(THEME_MODES.indexOf(themeMode) + 1) % THEME_MODES.length])
    }),
    [theme, themeMode, setThemeMode]
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
};
