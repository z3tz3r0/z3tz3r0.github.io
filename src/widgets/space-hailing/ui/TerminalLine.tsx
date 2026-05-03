import type { CSSProperties, ReactElement, ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const CHAR_STAGGER = 0.02;
const CHAR_DURATION = 0.16;
const HIDDEN_STYLE: CSSProperties = { opacity: 0 };

interface TerminalLineProps {
  animate?: boolean;
  body?: ReactNode;
  isLast?: boolean;
  onComplete?: (isLast: boolean) => void;
  text?: string;
}

const splitChars = (raw: string): readonly string[] => Array.from(raw);

const installAnimation = (
  root: HTMLElement | null,
  onComplete: ((isLast: boolean) => void) | undefined,
  isLast: boolean,
): (() => void) => {
  const mediaMatch = gsap.matchMedia();
  if (!root) { return (): void => { mediaMatch.revert(); }; }
  mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
    const chars = root.querySelectorAll<HTMLElement>(".terminal-char");
    gsap.set(root, { autoAlpha: 1 });
    gsap.set(chars, { autoAlpha: 0 });
    gsap.to(chars, {
      autoAlpha: 1,
      duration: CHAR_DURATION,
      ease: "none",
      onComplete: (): void => { onComplete?.(isLast); },
      stagger: CHAR_STAGGER,
    });
  });
  mediaMatch.add("(prefers-reduced-motion: reduce)", () => {
    const chars = root.querySelectorAll<HTMLElement>(".terminal-char");
    gsap.set(root, { autoAlpha: 1 });
    gsap.set(chars, { autoAlpha: 1 });
    onComplete?.(isLast);
  });
  return (): void => { mediaMatch.revert(); };
};

const renderTypewriterChars = (text: string): ReactElement => (
  <>
    {splitChars(text).map((char, index) => (
      // oxlint-disable-next-line no-array-index-key
      <span className="terminal-char" key={`${String(index)}-${char}`}>{char}</span>
    ))}
  </>
);

const TerminalLine = ({
  animate = false,
  body,
  isLast = false,
  onComplete,
  text,
}: TerminalLineProps): ReactElement => {
  const lineRef = useRef<HTMLParagraphElement>(null);
  useGSAP(
    () => {
      if (!animate) { return; }
      return installAnimation(lineRef.current, onComplete, isLast);
    },
    { dependencies: [animate], scope: lineRef },
  );

  if (animate && typeof text === "string") {
    return (
      <p ref={lineRef} className="terminal-line" style={HIDDEN_STYLE}>
        {renderTypewriterChars(text)}
      </p>
    );
  }

  return (
    <p ref={lineRef} className="terminal-line">
      {body ?? text ?? ""}
    </p>
  );
};

export type { TerminalLineProps };
export { TerminalLine };
