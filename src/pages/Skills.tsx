import ProgrammingLanguage from "@/components/ProgrammingLanguage";
import SubTopic from "@/components/SubTopic";
import Topic from "@/components/Topic";
import Layout from "@/containers/Layout";
import CSS from "../assets/tech/css.webp";
import HTML from "../assets/tech/html.webp";
import JavaScript from "../assets/tech/javascript.webp";
import React from "../assets/tech/react.webp";
import TailwindCSS from "../assets/tech/tailwind.webp";
import TypeScript from "../assets/tech/typescript.webp";

interface skill {
    label: string;
    icon: string;
}

const skills: skill[] = [
    { label: "HTML", icon: HTML },
    { label: "CSS", icon: CSS },
    { label: "JavaScript", icon: JavaScript },
    { label: "TypeScript", icon: TypeScript },
    { label: "React", icon: React },
    { label: "TailwindCSS", icon: TailwindCSS },
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
                            icon={item.icon}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Skills;
