import type { CSSProperties, ReactElement } from "react";
import { Facebook, Github, Linkedin } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const PULSE_DURATION = 1.5;
const PULSE_OPACITY_MIN = 0.4;
const PULSE_OPACITY_MAX = 1.0;
const REPEAT_FOREVER = -1;
const ENTRANCE_DURATION = 0.6;
const ICON_SIZE_PX = 16;
const PAD_THRESHOLD = 10;

interface SocialLink {
  Icon: typeof Facebook;
  href: string;
  label: string;
}

const SOCIALS: readonly SocialLink[] = [
  { Icon: Github, href: "https://github.com/z3tz3r0", label: "GITHUB" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/kittipan-w", label: "LINKEDIN" },
  { Icon: Facebook, href: "https://www.facebook.com/kittipan.wang/", label: "FACEBOOK" },
];

const ROOT_CLASS = "relative border-t border-cyan-500/30 px-2 py-8";
const ROW_CLASS = "mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row";
const SEGMENT_CLASS = "text-[10px] tracking-[0.28em] text-cyan-300/85";
const STATUS_CLASS = "flex items-center gap-2 text-cyan-300/80";
const PULSE_DOT_CLASS = "h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]";
const SOCIAL_LIST_CLASS = "flex items-center gap-5";
const SOCIAL_LINK_CLASS = "flex items-center gap-1 text-cyan-300/85 transition-colors hover:text-cyan-100";
const COPY_CLASS = "mx-auto mt-4 max-w-7xl text-center text-[8px] tracking-[0.32em] text-cyan-200/35";

const FONT_MONO_STYLE: CSSProperties = {
  fontFamily: "'Space Mono', 'Geist Mono', monospace",
};

const padTwo = (value: number): string => {
  if (value < PAD_THRESHOLD) { return `0${String(value)}`; }
  return String(value);
};

const formatStardate = (now: Date): string => {
  const year = now.getFullYear();
  const month = padTwo(now.getMonth() + 1);
  const day = padTwo(now.getDate());
  return `${String(year)}.${month}.${day}`;
};

interface AnimRefs {
  dot: HTMLSpanElement | null;
  root: HTMLElement | null;
}

const installAnimations = (refs: AnimRefs): (() => void) => {
  const mediaMatch = gsap.matchMedia();
  mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
    if (refs.root) {
      gsap.fromTo(
        refs.root,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: ENTRANCE_DURATION, ease: "power2.out" },
      );
    }
    if (refs.dot) {
      gsap.fromTo(
        refs.dot,
        { opacity: PULSE_OPACITY_MIN },
        {
          duration: PULSE_DURATION,
          ease: "sine.inOut",
          opacity: PULSE_OPACITY_MAX,
          repeat: REPEAT_FOREVER,
          yoyo: true,
        },
      );
    }
  });
  mediaMatch.add("(prefers-reduced-motion: reduce)", () => {
    if (refs.root) { gsap.set(refs.root, { autoAlpha: 1 }); }
    if (refs.dot) { gsap.set(refs.dot, { opacity: PULSE_OPACITY_MAX }); }
  });
  return (): void => { mediaMatch.revert(); };
};

const SpaceFooter = (): ReactElement => {
  const rootRef = useRef<HTMLElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  useGSAP(() => installAnimations({ dot: dotRef.current, root: rootRef.current }), []);
  const stardate = formatStardate(new Date());

  return (
    <footer ref={rootRef} className={ROOT_CLASS} data-section="FOOTER" style={FONT_MONO_STYLE}>
      <div className={ROW_CLASS}>
        <span className={SEGMENT_CLASS}>
          SOL-III · SECTOR-7 · STARDATE {stardate}
        </span>
        <span className={STATUS_CLASS}>
          <span ref={dotRef} aria-hidden="true" className={PULSE_DOT_CLASS} />
          <span className={SEGMENT_CLASS}>ALL SYSTEMS NOMINAL</span>
        </span>
        <div className={SOCIAL_LIST_CLASS}>
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              aria-label={label}
              className={SOCIAL_LINK_CLASS}
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon size={ICON_SIZE_PX} />
              <span className="text-[10px] tracking-[0.24em]">{label}</span>
            </a>
          ))}
        </div>
      </div>
      <p className={COPY_CLASS}>
        {"© STARDATE "}{stardate}{" // DEEP SPACE EXPLORATION COMMAND · KITTIPAN W"}
      </p>
    </footer>
  );
};

export { SpaceFooter };
