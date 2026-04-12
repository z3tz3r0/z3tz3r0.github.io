import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeName = "default" | "luxury" | "editorial" | "cyberpunk" | "minimal";

const LIGHT_THEMES = new Set<ThemeName>(["minimal"]);
const THEME_TRANSITION_MS = 500;

interface ThemeStore {
  hydrate: () => void;
  setTheme: (theme: ThemeName) => void;
  theme: ThemeName;
}

const applyThemeClass = (theme: ThemeName, withTransition = false): void => {
  const root = document.documentElement;

  if (withTransition) {
    root.classList.add("theme-transitioning");
    setTimeout(() => { root.classList.remove("theme-transitioning"); }, THEME_TRANSITION_MS);
  }

  root.className = root.className.replaceAll(/\btheme-\S+/g, "").trim();

  if (theme !== "default") {
    root.classList.add(`theme-${theme}`);
  }

  if (LIGHT_THEMES.has(theme)) {
    root.classList.remove("dark");
  } else if (!root.classList.contains("dark")) {
    root.classList.add("dark");
  }
};

const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      hydrate: (): void => {
        applyThemeClass(get().theme, false);
      },
      setTheme: (theme: ThemeName): void => {
        applyThemeClass(theme, true);
        set({ theme });
      },
      theme: "default",
    }),
    { name: "portfolio-theme" },
  ),
);

export type { ThemeName };
export { useThemeStore };
