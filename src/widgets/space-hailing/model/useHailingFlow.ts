import type { KeyboardEvent, MouseEvent, RefObject } from "react";
import { useCallback, useEffect, useRef } from "react";
import type { TerminalApi } from "@/widgets/space-hailing/model/useTerminal";

const REJECT_RESET_DELAY_MS = 1500;
const UNKNOWN_RETRY_DELAY_MS = 900;
const MAILTO_DELAY_MS = 700;
const PRINTABLE_KEY_LENGTH = 1;
const PRINTABLE_KEY_PATTERN = /^[a-zA-Z]$/u;

const SUCCESS_QUEUE: readonly string[] = [
  "> CHANNEL OPENED · ENCRYPTING PAYLOAD...",
  "> ROUTING THROUGH SOL-III · SECTOR-7",
  "> DEPLOYING MAILTO TRANSMITTER",
];

const SUCCESS_FINAL = "> TRANSMISSION COMPLETE · STAY VIGILANT, CAPTAIN";
const REJECT_LINE = "> TRANSMISSION ABORTED · CHANNEL CLOSED";
const UNKNOWN_LINE = "> UNRECOGNIZED RESPONSE · TRY [Y/N]";

const isPrintableKey = (key: string): boolean => {
  if (key.length !== PRINTABLE_KEY_LENGTH) { return false; }
  return PRINTABLE_KEY_PATTERN.test(key);
};

interface HailingFlowOptions {
  email: string;
  panelRef: RefObject<HTMLDivElement | null>;
  terminal: TerminalApi;
}

