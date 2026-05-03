import type { ReactElement, ReactNode } from "react";
import { HudBracket } from "@/shared/ui/hud-bracket/HudBracket";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  withCornerBrackets?: boolean;
}

const BASE_CLASSES = [
  "relative",
  "rounded-2xl",
  "border",
  "border-cyan-500/20",
  "bg-white/5",
  "backdrop-blur-md",
  "shadow-[0_0_24px_rgba(34,211,238,0.08),inset_0_0_24px_rgba(34,211,238,0.04)]",
].join(" ");

const renderBrackets = (enabled: boolean): ReactElement | null => {
  if (!enabled) { return null; }
  return <HudBracket position="all" />;
};

const GlassPanel = ({
  children,
  className,
  withCornerBrackets = false,
}: GlassPanelProps): ReactElement => {
  const composed = `${BASE_CLASSES} ${className ?? ""}`.trim();
  return (
    <div className={composed}>
      {children}
      {renderBrackets(withCornerBrackets)}
    </div>
  );
};

export type { GlassPanelProps };
export { GlassPanel };
