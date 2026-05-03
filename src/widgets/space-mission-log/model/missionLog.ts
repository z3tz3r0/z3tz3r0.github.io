import type { Project } from "@/entities/project/model/types";
import { projects } from "@/widgets/work/model/projects";

interface MissionRecord {
  codename: string;
  description: string;
  gitHubLink: string;
  imageSrc: string;
  liveLink: string;
  stardate: string;
  techTags: readonly string[];
  title: string;
}

const CARD_LIMIT = 4;
const STARDATES = ["2426.1", "2425.7", "2424.4", "2423.8"];
const TECH_BUCKET: readonly (readonly string[])[] = [
  ["REACT", "VITE", "EXPRESS", "MONGO"],
  ["REACT", "NEXT", "API"],
  ["NEXT", "TS", "AUTH"],
  ["REACT", "TAILWIND"],
  ["NEXT", "MONGO", "EXPRESS"],
];

const codenameFromTitle = (title: string): string => {
  const [head] = title.split(/[-·(]/);
  if (typeof head !== "string") { return title.toUpperCase(); }
  return head.trim().toUpperCase().replace(/\s+/g, "_");
};

const buildMission = (project: Project, index: number): MissionRecord => ({
  codename: codenameFromTitle(project.title),
  description: project.description,
  gitHubLink: project.gitHubLink,
  imageSrc: project.imageSrcBefore,
  liveLink: project.actualLink,
  stardate: STARDATES[index] ?? "2420.0",
  techTags: TECH_BUCKET[index] ?? ["WEB"],
  title: project.title,
});

const MISSION_LOG: readonly MissionRecord[] = projects
  .slice(0, CARD_LIMIT)
  .map((project, index) => buildMission(project, index));

export type { MissionRecord };
export { MISSION_LOG };
