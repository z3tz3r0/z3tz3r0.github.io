import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HorizontalLine from "@/shared/ui/horizontal-line/HorizontalLine";
import SubTopic from "@/shared/ui/subtopic/SubTopic";
import Topic from "@/shared/ui/topic/Topic";
import Layout from "@/shared/ui/layout/Layout";
import { EASE } from "@/shared/lib/animation";

function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Set initial hidden/offset state before registering trigger
      gsap.set(q(".about-image"), { autoAlpha: 0, scale: 0.9 });
      gsap.set(q(".about-text"), { autoAlpha: 0, y: 30 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: EASE.entrance, duration: 0.7 } });
          tl.to(q(".about-image"), { autoAlpha: 1, scale: 1, duration: 0.8 })
            .to(q(".about-text"), { autoAlpha: 1, y: 0, stagger: 0.15 }, "<0.2");
        },
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(q(".about-image, .about-text"), { autoAlpha: 1, y: 0, scale: 1 });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <Layout id="about">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Topic>About Me</Topic>
        <SubTopic>The Journey: From Marketing to Code</SubTopic>
        <HorizontalLine />
        <div className="flex flex-col md:flex-row items-center gap-12 my-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/profile.png"
              alt="Kittipan Wangsakarn portrait"
              className="about-image rounded-full w-64 h-64 object-cover shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
              style={{ visibility: "hidden" }}
            />
          </div>
          <div className="w-full md:w-1/2 text-left text-lg text-foreground/80">
            <p className="about-text mb-6" style={{ visibility: "hidden" }}>
              My career began in the dynamic world of marketing, where I honed
              skills in understanding user needs, crafting compelling
              narratives, and strategizing for impact. While successful, I found
              myself increasingly drawn to the technical side – the 'how' behind
              digital experiences.
            </p>
            <p className="about-text mb-6" style={{ visibility: "hidden" }}>
              This curiosity sparked a transition. I immersed myself in learning
              development, discovering a passion for problem-solving through
              code. The analytical thinking from marketing proved invaluable,
              now applied to building robust and elegant software solutions.
            </p>
            <p className="about-text mb-6" style={{ visibility: "hidden" }}>
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
}

export default About;
