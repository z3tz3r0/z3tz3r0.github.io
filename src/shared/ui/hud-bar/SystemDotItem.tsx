import type { ReactElement } from "react";
import { useCallback } from "react";

interface SystemDot {
  key: string;
  label: string;
  lit: boolean;
  pulse: boolean;
  toggle: boolean;
}

interface SystemDotItemProps {
  dot: SystemDot;
  onToggle: (key: string) => void;
}

const DOT_PULSE_CLASS = "h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.85)]";
const DOT_LIT_CLASS = "h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(34,211,238,0.6)]";
const DOT_DIM_CLASS = "h-1.5 w-1.5 rounded-full bg-cyan-900/70";

const dotClass = (dot: SystemDot): string => {
  if (dot.pulse && dot.lit) { return DOT_PULSE_CLASS; }
  if (dot.lit) { return DOT_LIT_CLASS; }
  return DOT_DIM_CLASS;
};

const toggleAriaLabel = (dot: SystemDot): string => {
  if (dot.lit) { return `${dot.label} on`; }
  return `${dot.label} muted`;
};

const renderToggle = (dot: SystemDot, onClick: () => void): ReactElement => (
  <button
    aria-label={toggleAriaLabel(dot)}
    aria-pressed={dot.lit}
    className="flex items-center gap-1.5 rounded-full px-1 text-cyan-300/85 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300"
    onClick={onClick}
    type="button"
  >
    <span aria-hidden="true" className={dotClass(dot)} />
    <span>{dot.label}</span>
  </button>
);

const renderStatic = (dot: SystemDot): ReactElement => (
  <span className="flex items-center gap-1.5 text-cyan-300/85">
    <span aria-hidden="true" className={dotClass(dot)} />
    <span>{dot.label}</span>
  </span>
);

const SystemDotItem = ({ dot, onToggle }: SystemDotItemProps): ReactElement => {
  const handleClick = useCallback((): void => { onToggle(dot.key); }, [dot.key, onToggle]);
  if (dot.toggle) { return renderToggle(dot, handleClick); }
  return renderStatic(dot);
};

export type { SystemDot, SystemDotItemProps };
export { SystemDotItem };
