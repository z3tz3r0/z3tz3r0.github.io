import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeName = "default" | "luxury" | "editorial" | "cyberpunk" | "minimal";

/** Themes that use a light background */
const LIGHT_THEMES: ThemeName[] = ["minimal"];

interface ThemeStore {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  /** Call once on app mount to apply persisted theme class to <html> */
  hydrate: () => void;
}

function applyThemeClass(theme: ThemeName, withTransition = false) {
  const root = document.documentElement;

  // Enable CSS transitions only during active theme switch
  if (withTransition) {
    root.classList.add("theme-transitioning");
    setTimeout(() => root.classList.remove("theme-transitioning"), 500);
  }

  // Remove existing theme-* classes
  root.className = root.className.replace(/\btheme-\S+/g, "").trim();

  // Apply theme class
  if (theme !== "default") {
    root.classList.add(`theme-${theme}`);
  }

  // Toggle dark/light mode based on theme
  if (LIGHT_THEMES.includes(theme)) {
    root.classList.remove("dark");
  } else if (!root.classList.contains("dark")) {
    root.classList.add("dark");
  }
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "default",
      setTheme: (theme) => {
        applyThemeClass(theme, true);
        set({ theme });
      },
      hydrate: () => {
        applyThemeClass(get().theme, false);
      },
    }),
    { name: "portfolio-theme" },
  ),
);
