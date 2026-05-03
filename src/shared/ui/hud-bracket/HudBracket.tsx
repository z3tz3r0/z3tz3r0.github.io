import type { CSSProperties, ReactElement } from "react";

type BracketPosition = "all" | "bl" | "br" | "tl" | "tr";

interface HudBracketProps {
  className?: string;
  position?: BracketPosition;
}

interface CornerSpec {
  path: string;
  positionClass: string;
}

const ARM_LENGTH = 24;
const VIEW_BOX_SIZE = 28;
const STROKE_WIDTH = 0.5;
const EDGE_OFFSET_PX = 2;
const VIEW_BOX_STR = `0 0 ${String(VIEW_BOX_SIZE)} ${String(VIEW_BOX_SIZE)}`;
const STROKE_COLOR = "rgb(34 211 238 / 0.85)";
const SVG_ROOT_CLASS = "pointer-events-none absolute";
const SVG_STYLE: CSSProperties = { margin: `${String(EDGE_OFFSET_PX)}px` };

/* SVG paths · two perpendicular arms forming each corner. */
const PATH_TL = `M${String(VIEW_BOX_SIZE)} 0 L0 0 L0 ${String(ARM_LENGTH)}`;
const PATH_TR = `M0 0 L${String(VIEW_BOX_SIZE)} 0 L${String(VIEW_BOX_SIZE)} ${String(ARM_LENGTH)}`;
const PATH_BL = `M0 0 L0 ${String(VIEW_BOX_SIZE)} L${String(ARM_LENGTH)} ${String(VIEW_BOX_SIZE)}`;
const PATH_BR = `M${String(VIEW_BOX_SIZE)} 0 L${String(VIEW_BOX_SIZE)} ${String(VIEW_BOX_SIZE)} L0 ${String(VIEW_BOX_SIZE)}`;

const CORNERS: Readonly<Record<Exclude<BracketPosition, "all">, CornerSpec>> = {
  bl: { path: PATH_BL, positionClass: "bottom-0 left-0" },
  br: { path: PATH_BR, positionClass: "bottom-0 right-0" },
  tl: { path: PATH_TL, positionClass: "top-0 left-0" },
  tr: { path: PATH_TR, positionClass: "top-0 right-0" },
};

const ALL_KEYS: readonly Exclude<BracketPosition, "all">[] = ["tl", "tr", "bl", "br"];

const renderBracketSvg = (
  spec: CornerSpec,
  className: string | undefined,
  key?: string,
): ReactElement => (
  <svg
    key={key}
    aria-hidden="true"
    className={`${SVG_ROOT_CLASS} ${spec.positionClass} ${className ?? ""}`}
    fill="none"
    height={VIEW_BOX_SIZE}
    style={SVG_STYLE}
    viewBox={VIEW_BOX_STR}
    width={VIEW_BOX_SIZE}
  >
    <path
      d={spec.path}
      stroke={STROKE_COLOR}
      strokeLinecap="square"
      strokeWidth={STROKE_WIDTH}
    />
  </svg>
);

const HudBracket = ({ className, position = "all" }: HudBracketProps): ReactElement => {
  if (position !== "all") {
    return renderBracketSvg(CORNERS[position], className);
  }
  return (
    <>
      {ALL_KEYS.map((key) => renderBracketSvg(CORNERS[key], className, key))}
    </>
  );
};

export type { BracketPosition, HudBracketProps };
export { HudBracket };
