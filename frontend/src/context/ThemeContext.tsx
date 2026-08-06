"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

export type ThemePreference = "light" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
}

const STORAGE_KEY = "posthuman-theme-preference";
const THEME_CHANGE_EVENT = "posthuman-theme-change";

const isThemePreference = (value: string | null): value is ThemePreference =>
  value === "light" || value === "system";

const getStoredTheme = (): ThemePreference => {
  if (typeof window === "undefined") return "system";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isThemePreference(saved) ? saved : "system";
  } catch {
    return "system";
  }
};

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};
const getServerTheme = (): ThemePreference => "system";
const getServerSystemTheme = (): ResolvedTheme => "light";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useSyncExternalStore(
    subscribeToThemePreference,
    getStoredTheme,
    getServerTheme
  );
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    getServerSystemTheme
  );
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  const applyThemeToDOM = useCallback(
    (resolved: ResolvedTheme, preference: ThemePreference) => {
      if (typeof document === "undefined") return;
      const root = document.documentElement;
      if (resolved === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
        root.setAttribute("data-theme", "dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
        root.setAttribute("data-theme", "light");
        root.style.colorScheme = "light";
      }
      root.setAttribute("data-theme-preference", preference);
    },
    []
  );

  useLayoutEffect(() => {
    applyThemeToDOM(resolvedTheme, theme);
  }, [applyThemeToDOM, resolvedTheme, theme]);

  const setTheme = useCallback((newTheme: ThemePreference) => {
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
    }

    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const contextValue = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [resolvedTheme, setTheme, theme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

function subscribeToThemePreference(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(THEME_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

function subscribeToSystemTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", callback);
  } else {
    mediaQuery.addListener(callback);
  }

  return () => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener("change", callback);
    } else {
      mediaQuery.removeListener(callback);
    }
  };
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
