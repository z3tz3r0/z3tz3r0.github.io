import { Button } from "@/components/ui/button";
import ScrollVelocity from "../components/ui/ScollVelocity";

const Hero = () => {
    return (
        <div className="text-center min-h-[100dvh] py-16">
            <div className="px-4">
                <p className="text-lg font-semibold text-white/70">Hi There,</p>
                <p className="text-5xl font-bold mb-2">
                    I am Kittipan
                    <br />
                    Junior Software Developer
                </p>
                <p className="font-semibold text-white/70 mb-4">
                    My passion for design, code, and web interaction fuels my
                    journey in the web design realm.
                </p>
                <div className="flex gap-4 justify-center mb-12">
                    <Button
                        variant="outline"
                        className="py-6 px-10 text-lg hover:text-background hover:bg-foreground"
                    >
                        See Work
                    </Button>
                    <Button variant="ghost" className="py-6 px-10 text-lg">
                        View CV
                    </Button>
                </div>
                <img
                    src="/assets/Profile.jpg"
                    alt="my image"
                    className="m-auto mb-10 rounded-xl"
                />
            </div>
            <ScrollVelocity
                texts={["Open for hiring", "Open for hiring"]}
                velocity={20}
                className="text-white/20 text-6xl"
            />
        </div>
    );
};

export default Hero;
