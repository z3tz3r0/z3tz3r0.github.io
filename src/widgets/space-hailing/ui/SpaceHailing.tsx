import type { CSSProperties, ReactElement } from "react";
import type { TerminalLineEntry, TerminalPhase } from "@/widgets/space-hailing/model/useTerminal";
import { GlassPanel } from "@/shared/ui/glass-panel/GlassPanel";
import { InteractivePrompt } from "@/widgets/space-hailing/ui/InteractivePrompt";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TerminalLine } from "@/widgets/space-hailing/ui/TerminalLine";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useHailingFlow } from "@/widgets/space-hailing/model/useHailingFlow";
import { useRef } from "react";
import { useTerminal } from "@/widgets/space-hailing/model/useTerminal";

gsap.registerPlugin(ScrollTrigger);

const LINE_DURATION = 0.3;
const LINE_STAGGER = 0.18;
const CURSOR_BLINK_DURATION = 0.5;
const REPEAT_FOREVER = -1;
const EMAIL = "kittipan.wang@gmail.com";
const HEADER_TEXT = "// HAILING · FREQUENCIES";

interface StaticLine {
  body: ReactElement | string;
  key: string;
}

const STATIC_LINES: readonly StaticLine[] = [
  { body: "> INCOMING TRANSMISSION REQUEST", key: "incoming" },
  { body: "> CHANNEL: SECURE · ENCRYPTION: ACTIVE", key: "channel" },
  {
    body: (
      <>
        {"> DESTINATION: "}
        <a className="underline decoration-dotted underline-offset-4 hover:text-cyan-100" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </>
    ),
    key: "destination",
  },
  { body: "> RESPONSE_TIME: 24-48 HOURS · STANDARD ORBITAL DELAY", key: "response" },
];

const HINT_TEXT = "[CLICK OR PRESS ANY KEY]";

const SECTION_CLASS = "relative px-2 py-32";
const HEADER_CLASS = "mb-12 text-center text-[10px] uppercase tracking-[0.4em] text-cyan-400/60";
const WRAPPER_CLASS = "mx-auto max-w-2xl";
const PANEL_BASE_CLASS = "overflow-hidden p-0 outline-none transition-colors duration-300";
const PANEL_BORDER_BY_PHASE: Record<string, string> = {
  awaiting: "border-cyan-500/70",
  idle: "border-cyan-500/30",
  processing: "border-cyan-500/70",
  rejecting: "border-cyan-500/70",
  success: "border-cyan-500/70",
  unrecognized: "border-cyan-500/70",
};
const HEAD_BAR_CLASS = "flex items-center justify-between border-b border-cyan-500/15 bg-slate-950/80 px-4 py-3";
const DOTS_CLASS = "flex gap-2";
const DOT_BASE_CLASS = "h-2 w-2 rounded-full";
const HEAD_LABEL_CLASS = "flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-cyan-200/45";
const HEAD_BADGE_ACTIVE_CLASS = "border border-cyan-400/60 px-2 py-[1px] text-cyan-200/85";
const HEAD_BADGE_HIDDEN_CLASS = "hidden";
const BODY_CLASS = "space-y-3 px-8 py-10 text-cyan-300";
const HINT_CLASS = "mt-2 text-[10px] tracking-[0.3em] text-cyan-200/40";
const FOCUS_WRAPPER_CLASS = "outline-none cursor-text";
const BUTTON_ROW_CLASS = "mx-auto mt-8 flex max-w-2xl";
const OPEN_BUTTON_CLASS = "mt-8 inline-flex items-center border border-cyan-400 px-6 py-3 text-[10px] font-bold tracking-[0.32em] text-cyan-300 transition-colors hover:bg-cyan-400/10 cursor-pointer";

const FONT_MONO_STYLE: CSSProperties = {
  fontFamily: "'Space Mono', 'Geist Mono', monospace",
};

const installEntranceAnimation = (root: HTMLElement | null): (() => void) => {
  const mediaMatch = gsap.matchMedia();
  if (!root) { return (): void => { mediaMatch.revert(); }; }
  mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
    const lines = root.querySelectorAll<HTMLElement>(".terminal-static-line");
    const cursor = root.querySelector<HTMLElement>(".hailing-cursor");
    gsap.set(lines, { autoAlpha: 0, x: -8 });
    if (cursor) { gsap.set(cursor, { opacity: 1 }); }
    const trigger = ScrollTrigger.create({
      onEnter: () => {
        gsap.to(lines, { autoAlpha: 1, duration: LINE_DURATION, ease: "power1.out", stagger: LINE_STAGGER, x: 0 });
      },
      once: true,
      start: "top 75%",
      trigger: root,
    });
    if (cursor) {
      gsap.to(cursor, {
        duration: CURSOR_BLINK_DURATION,
        ease: "steps(1)",
        opacity: 0,
        repeat: REPEAT_FOREVER,
        yoyo: true,
      });
    }
    return (): void => { trigger.kill(); };
  });
  mediaMatch.add("(prefers-reduced-motion: reduce)", () => {
    const lines = root.querySelectorAll<HTMLElement>(".terminal-static-line");
    gsap.set(lines, { autoAlpha: 1, x: 0 });
  });
  return (): void => { mediaMatch.revert(); };
};

