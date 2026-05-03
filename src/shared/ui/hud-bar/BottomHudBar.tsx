import type { CSSProperties, ReactElement } from "react";
import { useCallback, useRef, useState } from "react";
import type { SystemDot } from "@/shared/ui/hud-bar/SystemDotItem";
import { SystemDotItem } from "@/shared/ui/hud-bar/SystemDotItem";
import { ThrottleMeter } from "@/shared/ui/hud-bar/ThrottleMeter";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/shared/lib/use-reduced-motion";
import { useScrollMetrics } from "@/shared/lib/use-scroll-metrics";

const ENTRANCE_OFFSET_PX = 48;
const ENTRANCE_DURATION = 0.6;
const ENTRANCE_DELAY = 0.1;
const THROTTLE_TWEEN_DURATION = 0.3;
const PERCENT_MULTIPLIER = 100;
const LOCATION_LABEL = "BANGKOK · UTC+7";
const FALLBACK_OPACITY = 1.0;
const RESET_Y = 0;
const ZERO = 0;

const HUD_FONT_STYLE: CSSProperties = {
  fontFamily: "'Space Mono', 'Geist Mono', monospace",
};

const ROOT_CLASS = "fixed inset-x-0 bottom-0 z-30 h-12 border-t border-cyan-500/25 bg-slate-950/55 backdrop-blur-xl";

const formatThrottle = (depth: number): string => {
  const pct = Math.round(depth * PERCENT_MULTIPLIER);
  return `${String(pct)}%`;
};

interface DotsParams {
  audioOn: boolean;
  reducedMotion: boolean;
}

const buildDots = (params: DotsParams): readonly SystemDot[] => [
  { key: "audio", label: "AUDIO", lit: params.audioOn, pulse: false, toggle: true },
  { key: "motion", label: "MOTION", lit: params.reducedMotion, pulse: false, toggle: false },
  { key: "signal", label: "SIGNAL", lit: true, pulse: true, toggle: false },
  { key: "channel", label: "CHANNEL", lit: true, pulse: false, toggle: false },
];

const installEntrance = (root: HTMLDivElement | null): (() => void) => {
  const mediaMatch = gsap.matchMedia();
  mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
    if (root) {
      gsap.fromTo(
        root,
        { autoAlpha: ZERO, y: ENTRANCE_OFFSET_PX },
        {
          autoAlpha: FALLBACK_OPACITY,
          delay: ENTRANCE_DELAY,
          duration: ENTRANCE_DURATION,
          ease: "power2.out",
          y: RESET_Y,
        },
      );
    }
  });
  mediaMatch.add("(prefers-reduced-motion: reduce)", () => {
    if (root) { gsap.set(root, { autoAlpha: FALLBACK_OPACITY, y: RESET_Y }); }
  });
  return (): void => { mediaMatch.revert(); };
};

const animateThrottle = (
  fill: HTMLDivElement | null,
  depth: number,
  reducedMotion: boolean,
): void => {
  if (!fill) { return; }
  if (reducedMotion) {
    gsap.set(fill, { scaleX: depth });
    return;
  }
  gsap.to(fill, {
    duration: THROTTLE_TWEEN_DURATION,
    ease: "power2.out",
    overwrite: "auto",
    scaleX: depth,
  });
};

const BottomHudBar = (): ReactElement => {
  const { depth } = useScrollMetrics();
  const reducedMotion = useReducedMotion();
  const [audioOn, setAudioOn] = useState<boolean>(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const throttleFillRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback((key: string): void => {
    if (key === "audio") { setAudioOn((prev) => !prev); }
  }, []);

  const dots = buildDots({ audioOn, reducedMotion });

  useGSAP(() => installEntrance(rootRef.current), []);
  useGSAP(() => {
    animateThrottle(throttleFillRef.current, depth, reducedMotion);
  }, [depth, reducedMotion]);

  const percentLabel = formatThrottle(depth);

  return (
    <div ref={rootRef} className={ROOT_CLASS} style={HUD_FONT_STYLE}>
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-6 px-6">
        <ul className="flex items-center gap-4 text-[10px] uppercase tracking-[0.32em]">
          {dots.map((dot) => (
            <li key={dot.key}>
              <SystemDotItem dot={dot} onToggle={handleToggle} />
            </li>
          ))}
        </ul>
        <ThrottleMeter
          fillRef={throttleFillRef}
          locationLabel={LOCATION_LABEL}
          percentLabel={percentLabel}
        />
      </div>
    </div>
  );
};

export { BottomHudBar };
