"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useInsertionEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

export type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  resolvedTheme: ResolvedTheme;
}

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};
const getServerSystemTheme = (): ResolvedTheme => "light";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const resolvedTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    getServerSystemTheme
  );

  const applyThemeToDOM = useCallback(
    (resolved: ResolvedTheme) => {
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
      root.setAttribute("data-theme-preference", "system");
    },
    []
  );

  useInsertionEffect(() => {
    applyThemeToDOM(resolvedTheme);
  }, [applyThemeToDOM, resolvedTheme]);

  const contextValue = useMemo(
    () => ({ resolvedTheme }),
    [resolvedTheme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

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
