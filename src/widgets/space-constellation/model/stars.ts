import {
  siBun,
  siExpress,
  siGreensock,
  siMongodb,
  siNodedotjs,
  siReact,
  siTailwindcss,
  siTypescript,
  siVite,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

interface StarNode {
  id: string;
  /** Icon source · undefined falls back to the textFallback initials. */
  icon?: SimpleIcon;
  /** CSS percentage strings for absolute scatter on desktop. */
  left: string;
  name: string;
  textFallback?: string;
  top: string;
}

interface StarEdge {
  from: string;
  to: string;
}

const STARS: readonly StarNode[] = [
  { icon: siReact, id: "react", left: "8%", name: "REACT", top: "12%" },
  { icon: siTypescript, id: "typescript", left: "30%", name: "TYPESCRIPT", top: "26%" },
  { icon: siNodedotjs, id: "node", left: "62%", name: "NODE", top: "8%" },
  { icon: siExpress, id: "express", left: "78%", name: "EXPRESS", top: "30%" },
  { icon: siMongodb, id: "mongodb", left: "88%", name: "MONGODB", top: "62%" },
  { icon: siTailwindcss, id: "tailwind", left: "16%", name: "TAILWIND", top: "55%" },
  { icon: siGreensock, id: "gsap", left: "44%", name: "GSAP", top: "60%" },
  { icon: siVite, id: "vite", left: "22%", name: "VITE", top: "82%" },
  { icon: siBun, id: "bun", left: "58%", name: "BUN", top: "84%" },
  { id: "heroui", left: "82%", name: "HEROUI", textFallback: "HUI", top: "84%" },
];

const EDGES: readonly StarEdge[] = [
  { from: "react", to: "typescript" },
  { from: "node", to: "express" },
  { from: "express", to: "mongodb" },
  { from: "react", to: "tailwind" },
  { from: "vite", to: "bun" },
];

export type { StarEdge, StarNode };
export { EDGES, STARS };
