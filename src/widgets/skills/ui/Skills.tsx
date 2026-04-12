import type { CSSProperties, ReactElement } from "react";
import { Layout } from "@/shared/ui/layout/Layout";
import { ProgrammingLanguage } from "@/widgets/skills/ui/ProgrammingLanguage";
import { SubTopic } from "@/shared/ui/subtopic/SubTopic";
import { Topic } from "@/shared/ui/topic/Topic";
import { useGsapScrollReveal } from "@/shared/hooks/useGsapScrollReveal";

const SKILLS_STAGGER = 0.08;

const SKILLS_GRID_STYLE: CSSProperties = {
  gridTemplateColumns: "var(--layout-skills-cols)",
};

interface Skill {
  className?: string;
  deviconSvgPath: string;
  id: string;
  label: string;
}

const skills: Skill[] = [
  { deviconSvgPath: "html5/html5-original.svg", id: "html", label: "HTML" },
  { deviconSvgPath: "css3/css3-original.svg", id: "css", label: "CSS" },
  { deviconSvgPath: "javascript/javascript-original.svg", id: "javascript", label: "JavaScript" },
  { deviconSvgPath: "typescript/typescript-original.svg", id: "typescript", label: "TypeScript" },
  { deviconSvgPath: "react/react-original.svg", id: "react", label: "React" },
  { deviconSvgPath: "tailwindcss/tailwindcss-original.svg", id: "tailwindcss", label: "TailwindCSS" },
  { deviconSvgPath: "nodejs/nodejs-original-wordmark.svg", id: "nodejs", label: "Nodejs" },
  { className: "text-white", deviconSvgPath: "express/express-original.svg", id: "express", label: "Expressjs" },
  { deviconSvgPath: "mongodb/mongodb-original.svg", id: "mongodb", label: "MongoDB" },
  { deviconSvgPath: "mongoose/mongoose-original-wordmark.svg", id: "mongoose", label: "mongoose" },
];

const Skills = (): ReactElement => {
  const containerRef = useGsapScrollReveal({ selector: ".skill-badge", stagger: SKILLS_STAGGER });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <Topic>Skills</Topic>
        <SubTopic>My Current Tech Stack</SubTopic>
        <div
          className="flip-layout grid justify-center gap-8 my-12"
          style={SKILLS_GRID_STYLE}
        >
          {skills.map((item) => (
            <div className="skill-badge" key={item.id}>
              <ProgrammingLanguage
                className={item.className}
                deviconSvgPath={item.deviconSvgPath}
                label={item.label}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export { Skills };
