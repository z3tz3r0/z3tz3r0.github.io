import HtmlProjectCard from "@/widgets/html-projects/ui/HtmlProjectCard";
import { htmlProjects } from "@/widgets/html-projects/model/htmlProjects";
import Layout from "@/shared/ui/layout/Layout";
import Topic from "@/shared/ui/topic/Topic";
import SubTopic from "@/shared/ui/subtopic/SubTopic";
import HorizontalLine from "@/shared/ui/horizontal-line/HorizontalLine";
import { useGsapScrollReveal } from "@/shared/hooks/useGsapScrollReveal";

function HtmlProjectsSection() {
  const containerRef = useGsapScrollReveal({ selector: ".html-card", stagger: 0.1 });

  return (
    <Layout>
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <Topic>Practice</Topic>
        <SubTopic>Previous HTML Projects</SubTopic>
        <HorizontalLine />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
          {htmlProjects.map((project, index) => (
            <div key={index} className="html-card">
              <HtmlProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default HtmlProjectsSection;
