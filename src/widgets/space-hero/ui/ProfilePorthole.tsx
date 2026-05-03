import type { CSSProperties, ReactElement } from "react";

const SCAN_LINE_STYLE: CSSProperties = {
  background:
    "repeating-linear-gradient(0deg, rgba(34,211,238,0.06) 0px, rgba(34,211,238,0.06) 1px, transparent 1px, transparent 4px)",
};

const ROOT_CLASS = [
  "absolute",
  "-bottom-12",
  "-right-8",
  "h-28",
  "w-28",
  "overflow-hidden",
  "rounded-full",
  "border-2",
  "border-cyan-400",
  "bg-slate-950",
  "shadow-[0_0_24px_rgba(34,211,238,0.4)]",
  "hidden",
  "md:block",
].join(" ");
const SCAN_LAYER_CLASS = "pointer-events-none absolute inset-0 z-10";
const IMG_CLASS
  = "h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0";

const ProfilePorthole = (): ReactElement => (
  <div className={ROOT_CLASS}>
    <div aria-hidden="true" className={SCAN_LAYER_CLASS} style={SCAN_LINE_STYLE} />
    <img alt="Kittipan W portrait porthole" className={IMG_CLASS} src="/profile.png" />
  </div>
);

export { ProfilePorthole };
