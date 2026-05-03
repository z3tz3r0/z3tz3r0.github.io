import type { CSSProperties, ReactElement } from "react";
import { EDGES, STARS } from "@/widgets/space-constellation/model/stars";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { StarNode } from "@/widgets/space-constellation/model/stars";
import { StarNodeView } from "@/widgets/space-constellation/ui/StarNodeView";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const NODE_STAGGER = 0.08;
const NODE_DURATION = 0.6;
const NODE_SCALE_INITIAL = 0.6;
const EDGE_DURATION = 1.0;
const VIEWBOX_W = 1000;
const VIEWBOX_H = 600;
const SCATTER_HEIGHT = 600;
const PERCENT_DIVISOR = 100;
const SCATTER_STYLE = { height: SCATTER_HEIGHT };
const HEADER_TEXT = "// TECH · CONSTELLATION";

const SECTION_CLASS = "relative px-2 py-32 md:py-40";
const HEADER_CLASS
  = "mb-16 text-center text-[10px] uppercase tracking-[0.4em] text-cyan-400/60";
const SCATTER_WRAP_CLASS = "relative mx-auto hidden w-full max-w-5xl sm:block";
const MOBILE_GRID_CLASS = "grid grid-cols-3 gap-6 sm:hidden";
const SVG_CLASS = "pointer-events-none absolute inset-0 h-full w-full";

const FONT_STYLE: CSSProperties = {
  fontFamily: "'Space Mono', 'Geist Mono', monospace",
};

const findStarById = (id: string): StarNode | undefined =>
  STARS.find((star) => star.id === id);

interface EdgeCoords {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

const percentToCoord = (value: string, total: number): number => {
  const numeric = Number.parseFloat(value);
  return (numeric / PERCENT_DIVISOR) * total;
};

const buildEdgeCoords = (fromId: string, toId: string): EdgeCoords | null => {
  const fromStar = findStarById(fromId);
  const toStar = findStarById(toId);
  if (!fromStar || !toStar) { return null; }
  return {
    x1: percentToCoord(fromStar.left, VIEWBOX_W),
    x2: percentToCoord(toStar.left, VIEWBOX_W),
    y1: percentToCoord(fromStar.top, VIEWBOX_H),
    y2: percentToCoord(toStar.top, VIEWBOX_H),
  };
};

interface AnimRefs {
  scatter: HTMLDivElement | null;
  section: HTMLElement | null;
}

const animateLines = (lines: NodeListOf<SVGLineElement>): void => {
  lines.forEach((line) => {
    const length = line.getTotalLength();
    gsap.fromTo(
      line,
      { strokeDasharray: length, strokeDashoffset: length },
      { duration: EDGE_DURATION, ease: "power2.inOut", strokeDashoffset: 0 },
    );
  });
};

const installScrollAnimations = (refs: AnimRefs): (() => void) => {
  const mediaMatch = gsap.matchMedia();
  const { scatter, section } = refs;
  if (!section || !scatter) { return (): void => { mediaMatch.revert(); }; }
  mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
    const nodes = scatter.querySelectorAll<HTMLElement>(".constellation-node");
    const lines = scatter.querySelectorAll<SVGLineElement>(".constellation-edge");
    gsap.set(nodes, { autoAlpha: 0, scale: NODE_SCALE_INITIAL });
    const trigger = ScrollTrigger.create({
      onEnter: () => {
        gsap.to(nodes, {
          autoAlpha: 1,
          duration: NODE_DURATION,
          ease: "power2.out",
          scale: 1,
          stagger: NODE_STAGGER,
        });
        animateLines(lines);
      },
      once: true,
      start: "top 75%",
      trigger: section,
    });
    return (): void => { trigger.kill(); };
  });
  mediaMatch.add("(prefers-reduced-motion: reduce)", () => {
    const nodes = scatter.querySelectorAll<HTMLElement>(".constellation-node");
    gsap.set(nodes, { autoAlpha: 1, scale: 1 });
  });
  return (): void => { mediaMatch.revert(); };
};

const renderEdge = (fromId: string, toId: string, key: string): ReactElement | null => {
  const coords = buildEdgeCoords(fromId, toId);
  if (!coords) { return null; }
  return (
    <line
      key={key}
      className="constellation-edge"
      stroke="rgba(34,211,238,0.4)"
      strokeWidth={1}
      x1={coords.x1}
      x2={coords.x2}
      y1={coords.y1}
      y2={coords.y2}
    />
  );
};

const SpaceConstellation = (): ReactElement => {
  const sectionRef = useRef<HTMLElement>(null);
  const scatterRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => installScrollAnimations({ scatter: scatterRef.current, section: sectionRef.current }),
    [],
  );

  return (
    <section ref={sectionRef} className={SECTION_CLASS} data-section="TECH" id="tech">
      <h2 className={HEADER_CLASS} style={FONT_STYLE}>{HEADER_TEXT}</h2>
      <div ref={scatterRef} className={SCATTER_WRAP_CLASS} style={SCATTER_STYLE}>
        <svg
          className={SVG_CLASS}
          fill="none"
          preserveAspectRatio="none"
          viewBox={`0 0 ${String(VIEWBOX_W)} ${String(VIEWBOX_H)}`}
        >
          {EDGES.map((edge) => renderEdge(edge.from, edge.to, `${edge.from}-${edge.to}`))}
        </svg>
        {STARS.map((star) => (
          <StarNodeView absolute key={star.id} star={star} />
        ))}
      </div>
      <div className={MOBILE_GRID_CLASS}>
        {STARS.map((star) => (
          <StarNodeView absolute={false} key={star.id} star={star} />
        ))}
      </div>
    </section>
  );
};

export { SpaceConstellation };
