import { About } from "@/widgets/about/ui/About";
import { ContactMe } from "@/widgets/contact/ui/ContactMe";
import { Footer } from "@/widgets/footer/ui/Footer";
import { Hero } from "@/widgets/hero/ui/Hero";
import { HtmlProjectsSection } from "@/widgets/html-projects/ui/HtmlProjectsSection";
import { NavBar } from "@/widgets/navbar/ui/NavBar";
import type { ReactElement } from "react";
import { Skills } from "@/widgets/skills/ui/Skills";
import { Work } from "@/widgets/work/ui/Work";

const HomePage = (): ReactElement => (
  <>
    <div className="relative">
      <NavBar />
      <main id="main-content">
        <Hero />
        <Skills />
        <Work />
        <HtmlProjectsSection />
        <About />
        <ContactMe />
      </main>
    </div>
    <Footer />
  </>
);

export { HomePage };
