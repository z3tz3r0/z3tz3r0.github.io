import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/shared/lib/animation";

interface ScrollRevealOptions {
  /** CSS selector for elements to reveal inside the container */
  selector?: string;
  /** ScrollTrigger start position (default: "top 80%") */
  start?: string;
  /** Stagger between items in seconds (default: 0.1) */
  stagger?: number;
  /** Animation duration in seconds (default: 0.6) */
  duration?: number;
  /** Y offset to animate from (default: 40) */
  y?: number;
}

/**
 * Hook that registers scroll-triggered reveal animations.
 * Uses ScrollTrigger.batch for efficient batched reveals.
 * Respects prefers-reduced-motion via gsap.matchMedia.
 *
 * Usage:
 *   const containerRef = useGsapScrollReveal({ selector: ".reveal-item" });
 *   return <div ref={containerRef}>...</div>
 */
export function useGsapScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    selector = ".reveal",
    start = "top 80%",
    stagger = 0.1,
    duration = 0.6,
    y = 40,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const q = gsap.utils.selector(containerRef);
    const elements = q(selector);

    if (elements.length === 0) return;

    // Set initial hidden state
    gsap.set(elements, { autoAlpha: 0, y });

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.batch(elements, {
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            stagger,
            duration,
            ease: EASE.entrance,
            overwrite: true,
          });
        },
        start,
        once: true,
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Skip animation, show immediately
      gsap.set(elements, { autoAlpha: 1, y: 0 });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return containerRef;
}
