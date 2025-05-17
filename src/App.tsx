import { Toaster } from "@/components/ui/sonner";
import HtmlProjectsSection from "./components/HtmlProjectsSection";
import About from "./pages/About";
import ContactMe from "./pages/ContactMe";
import Footer from "./pages/Footer";
import Hero from "./pages/Hero";
import NavBar from "./pages/NavBar";
import Skills from "./pages/Skills";
import Work from "./pages/Work";
// import Contact from "./pages/Contact";

// https://hamzanaseem.vercel.app/

const App = () => {
  return (
    <>
      <div className="relative">
        <NavBar />
        <main>
          <Hero />
          <Skills />
          <Work />
          <HtmlProjectsSection />
          <About />
          {/* <Contact /> */}
          <ContactMe />
        </main>
        <Toaster richColors />
      </div>
      <Footer />
    </>
  );
};

export default App;
