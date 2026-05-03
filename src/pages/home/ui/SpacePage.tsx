import { ALL_THEMES, useThemeStore } from "@/features/theme-switcher/model/useThemeStore";
import type { ReactElement, ReactNode } from "react";
import { useCallback, useMemo } from "react";
import { CockpitFrame } from "@/shared/ui/cockpit-frame/CockpitFrame";
import { FreqDial } from "@/shared/ui/freq-dial/FreqDial";
import type { FreqDialThemeOption } from "@/shared/ui/freq-dial/FreqDial";
import { SpaceConstellation } from "@/widgets/space-constellation/ui/SpaceConstellation";
import { SpaceDossier } from "@/widgets/space-dossier/ui/SpaceDossier";
import { SpaceFooter } from "@/widgets/space-footer/ui/SpaceFooter";
import { SpaceHailing } from "@/widgets/space-hailing/ui/SpaceHailing";
import { SpaceHeroPanel } from "@/widgets/space-hero/ui/SpaceHeroPanel";
import { SpaceMissionLog } from "@/widgets/space-mission-log/ui/SpaceMissionLog";
import type { ThemeName } from "@/features/theme-switcher/model/useThemeStore";

const THEME_ACCENTS: Record<ThemeName, string> = {
  anime: "#EC4899",
  christmas: "#DC2626",
  cyberpunk: "#FF00FF",
  default: "#FF8C42",
  dinosaur: "#84CC16",
  editorial: "#B91C1C",
  fantasy: "#7C3AED",
  halloween: "#F97316",
  luxury: "#D4AF37",
  medieval: "#92400E",
  minimal: "#0EA5E9",
  space: "#06B6D4",
};

const THEME_LABELS: Record<ThemeName, string> = {
  anime: "ANIME",
  christmas: "XMAS",
  cyberpunk: "CYBER",
  default: "DEFAULT",
  dinosaur: "DINO",
  editorial: "EDIT",
  fantasy: "FANT",
  halloween: "HALW",
  luxury: "LUXURY",
  medieval: "MEDV",
  minimal: "MINIM",
  space: "SPACE",
};

const isThemeName = (value: string): value is ThemeName =>
  (ALL_THEMES as readonly string[]).includes(value);

const SpacePage = (): ReactElement => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const themeOptions = useMemo<readonly FreqDialThemeOption[]>(
    () => ALL_THEMES.map((name) => ({
      accent: THEME_ACCENTS[name],
      label: THEME_LABELS[name],
      name,
    })),
    [],
  );

  const handleThemeChange = useCallback((next: string): void => {
    if (!isThemeName(next)) { return; }
    if (next === theme) { return; }
    setTheme(next);
  }, [setTheme, theme]);

  const dial = useMemo<ReactNode>(
    () => (
      <FreqDial
        currentTheme={theme}
        onThemeChange={handleThemeChange}
        themes={themeOptions}
      />
    ),
    [theme, handleThemeChange, themeOptions],
  );

  return (
    <CockpitFrame topRightSlot={dial}>
      <SpaceHeroPanel />
      <SpaceConstellation />
      <SpaceMissionLog />
      <SpaceDossier />
      <SpaceHailing />
      <SpaceFooter />
    </CockpitFrame>
  );
};

export { SpacePage };
