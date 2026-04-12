import { EASE } from "@/shared/lib/animation";
import { HIDDEN_STYLE } from "@/shared/lib/styles";
import { HorizontalLine } from "@/shared/ui/horizontal-line/HorizontalLine";
import { Layout } from "@/shared/ui/layout/Layout";
import type { ReactElement } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SubTopic } from "@/shared/ui/subtopic/SubTopic";
import { Topic } from "@/shared/ui/topic/Topic";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const ABOUT_SCALE_INITIAL = 0.9;
const ABOUT_TEXT_OFFSET = 30;
const ABOUT_ANIM_DURATION = 0.7;
const ABOUT_IMAGE_DURATION = 0.8;
const ABOUT_TEXT_STAGGER = 0.15;
const ABOUT_TEXT_DELAY = 0.2;

const About = (): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const queryElements = gsap.utils.selector(containerRef);
    const mediaMatch = gsap.matchMedia();

    mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(queryElements(".about-image"), { autoAlpha: 0, scale: ABOUT_SCALE_INITIAL });
      gsap.set(queryElements(".about-text"), { autoAlpha: 0, y: ABOUT_TEXT_OFFSET });

      ScrollTrigger.create({
        onEnter: () => {
          const timeline = gsap.timeline({ defaults: { duration: ABOUT_ANIM_DURATION, ease: EASE.entrance } });
          timeline.to(queryElements(".about-image"), { autoAlpha: 1, duration: ABOUT_IMAGE_DURATION, scale: 1 })
            .to(queryElements(".about-text"), { autoAlpha: 1, stagger: ABOUT_TEXT_STAGGER, y: 0 }, `<${ABOUT_TEXT_DELAY}`);
        },
        once: true,
        start: "top 75%",
        trigger: containerRef.current,
      });
    });

    mediaMatch.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(queryElements(".about-image, .about-text"), { autoAlpha: 1, scale: 1, y: 0 });
    });

    return (): void => { mediaMatch.revert(); };
  }, { scope: containerRef });

  return (
    <Layout id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <Topic>About Me</Topic>
        <SubTopic>The Journey: From Marketing to Code</SubTopic>
        <HorizontalLine />
        <div className="flex flex-col md:flex-row items-center gap-12 my-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              alt="Kittipan Wangsakarn portrait"
              className="about-image rounded-full w-64 h-64 object-cover shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
              src="/profile.png"
              style={HIDDEN_STYLE}
            />
          </div>
          <div className="w-full md:w-1/2 text-left text-lg text-foreground/80">
            <p className="about-text mb-6" style={HIDDEN_STYLE}>
              My career began in the dynamic world of marketing, where I honed
              skills in understanding user needs, crafting compelling
              narratives, and strategizing for impact. While successful, I found
              myself increasingly drawn to the technical side – the &apos;how&apos; behind
              digital experiences.
            </p>
            <p className="about-text mb-6" style={HIDDEN_STYLE}>
              This curiosity sparked a transition. I immersed myself in learning
              development, discovering a passion for problem-solving through
              code. The analytical thinking from marketing proved invaluable,
              now applied to building robust and elegant software solutions.
            </p>
            <p className="about-text mb-6" style={HIDDEN_STYLE}>
              Today, I blend my marketing acumen with technical expertise to
              create user-centric applications. I understand the importance of
              both form and function, ensuring that every project not only works
              flawlessly but also resonates with its intended audience.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export { About };
