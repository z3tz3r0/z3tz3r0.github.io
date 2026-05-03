import { create } from "zustand";
import { persist } from "zustand/middleware";

// SYNC: must match validThemes in index.html init script
const ALL_THEMES = [
  "default",
  "luxury",
  "editorial",
  "cyberpunk",
  "minimal",
  "medieval",
  "fantasy",
  "christmas",
  "halloween",
  "anime",
  "dinosaur",
  "space",
] as const;

type ThemeName = typeof ALL_THEMES[number];
// SYNC: must match lightThemes in index.html init script
const LIGHT_THEMES = new Set<ThemeName>(["minimal"]);
const THEME_TRANSITION_MS = 500;

interface ThemeStore {
  hydrate: () => void;
  setTheme: (theme: ThemeName) => void;
  theme: ThemeName;
}

const swapThemeClass = (root: HTMLElement, theme: ThemeName): void => {
  for (const name of ALL_THEMES) {
    root.classList.remove(`theme-${name}`);
  }
  root.classList.add(`theme-${theme}`);
  root.dataset.theme = theme;
  if (LIGHT_THEMES.has(theme)) {
    root.classList.remove("dark");
  } else {
    root.classList.add("dark");
  }
};

const applyThemeClass = (theme: ThemeName, withTransition = false): void => {
  if (!ALL_THEMES.includes(theme)) {
    return;
  }
  const root = document.documentElement;
  if (withTransition) {
    root.classList.add("theme-transitioning");
    setTimeout(() => { root.classList.remove("theme-transitioning"); }, THEME_TRANSITION_MS);
  }
  swapThemeClass(root, theme);
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
export { ALL_THEMES, useThemeStore };
