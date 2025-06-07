import HorizontalLine from "@/components/HorizontalLine";
import SubTopic from "@/components/SubTopic";
import { Button } from "@/components/ui/button";
import WorkCard from "@/containers/WorkCard";
import { projects } from "@/data/projects";
import { useState } from "react";
import Topic from "../components/Topic";
import Layout from "../containers/Layout";

const Work = () => {
  const initialProjectvisibility = 4;
  const [visibleCount, setVisibleCount] = useState(initialProjectvisibility);

  // Determine which projects to display
  const visibleProjects = projects.slice(0, visibleCount);

  // Handle button click to show more)
  const handleShowMore = () => {
    console.log(visibleCount);
    console.log(projects.length);
    if (visibleCount > projects.length) {
      setVisibleCount(3);
    } else {
      setVisibleCount((prev) => prev + 3);
    }
  };
  return (
    <Layout id="work" className="bg-white/5">
      <div className="max-w-7xl mx-auto">
        <Topic>Work</Topic>
        <SubTopic>Lastest Project</SubTopic>
        <HorizontalLine />
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12"
          id="project-container"
        >
          {" "}
          {/* Adjusted grid for responsiveness */}
          {visibleProjects.map((project, index) => (
            <WorkCard
              key={index} // Using index as key is okay if the list is static and not reordered
              title={project.title}
              description={project.description}
              gitHubLink={project.gitHubLink}
              gitHubBackendLink={project.gitHubBackendLink}
              actualLink={project.actualLink}
              imageSrcBefore={project.imageSrcBefore}
              imageSrcAfter={project.imageSrcAfter}
            />
          ))}
        </div>
        {visibleCount !== projects.length && (
          <Button
            variant="outline"
            className="py-6 px-10 text-lg"
            onClick={handleShowMore}
          >
            {visibleCount < projects.length ? "See More" : "See Less"}
          </Button>
        )}
      </div>
    </Layout>
  );
};

export default Work;
