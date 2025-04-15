import HorizontalLine from "@/components/HorizontalLine";
import SubTopic from "@/components/SubTopic";
import { Button } from "@/components/ui/button";
import Topic from "../components/Topic";
import Layout from "../containers/Layout";

const Work = () => {
    return (
        <Layout id="work" className="bg-white/5">
            <div className="max-w-7xl mx-auto">
                <Topic>Work</Topic>
                <SubTopic>Lastest Project</SubTopic>

                <HorizontalLine />

                <div
                    className="grid grid-cols-2 gap-8 mb-8"
                    id="project-container"
                >
                    <div className="h-80 hover:h-100 transition-all duration-300 ease-out  bg-gray-500 rounded-xl" />
                    <div className="h-80 hover:h-100 transition-all duration-300 ease-out  bg-gray-500 rounded-xl" />
                    <div className="h-80 hover:h-100 transition-all duration-300 ease-out  bg-gray-500 rounded-xl" />
                </div>

                <Button variant="outline" className="py-6 px-10 text-lg">
                    See More
                </Button>
            </div>
        </Layout>
    );
};

export default Work;
