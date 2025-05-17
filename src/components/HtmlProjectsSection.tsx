import React, { useEffect, useState } from "react";
import HtmlProjectCard from "./HtmlProjectCard"; // Assuming HtmlProjectCard.tsx is in the same directory
// import html2canvas from 'html2canvas'; // You would need to install html2canvas

interface HtmlProject {
  name: string;
  screenshotUrl: string; // URL to the captured screenshot (assuming pre-generated for now)
  projectUrl: string; // URL to the actual HTML project (in public directory)
}

const HtmlProjectsSection: React.FC = () => {
  const [htmlProjects, setHtmlProjects] = useState<HtmlProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectsData: HtmlProject[] = [
      {
        name: "Codecademy Company HP Flexbox",
        screenshotUrl:
          "/html-projects/codecademy-company-hp-flexbox/screenshot.png",
        projectUrl: "/html-projects/codecademy-company-hp-flexbox/index.html",
      },
      {
        name: "Codecademy Dasmoto Art Craft",
        screenshotUrl:
          "/html-projects/codecademy-dasmoto-art-craft/screenshot.png",
        projectUrl: "/html-projects/codecademy-dasmoto-art-craft/index.html",
      },
      {
        name: "Codecademy HTML CSS Cheatsheet",
        screenshotUrl:
          "/html-projects/codecademy-html-css-cheatsheet/screenshot.png",
        projectUrl: "/html-projects/codecademy-html-css-cheatsheet/index.html",
      },
      {
        name: "Codecademy Responsive Club Website",
        screenshotUrl:
          "/html-projects/codecademy-responsive-club-website/screenshot.png",
        projectUrl:
          "/html-projects/codecademy-responsive-club-website/index.html",
      },
      {
        name: "Codecademy System Design",
        screenshotUrl: "/html-projects/codecademy-system-design/screenshot.png",
        projectUrl: "/html-projects/codecademy-system-design/index.html",
      },
      {
        name: "Codecademy Tea Cozy",
        screenshotUrl: "/html-projects/codecademy-tea_cozy/screenshot.png",
        projectUrl: "/html-projects/codecademy-tea_cozy/index.html",
      },
      {
        name: "QR Code Component",
        screenshotUrl: "/html-projects/qr-code-component-main/screenshot.png",
        projectUrl: "/html-projects/qr-code-component-main/index.html",
      },
      {
        name: "Social Links Profile",
        screenshotUrl:
          "/html-projects/social-links-profile-main/screenshot.png",
        projectUrl: "/html-projects/social-links-profile-main/index.html",
      },
      // Add other HTML projects here following the same structure
    ];

    setHtmlProjects(projectsData);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading HTML projects...</div>;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Previous HTML Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {htmlProjects.map((project, index) => (
            <HtmlProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HtmlProjectsSection;
