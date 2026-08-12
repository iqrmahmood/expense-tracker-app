import { useState, useEffect } from "react";

/**
 * A generic, typed wrapper around localStorage.
 * Reads once on mount, writes on every change, and never throws
 * if storage is unavailable (private browsing, sandboxed iframes).
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage unavailable — fail silently, state still works in-memory
    }
  }, [key, value]);

  return [value, setValue] as const;
}
