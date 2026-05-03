import type { CSSProperties, ReactElement } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const MARQUEE_DURATION = 30;
const REPEAT_FOREVER = -1;
const HUD_FONT_STYLE: CSSProperties = {
  fontFamily: "'Space Mono', 'Geist Mono', monospace",
};
const STATUS_TEXT
  = "MISSION: OPEN TO HIRE · SECTOR: FULL STACK · CLEARANCE: LEVEL 5 · TRANSMITTING ON ALL FREQUENCIES";

const ROOT_CLASS
  = "absolute bottom-4 left-0 right-0 overflow-hidden border-t border-cyan-500/15 pt-3";
const TRACK_CLASS
  = "flex whitespace-nowrap text-[10px] uppercase tracking-[0.32em] text-cyan-400/45";
const SEGMENT_CLASS = "px-6";

const installMarquee = (track: HTMLDivElement | null): (() => void) => {
  const mediaMatch = gsap.matchMedia();
  if (track) {
    mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(track, {
        duration: MARQUEE_DURATION,
        ease: "none",
        repeat: REPEAT_FOREVER,
        x: "-50%",
      });
      return (): void => { tween.kill(); };
    });
    mediaMatch.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(track, { x: 0 });
    });
  }
  return (): void => { mediaMatch.revert(); };
};

const StatusMarquee = (): ReactElement => {
  const trackRef = useRef<HTMLDivElement>(null);
  useGSAP(() => installMarquee(trackRef.current), []);
  return (
    <div className={ROOT_CLASS} style={HUD_FONT_STYLE}>
      <div ref={trackRef} className={TRACK_CLASS}>
        <span className={SEGMENT_CLASS}>{STATUS_TEXT}</span>
        <span aria-hidden="true" className={SEGMENT_CLASS}>{STATUS_TEXT}</span>
      </div>
    </div>
  );
};

export { StatusMarquee };
