import { useCallback, useReducer } from "react";

type TerminalPhase
  = | "idle"
    | "awaiting"
    | "processing"
    | "success"
    | "rejecting"
    | "unrecognized";

type LineKind = "bot" | "echo";

interface TerminalLineEntry {
  id: string;
  kind: LineKind;
  text: string;
}

interface TerminalState {
  inputBuffer: string;
  lineCounter: number;
  lines: readonly TerminalLineEntry[];
  phase: TerminalPhase;
}

const ECHO_PROMPT_LABEL = "> INITIATE CONNECTION?";

type TerminalAction
  = | { type: "FOCUS" }
    | { type: "INPUT_CHAR"; char: string }
    | { type: "BACKSPACE" }
    | { type: "ESCAPE" }
    | { type: "SUBMIT" }
    | { type: "CLASSIFY_SUCCESS" }
    | { type: "CLASSIFY_REJECT" }
    | { type: "CLASSIFY_UNKNOWN" }
    | { type: "APPEND_BOT_LINE"; text: string }
    | { type: "RESET" }
    | { type: "RETRY_AFTER_UNKNOWN" };

const SUCCESS_PATTERN = /^(y|yes|connect|open)$/u;
const REJECT_PATTERN = /^(n|no|abort|cancel)$/u;

const INITIAL_STATE: TerminalState = {
  inputBuffer: "",
  lineCounter: 0,
  lines: [],
  phase: "idle",
};

const nextLineId = (counter: number, kind: LineKind): string => `${kind}-${String(counter)}`;

const appendLine = (
  state: TerminalState,
  kind: LineKind,
  text: string,
): TerminalState => ({
  ...state,
  lineCounter: state.lineCounter + 1,
  lines: [...state.lines, { id: nextLineId(state.lineCounter, kind), kind, text }],
});

const reduceFocus = (state: TerminalState): TerminalState => {
  if (state.phase !== "idle") { return state; }
  return { ...state, phase: "awaiting" };
};

const reduceInputChar = (state: TerminalState, char: string): TerminalState => {
  if (state.phase !== "awaiting") { return state; }
  return { ...state, inputBuffer: `${state.inputBuffer}${char}` };
};

const reduceBackspace = (state: TerminalState): TerminalState => {
  if (state.phase !== "awaiting") { return state; }
  return { ...state, inputBuffer: state.inputBuffer.slice(0, -1) };
};

const reduceEscape = (state: TerminalState): TerminalState => {
  if (state.phase !== "awaiting") { return state; }
  return { ...state, inputBuffer: "" };
};

const reduceSubmit = (state: TerminalState): TerminalState => {
  if (state.phase !== "awaiting") { return state; }
  const echoText = `${ECHO_PROMPT_LABEL} ${state.inputBuffer}`;
  const withEcho = appendLine(state, "echo", echoText);
  return { ...withEcho, inputBuffer: "", phase: "processing" };
};

const reduceClassifySuccess = (state: TerminalState): TerminalState => ({
  ...state,
  phase: "success",
});

const reduceClassifyReject = (state: TerminalState): TerminalState => ({
  ...state,
  phase: "rejecting",
});

const reduceClassifyUnknown = (state: TerminalState): TerminalState => ({
  ...state,
  phase: "unrecognized",
});

const reduceReset = (state: TerminalState): TerminalState => ({
  ...state,
  inputBuffer: "",
  lines: [],
  phase: "idle",
});

const reduceRetryAfterUnknown = (state: TerminalState): TerminalState => ({
  ...state,
  inputBuffer: "",
  phase: "awaiting",
});

const reducer = (state: TerminalState, action: TerminalAction): TerminalState => {
  switch (action.type) {
    case "FOCUS": return reduceFocus(state);
    case "INPUT_CHAR": return reduceInputChar(state, action.char);
    case "BACKSPACE": return reduceBackspace(state);
    case "ESCAPE": return reduceEscape(state);
    case "SUBMIT": return reduceSubmit(state);
    case "CLASSIFY_SUCCESS": return reduceClassifySuccess(state);
    case "CLASSIFY_REJECT": return reduceClassifyReject(state);
    case "CLASSIFY_UNKNOWN": return reduceClassifyUnknown(state);
    case "APPEND_BOT_LINE": return appendLine(state, "bot", action.text);
    case "RESET": return reduceReset(state);
    case "RETRY_AFTER_UNKNOWN": return reduceRetryAfterUnknown(state);
    default: return state;
  }
};

const classify = (raw: string): "success" | "reject" | "unknown" => {
  const trimmed = raw.trim().toLowerCase();
  if (SUCCESS_PATTERN.test(trimmed)) { return "success"; }
  if (REJECT_PATTERN.test(trimmed)) { return "reject"; }
  return "unknown";
};

interface TerminalApi {
  appendBotLine: (text: string) => void;
  classifyInput: () => "success" | "reject" | "unknown";
  dispatch: React.Dispatch<TerminalAction>;
  state: TerminalState;
}

const useTerminal = (): TerminalApi => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const appendBotLine = useCallback((text: string): void => {
    dispatch({ text, type: "APPEND_BOT_LINE" });
  }, []);

  const classifyInput = useCallback(
    (): "success" | "reject" | "unknown" => classify(state.inputBuffer),
    [state.inputBuffer],
  );

  return { appendBotLine, classifyInput, dispatch, state };
};

export type { LineKind, TerminalAction, TerminalApi, TerminalLineEntry, TerminalPhase, TerminalState };
export { useTerminal };
