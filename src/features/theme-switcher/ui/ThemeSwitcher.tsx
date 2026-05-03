import { ALL_THEMES, useThemeStore } from "@/features/theme-switcher/model/useThemeStore";
import type { CSSProperties, MouseEvent, ReactElement } from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { Palette } from "lucide-react";
import { Popover } from "@/shared/ui/popover";
import { SwatchGrid } from "@/features/theme-switcher/ui/SwatchGrid";
import type { SwatchItem } from "@/features/theme-switcher/ui/SwatchGrid";
import type { ThemeName } from "@/features/theme-switcher/model/useThemeStore";
import { animateThemeChange } from "@/features/theme-switcher/lib/animateThemeChange";
import { useGSAP } from "@gsap/react";

const ANNOUNCEMENT_MARKER_TOGGLE = 2;
const POPOVER_CLOSE_DELAY_MS = 320;
const PALETTE_ICON_SIZE = 14;

const THEMES: readonly SwatchItem[] = [
  { color: "#f97316", label: "Default", name: "default" },
  { color: "#ca8a04", label: "Luxury", name: "luxury" },
  { color: "#fafafa", label: "Editorial", name: "editorial" },
  { color: "#e040fb", label: "Cyberpunk", name: "cyberpunk" },
  { color: "#d4c5b0", label: "Minimal", name: "minimal" },
  { color: "#a16207", label: "Medieval", name: "medieval" },
  { color: "#a78bfa", label: "Fantasy", name: "fantasy" },
  { color: "#dc2626", label: "Christmas", name: "christmas" },
  { color: "#ea580c", label: "Halloween", name: "halloween" },
  { color: "#f472b6", label: "Anime", name: "anime" },
  { color: "#166534", label: "Dinosaur", name: "dinosaur" },
  { color: "#06b6d4", label: "Space", name: "space" },
];

const TRIGGER_CLASS = "w-7 h-7 rounded-full ring-2 ring-foreground/20 hover:ring-foreground/60 transition-all duration-200 cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const isThemeName = (value: string | undefined): value is ThemeName =>
  typeof value === "string" && (ALL_THEMES as readonly string[]).includes(value);

const getThemeFromEvent = (event: MouseEvent<HTMLButtonElement>): ThemeName | null => {
  const candidate = event.currentTarget.dataset.theme;
  if (isThemeName(candidate)) { return candidate; }
  return null;
};

const ThemeSwitcher = (): ReactElement => {
  const { setTheme, theme } = useThemeStore();
  const announcementCounterRef = useRef(0);
  const [announcement, setAnnouncement] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  /* Popover.Content portals via React Aria, so its DOM is outside any
     containerRef subtree. Using useGSAP without a scope still provides
     contextSafe + cleanup-on-unmount for tweens we trigger from here. */
  const { contextSafe } = useGSAP();

  const handleThemeChange = useCallback((newTheme: ThemeName) => {
    if (newTheme === theme) { setIsOpen(false); return; }
    const safeAnimate = contextSafe(() => {
      const activeSwatch = document.querySelector<HTMLElement>(`[data-theme-swatch="${newTheme}"]`) ?? null;
      animateThemeChange({ activeSwatch }, () => { setTheme(newTheme); });
      /* Toggle invisible zero-width-space prefix so identical theme labels
         still produce a different aria-live string and screen readers re-announce. */
      announcementCounterRef.current += 1;
      const counterMarker = "​".repeat(announcementCounterRef.current % ANNOUNCEMENT_MARKER_TOGGLE);
      const themeLabel = THEMES.find((item) => item.name === newTheme)?.label ?? newTheme;
      setAnnouncement(`${counterMarker}Theme changed to ${themeLabel}`);
    });
    safeAnimate();
    /* Delay close so the pulse tween on the active swatch stays visible
       before the popover unmounts the swatch element. */
    window.setTimeout(() => { setIsOpen(false); }, POPOVER_CLOSE_DELAY_MS);
  }, [theme, contextSafe, setTheme]);

  const handleSwatchClick = useCallback((event: MouseEvent<HTMLButtonElement>): void => {
    const next = getThemeFromEvent(event);
    if (next !== null) { handleThemeChange(next); }
  }, [handleThemeChange]);

  const swatchStyles = useMemo(
    () => Object.fromEntries(
      THEMES.map((themeItem) => [themeItem.name, { backgroundColor: themeItem.color } as CSSProperties]),
    ) as Record<ThemeName, CSSProperties>,
    [],
  );
  const currentTheme = useMemo(() => THEMES.find((item) => item.name === theme) ?? THEMES[0], [theme]);
  const triggerStyle = useMemo<CSSProperties>(() => ({ backgroundColor: currentTheme.color }), [currentTheme]);
  const triggerLabel = `Theme: ${currentTheme.label}. Click to change.`;

  return (
    <>
      <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger>
          <button aria-haspopup="dialog" aria-label={triggerLabel} className={TRIGGER_CLASS} style={triggerStyle} title={triggerLabel} type="button">
            <Palette aria-hidden="true" className="text-background mix-blend-difference" size={PALETTE_ICON_SIZE} />
          </button>
        </Popover.Trigger>
        <Popover.Content className="w-[300px]">
          <Popover.Dialog className="p-4">
            <Popover.Heading className="text-sm font-semibold mb-3">Choose theme</Popover.Heading>
            <SwatchGrid activeTheme={theme} onSwatchClick={handleSwatchClick} swatchStyles={swatchStyles} themes={THEMES} />
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
      <span aria-atomic="true" aria-live="polite" className="sr-only">{announcement}</span>
    </>
  );
};

export { ThemeSwitcher };
