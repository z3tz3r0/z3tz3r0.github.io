import type { CSSProperties, ReactElement } from "react";
import { MISSION_LOG } from "@/widgets/space-mission-log/model/missionLog";
import { MissionCard } from "@/widgets/space-mission-log/ui/MissionCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const CARD_STAGGER = 0.15;
const CARD_DURATION = 0.7;
const CARD_OFFSET_Y = 40;
const PAD_THRESHOLD = 10;
const HEADER_TEXT = "// MISSION · LOG";

const SECTION_CLASS = "relative px-2 py-32";
const HEADER_ROW_CLASS = "mb-16 flex items-end justify-between border-b border-cyan-500/20 pb-4";
const HEADER_LABEL_CLASS
  = "text-[12px] uppercase tracking-[0.4em] text-cyan-300/85";
const HEADER_COUNT_CLASS = "text-[10px] tracking-[0.32em] text-cyan-400/55";
const GRID_CLASS = "grid grid-cols-1 gap-8 md:grid-cols-2";

const FONT_MONO_STYLE: CSSProperties = {
  fontFamily: "'Space Mono', 'Geist Mono', monospace",
};

const padThree = (value: number): string => {
  if (value < PAD_THRESHOLD) { return `00${String(value)}`; }
  return `0${String(value)}`;
};

const installEntrance = (root: HTMLElement | null): (() => void) => {
  const mediaMatch = gsap.matchMedia();
  if (!root) { return (): void => { mediaMatch.revert(); }; }
  mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
    const cards = root.querySelectorAll<HTMLElement>(".mission-card");
    gsap.set(cards, { autoAlpha: 0, y: CARD_OFFSET_Y });
    const trigger = ScrollTrigger.create({
      onEnter: () => {
        gsap.to(cards, {
          autoAlpha: 1,
          duration: CARD_DURATION,
          ease: "power2.out",
          stagger: CARD_STAGGER,
          y: 0,
        });
      },
      once: true,
      start: "top 75%",
      trigger: root,
    });
    return (): void => { trigger.kill(); };
  });
  mediaMatch.add("(prefers-reduced-motion: reduce)", () => {
    const cards = root.querySelectorAll<HTMLElement>(".mission-card");
    gsap.set(cards, { autoAlpha: 1, y: 0 });
  });
  return (): void => { mediaMatch.revert(); };
};

const SpaceMissionLog = (): ReactElement => {
  const sectionRef = useRef<HTMLElement>(null);
  useGSAP(() => installEntrance(sectionRef.current), []);
  const recordCount = padThree(MISSION_LOG.length);

  return (
    <section ref={sectionRef} className={SECTION_CLASS} data-section="WORK" id="work">
      <div className={HEADER_ROW_CLASS} style={FONT_MONO_STYLE}>
        <h2 className={HEADER_LABEL_CLASS}>{HEADER_TEXT}</h2>
        <span className={HEADER_COUNT_CLASS}>ACTIVE_RECORDS: {recordCount}</span>
      </div>
      <div className={GRID_CLASS}>
        {MISSION_LOG.map((mission) => (
          <MissionCard key={mission.codename} mission={mission} />
        ))}
      </div>
    </section>
  );
};

export { SpaceMissionLog };
