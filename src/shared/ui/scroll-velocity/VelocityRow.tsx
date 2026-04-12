// oxlint-disable react/no-array-index-key -- Identical scroll copies have no unique ID
import type { ReactElement, RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarIcon } from "@/shared/ui/scroll-velocity/StarIcon";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const VELOCITY_SCROLL_FACTOR = 2000;
const VELOCITY_TRANSITION_DURATION = 0.3;
const NEGATIVE_DIRECTION = -1;
const FIRST_COPY_INDEX = 0;

interface VelocityRowProps {
  baseVelocity: number;
  className: string;
  numCopies: number;
  text: string;
}

const getDirection = (velocity: number): number => {
  if (velocity > 0) {
    return NEGATIVE_DIRECTION;
  }
  return 1;
};

const VelocityRow = ({ baseVelocity, className, numCopies, text }: VelocityRowProps): ReactElement => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!scrollerRef.current || !copyRef.current) { return; }

    const copyWidth = copyRef.current.offsetWidth;
    if (copyWidth === 0) { return; }

    const mediaMatch = gsap.matchMedia();

    mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
      const totalWidth = copyWidth;
      const direction = getDirection(baseVelocity);
      const speed = Math.abs(baseVelocity);
      const scrollerElement = scrollerRef.current;

      if (!scrollerElement) { return; }

      const tween = gsap.to(scrollerElement, {
        duration: totalWidth / speed,
        ease: "none",
        modifiers: {
          x: gsap.utils.unitize(gsap.utils.wrap(-totalWidth, 0)),
        },
        repeat: NEGATIVE_DIRECTION,
        x: direction * totalWidth,
      });

      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocityFactor = 1 + Math.abs(self.getVelocity()) / VELOCITY_SCROLL_FACTOR;
          let timeScaleValue = velocityFactor;
          if (self.direction === NEGATIVE_DIRECTION) {
            timeScaleValue = -velocityFactor;
          }
          gsap.to(tween, {
            duration: VELOCITY_TRANSITION_DURATION,
            overwrite: true,
            timeScale: timeScaleValue,
          });
        },
      });
    });

    return (): void => { mediaMatch.revert(); };
  }, { dependencies: [baseVelocity], scope: scrollerRef });

  const copies = Array.from({ length: numCopies });

  const getCopyRef = (index: number): RefObject<HTMLSpanElement | null> | null => {
    if (index === FIRST_COPY_INDEX) {
      return copyRef;
    }
    return null;
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]"
        ref={scrollerRef}
      >
        {/* oxlint-disable-next-line react/no-array-index-key -- Identical copies have no unique ID */}
        {copies.map((_unused, index) => (
          <span
            className={className}
            key={`velocity-copy-${String(index)}`}
            ref={getCopyRef(index)}
          >
            {text}&nbsp;<StarIcon />&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
};

export { VelocityRow };
