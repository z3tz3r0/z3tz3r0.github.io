import type { CSSProperties, ReactElement, ReactNode } from "react";
import { BottomHudBar } from "@/shared/ui/hud-bar/BottomHudBar";
import { StarfieldCanvas } from "@/shared/ui/space-canvas/StarfieldCanvas";
import { TopHudBar } from "@/shared/ui/hud-bar/TopHudBar";

interface CockpitFrameProps {
  children: ReactNode;
  topRightSlot?: ReactNode;
}

/* Background gradient · two soft cyan/violet pools over deep space, plus an
   inset vignette to sell the canopy edge falloff. */
const BG_LAYER_STYLE: CSSProperties = {
  background:
    "radial-gradient(ellipse at 80% 75%, rgba(34, 211, 238, 0.10) 0%, transparent 45%), "
    + "radial-gradient(ellipse at 18% 22%, rgba(168, 85, 247, 0.08) 0%, transparent 50%), "
    + "linear-gradient(180deg, rgba(7, 11, 24, 1) 0%, rgba(2, 6, 17, 1) 100%)",
};

const VIGNETTE_STYLE: CSSProperties = {
  boxShadow: "inset 0 0 200px 40px rgba(0, 0, 0, 0.85)",
};

const CockpitFrame = ({ children, topRightSlot }: CockpitFrameProps): ReactElement => (
  <div className="relative min-h-screen overflow-x-hidden text-cyan-100">
    {/* Z-0: deep-space background and starfield */}
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" style={BG_LAYER_STYLE} />
    <StarfieldCanvas />
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-20" style={VIGNETTE_STYLE} />

    {/* Z-30: HUD chrome */}
    <TopHudBar topRightSlot={topRightSlot} />
    <BottomHudBar />

    {/* Z-10: content viewport · padded above/below to clear the HUD bars */}
    <main
      id="main-content"
      className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-20 pt-20 sm:px-6 lg:px-8"
    >
      {children}
    </main>
  </div>
);

export type { CockpitFrameProps };
export { CockpitFrame };
