import type { CSSProperties, ReactElement } from "react";
import { SimpleIconDisplay } from "@/shared/ui/simple-icon/SimpleIconDisplay";
import type { StarNode } from "@/widgets/space-constellation/model/stars";

interface StarNodeViewProps {
  /** When true, position absolutely with star.top/star.left. When false, flow in grid. */
  absolute: boolean;
  star: StarNode;
}

const NODE_SIZE_PX = 64;
const ICON_SIZE_PX = 32;
const FALLBACK_INITIALS_LEN = 3;

const FONT_FAMILY_MONO = "'Space Mono', 'Geist Mono', monospace";
const RADIANCE_BOX_SHADOW
  = "0 0 24px rgba(6,182,212,0.4), inset 0 0 12px rgba(34,211,238,0.18)";

const CIRCLE_STYLE: CSSProperties = {
  boxShadow: RADIANCE_BOX_SHADOW,
  height: NODE_SIZE_PX,
  width: NODE_SIZE_PX,
};

const FONT_STYLE: CSSProperties = { fontFamily: FONT_FAMILY_MONO };

const ABS_FONT_STYLE: CSSProperties = {
  fontFamily: FONT_FAMILY_MONO,
  position: "absolute",
};

const CIRCLE_CLASS = [
  "relative",
  "flex",
  "items-center",
  "justify-center",
  "rounded-full",
  "border",
  "border-cyan-400/60",
  "bg-slate-950/55",
  "backdrop-blur-md",
  "transition-transform",
  "hover:scale-110",
].join(" ");

const NAME_CLASS
  = "mt-2 whitespace-nowrap text-center text-[10px] uppercase tracking-[0.2em] text-cyan-200/85";
const ICON_WRAP_CLASS = "text-cyan-300";
const TEXT_FALLBACK_CLASS = "text-sm font-bold tracking-[0.2em] text-cyan-200";

const renderIcon = (star: StarNode): ReactElement => {
  if (star.icon) {
    return (
      <span className={ICON_WRAP_CLASS}>
        <SimpleIconDisplay icon={star.icon} size={ICON_SIZE_PX} />
      </span>
    );
  }
  return (
    <span className={TEXT_FALLBACK_CLASS}>
      {star.textFallback ?? star.name.slice(0, FALLBACK_INITIALS_LEN)}
    </span>
  );
};

const buildWrapperStyle = (absolute: boolean, star: StarNode): CSSProperties => {
  if (!absolute) { return FONT_STYLE; }
  return { ...ABS_FONT_STYLE, left: star.left, top: star.top };
};

const StarNodeView = ({ absolute, star }: StarNodeViewProps): ReactElement => {
  const wrapperStyle = buildWrapperStyle(absolute, star);
  return (
    <div className="constellation-node flex flex-col items-center" style={wrapperStyle}>
      <div className={CIRCLE_CLASS} style={CIRCLE_STYLE}>
        {renderIcon(star)}
      </div>
      <span className={NAME_CLASS}>{star.name}</span>
    </div>
  );
};

export { StarNodeView };
