import { HIDDEN_STYLE } from "@/shared/lib/styles";
import { HeroCtaButtons } from "@/widgets/hero/ui/HeroCtaButtons";
import type { ReactElement } from "react";

const HeroContent = (): ReactElement => (
  <div className="lg:text-left w-full lg:max-w-6xl">
    <p className="hero-greeting text-lg font-semibold text-muted-foreground" style={HIDDEN_STYLE}>
      Hi There,
    </p>
    <p className="hero-title text-5xl lg:text-6xl font-bold mb-4 lg:mb-8" style={HIDDEN_STYLE}>
      I am <span className="text-accent">Kittipan</span>
      <br />
      Full Stack Software Developer
    </p>
    <p className="hero-subtitle font-semibold text-muted-foreground mb-8" style={HIDDEN_STYLE}>
      My passion for design, code, and web interaction fuels my journey in the web design realm.
    </p>
    <HeroCtaButtons />
  </div>
);

export { HeroContent };
