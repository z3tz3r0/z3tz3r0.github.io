import ProgrammingLanguage from "@/components/ProgrammingLanguage";
import SubTopic from "@/components/SubTopic";
import Topic from "@/components/Topic";
import Layout from "@/containers/Layout";

interface skill {
  label: string;
  deviconSvgPath: string;
  className?: string;
}

// https://devicon.dev/

const skills: skill[] = [
  { label: "HTML", deviconSvgPath: "html5/html5-original.svg" },
  { label: "CSS", deviconSvgPath: "css3/css3-original.svg" },
  { label: "JavaScript", deviconSvgPath: "javascript/javascript-original.svg" },
  { label: "TypeScript", deviconSvgPath: "typescript/typescript-original.svg" },
  { label: "React", deviconSvgPath: "react/react-original.svg" },
  {
    label: "TailwindCSS",
    deviconSvgPath: "tailwindcss/tailwindcss-original.svg",
  },
  { label: "Nodejs", deviconSvgPath: "nodejs/nodejs-original-wordmark.svg" },
  {
    label: "Expressjs",
    deviconSvgPath: "express/express-original.svg",
    className: "text-white",
  },
  {
    label: "MongoDB",
    deviconSvgPath: "mongodb/mongodb-original.svg",
  },
  {
    label: "mongoose",
    deviconSvgPath: "mongoose/mongoose-original-wordmark.svg",
  },
];

const Skills = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <Topic>Skills</Topic>
        <SubTopic>My Current Tech Stack</SubTopic>
        <div className="flex justify-center flex-wrap gap-8 my-12">
          {skills.map((item, index) => (
            <ProgrammingLanguage
              key={index}
              label={item.label}
              deviconSvgPath={item.deviconSvgPath} // Pass deviconSvgPath
              className={item.className}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Skills;
