import { Button } from "@heroui/react";
import { HIDDEN_STYLE } from "@/shared/lib/styles";
import type { ReactElement } from "react";

const HeroCtaButtons = (): ReactElement => (
  <div className="hero-cta flex gap-4 justify-center" style={HIDDEN_STYLE}>
    <a href="#work">
      <Button className="px-10 text-lg" size="lg" type="button" variant="outline">
        See Work
      </Button>
    </a>
    <a download="CV-Kittipan_Wangsakarn.pdf" href="/CV_Kittipan Wangsakarn.pdf">
      <Button className="px-10 text-lg" size="lg" type="button" variant="ghost">
        Download CV
      </Button>
    </a>
  </div>
);

export { HeroCtaButtons };