interface HailingFlowApi {
  handleBotLineComplete: (isLast: boolean) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  handleOpenChannel: (event: MouseEvent<HTMLButtonElement>) => void;
  handlePanelClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const useRejectTimer = (terminal: TerminalApi): void => {
  const { dispatch, state } = terminal;
  useEffect(() => {
    if (state.phase !== "rejecting") { return; }
    const handle = window.setTimeout(() => { dispatch({ type: "RESET" }); }, REJECT_RESET_DELAY_MS);
    return (): void => { window.clearTimeout(handle); };
  }, [dispatch, state.phase]);
};

const useUnknownTimer = (terminal: TerminalApi): void => {
  const { dispatch, state } = terminal;
  useEffect(() => {
    if (state.phase !== "unrecognized") { return; }
    const handle = window.setTimeout(() => { dispatch({ type: "RETRY_AFTER_UNKNOWN" }); }, UNKNOWN_RETRY_DELAY_MS);
    return (): void => { window.clearTimeout(handle); };
  }, [dispatch, state.phase]);
};

const startSuccessStream = (
  terminal: TerminalApi,
  queueRef: RefObject<readonly string[]>,
): void => {
  queueRef.current = [...SUCCESS_QUEUE];
  terminal.dispatch({ type: "CLASSIFY_SUCCESS" });
  const [first, ...rest] = queueRef.current;
  queueRef.current = rest;
  if (typeof first === "string") { terminal.appendBotLine(first); }
};

type AwaitingKeyHandler = (dispatch: TerminalApi["dispatch"], submit: () => void) => void;

const AWAITING_KEY_HANDLERS: Record<string, AwaitingKeyHandler> = {
  Backspace: (dispatch) => { dispatch({ type: "BACKSPACE" }); },
  Enter: (_dispatch, submit) => { submit(); },
  Escape: (dispatch) => { dispatch({ type: "ESCAPE" }); },
};

interface AwaitingKeyArgs {
  dispatch: TerminalApi["dispatch"];
  event: KeyboardEvent<HTMLDivElement>;
  submit: () => void;
}

const handleAwaitingKey = ({ dispatch, event, submit }: AwaitingKeyArgs): void => {
  const namedHandler = AWAITING_KEY_HANDLERS[event.key];
  if (namedHandler) {
    event.preventDefault();
    namedHandler(dispatch, submit);
    return;
  }
  if (isPrintableKey(event.key)) {
    event.preventDefault();
    dispatch({ char: event.key.toLowerCase(), type: "INPUT_CHAR" });
  }
};

const handleIdleKey = (
  event: KeyboardEvent<HTMLDivElement>,
  dispatch: TerminalApi["dispatch"],
): void => {
  dispatch({ type: "FOCUS" });
  if (isPrintableKey(event.key)) {
    event.preventDefault();
    dispatch({ char: event.key.toLowerCase(), type: "INPUT_CHAR" });
  }
};

type Verdict = "success" | "reject" | "unknown";

const runVerdict = (
  verdict: Verdict,
  terminal: TerminalApi,
  queueRef: RefObject<readonly string[]>,
): void => {
  if (verdict === "success") { startSuccessStream(terminal, queueRef); return; }
  if (verdict === "reject") {
    terminal.dispatch({ type: "CLASSIFY_REJECT" });
    terminal.appendBotLine(REJECT_LINE);
    return;
  }
  terminal.dispatch({ type: "CLASSIFY_UNKNOWN" });
  terminal.appendBotLine(UNKNOWN_LINE);
};

interface SubmitDeps {
  classifyInput: TerminalApi["classifyInput"];
  dispatch: TerminalApi["dispatch"];
  phase: TerminalApi["state"]["phase"];
  queueRef: RefObject<readonly string[]>;
  terminal: TerminalApi;
}

const useSubmitHandler = (deps: SubmitDeps): (() => void) => {
  const { classifyInput, dispatch, phase, queueRef, terminal } = deps;
  return useCallback((): void => {
    if (phase !== "awaiting") { return; }
    dispatch({ type: "SUBMIT" });
    runVerdict(classifyInput(), terminal, queueRef);
  }, [classifyInput, dispatch, phase, queueRef, terminal]);
};

interface CompletionDeps {
  appendBotLine: TerminalApi["appendBotLine"];
  lines: TerminalApi["state"]["lines"];
  phase: TerminalApi["state"]["phase"];
  queueRef: RefObject<readonly string[]>;
  triggerMailto: () => void;
}

const useCompletionHandler = (deps: CompletionDeps): ((isLast: boolean) => void) => {
  const { appendBotLine, lines, phase, queueRef, triggerMailto } = deps;
  return useCallback((isLast: boolean): void => {
    if (phase !== "success") { return; }
    const [next, ...rest] = queueRef.current;
    queueRef.current = rest;
    if (typeof next === "string") { appendBotLine(next); return; }
    if (isLast && lines.at(-1)?.text !== SUCCESS_FINAL) {
      window.setTimeout(() => {
        triggerMailto();
        window.setTimeout(() => { appendBotLine(SUCCESS_FINAL); }, MAILTO_DELAY_MS);
      }, MAILTO_DELAY_MS);
    }
  }, [appendBotLine, lines, phase, queueRef, triggerMailto]);
};

const useHailingFlow = ({ email, panelRef, terminal }: HailingFlowOptions): HailingFlowApi => {
  const queueRef = useRef<readonly string[]>([]);
  const { appendBotLine, classifyInput, dispatch, state } = terminal;
  const { lines, phase } = state;

  const triggerMailto = useCallback((): void => {
    window.location.href = `mailto:${email}`;
  }, [email]);

  const handleSubmit = useSubmitHandler({ classifyInput, dispatch, phase, queueRef, terminal });

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>): void => {
    if (phase === "idle") { handleIdleKey(event, dispatch); return; }
    if (phase !== "awaiting") { return; }
    handleAwaitingKey({ dispatch, event, submit: handleSubmit });
  }, [dispatch, handleSubmit, phase]);

  const handlePanelClick = useCallback((event: MouseEvent<HTMLDivElement>): void => {
    if (event.target instanceof HTMLAnchorElement) { return; }
    panelRef.current?.focus();
    dispatch({ type: "FOCUS" });
  }, [dispatch, panelRef]);

  const handleOpenChannel = useCallback((event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    if (phase === "success") { triggerMailto(); return; }
    panelRef.current?.focus();
    if (phase === "idle") { dispatch({ type: "FOCUS" }); }
    startSuccessStream(terminal, queueRef);
  }, [dispatch, panelRef, phase, terminal, triggerMailto]);

  const handleBotLineComplete = useCompletionHandler({
    appendBotLine, lines, phase, queueRef, triggerMailto,
  });

  useRejectTimer(terminal);
  useUnknownTimer(terminal);

  return { handleBotLineComplete, handleKeyDown, handleOpenChannel, handlePanelClick };
};

export type { HailingFlowApi };
export { useHailingFlow };
