import { EASE } from "@/shared/lib/animation";
import type { RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const DEFAULT_SELECTOR = ".reveal";
const DEFAULT_START = "top 80%";
const DEFAULT_STAGGER = 0.1;
const DEFAULT_DURATION = 0.6;
const DEFAULT_Y_OFFSET = 40;

interface ScrollRevealOptions {
  /** Animation duration in seconds */
  duration?: number;
  /** CSS selector for elements to reveal inside the container */
  selector?: string;
  /** ScrollTrigger start position */
  start?: string;
  /** Stagger between items in seconds */
  stagger?: number;
  /** Y offset to animate from */
  yOffset?: number;
}

/**
 * Hook that registers scroll-triggered reveal animations.
 * Uses ScrollTrigger.batch for efficient batched reveals.
 * Respects prefers-reduced-motion via gsap.matchMedia.
 */
const useGsapScrollReveal = (options: ScrollRevealOptions = {}): RefObject<HTMLDivElement | null> => {
  const {
    duration = DEFAULT_DURATION,
    selector = DEFAULT_SELECTOR,
    start = DEFAULT_START,
    stagger = DEFAULT_STAGGER,
    yOffset = DEFAULT_Y_OFFSET,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) { return; }

    const queryElements = gsap.utils.selector(containerRef);
    const elements = queryElements(selector);

    if (elements.length === 0) { return; }

    gsap.set(elements, { autoAlpha: 0, y: yOffset });

    const mediaMatch = gsap.matchMedia();

    mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.batch(elements, {
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            duration,
            ease: EASE.entrance,
            overwrite: true,
            stagger,
            y: 0,
          });
        },
        once: true,
        start,
      });
    });

    mediaMatch.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(elements, { autoAlpha: 1, y: 0 });
    });

    return (): void => { mediaMatch.revert(); };
  }, { scope: containerRef });

  return containerRef;
};

export { useGsapScrollReveal };
