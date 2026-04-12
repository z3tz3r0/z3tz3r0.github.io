import NavBar from "@/widgets/navbar/ui/NavBar";
import Hero from "@/widgets/hero/ui/Hero";
import Skills from "@/widgets/skills/ui/Skills";
import Work from "@/widgets/work/ui/Work";
import HtmlProjectsSection from "@/widgets/html-projects/ui/HtmlProjectsSection";
import About from "@/widgets/about/ui/About";
import ContactMe from "@/widgets/contact/ui/ContactMe";
import Footer from "@/widgets/footer/ui/Footer";

function HomePage() {
  return (
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
}

export default HomePage;
