import type { CSSProperties, ReactElement } from "react";
import { useCallback, useMemo } from "react";

interface FreqDialOptionData {
  accent: string;
  label: string;
  name: string;
}

interface FreqDialOptionProps {
  isActive: boolean;
  onSelect: (name: string) => void;
  option: FreqDialOptionData;
}

const OPTION_BASE_CLASS = [
  "flex",
  "flex-col",
  "items-center",
  "gap-1",
  "rounded-md",
  "border",
  "px-2",
  "py-1.5",
  "text-[10px]",
  "uppercase",
  "tracking-[0.18em]",
  "transition-colors",
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-cyan-300",
].join(" ");
const OPTION_ACTIVE_CLASS = "border-cyan-300 bg-cyan-400/10 text-cyan-100";
const OPTION_IDLE_CLASS = "border-cyan-500/20 bg-slate-900/40 text-cyan-300/80 hover:border-cyan-300/60 hover:bg-slate-900/70";
const DOT_CLASS = "h-2.5 w-2.5 rounded-full ring-1 ring-cyan-100/30";

const optionClass = (isActive: boolean): string => {
  if (isActive) { return `${OPTION_BASE_CLASS} ${OPTION_ACTIVE_CLASS}`; }
  return `${OPTION_BASE_CLASS} ${OPTION_IDLE_CLASS}`;
};

const FreqDialOption = ({ isActive, onSelect, option }: FreqDialOptionProps): ReactElement => {
  const dotStyle = useMemo<CSSProperties>(
    () => ({ backgroundColor: option.accent }),
    [option.accent],
  );
  const handleClick = useCallback((): void => { onSelect(option.name); }, [onSelect, option.name]);
  return (
    <button
      aria-label={`Tune to ${option.label} theme`}
      aria-pressed={isActive}
      className={optionClass(isActive)}
      data-theme={option.name}
      onClick={handleClick}
      type="button"
    >
      <span aria-hidden="true" className={DOT_CLASS} style={dotStyle} />
      <span>{option.label}</span>
    </button>
  );
};

export type { FreqDialOptionData, FreqDialOptionProps };
export { FreqDialOption };
