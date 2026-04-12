import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
  numCopies?: number;
}

function ScrollVelocity({
  texts,
  velocity = 100,
  className = "",
  numCopies = 6,
}: ScrollVelocityProps) {
  return (
    <section>
      {texts.map((text, index) => (
        <VelocityRow
          key={index}
          text={text}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          className={className}
          numCopies={numCopies}
        />
      ))}
    </section>
  );
}

interface VelocityRowProps {
  text: string;
  baseVelocity: number;
  className: string;
  numCopies: number;
}

function VelocityRow({ text, baseVelocity, className, numCopies }: VelocityRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!scrollerRef.current || !copyRef.current) return;

    const copyWidth = copyRef.current.offsetWidth;
    if (copyWidth === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const totalWidth = copyWidth;
      const direction = baseVelocity > 0 ? -1 : 1;
      const speed = Math.abs(baseVelocity);

      const tween = gsap.to(scrollerRef.current!, {
        x: direction * totalWidth,
        duration: totalWidth / speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(
            gsap.utils.wrap(-totalWidth, 0),
          ),
        },
      });

      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocityFactor = 1 + Math.abs(self.getVelocity()) / 2000;
          gsap.to(tween, {
            timeScale: self.direction === -1 ? -velocityFactor : velocityFactor,
            duration: 0.3,
            overwrite: true,
          });
        },
      });
    });

    return () => mm.revert();
  }, { scope: scrollerRef, dependencies: [baseVelocity] });

  const starSvg = (
    <span className="inline-block align-middle mx-1">
      <svg
        width="40"
        height="41"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M8 0.5L10.1607 6.33927L16 8.5L10.1607 10.6607L8 16.5L5.83927 10.6607L0 8.5L5.83927 6.33927L8 0.5Z"
          fill="currentColor"
          opacity="0.15"
        />
      </svg>
    </span>
  );

  return (
    <div className="relative overflow-hidden">
      <div
        ref={scrollerRef}
        className="flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]"
      >
        {Array.from({ length: numCopies }).map((_, i) => (
          <span
            key={i}
            className={className}
            ref={i === 0 ? copyRef : undefined}
          >
            {text}&nbsp;{starSvg}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

export default ScrollVelocity;
