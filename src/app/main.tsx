// oxlint-disable-next-line import/no-unassigned-import -- CSS import required by Vite
import "@/app/styles/index.css";
import { App } from "@/app/App";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { initWebVitals } from "@/shared/lib/analytics";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

initWebVitals();
