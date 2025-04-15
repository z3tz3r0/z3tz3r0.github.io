import HorizontalLine from "../components/HorizontalLine";
import SubTopic from "../components/SubTopic";
import Topic from "../components/Topic";
import Layout from "../containers/Layout";

const About = () => {
    return (
        <Layout id="about">
            <div className="max-w-7xl mx-auto">
                <Topic>About</Topic>
                <SubTopic>From Marketer to Developer</SubTopic>

                <HorizontalLine />

                <div
                    className="flex flex-col gap-8 mb-8"
                    id="project-container"
                >
                    <div className="w-full h-100 hover:scale-95 hover:rotate-3 transition-all duration-300 ease-out  bg-gray-500 rounded-xl" />
                </div>

                <p className="text-left text-lg text-white/70 mb-8">
                    I've grown from simply enjoying problem-solving to
                    dedicating myself to blending design with function, crafting
                    interfaces that are both beautiful and intuitive. Each
                    project is a chance to exceed expectations, bring visions to
                    life with precision and care. I believe, every remarkable
                    product tells a story of both expertise and the unique brand
                    identity.
                </p>
            </div>
        </Layout>
    );
};

export default About;