const HEAD_BADGE_BY_ACTIVE = new Map<boolean, string>([
  [true, HEAD_BADGE_ACTIVE_CLASS],
  [false, HEAD_BADGE_HIDDEN_CLASS],
]);

const renderHeadBar = (active: boolean): ReactElement => {
  const badgeClass = HEAD_BADGE_BY_ACTIVE.get(active) ?? HEAD_BADGE_HIDDEN_CLASS;
  return (
    <div className={HEAD_BAR_CLASS}>
      <div className={DOTS_CLASS}>
        <span className={`${DOT_BASE_CLASS} bg-rose-500/80`} />
        <span className={`${DOT_BASE_CLASS} bg-amber-400/80`} />
        <span className={`${DOT_BASE_CLASS} bg-cyan-400/80`} />
      </div>
      <span className={HEAD_LABEL_CLASS} style={FONT_MONO_STYLE}>
        <span className={badgeClass}>[ACTIVE]</span>
        <span>SECURE_COMM_v4.2</span>
      </span>
    </div>
  );
};

const renderHint = (visible: boolean): ReactElement | null => {
  if (!visible) { return null; }
  return <p className={HINT_CLASS} style={FONT_MONO_STYLE}>{HINT_TEXT}</p>;
};

const PROMPT_VISIBLE_PHASES: ReadonlySet<TerminalPhase> = new Set<TerminalPhase>([
  "idle", "awaiting", "unrecognized",
]);

const isPromptVisible = (phase: TerminalPhase): boolean => PROMPT_VISIBLE_PHASES.has(phase);

interface RenderPromptArgs {
  inputBuffer: string;
  phase: TerminalPhase;
}

const renderPrompt = ({ inputBuffer, phase }: RenderPromptArgs): ReactElement | null => {
  if (!isPromptVisible(phase)) { return null; }
  return <InteractivePrompt inputBuffer={inputBuffer} phase={phase} />;
};

interface RenderLineArgs {
  isLast: boolean;
  line: TerminalLineEntry;
  onComplete: (isLast: boolean) => void;
}

const renderTerminalLine = ({ isLast, line, onComplete }: RenderLineArgs): ReactElement => {
  if (line.kind === "echo") {
    return <TerminalLine key={line.id} text={line.text} />;
  }
  return (
    <TerminalLine
      key={line.id}
      animate
      isLast={isLast}
      onComplete={onComplete}
      text={line.text}
    />
  );
};

const SpaceHailing = (): ReactElement => {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const terminal = useTerminal();
  const flow = useHailingFlow({ email: EMAIL, panelRef, terminal });
  const { inputBuffer, lines, phase } = terminal.state;

  useGSAP(() => installEntranceAnimation(sectionRef.current), { scope: sectionRef });

  const isActive = phase !== "idle";
  const borderClass = PANEL_BORDER_BY_PHASE[phase] ?? PANEL_BORDER_BY_PHASE.idle ?? "";
  const panelClass = `${PANEL_BASE_CLASS} ${borderClass}`;
  const lastIndex = lines.length - 1;

  return (
    <section ref={sectionRef} className={SECTION_CLASS} data-section="CONTACT" id="contact">
      <h2 className={HEADER_CLASS} style={FONT_MONO_STYLE}>{HEADER_TEXT}</h2>
      <div className={WRAPPER_CLASS}>
        <div
          ref={panelRef}
          aria-label="Hailing terminal · type Y or N to respond"
          className={FOCUS_WRAPPER_CLASS}
          onClick={flow.handlePanelClick}
          onKeyDown={flow.handleKeyDown}
          role="textbox"
          tabIndex={0}
        >
          <GlassPanel className={panelClass}>
            {renderHeadBar(isActive)}
            <div className={BODY_CLASS} style={FONT_MONO_STYLE}>
              {STATIC_LINES.map((line) => (
                <p key={line.key} className="terminal-static-line">{line.body}</p>
              ))}
              {lines.map((line, index) => renderTerminalLine({
                isLast: index === lastIndex,
                line,
                onComplete: flow.handleBotLineComplete,
              }))}
              {renderPrompt({ inputBuffer, phase })}
              {renderHint(phase === "idle")}
            </div>
          </GlassPanel>
        </div>
        <div className={BUTTON_ROW_CLASS}>
          <button className={OPEN_BUTTON_CLASS} onClick={flow.handleOpenChannel} style={FONT_MONO_STYLE} type="button">
            [ OPEN CHANNEL ]
          </button>
        </div>
      </div>
    </section>
  );
};

export { SpaceHailing };
