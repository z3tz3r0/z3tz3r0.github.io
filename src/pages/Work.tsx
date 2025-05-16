import HorizontalLine from "@/components/HorizontalLine";
import SubTopic from "@/components/SubTopic";
import { Button } from "@/components/ui/button";
import WorkCard from "@/containers/WorkCard";
import { useState } from "react";
import Topic from "../components/Topic";
import Layout from "../containers/Layout";

interface Project {
  title: string;
  description: string;
  gitHubLink: string;
  gitHubBackendLink?: string;
  actualLink: string;
  imageSrc: string; // Path to the project image
}

const projects: Project[] = [
  {
    title: "All Rice inc. - E-commerce (Full Stack)",
    description:
      "An e-commerce website specializing in selling Thailand rice varieties. It's built using React and Vite, styled with Tailwind CSS, and utilizes shadcn/ui for components.",
    gitHubLink: "https://github.com/z3tz3r0/jsd9-pheonix_wicianburi-frontend",
    gitHubBackendLink:
      "https://github.com/z3tz3r0/jsd9-pheonix_wicianburi_grill-backend",
    actualLink: "https://jsd9-pheonix-wicianburi-frontend.vercel.app/",
    imageSrc: "/assets/project-ecommerce-allrice.png", // Use actual image paths
  },
  {
    title: "Spacecraft E-commerce App (Full Stack)",
    description:
      "A full-stack e-commerce proof-of-concept application for Browse and managing a simulated inventory of spacecraft.",
    gitHubLink: "https://github.com/z3tz3r0/ecommerce-space-craft",
    actualLink: "https://ecommerce-space-craft.vercel.app",
    imageSrc: "/assets/project-ecommerce-spacecraft.png", // Use actual image paths
  },
  {
    title: "Custommike - E-commerce (Support)",
    description:
      "Supporting on API services for Product listing page, Sign up and Sign in services.",
    gitHubLink: "https://github.com/JLezzzzz/seal-over-the-wall-frontEnd",
    gitHubBackendLink: "https://github.com/JLezzzzz/seal-over-the-wall-backEnd",
    actualLink: "https://seal-over-the-walls.vercel.app/",
    imageSrc: "/assets/project-ecommerce-custommike.png", // Use actual image paths
  },
  // Add more projects here
];

const Work = () => {
  const initialProjectvisibility = 3;
  const [visibleCount, setVisibleCount] = useState(initialProjectvisibility);

  // Determine which projects to display
  const visibleProjects = projects.slice(0, visibleCount);

  // Handle button click to show more)
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
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
              imageSrc={project.imageSrc}
            />
          ))}
        </div>

        {projects.length <= initialProjectvisibility || (
          <Button
            variant="outline"
            className="py-6 px-10 text-lg"
            onClick={handleShowMore}
          >
            See More
          </Button>
        )}
      </div>
    </Layout>
  );
};

export default Work;
