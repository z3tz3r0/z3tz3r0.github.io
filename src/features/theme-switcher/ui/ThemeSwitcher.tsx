import { useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { type ThemeName, useThemeStore } from "@/features/theme-switcher/model/useThemeStore";

const THEMES: { name: ThemeName; color: string; label: string }[] = [
  { name: "default", color: "#f97316", label: "Default" },
  { name: "luxury", color: "#d4a853", label: "Luxury" },
  { name: "editorial", color: "#ffffff", label: "Editorial" },
  { name: "cyberpunk", color: "#e040fb", label: "Cyberpunk" },
  { name: "minimal", color: "#8b6f47", label: "Minimal" },
];

/** Selector for elements that participate in Flip layout animation */
const FLIP_TARGETS = ".flip-layout";

function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleThemeChange = useCallback((newTheme: ThemeName) => {
    if (newTheme === theme) return;

    const safeAnimate = contextSafe(() => {
      // Capture layout state before theme change
      const flipElements = document.querySelectorAll(FLIP_TARGETS);
      const state = flipElements.length > 0 ? Flip.getState(flipElements) : null;

      // Apply new theme (changes CSS vars + layout vars)
      setTheme(newTheme);

      // Animate layout shift with Flip
      if (state) {
        Flip.from(state, {
          duration: 0.5,
          ease: "power3.inOut",
          stagger: 0.02,
          absolute: true,
        });
      }

      // Pulse animation on the selected swatch
      const activeSwatch = containerRef.current?.querySelector(`[data-theme="${newTheme}"]`);
      if (activeSwatch) {
        gsap.killTweensOf(activeSwatch);
        gsap.fromTo(
          activeSwatch,
          { scale: 1.3 },
          { scale: 1, duration: 0.3, ease: "power2.out" },
        );
      }
    });

    safeAnimate();
  }, [theme, contextSafe, setTheme]);

  return (
    <div ref={containerRef} className="flex items-center gap-2">
      {THEMES.map((t) => (
        <button
          key={t.name}
          data-theme={t.name}
          onClick={() => handleThemeChange(t.name)}
          title={t.label}
          className={`
            w-6 h-6 rounded-full transition-all duration-200 cursor-pointer
            hover:scale-110
            ${theme === t.name
              ? "ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110"
              : "opacity-60 hover:opacity-100"
            }
          `}
          style={{ backgroundColor: t.color }}
          aria-label={`Switch to ${t.label} theme`}
          aria-pressed={theme === t.name}
        />
      ))}
    </div>
  );
}

export default ThemeSwitcher;
export { FLIP_TARGETS };
