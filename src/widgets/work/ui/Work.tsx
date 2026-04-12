import { useCallback, useState } from "react";
import { Button } from "@heroui/react";
import { HorizontalLine } from "@/shared/ui/horizontal-line/HorizontalLine";
import { Layout } from "@/shared/ui/layout/Layout";
import type { ReactElement } from "react";
import { SubTopic } from "@/shared/ui/subtopic/SubTopic";
import { Topic } from "@/shared/ui/topic/Topic";
import { WorkCard } from "@/widgets/work/ui/WorkCard";
import { projects } from "@/widgets/work/model/projects";
import { useGsapScrollReveal } from "@/shared/hooks/useGsapScrollReveal";

const INITIAL_PROJECT_VISIBILITY = 4;
const PROJECTS_INCREMENT = 3;
const WORK_STAGGER = 0.12;
const WORK_Y_OFFSET = 50;

const Work = (): ReactElement => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_PROJECT_VISIBILITY);
  const containerRef = useGsapScrollReveal({ selector: ".work-card", stagger: WORK_STAGGER, yOffset: WORK_Y_OFFSET });

  const visibleProjects = projects.slice(0, visibleCount);

  const handleShowMore = useCallback(() => {
    if (visibleCount > projects.length) {
      setVisibleCount(INITIAL_PROJECT_VISIBILITY);
    } else {
      setVisibleCount((prev) => prev + PROJECTS_INCREMENT);
    }
  }, [visibleCount]);

  let buttonLabel = "See More";
  if (visibleCount >= projects.length) {
    buttonLabel = "See Less";
  }

  return (
    <Layout className="bg-muted/10" id="work">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <Topic>Work</Topic>
        <SubTopic>Latest Project</SubTopic>
        <HorizontalLine />
        <div
          className="flip-layout grid grid-cols-1 md:grid-cols-2 gap-8 my-12"
          id="project-container"
        >
          {visibleProjects.map((project) => (
            <div className="work-card" key={project.title}>
              <WorkCard
                actualLink={project.actualLink}
                description={project.description}
                gitHubBackendLink={project.gitHubBackendLink}
                gitHubLink={project.gitHubLink}
                imageSrcAfter={project.imageSrcAfter}
                imageSrcBefore={project.imageSrcBefore}
                title={project.title}
              />
            </div>
          ))}
        </div>
        {visibleCount !== projects.length && (
          <Button
            className="px-10 text-lg"
            onPress={handleShowMore}
            size="lg"
            variant="outline"
          >
            {buttonLabel}
          </Button>
        )}
      </div>
    </Layout>
  );
};

export { Work };
