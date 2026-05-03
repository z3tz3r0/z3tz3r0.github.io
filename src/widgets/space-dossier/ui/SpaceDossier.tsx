import type { CSSProperties, ReactElement } from "react";
import { GlassPanel } from "@/shared/ui/glass-panel/GlassPanel";
import { PortholeFrame } from "@/widgets/space-dossier/ui/PortholeFrame";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ENTRANCE_DURATION = 0.7;
const PARA_STAGGER = 0.1;
const ENTRANCE_OFFSET_Y = 40;
const PARA_OFFSET_Y = 20;
const PARA_DELAY = 0.35;

interface DossierEntry {
  body: string;
  stardate: string;
}

const DOSSIER_ENTRIES: readonly DossierEntry[] = [
  {
    body: "My career began in the dynamic world of marketing, honing skills in understanding user needs, crafting compelling narratives, and strategizing for impact. While successful, I found myself increasingly drawn to the technical side · the 'how' behind digital experiences.",
    stardate: "STARDATE 2410.5:",
  },
  {
    body: "This curiosity sparked a transition. I immersed myself in learning development, discovering a passion for problem-solving through code. The analytical thinking from marketing proved invaluable, now applied to building robust and elegant software solutions.",
    stardate: "STARDATE 2415.2:",
  },
  {
    body: "Today, I blend marketing acumen with technical expertise to create user-centric applications. I understand the importance of both form and function, ensuring every project not only works flawlessly but also resonates with its intended audience.",
    stardate: "STARDATE 2426.1:",
  },
];

const SECTION_CLASS = "relative px-2 py-32";
const PANEL_CLASS = "relative px-6 py-12 sm:px-12";
const GRID_CLASS = "grid grid-cols-1 items-center gap-12 md:grid-cols-3";
const PHOTO_COL_CLASS = "flex justify-center md:col-span-1";
const TEXT_COL_CLASS = "space-y-6 md:col-span-2";
const TITLE_CLASS = "text-3xl uppercase tracking-tight text-cyan-300";
const PARA_CLASS = "leading-relaxed text-cyan-100/80";
const STARDATE_PREFIX_CLASS = "mr-2 text-xs tracking-[0.24em] text-cyan-300/85";

const FONT_DISPLAY_STYLE: CSSProperties = {
  fontFamily: "'Space Grotesk', 'Geist', sans-serif",
};
const FONT_MONO_STYLE: CSSProperties = {
  fontFamily: "'Space Mono', 'Geist Mono', monospace",
};

const installScrollAnimations = (root: HTMLElement | null): (() => void) => {
  const mediaMatch = gsap.matchMedia();
  if (!root) { return (): void => { mediaMatch.revert(); }; }
  mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
    const panel = root.querySelector<HTMLElement>(".dossier-panel");
    const paragraphs = root.querySelectorAll<HTMLElement>(".dossier-paragraph");
    if (panel) { gsap.set(panel, { autoAlpha: 0, y: ENTRANCE_OFFSET_Y }); }
    gsap.set(paragraphs, { autoAlpha: 0, y: PARA_OFFSET_Y });
    const trigger = ScrollTrigger.create({
      onEnter: () => {
        if (panel) {
          gsap.to(panel, { autoAlpha: 1, duration: ENTRANCE_DURATION, ease: "power2.out", y: 0 });
        }
        gsap.to(paragraphs, {
          autoAlpha: 1,
          delay: PARA_DELAY,
          duration: ENTRANCE_DURATION,
          ease: "power2.out",
          stagger: PARA_STAGGER,
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
    const all = root.querySelectorAll<HTMLElement>(".dossier-panel, .dossier-paragraph");
    gsap.set(all, { autoAlpha: 1, y: 0 });
  });
  return (): void => { mediaMatch.revert(); };
};

const SpaceDossier = (): ReactElement => {
  const sectionRef = useRef<HTMLElement>(null);
  useGSAP(() => installScrollAnimations(sectionRef.current), []);

  return (
    <section ref={sectionRef} className={SECTION_CLASS} data-section="ABOUT" id="about">
      <div className="dossier-panel">
        <GlassPanel className={PANEL_CLASS} withCornerBrackets>
          <div className={GRID_CLASS}>
            <div className={PHOTO_COL_CLASS}>
              <PortholeFrame />
            </div>
            <div className={TEXT_COL_CLASS}>
              <h2 className={TITLE_CLASS} style={FONT_DISPLAY_STYLE}>CAPTAIN&apos;S · DOSSIER</h2>
              {DOSSIER_ENTRIES.map((entry) => (
                <p key={entry.stardate} className={`${PARA_CLASS} dossier-paragraph`}>
                  <span className={STARDATE_PREFIX_CLASS} style={FONT_MONO_STYLE}>{entry.stardate}</span>
                  {entry.body}
                </p>
              ))}
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
};

export { SpaceDossier };
