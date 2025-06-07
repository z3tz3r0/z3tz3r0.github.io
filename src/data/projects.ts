interface Project {
  title: string;
  description: string;
  gitHubLink: string;
  gitHubBackendLink?: string;
  actualLink: string;
  imageSrcBefore: string; // Path to the project image
  imageSrcAfter?: string; // Path to the project image
}

export const projects: Project[] = [
  {
    title: "All Rice inc. - E-commerce (Full Stack)",
    description:
      "An e-commerce website specializing in selling Thailand rice varieties. It's built using React and Vite, styled with Tailwind CSS, and utilizes shadcn/ui for components.",
    gitHubLink: "https://github.com/z3tz3r0/jsd9-pheonix_wicianburi-frontend",
    gitHubBackendLink:
      "https://github.com/z3tz3r0/jsd9-pheonix_wicianburi_grill-backend",
    actualLink:
      "https://allrice-inc-project-frontend-z3tz3r0s-projects.vercel.app/",
    imageSrcBefore: "/assets/project-ecommerce-allrice.png",
  },
  {
    title: "Custommike - E-commerce (Support)",
    description:
      "Supporting on API services for Product listing page, Sign up and Sign in services.",
    gitHubLink: "https://github.com/JLezzzzz/seal-over-the-wall-frontEnd",
    gitHubBackendLink: "https://github.com/JLezzzzz/seal-over-the-wall-backEnd",
    actualLink: "https://seal-over-the-walls.vercel.app/",
    imageSrcBefore: "/assets/project-ecommerce-custommike.png",
  },
  {
    title: "Quote Voter - Interactive (Full Stack)",
    description:
      "Quote Voting system. First time using NextJS. features: User Authentication, Add new quote upon login, Quote Listing, Category Filtering, Search Functionality, Infinite Scroll, Quote Sorting. TypeScript, Tailwind, Shadcn",
    gitHubLink: "https://github.com/z3tz3r0/quote-voting-nextjs",
    actualLink: "https://quote-voting-nextjs.vercel.app/",
    imageSrcBefore: "/assets/project-nextjs-qoutevoter.png",
  },
  {
    title: "CT frontend redesign",
    description: "Redesign landing page for www.chareontut.com website",
    gitHubLink: "https://github.com/z3tz3r0/ct-redesign-frontend",
    actualLink: "https://ct-redesign-frontend.vercel.app/",
    imageSrcBefore: "/assets/project-static-ct-before.png",
    imageSrcAfter: "/assets/project-static-ct.png",
  },
  {
    title: "Spacecraft E-commerce App (Full Stack)",
    description:
      "A full-stack e-commerce proof-of-concept application for Browse and managing a simulated inventory of spacecraft.",
    gitHubLink: "https://github.com/z3tz3r0/ecommerce-space-craft",
    actualLink: "https://ecommerce-space-craft.vercel.app",
    imageSrcBefore: "/assets/project-ecommerce-spacecraft.png",
  },
  // Add more projects here
];
