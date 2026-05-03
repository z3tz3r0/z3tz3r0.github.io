import type { CSSProperties, ReactElement } from "react";
import { useCallback, useRef, useState } from "react";
import { FreqDialOption } from "@/shared/ui/freq-dial/FreqDialOption";
import type { FreqDialOptionData } from "@/shared/ui/freq-dial/FreqDialOption";
import { Popover } from "@/shared/ui/popover";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type FreqDialThemeOption = FreqDialOptionData;

interface FreqDialProps {
  currentTheme: string;
  onThemeChange: (next: string) => void;
  themes: readonly FreqDialThemeOption[];
}

const LABEL_TRUNCATE_LIMIT = 6;
const RING_ROTATION_SECONDS = 30;
const REPEAT_FOREVER = -1;
const POPOVER_CLOSE_DELAY_MS = 160;
const FULL_TURN_DEGREES = 360;
const RESET_DEGREES = 0;

const HUD_FONT_STYLE: CSSProperties = {
  fontFamily: "'Space Mono', 'Geist Mono', monospace",
};

const DIAL_BUTTON_CLASS = [
  "relative",
  "flex",
  "h-10",
  "w-10",
  "items-center",
  "justify-center",
  "rounded-full",
  "border",
  "border-cyan-500/40",
  "bg-slate-950/55",
  "text-cyan-200",
  "shadow-[0_0_12px_rgba(34,211,238,0.18),inset_0_0_8px_rgba(34,211,238,0.12)]",
  "transition-colors",
  "hover:border-cyan-300/80",
  "hover:text-cyan-100",
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-cyan-300",
  "focus-visible:ring-offset-2",
  "focus-visible:ring-offset-slate-950",
].join(" ");

const RING_OVERLAY_CLASS = [
  "pointer-events-none",
  "absolute",
  "inset-0",
  "rounded-full",
  "border",
  "border-cyan-300/45",
  "border-t-cyan-200/95",
].join(" ");

const TICKS_OVERLAY_CLASS = [
  "pointer-events-none",
  "absolute",
  "inset-[-3px]",
  "rounded-full",
  "border",
  "border-dashed",
  "border-cyan-400/25",
].join(" ");

const POPOVER_CONTENT_CLASS = [
  "w-[260px]",
  "border",
  "border-cyan-500/30",
  "bg-slate-950/90",
  "backdrop-blur-xl",
  "shadow-[0_0_24px_rgba(34,211,238,0.18)]",
].join(" ");

const POPOVER_DIALOG_CLASS = "p-3";
const POPOVER_HEADING_CLASS = [
  "mb-2",
  "text-[10px]",
  "uppercase",
  "tracking-[0.32em]",
  "text-cyan-400/80",
].join(" ");
const POPOVER_GRID_CLASS = "grid grid-cols-3 gap-2";
const DIAL_LABEL_CLASS = "text-[8px] font-bold uppercase tracking-[0.16em]";

const truncateLabel = (value: string): string => {
  const upper = value.toUpperCase();
  if (upper.length <= LABEL_TRUNCATE_LIMIT) { return upper; }
  return upper.slice(0, LABEL_TRUNCATE_LIMIT);
};

const installRingRotation = (ring: HTMLElement): (() => void) => {
  const mediaMatch = gsap.matchMedia();
  mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
    const tween = gsap.to(ring, {
      duration: RING_ROTATION_SECONDS,
      ease: "none",
      repeat: REPEAT_FOREVER,
      rotation: FULL_TURN_DEGREES,
    });
    return (): void => { tween.kill(); };
  });
  mediaMatch.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(ring, { rotation: RESET_DEGREES });
  });
  return (): void => { mediaMatch.revert(); };
};

const FreqDial = ({ currentTheme, onThemeChange, themes }: FreqDialProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const ringRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const ring = ringRef.current;
    if (!ring) { return; }
    return installRingRotation(ring);
  }, []);

  const handleSelect = useCallback((name: string): void => {
    onThemeChange(name);
    /* Close shortly after the click so the active-state highlight stays visible. */
    window.setTimeout(() => { setIsOpen(false); }, POPOVER_CLOSE_DELAY_MS);
  }, [onThemeChange]);

  const triggerLabel = `Frequency dial. Current theme ${currentTheme}. Click to tune.`;
  const dialLabel = truncateLabel(currentTheme);

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <button
          aria-haspopup="dialog"
          aria-label={triggerLabel}
          className={DIAL_BUTTON_CLASS}
          style={HUD_FONT_STYLE}
          title={triggerLabel}
          type="button"
        >
          <span aria-hidden="true" ref={ringRef} className={RING_OVERLAY_CLASS} />
          <span aria-hidden="true" className={TICKS_OVERLAY_CLASS} />
          <span className={DIAL_LABEL_CLASS}>{dialLabel}</span>
        </button>
      </Popover.Trigger>
      <Popover.Content className={POPOVER_CONTENT_CLASS}>
        <Popover.Dialog className={POPOVER_DIALOG_CLASS}>
          <Popover.Heading className={POPOVER_HEADING_CLASS}>FREQ · TUNE THEME</Popover.Heading>
          <div className={POPOVER_GRID_CLASS}>
            {themes.map((option) => (
              <FreqDialOption
                key={option.name}
                isActive={option.name === currentTheme}
                onSelect={handleSelect}
                option={option}
              />
            ))}
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
};

export type { FreqDialProps, FreqDialThemeOption };
export { FreqDial };
