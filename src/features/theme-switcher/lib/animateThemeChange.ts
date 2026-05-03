import { Flip } from "gsap/Flip";
import { gsap } from "gsap";

const FLIP_DURATION = 0.5;
const FLIP_STAGGER = 0.02;
const FLIP_TARGETS = ".flip-layout";
const PULSE_SCALE_FROM = 1.3;
const PULSE_DURATION = 0.3;

interface ThemeAnimationElements {
  activeSwatch: HTMLElement | null;
}

/**
 * Animates a theme transition. Must be called from inside a useGSAP context
 * (e.g. wrapped in contextSafe) so that Flip and pulse tweens are scoped
 * to the calling component and cleaned up on unmount.
 */
const animateThemeChange = (
  elements: ThemeAnimationElements,
  applyThemeMutation: () => void,
): void => {
  const flipElements = document.querySelectorAll(FLIP_TARGETS);
  let state: Flip.FlipState | null = null;
  if (flipElements.length > 0) {
    state = Flip.getState(flipElements);
  }

  applyThemeMutation();

  if (state) {
    Flip.from(state, {
      absolute: true,
      duration: FLIP_DURATION,
      ease: "power3.inOut",
      stagger: FLIP_STAGGER,
    });
  }

  if (elements.activeSwatch) {
    gsap.killTweensOf(elements.activeSwatch);
    gsap.fromTo(
      elements.activeSwatch,
      { scale: PULSE_SCALE_FROM },
      { duration: PULSE_DURATION, ease: "power2.out", scale: 1 },
    );
  }
};

export type { ThemeAnimationElements };
export { animateThemeChange };
