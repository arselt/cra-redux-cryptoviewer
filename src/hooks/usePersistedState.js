import { useEffect, useState } from "react";

// localStorage-backed useState for small UI preferences (theme, sort, language)
export const usePersistedState = (key, initialValue) => {
  const storageKey = `cryptoviewer:${key}`;
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw === null ? initialValue : JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // storage unavailable (private mode): preference just won't persist
    }
  }, [storageKey, value]);

  return [value, setValue];
};
