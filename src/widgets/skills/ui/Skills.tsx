import ProgrammingLanguage from "@/widgets/skills/ui/ProgrammingLanguage";
import SubTopic from "@/shared/ui/subtopic/SubTopic";
import Topic from "@/shared/ui/topic/Topic";
import Layout from "@/shared/ui/layout/Layout";
import { useGsapScrollReveal } from "@/shared/hooks/useGsapScrollReveal";

interface Skill {
  label: string;
  deviconSvgPath: string;
  className?: string;
}

const skills: Skill[] = [
  { label: "HTML", deviconSvgPath: "html5/html5-original.svg" },
  { label: "CSS", deviconSvgPath: "css3/css3-original.svg" },
  { label: "JavaScript", deviconSvgPath: "javascript/javascript-original.svg" },
  { label: "TypeScript", deviconSvgPath: "typescript/typescript-original.svg" },
  { label: "React", deviconSvgPath: "react/react-original.svg" },
  { label: "TailwindCSS", deviconSvgPath: "tailwindcss/tailwindcss-original.svg" },
  { label: "Nodejs", deviconSvgPath: "nodejs/nodejs-original-wordmark.svg" },
  { label: "Expressjs", deviconSvgPath: "express/express-original.svg", className: "text-white" },
  { label: "MongoDB", deviconSvgPath: "mongodb/mongodb-original.svg" },
  { label: "mongoose", deviconSvgPath: "mongoose/mongoose-original-wordmark.svg" },
];

function Skills() {
  const containerRef = useGsapScrollReveal({ selector: ".skill-badge", stagger: 0.08 });

  return (
    <Layout>
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <Topic>Skills</Topic>
        <SubTopic>My Current Tech Stack</SubTopic>
        <div
          className="flip-layout grid justify-center gap-8 my-12"
          style={{ gridTemplateColumns: `var(--layout-skills-cols)` }}
        >
          {skills.map((item, index) => (
            <div key={index} className="skill-badge">
              <ProgrammingLanguage
                label={item.label}
                deviconSvgPath={item.deviconSvgPath}
                className={item.className}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Skills;
