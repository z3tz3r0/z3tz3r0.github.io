import { EASE } from "@/shared/lib/animation";
import { HIDDEN_STYLE } from "@/shared/lib/styles";
import { HeroContent } from "@/widgets/hero/ui/HeroContent";
import type { ReactElement } from "react";
import { ScrollVelocity } from "@/shared/ui/scroll-velocity/ScrollVelocity";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const HERO_ANIMATION_DURATION = 0.7;
const HERO_ANIMATION_OFFSET_LARGE = 40;
const HERO_ANIMATION_OFFSET_MEDIUM = 30;
const HERO_ANIMATION_OFFSET_SMALL = 20;
const HERO_ANIMATION_SCALE_INITIAL = 0.9;
const HERO_ANIMATION_STAGGER_NORMAL = 0.15;
const HERO_ANIMATION_STAGGER_IMAGE = 0.1;
const HERO_MARQUEE_VELOCITY = 20;

const HERO_GRID_STYLE: React.CSSProperties = {
  gridTemplateColumns: "var(--layout-hero-cols)",
};

const MARQUEE_TEXTS = ["OPEN FOR HIRING", "OPEN FOR HIRING"];

const Hero = (): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const querySelector = gsap.utils.selector(containerRef);
    const mediaMatch = gsap.matchMedia();

    mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        defaults: { duration: HERO_ANIMATION_DURATION, ease: EASE.entrance },
      });

      timeline
        .from(querySelector(".hero-greeting"), { autoAlpha: 0, y: HERO_ANIMATION_OFFSET_MEDIUM })
        .from(querySelector(".hero-title"), { autoAlpha: 0, y: HERO_ANIMATION_OFFSET_LARGE }, `<${HERO_ANIMATION_STAGGER_NORMAL}`)
        .from(querySelector(".hero-subtitle"), { autoAlpha: 0, y: HERO_ANIMATION_OFFSET_SMALL }, `<${HERO_ANIMATION_STAGGER_NORMAL}`)
        .from(querySelector(".hero-cta"), { autoAlpha: 0, y: HERO_ANIMATION_OFFSET_SMALL }, `<${HERO_ANIMATION_STAGGER_NORMAL}`)
        .from(querySelector(".hero-image"), { autoAlpha: 0, scale: HERO_ANIMATION_SCALE_INITIAL }, `<${HERO_ANIMATION_STAGGER_IMAGE}`);
    });

    mediaMatch.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        querySelector(".hero-greeting, .hero-title, .hero-subtitle, .hero-cta, .hero-image"),
        { autoAlpha: 1, scale: 1, y: 0 },
      );
    });

    return (): void => { mediaMatch.revert(); };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="text-center pt-4">
      <div
        className="flip-layout px-4 grid gap-16 max-w-7xl mx-auto items-center justify-items-center mb-16"
        style={HERO_GRID_STYLE}
      >
        <HeroContent />
        <img
          alt="Kittipan Wangsakarn, Full Stack Developer"
          className="hero-image rounded-xl w-3xs lg:w-full"
          src="/profile.png"
          style={HIDDEN_STYLE}
        />
      </div>
      <ScrollVelocity
        className="text-foreground/20 text-6xl mb-4"
        texts={MARQUEE_TEXTS}
        velocity={HERO_MARQUEE_VELOCITY}
      />
    </div>
  );
};

export { Hero };
