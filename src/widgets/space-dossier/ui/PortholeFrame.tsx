import type { CSSProperties, ReactElement } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const SCAN_DURATION = 4;
const REPEAT_FOREVER = -1;

const SCAN_LAYER_STYLE: CSSProperties = {
  background:
    "repeating-linear-gradient(0deg, rgba(34,211,238,0.07) 0px, rgba(34,211,238,0.07) 1px, transparent 1px, transparent 4px)",
  height: "30%",
};

const FRAME_CLASS = [
  "relative",
  "h-64",
  "w-64",
  "overflow-hidden",
  "rounded-full",
  "border-4",
  "border-cyan-400",
  "bg-slate-950",
  "shadow-[0_0_36px_rgba(34,211,238,0.4)]",
].join(" ");
const SCAN_LAYER_CLASS = "pointer-events-none absolute inset-x-0 z-10";
const IMG_CLASS
  = "h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0";

const installScanLoop = (layer: HTMLDivElement | null): (() => void) => {
  const mediaMatch = gsap.matchMedia();
  if (!layer) { return (): void => { mediaMatch.revert(); }; }
  mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
    const tween = gsap.fromTo(
      layer,
      { top: "-30%" },
      { duration: SCAN_DURATION, ease: "none", repeat: REPEAT_FOREVER, top: "100%" },
    );
    return (): void => { tween.kill(); };
  });
  mediaMatch.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(layer, { top: 0 });
  });
  return (): void => { mediaMatch.revert(); };
};

const PortholeFrame = (): ReactElement => {
  const scanRef = useRef<HTMLDivElement>(null);
  useGSAP(() => installScanLoop(scanRef.current), []);
  return (
    <div className={FRAME_CLASS}>
      <div ref={scanRef} aria-hidden="true" className={SCAN_LAYER_CLASS} style={SCAN_LAYER_STYLE} />
      <img alt="Captain dossier portrait" className={IMG_CLASS} src="/profile.png" />
    </div>
  );
};

export { PortholeFrame };
