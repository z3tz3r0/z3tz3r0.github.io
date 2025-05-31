import { Button } from "@/components/ui/button";
import ScrollVelocity from "../components/ui/ScollVelocity";

const Hero = () => {
  return (
    <div className="text-center pt-4">
      <div className="px-4 grid gap-16 max-w-7xl mx-auto items-center justify-items-center lg:grid-cols-2 mb-16">
        <div className="lg:text-left w-full lg:max-w-6xl">
          <p className="text-lg font-semibold text-white/70">Hi There,</p>
          <p className="text-5xl lg:text-6xl font-bold mb-4 lg:mb-8">
            I am <span className="text-orange-500">Kittipan</span>
            <br />
            Full Stack Software Developer
          </p>
          <p className="font-semibold text-white/70 mb-8 ">
            My passion for design, code, and web interaction fuels my journey in
            the web design realm.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#work">
              <Button variant="outline" className="py-6 px-10 text-lg">
                See Work
              </Button>
            </a>
            <a
              href="/CV_Kittipan Wangsakarn.pdf"
              download="CV-Kittipan_Wangsakarn.pdf"
            >
              <Button variant="ghost" className="py-6 px-10 text-lg">
                Download CV
              </Button>
            </a>
          </div>
        </div>

        <img
          src="/profile.png"
          alt="my image"
          className="rounded-xl w-3xs lg:w-full"
        />
      </div>

      <ScrollVelocity
        texts={["OPEN FOR HIRING", "OPEN FOR HIRING"]}
        velocity={20}
        className="text-white/20 text-6xl mb-4"
      />
    </div>
  );
};

export default Hero;
