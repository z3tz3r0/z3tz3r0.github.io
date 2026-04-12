import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@heroui/react";
import ScrollVelocity from "@/shared/ui/scroll-velocity/ScrollVelocity";
import { EASE } from "@/shared/lib/animation";

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults: { ease: EASE.entrance, duration: 0.7 },
      });

      tl.from(q(".hero-greeting"), { autoAlpha: 0, y: 30 })
        .from(q(".hero-title"), { autoAlpha: 0, y: 40 }, "<0.15")
        .from(q(".hero-subtitle"), { autoAlpha: 0, y: 20 }, "<0.15")
        .from(q(".hero-cta"), { autoAlpha: 0, y: 20 }, "<0.15")
        .from(q(".hero-image"), { autoAlpha: 0, scale: 0.9 }, "<0.1");
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(q(".hero-greeting, .hero-title, .hero-subtitle, .hero-cta, .hero-image"), {
        autoAlpha: 1, y: 0, scale: 1,
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="text-center pt-4">
      <div
        className="flip-layout px-4 grid gap-16 max-w-7xl mx-auto items-center justify-items-center mb-16"
        style={{ gridTemplateColumns: `var(--layout-hero-cols)` }}
      >
        <div className="lg:text-left w-full lg:max-w-6xl">
          <p className="hero-greeting text-lg font-semibold text-muted-foreground" style={{ visibility: "hidden" }}>
            Hi There,
          </p>
          <p className="hero-title text-5xl lg:text-6xl font-bold mb-4 lg:mb-8" style={{ visibility: "hidden" }}>
            I am <span className="text-accent">Kittipan</span>
            <br />
            Full Stack Software Developer
          </p>
          <p className="hero-subtitle font-semibold text-muted-foreground mb-8" style={{ visibility: "hidden" }}>
            My passion for design, code, and web interaction fuels my journey in
            the web design realm.
          </p>
          <div className="hero-cta flex gap-4 justify-center" style={{ visibility: "hidden" }}>
            <a href="#work">
              <Button variant="outline" size="lg" className="px-10 text-lg">
                See Work
              </Button>
            </a>
            <a
              href="/CV_Kittipan Wangsakarn.pdf"
              download="CV-Kittipan_Wangsakarn.pdf"
            >
              <Button variant="ghost" size="lg" className="px-10 text-lg">
                Download CV
              </Button>
            </a>
          </div>
        </div>

        <img
          src="/profile.png"
          alt="Kittipan Wangsakarn, Full Stack Developer"
          className="hero-image rounded-xl w-3xs lg:w-full"
          style={{ visibility: "hidden" }}
        />
      </div>

      <ScrollVelocity
        texts={["OPEN FOR HIRING", "OPEN FOR HIRING"]}
        velocity={20}
        className="text-foreground/20 text-6xl mb-4"
      />
    </div>
  );
}

export default Hero;
