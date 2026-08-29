"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Minimal ThemeProvider that manages a light/dark preference yet defaults to dark.
// The whole product is dark-themed, but the context is exposed for future toggles.
const ThemeContext = createContext({ theme: "dark", setTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}