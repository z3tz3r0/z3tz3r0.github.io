import type { ReactElement } from "react";
import type { TerminalPhase } from "@/widgets/space-hailing/model/useTerminal";

interface InteractivePromptProps {
  inputBuffer: string;
  phase: TerminalPhase;
}

const PROMPT_LABEL = "> INITIATE CONNECTION?";
const ROW_CLASS = "flex items-center gap-2 text-cyan-100";
const CURSOR_BASE_CLASS = "inline-block h-[1.2em] w-2 bg-cyan-300 align-middle";
const CURSOR_BLINK_CLASS = "hailing-cursor";
const HIDDEN_CLASS = "hidden";

const cursorClassFor = (phase: TerminalPhase): string => {
  if (phase === "success") { return `${CURSOR_BASE_CLASS} ${HIDDEN_CLASS}`; }
  if (phase === "awaiting" || phase === "processing") { return CURSOR_BASE_CLASS; }
  return `${CURSOR_BASE_CLASS} ${CURSOR_BLINK_CLASS}`;
};

const renderInputEcho = (buffer: string): ReactElement | null => {
  if (buffer.length === 0) { return null; }
  return <span className="text-cyan-200">{buffer}</span>;
};

const InteractivePrompt = ({
  inputBuffer,
  phase,
}: InteractivePromptProps): ReactElement => {
  const cursorClass = cursorClassFor(phase);
  return (
    <div className={ROW_CLASS}>
      <span className="terminal-line">{PROMPT_LABEL}</span>
      {renderInputEcho(inputBuffer)}
      <span aria-hidden="true" className={cursorClass} />
    </div>
  );
};

export type { InteractivePromptProps };
export { InteractivePrompt };
