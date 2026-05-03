import type { CSSProperties, ReactElement } from "react";
import { GlassPanel } from "@/shared/ui/glass-panel/GlassPanel";
import { HIDDEN_STYLE } from "@/shared/lib/styles";
import { ProfilePorthole } from "@/widgets/space-hero/ui/ProfilePorthole";
import { StatusMarquee } from "@/widgets/space-hero/ui/StatusMarquee";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const ENTRANCE_DURATION = 0.6;
const ENTRANCE_OFFSET_Y = 30;
const BRACKET_DELAY = 0.08;
const BRACKET_STAGGER = 0.05;
const CALLSIGN_LABEL = "// CALLSIGN";

const ROOT_CLASS
  = "relative flex min-h-screen items-center justify-center px-2 py-16";
const PANEL_CLASS
  = "relative mx-auto w-full max-w-4xl px-8 py-16 text-center sm:px-12";
const LABEL_CLASS
  = "mb-4 text-[10px] uppercase tracking-[0.4em] text-cyan-400/70";
const TITLE_STYLE: CSSProperties = {
  fontFamily: "'Space Grotesk', 'Geist', sans-serif",
  fontSize: "clamp(3rem, 8vw, 7rem)",
  fontWeight: 700,
  letterSpacing: "-0.04em",
  textShadow: "0 0 24px rgba(34,211,238,0.55), 0 0 6px rgba(255,255,255,0.4)",
};
const TAGLINE_STYLE: CSSProperties = {
  fontFamily: "'Space Mono', 'Geist Mono', monospace",
};
const TITLE_CLASS = "uppercase text-cyan-50";
const TAGLINE_CLASS
  = "mt-6 text-base text-cyan-300/85 sm:text-lg tracking-[0.18em] uppercase";
const CTA_ROW_CLASS = "mt-10 mb-12 flex flex-wrap justify-center gap-4";
const CTA_PRIMARY_CLASS = [
  "bg-cyan-400",
  "px-8",
  "py-3",
  "text-sm",
  "font-bold",
  "tracking-[0.32em]",
  "text-slate-950",
  "shadow-[0_0_18px_rgba(34,211,238,0.45)]",
  "transition-transform",
  "hover:scale-105",
  "active:scale-95",
  "rounded-sm",
].join(" ");
const CTA_OUTLINE_CLASS = [
  "border",
  "border-cyan-400",
  "px-8",
  "py-3",
  "text-sm",
  "font-bold",
  "tracking-[0.32em]",
  "text-cyan-300",
  "transition-colors",
  "hover:bg-cyan-400/10",
  "active:scale-95",
  "rounded-sm",
].join(" ");

interface AnimRefs {
  panel: HTMLDivElement | null;
}

const installAnimations = (refs: AnimRefs): (() => void) => {
  const mediaMatch = gsap.matchMedia();
  const { panel } = refs;
  if (!panel) {
    return (): void => { mediaMatch.revert(); };
  }
  mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
    const tl = gsap.timeline({ defaults: { duration: ENTRANCE_DURATION, ease: "power2.out" } });
    tl.fromTo(panel, { autoAlpha: 0, y: ENTRANCE_OFFSET_Y }, { autoAlpha: 1, y: 0 });
    const brackets = panel.querySelectorAll<SVGElement>("svg");
    if (brackets.length > 0) {
      tl.fromTo(
        brackets,
        { autoAlpha: 0 },
        { autoAlpha: 1, stagger: BRACKET_STAGGER },
        `>-${String(BRACKET_DELAY)}`,
      );
    }
  });
  mediaMatch.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(panel, { autoAlpha: 1, y: 0 });
    const brackets = panel.querySelectorAll<SVGElement>("svg");
    gsap.set(brackets, { autoAlpha: 1 });
  });
  return (): void => { mediaMatch.revert(); };
};

const SpaceHeroPanel = (): ReactElement => {
  const panelRef = useRef<HTMLDivElement>(null);
  useGSAP(() => installAnimations({ panel: panelRef.current }), []);

  return (
    <section className={ROOT_CLASS} data-section="HOME" id="home">
      <div ref={panelRef} style={HIDDEN_STYLE}>
        <GlassPanel className={PANEL_CLASS} withCornerBrackets>
          <p className={LABEL_CLASS}>{CALLSIGN_LABEL}</p>
          <h1 className={TITLE_CLASS} style={TITLE_STYLE}>KITTIPAN W</h1>
          <p className={TAGLINE_CLASS} style={TAGLINE_STYLE}>
            Full-Stack Engineer · Long-Range Mission Specialist
          </p>
          <div className={CTA_ROW_CLASS}>
            <a className={CTA_PRIMARY_CLASS} href="#work">[ DEPLOY ]</a>
            <a className={CTA_OUTLINE_CLASS} href="#contact">[ TRANSMIT ]</a>
          </div>
          <StatusMarquee />
          <ProfilePorthole />
        </GlassPanel>
      </div>
    </section>
  );
};

export { SpaceHeroPanel };
