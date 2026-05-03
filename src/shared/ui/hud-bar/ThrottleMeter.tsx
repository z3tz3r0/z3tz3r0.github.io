import type { ReactElement, RefObject } from "react";

interface ThrottleMeterProps {
  fillRef: RefObject<HTMLDivElement | null>;
  locationLabel: string;
  percentLabel: string;
}

const ThrottleMeter = ({
  fillRef,
  locationLabel,
  percentLabel,
}: ThrottleMeterProps): ReactElement => (
  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-cyan-400/85">
    <span className="text-cyan-500/60">THR</span>
    <div
      aria-label={`Scroll progress ${percentLabel}`}
      className="h-1 w-40 overflow-hidden rounded-full border border-cyan-500/30 bg-slate-900/70"
      role="meter"
    >
      <div
        ref={fillRef}
        className="h-full origin-left rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
      />
    </div>
    <span className="font-bold text-cyan-200">{percentLabel}</span>
    <span className="ml-2 hidden border-l border-cyan-500/25 pl-3 text-cyan-500/60 sm:inline">TGT</span>
    <span className="hidden font-bold text-cyan-200 sm:inline">{locationLabel}</span>
  </div>
);

export type { ThrottleMeterProps };
export { ThrottleMeter };
