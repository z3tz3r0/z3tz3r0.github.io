import HorizontalLine from "@/shared/ui/horizontal-line/HorizontalLine";
import SubTopic from "@/shared/ui/subtopic/SubTopic";
import { Button } from "@heroui/react";
import WorkCard from "@/widgets/work/ui/WorkCard";
import { projects } from "@/widgets/work/model/projects";
import { useState } from "react";
import Topic from "@/shared/ui/topic/Topic";
import Layout from "@/shared/ui/layout/Layout";
import { useGsapScrollReveal } from "@/shared/hooks/useGsapScrollReveal";

function Work() {
  const initialProjectVisibility = 4;
  const [visibleCount, setVisibleCount] = useState(initialProjectVisibility);
  const containerRef = useGsapScrollReveal({ selector: ".work-card", stagger: 0.12, y: 50 });

  const visibleProjects = projects.slice(0, visibleCount);

  const handleShowMore = () => {
    if (visibleCount > projects.length) {
      setVisibleCount(initialProjectVisibility);
    } else {
      setVisibleCount((prev) => prev + 3);
    }
  };

  return (
    <Layout id="work" className="bg-muted/10">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <Topic>Work</Topic>
        <SubTopic>Latest Project</SubTopic>
        <HorizontalLine />
        <div
          className="flip-layout grid grid-cols-1 md:grid-cols-2 gap-8 my-12"
          id="project-container"
        >
          {visibleProjects.map((project, index) => (
            <div key={index} className="work-card">
              <WorkCard
                title={project.title}
                description={project.description}
                gitHubLink={project.gitHubLink}
                gitHubBackendLink={project.gitHubBackendLink}
                actualLink={project.actualLink}
                imageSrcBefore={project.imageSrcBefore}
                imageSrcAfter={project.imageSrcAfter}
              />
            </div>
          ))}
        </div>
        {visibleCount !== projects.length && (
          <Button
            variant="outline"
            size="lg"
            className="px-10 text-lg"
            onPress={handleShowMore}
          >
            {visibleCount < projects.length ? "See More" : "See Less"}
          </Button>
        )}
      </div>
    </Layout>
  );
}

export default Work;
