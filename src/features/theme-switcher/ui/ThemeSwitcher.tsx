import type { CSSProperties, MouseEvent, ReactElement } from "react";
import { useCallback, useMemo, useRef } from "react";
import { Flip } from "gsap/Flip";
import type { ThemeName } from "@/features/theme-switcher/model/useThemeStore";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useThemeStore } from "@/features/theme-switcher/model/useThemeStore";

const FLIP_DURATION = 0.5;
const FLIP_STAGGER = 0.02;
const PULSE_SCALE_FROM = 1.3;
const PULSE_DURATION = 0.3;

const THEMES: { color: string; label: string; name: ThemeName }[] = [
  { color: "#f97316", label: "Default", name: "default" },
  { color: "#d4a853", label: "Luxury", name: "luxury" },
  { color: "#ffffff", label: "Editorial", name: "editorial" },
  { color: "#e040fb", label: "Cyberpunk", name: "cyberpunk" },
  { color: "#8b6f47", label: "Minimal", name: "minimal" },
];

const FLIP_TARGETS = ".flip-layout";

const ThemeSwitcher = (): ReactElement => {
  const { setTheme, theme } = useThemeStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleThemeChange = useCallback((newTheme: ThemeName) => {
    if (newTheme === theme) { return; }

    const safeAnimate = contextSafe(() => {
      const flipElements = document.querySelectorAll(FLIP_TARGETS);
      let state: Flip.FlipState | null = null;
      if (flipElements.length > 0) {
        state = Flip.getState(flipElements);
      }

      setTheme(newTheme);

      if (state) {
        Flip.from(state, {
          absolute: true,
          duration: FLIP_DURATION,
          ease: "power3.inOut",
          stagger: FLIP_STAGGER,
        });
      }

      const activeSwatch = containerRef.current?.querySelector(`[data-theme="${newTheme}"]`);
      if (activeSwatch) {
        gsap.killTweensOf(activeSwatch);
        gsap.fromTo(
          activeSwatch,
          { scale: PULSE_SCALE_FROM },
          { duration: PULSE_DURATION, ease: "power2.out", scale: 1 },
        );
      }
    });

    safeAnimate();
  }, [theme, contextSafe, setTheme]);

  const handleSwatchClick = useCallback((event: MouseEvent<HTMLButtonElement>): void => {
    const newTheme = event.currentTarget.dataset.theme as ThemeName;
    handleThemeChange(newTheme);
  }, [handleThemeChange]);

  const swatchStyles = useMemo(
    () =>
      Object.fromEntries(
        THEMES.map((themeItem) => [themeItem.name, { backgroundColor: themeItem.color } as CSSProperties]),
      ) as Record<ThemeName, CSSProperties>,
    [],
  );

  const getSwatchClassName = (themeItem: ThemeName): string => {
    const base = "w-6 h-6 rounded-full transition-all duration-200 cursor-pointer hover:scale-110";
    if (themeItem === theme) {
      return `${base} ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110`;
    }
    return `${base} opacity-60 hover:opacity-100`;
  };

  return (
    <div className="flex items-center gap-2" ref={containerRef}>
      {THEMES.map((themeItem) => (
        <button
          aria-label={`Switch to ${themeItem.label} theme`}
          aria-pressed={themeItem.name === theme}
          className={getSwatchClassName(themeItem.name)}
          data-theme={themeItem.name}
          key={themeItem.name}
          onClick={handleSwatchClick}
          style={swatchStyles[themeItem.name]}
          title={themeItem.label}
          type="button"
        />
      ))}
    </div>
  );
};

export { FLIP_TARGETS, ThemeSwitcher };
