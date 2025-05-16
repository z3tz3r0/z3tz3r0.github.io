import { Toaster } from "@/components/ui/sonner";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import Hero from "./pages/Hero";
import NavBar from "./pages/NavBar";
import Skills from "./pages/Skills";
import Work from "./pages/Work";

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
          <About />
          <Contact />
        </main>
        <Toaster richColors />
      </div>
      <Footer />
    </>
  );
};

export default App;
