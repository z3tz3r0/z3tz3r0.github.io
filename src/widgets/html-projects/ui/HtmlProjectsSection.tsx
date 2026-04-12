import { HorizontalLine } from "@/shared/ui/horizontal-line/HorizontalLine";
import { HtmlProjectCard } from "@/widgets/html-projects/ui/HtmlProjectCard";
import { Layout } from "@/shared/ui/layout/Layout";
import type { ReactElement } from "react";
import { SubTopic } from "@/shared/ui/subtopic/SubTopic";
import { Topic } from "@/shared/ui/topic/Topic";
import { htmlProjects } from "@/widgets/html-projects/model/htmlProjects";
import { useGsapScrollReveal } from "@/shared/hooks/useGsapScrollReveal";

const HTML_STAGGER = 0.1;

const HtmlProjectsSection = (): ReactElement => {
  const containerRef = useGsapScrollReveal({ selector: ".html-card", stagger: HTML_STAGGER });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <Topic>Practice</Topic>
        <SubTopic>Previous HTML Projects</SubTopic>
        <HorizontalLine />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
          {htmlProjects.map((project) => (
            <div className="html-card" key={project.name}>
              <HtmlProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export { HtmlProjectsSection };
