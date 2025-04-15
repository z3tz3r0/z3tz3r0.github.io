import ProgrammingLanguage from "@/components/ProgrammingLanguage";
import SubTopic from "@/components/SubTopic";
import Topic from "@/components/Topic";
import Layout from "@/containers/Layout";

interface skill {
    label: string;
    icon: string;
}

const skills: skill[] = [
    { label: "HTML", icon: "src/assets/tech/html.webp" },
    { label: "CSS", icon: "src/assets/tech/css.webp" },
    { label: "JavaScript", icon: "src/assets/tech/javascript.webp" },
    { label: "TypeScript", icon: "src/assets/tech/typescript.webp" },
    { label: "React", icon: "src/assets/tech/react.webp" },
    { label: "TailwindCSS", icon: "src/assets/tech/tailwind.webp" },
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
