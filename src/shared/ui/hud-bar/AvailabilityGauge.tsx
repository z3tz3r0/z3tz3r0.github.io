import type { ReactElement, RefObject } from "react";

interface AvailabilityGaugeProps {
  fillRef: RefObject<HTMLDivElement | null>;
  label: string;
  percent: number;
}

const AvailabilityGauge = ({ fillRef, label, percent }: AvailabilityGaugeProps): ReactElement => (
  <div className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.28em] md:flex">
    <span className="text-cyan-500/60">AVAILABILITY</span>
    <span className="font-bold text-cyan-200">{label}</span>
    <div
      aria-label={`Availability gauge ${String(percent)} percent`}
      className="h-1 w-20 overflow-hidden rounded-full border border-cyan-500/30 bg-slate-900/70"
      role="meter"
    >
      <div
        ref={fillRef}
        className="h-full origin-left rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 shadow-[0_0_8px_rgba(34,211,238,0.55)]"
      />
    </div>
  </div>
);

export type { AvailabilityGaugeProps };
export { AvailabilityGauge };
