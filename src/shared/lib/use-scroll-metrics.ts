import { useEffect, useState } from "react";

interface ScrollMetrics {
  currentSection: string;
  depth: number;
}

const HOME_SECTION = "HOME";
const SECTION_SELECTOR = "[data-section]";
const T_QUARTER = 0.25;
const T_HALF = 0.5;
const T_THREE_QUARTERS = 0.75;
const SECTION_OBSERVER_THRESHOLDS: number[] = [0, T_QUARTER, T_HALF, T_THREE_QUARTERS, 1];
const DEPTH_FLOOR = 0;
const DEPTH_CEIL = 1;
const DEPTH_EPSILON_MS = 0.001;
const NO_FRAME = 0;

const computeDepth = (): number => {
  const docHeight = document.documentElement.scrollHeight;
  const viewport = window.innerHeight;
  const range = docHeight - viewport;
  if (range <= 0) { return 0; }
  const raw = window.scrollY / range;
  if (raw < DEPTH_FLOOR) { return DEPTH_FLOOR; }
  if (raw > DEPTH_CEIL) { return DEPTH_CEIL; }
  return raw;
};

interface VisibilityRecord {
  ratio: number;
  section: string;
}

const sectionFromEntry = (entry: IntersectionObserverEntry): string | null => {
  if (!(entry.target instanceof HTMLElement)) { return null; }
  const value = entry.target.dataset.section;
  if (typeof value !== "string") { return null; }
  if (value === "") { return null; }
  return value;
};

const pickTopSection = (
  visibility: ReadonlyMap<Element, VisibilityRecord>,
): string | null => {
  let best: VisibilityRecord | null = null;
  for (const record of visibility.values()) {
    if (record.ratio > 0 && (best === null || record.ratio > best.ratio)) {
      best = record;
    }
  }
  if (best === null) { return null; }
  return best.section;
};

interface SetupArgs {
  setMetrics: React.Dispatch<React.SetStateAction<ScrollMetrics>>;
}

interface SetupHandles {
  cleanup: () => void;
}

const buildIntersectionHandler = (
  visibility: Map<Element, VisibilityRecord>,
  setMetrics: SetupArgs["setMetrics"],
): IntersectionObserverCallback => (entries) => {
  for (const entry of entries) {
    const section = sectionFromEntry(entry);
    if (section !== null) {
      visibility.set(entry.target, { ratio: entry.intersectionRatio, section });
    }
  }
  const next = pickTopSection(visibility);
  if (next === null) { return; }
  setMetrics((prev) => {
    if (prev.currentSection === next) { return prev; }
    return { currentSection: next, depth: prev.depth };
  });
};

interface ScrollState {
  frameId: number;
}

const buildFlushDepth = (
  state: ScrollState,
  setMetrics: SetupArgs["setMetrics"],
): (() => void) => () => {
  state.frameId = NO_FRAME;
  const nextDepth = computeDepth();
  setMetrics((prev) => {
    if (Math.abs(prev.depth - nextDepth) < DEPTH_EPSILON_MS) { return prev; }
    return { currentSection: prev.currentSection, depth: nextDepth };
  });
};

const buildOnScroll = (
  state: ScrollState,
  flushDepth: () => void,
): (() => void) => () => {
  if (state.frameId === NO_FRAME) {
    state.frameId = window.requestAnimationFrame(flushDepth);
  }
};

const observeAllSections = (observer: IntersectionObserver): void => {
  const targets = document.querySelectorAll<HTMLElement>(SECTION_SELECTOR);
  for (const target of targets) {
    observer.observe(target);
  }
};

interface CleanupArgs {
  observer: IntersectionObserver;
  onScroll: () => void;
  state: ScrollState;
  visibility: Map<Element, VisibilityRecord>;
}

const buildCleanup = (args: CleanupArgs): (() => void) => () => {
  if (args.state.frameId !== NO_FRAME) {
    window.cancelAnimationFrame(args.state.frameId);
    args.state.frameId = NO_FRAME;
  }
  window.removeEventListener("scroll", args.onScroll);
  window.removeEventListener("resize", args.onScroll);
  args.observer.disconnect();
  args.visibility.clear();
};

const installScrollMetrics = ({ setMetrics }: SetupArgs): SetupHandles => {
  const state: ScrollState = { frameId: NO_FRAME };
  const visibility = new Map<Element, VisibilityRecord>();
  const flushDepth = buildFlushDepth(state, setMetrics);
  const onScroll = buildOnScroll(state, flushDepth);
  const observer = new IntersectionObserver(
    buildIntersectionHandler(visibility, setMetrics),
    { threshold: SECTION_OBSERVER_THRESHOLDS },
  );
  observeAllSections(observer);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  flushDepth();
  return { cleanup: buildCleanup({ observer, onScroll, state, visibility }) };
};

const useScrollMetrics = (): ScrollMetrics => {
  const [metrics, setMetrics] = useState<ScrollMetrics>({
    currentSection: HOME_SECTION,
    depth: 0,
  });

  useEffect(() => {
    const handles = installScrollMetrics({ setMetrics });
    return handles.cleanup;
  }, []);

  return metrics;
};

export type { ScrollMetrics };
export { useScrollMetrics };
