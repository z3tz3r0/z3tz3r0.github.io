import type { Project } from "@/entities/project/model/types";

const projects: Project[] = [
  {
    actualLink:
      "https://allrice-inc-project-frontend-z3tz3r0s-projects.vercel.app/",
    description:
      "An e-commerce website specializing in selling Thailand rice varieties. It is built using React and Vite, styled with Tailwind CSS, and utilizes shadcn/ui for components.",
    gitHubBackendLink:
      "https://github.com/z3tz3r0/jsd9-pheonix_wicianburi_grill-backend",
    gitHubLink: "https://github.com/z3tz3r0/jsd9-pheonix_wicianburi-frontend",
    imageSrcBefore: "/assets/project-ecommerce-allrice.png",
    title: "All Rice inc. - E-commerce (Full Stack)",
  },
  {
    actualLink: "https://seal-over-the-walls.vercel.app/",
    description:
      "Supporting on API services for Product listing page, Sign up and Sign in services.",
    gitHubBackendLink: "https://github.com/JLezzzzz/seal-over-the-wall-backEnd",
    gitHubLink: "https://github.com/JLezzzzz/seal-over-the-wall-frontEnd",
    imageSrcBefore: "/assets/project-ecommerce-custommike.png",
    title: "Custommike - E-commerce (Support)",
  },
  {
    actualLink: "https://quote-voting-nextjs.vercel.app/",
    description:
      "Quote Voting system. First time using NextJS. features: User Authentication, Add new quote upon login, Quote Listing, Category Filtering, Search Functionality, Infinite Scroll, Quote Sorting. TypeScript, Tailwind, Shadcn",
    gitHubLink: "https://github.com/z3tz3r0/quote-voting-nextjs",
    imageSrcBefore: "/assets/project-nextjs-qoutevoter.png",
    title: "Quote Voter - Interactive (Full Stack)",
  },
  {
    actualLink: "https://ct-redesign-frontend.vercel.app/",
    description: "Redesign landing page for www.chareontut.com website",
    gitHubLink: "https://github.com/z3tz3r0/ct-redesign-frontend",
    imageSrcAfter: "/assets/project-static-ct.png",
    imageSrcBefore: "/assets/project-static-ct-before.png",
    title: "CT frontend redesign",
  },
  {
    actualLink: "https://ecommerce-space-craft.vercel.app",
    description:
      "A full-stack e-commerce proof-of-concept application for Browse and managing a simulated inventory of spacecraft.",
    gitHubLink: "https://github.com/z3tz3r0/ecommerce-space-craft",
    imageSrcBefore: "/assets/project-ecommerce-spacecraft.png",
    title: "Spacecraft E-commerce App (Full Stack)",
  },
];

export { projects };
