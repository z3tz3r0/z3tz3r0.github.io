import type { ReactElement, RefObject } from "react";

interface HudLed {
  key: string;
  label: string;
  lit: boolean;
  pulse: boolean;
}

interface HudLedListProps {
  leds: readonly HudLed[];
  signalRef: RefObject<HTMLSpanElement | null>;
}

const LED_LIT_CLASS = "h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(34,211,238,0.85)]";
const LED_DIM_CLASS = "h-1.5 w-1.5 rounded-full bg-cyan-900/70";
const LED_LABEL_LIT = "text-cyan-300/90";
const LED_LABEL_DIM = "text-cyan-700/60";

const ledDotClass = (lit: boolean): string => {
  if (lit) { return LED_LIT_CLASS; }
  return LED_DIM_CLASS;
};

const ledLabelClass = (lit: boolean): string => {
  if (lit) { return LED_LABEL_LIT; }
  return LED_LABEL_DIM;
};

const renderDot = (
  led: HudLed,
  signalRef: RefObject<HTMLSpanElement | null>,
): ReactElement => {
  if (led.pulse) {
    return <span aria-hidden="true" ref={signalRef} className={ledDotClass(led.lit)} />;
  }
  return <span aria-hidden="true" className={ledDotClass(led.lit)} />;
};

const HudLedList = ({ leds, signalRef }: HudLedListProps): ReactElement => (
  <ul className="flex items-center gap-3 text-[9px] uppercase tracking-[0.28em]">
    {leds.map((led) => (
      <li key={led.key} className="flex flex-col items-center gap-0.5">
        {renderDot(led, signalRef)}
        <span className={ledLabelClass(led.lit)}>{led.label}</span>
      </li>
    ))}
  </ul>
);

export type { HudLed, HudLedListProps };
export { HudLedList };
