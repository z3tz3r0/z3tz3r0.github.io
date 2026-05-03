import type { CSSProperties, ReactElement } from "react";
import { GlassPanel } from "@/shared/ui/glass-panel/GlassPanel";
import type { MissionRecord } from "@/widgets/space-mission-log/model/missionLog";

interface MissionCardProps {
  mission: MissionRecord;
}

const FONT_MONO_STYLE: CSSProperties = {
  fontFamily: "'Space Mono', 'Geist Mono', monospace",
};
const FONT_DISPLAY_STYLE: CSSProperties = {
  fontFamily: "'Space Grotesk', 'Geist', sans-serif",
};
const STAMP_STYLE: CSSProperties = {
  ...FONT_MONO_STYLE,
  transform: "rotate(-12deg)",
};

const PANEL_CLASS = "mission-card group relative overflow-hidden p-0 transition-transform";
const STAMP_CLASS = [
  "absolute",
  "right-4",
  "top-4",
  "z-20",
  "border",
  "border-fuchsia-400/40",
  "bg-fuchsia-500/10",
  "px-2",
  "py-1",
  "text-[10px]",
  "font-bold",
  "tracking-[0.32em]",
  "text-fuchsia-300/80",
].join(" ");
const HEAD_CLASS = "flex items-center justify-between border-b border-cyan-500/15 px-6 py-3";
const CODENAME_CLASS = "text-[10px] uppercase tracking-[0.28em] text-cyan-300";
const STARDATE_CLASS = "text-[10px] tracking-[0.2em] text-cyan-400/55";
const IMAGE_WRAP_CLASS = "aspect-video w-full overflow-hidden border-b border-cyan-500/10";
const IMAGE_CLASS
  = "h-full w-full object-cover brightness-75 transition-all duration-500 group-hover:scale-105 group-hover:brightness-100";
const BODY_CLASS = "space-y-4 px-6 py-5";
const TITLE_CLASS = "text-xl font-semibold tracking-tight text-cyan-50";
const DESC_CLASS = "line-clamp-2 text-sm leading-relaxed text-cyan-200/70";
const TAG_ROW_CLASS = "flex flex-wrap gap-2";
const TAG_CLASS
  = "border border-cyan-500/30 px-2 py-1 text-[10px] tracking-[0.2em] text-cyan-300/85";
const ACTIONS_CLASS = "flex flex-wrap gap-3 pt-2";
const ACTION_PRIMARY_CLASS = [
  "border",
  "border-cyan-400/60",
  "px-4",
  "py-2",
  "text-[10px]",
  "tracking-[0.28em]",
  "text-cyan-300",
  "transition-colors",
  "hover:bg-cyan-400/10",
].join(" ");
const ACTION_GHOST_CLASS = [
  "border",
  "border-cyan-500/20",
  "px-4",
  "py-2",
  "text-[10px]",
  "tracking-[0.28em]",
  "text-cyan-200/65",
  "transition-colors",
  "hover:bg-white/5",
].join(" ");

const MissionCard = ({ mission }: MissionCardProps): ReactElement => (
  <GlassPanel className={PANEL_CLASS}>
    <span className={STAMP_CLASS} style={STAMP_STYLE}>CLASSIFIED</span>
    <div className={HEAD_CLASS}>
      <span className={CODENAME_CLASS} style={FONT_MONO_STYLE}>
        [CODENAME: {mission.codename}]
      </span>
      <span className={STARDATE_CLASS} style={FONT_MONO_STYLE}>SD {mission.stardate}</span>
    </div>
    <div className={IMAGE_WRAP_CLASS}>
      <img alt={`${mission.title} preview`} className={IMAGE_CLASS} src={mission.imageSrc} />
    </div>
    <div className={BODY_CLASS}>
      <h3 className={TITLE_CLASS} style={FONT_DISPLAY_STYLE}>{mission.title}</h3>
      <p className={DESC_CLASS}>{mission.description}</p>
      <div className={TAG_ROW_CLASS} style={FONT_MONO_STYLE}>
        {mission.techTags.map((tag) => (
          <span key={tag} className={TAG_CLASS}>{tag}</span>
        ))}
      </div>
      <div className={ACTIONS_CLASS} style={FONT_MONO_STYLE}>
        <a className={ACTION_PRIMARY_CLASS} href={mission.liveLink} rel="noopener noreferrer" target="_blank">
          [ DEPLOY LOG ]
        </a>
        <a className={ACTION_GHOST_CLASS} href={mission.gitHubLink} rel="noopener noreferrer" target="_blank">
          [ SCHEMATICS ]
        </a>
      </div>
    </div>
  </GlassPanel>
);

export { MissionCard };
