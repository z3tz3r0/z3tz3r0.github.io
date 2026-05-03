import type { CSSProperties, ReactElement, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AvailabilityGauge } from "@/shared/ui/hud-bar/AvailabilityGauge";
import type { HudLed } from "@/shared/ui/hud-bar/HudLedList";
import { HudLedList } from "@/shared/ui/hud-bar/HudLedList";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/shared/lib/use-reduced-motion";
import { useScrollMetrics } from "@/shared/lib/use-scroll-metrics";

interface TopHudBarProps {
  topRightSlot?: ReactNode;
}

const CALLSIGN = "KW";
const AVAILABILITY_LABEL = "OPEN FOR 1";
const AVAILABILITY_PERCENT = 50;
const LAST_UPDATE_DAYS_AGO = 2;
const FRESH_UPDATE_THRESHOLD_DAYS = 30;
const SIGNAL_PULSE_DURATION = 1.5;
const ENTRANCE_OFFSET_PX = -64;
const ENTRANCE_DURATION = 0.6;
const GAUGE_FILL_DURATION = 1.2;
const REPEAT_FOREVER = -1;
const SIGNAL_OPACITY_MIN = 0.6;
const SIGNAL_OPACITY_MAX = 1.0;
const PERCENT_MULTIPLIER = 100;
const MONTH_OFFSET = 1;
const PAD_THRESHOLD = 10;
const FALLBACK_OPACITY = 1.0;
const RESET_Y = 0;
const ZERO = 0;

const HUD_FONT_STYLE: CSSProperties = {
  fontFamily: "'Space Mono', 'Geist Mono', monospace",
};

const ROOT_CLASS = "fixed inset-x-0 top-0 z-30 h-16 border-b border-cyan-500/25 bg-slate-950/55 backdrop-blur-xl";

const padTwo = (value: number): string => {
  if (value < PAD_THRESHOLD) { return `0${String(value)}`; }
  return String(value);
};

const formatStardate = (now: Date): string => {
  const year = now.getFullYear();
  const month = padTwo(now.getMonth() + MONTH_OFFSET);
  const day = padTwo(now.getDate());
  return `${String(year)}.${month}.${day}`;
};

const formatDepth = (depth: number): string => {
  const pct = Math.round(depth * PERCENT_MULTIPLIER);
  return `${String(pct)}%`;
};

const useStardate = (): string => {
  const [stamp, setStamp] = useState<string>(() => formatStardate(new Date()));
  useEffect(() => {
    setStamp(formatStardate(new Date()));
  }, []);
  return stamp;
};

const buildLeds = (reducedMotion: boolean): readonly HudLed[] => [
  { key: "motion", label: "MOTION", lit: reducedMotion, pulse: false },
  { key: "signal", label: "SIGNAL", lit: true, pulse: true },
  {
    key: "update",
    label: `UPDATE · ${String(LAST_UPDATE_DAYS_AGO)}D`,
    lit: LAST_UPDATE_DAYS_AGO < FRESH_UPDATE_THRESHOLD_DAYS,
    pulse: false,
  },
  { key: "channel", label: "CHANNEL", lit: true, pulse: false },
];

interface AnimRefs {
  gauge: HTMLDivElement | null;
  root: HTMLDivElement | null;
  signal: HTMLSpanElement | null;
}

const installAnimations = (refs: AnimRefs): (() => void) => {
  const mediaMatch = gsap.matchMedia();
  mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
    if (refs.root) {
      gsap.fromTo(
        refs.root,
        { autoAlpha: ZERO, y: ENTRANCE_OFFSET_PX },
        { autoAlpha: FALLBACK_OPACITY, duration: ENTRANCE_DURATION, ease: "power2.out", y: RESET_Y },
      );
    }
    if (refs.gauge) {
      gsap.fromTo(
        refs.gauge,
        { scaleX: ZERO },
        {
          duration: GAUGE_FILL_DURATION,
          ease: "power2.out",
          scaleX: AVAILABILITY_PERCENT / PERCENT_MULTIPLIER,
        },
      );
    }
    if (refs.signal) {
      gsap.fromTo(
        refs.signal,
        { opacity: SIGNAL_OPACITY_MIN },
        {
          duration: SIGNAL_PULSE_DURATION,
          ease: "sine.inOut",
          opacity: SIGNAL_OPACITY_MAX,
          repeat: REPEAT_FOREVER,
          yoyo: true,
        },
      );
    }
  });
  mediaMatch.add("(prefers-reduced-motion: reduce)", () => {
    if (refs.root) { gsap.set(refs.root, { autoAlpha: FALLBACK_OPACITY, y: RESET_Y }); }
    if (refs.gauge) { gsap.set(refs.gauge, { scaleX: AVAILABILITY_PERCENT / PERCENT_MULTIPLIER }); }
    if (refs.signal) { gsap.set(refs.signal, { opacity: SIGNAL_OPACITY_MAX }); }
  });
  return (): void => { mediaMatch.revert(); };
};

const renderRightSlot = (slot: ReactNode): ReactElement => (
  <div className="flex items-center">{slot}</div>
);

const TopHudBar = ({ topRightSlot }: TopHudBarProps): ReactElement => {
  const { currentSection, depth } = useScrollMetrics();
  const reducedMotion = useReducedMotion();
  const stardate = useStardate();
  const leds = useMemo(() => buildLeds(reducedMotion), [reducedMotion]);

  const rootRef = useRef<HTMLDivElement>(null);
  const gaugeFillRef = useRef<HTMLDivElement>(null);
  const signalLedRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => installAnimations({
    gauge: gaugeFillRef.current,
    root: rootRef.current,
    signal: signalLedRef.current,
  }), []);

  const sectionLabel = currentSection.toUpperCase();
  const depthLabel = formatDepth(depth);
  const rightSlot = renderRightSlot(topRightSlot);

  return (
    <div ref={rootRef} className={ROOT_CLASS} style={HUD_FONT_STYLE}>
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-3 text-cyan-300">
          <span className="text-base font-bold tracking-[0.3em] drop-shadow-[0_0_8px_rgba(6,182,212,0.55)]">
            {CALLSIGN}
          </span>
          <span className="hidden h-4 w-px bg-cyan-500/40 sm:inline" />
          <span className="hidden text-[10px] uppercase tracking-[0.32em] text-cyan-500/70 sm:inline">SECTION</span>
          <span className="hidden font-bold text-cyan-100 sm:inline">{sectionLabel}</span>
        </div>

        <div className="hidden items-center gap-6 text-[10px] uppercase tracking-[0.24em] md:flex">
          <span className="flex items-baseline gap-1.5 text-cyan-400/85">
            <span className="text-cyan-500/60">DEPTH</span>
            <span className="font-bold text-cyan-200">{depthLabel}</span>
          </span>
          <AvailabilityGauge fillRef={gaugeFillRef} label={AVAILABILITY_LABEL} percent={AVAILABILITY_PERCENT} />
          <span className="flex items-baseline gap-1.5 text-cyan-400/85">
            <span className="text-cyan-500/60">SD</span>
            <span className="font-bold text-cyan-200">{stardate}</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <HudLedList leds={leds} signalRef={signalLedRef} />
          {rightSlot}
        </div>
      </div>
    </div>
  );
};

export type { TopHudBarProps };
export { TopHudBar };
