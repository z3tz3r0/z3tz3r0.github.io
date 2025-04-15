import Hero from "./pages/Hero";
import NavBar from "./pages/NavBar";

const App = () => {
    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Work />
                <About />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default App;
