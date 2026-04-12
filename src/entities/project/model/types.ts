interface Project {
  actualLink: string;
  description: string;
  gitHubBackendLink?: string;
  gitHubLink: string;
  imageSrcAfter?: string;
  imageSrcBefore: string;
  title: string;
}

interface HtmlProject {
  name: string;
  projectUrl: string;
  screenshotUrl: string;
}

export type { HtmlProject, Project };
