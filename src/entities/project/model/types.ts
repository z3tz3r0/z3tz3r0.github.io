export interface Project {
  title: string;
  description: string;
  gitHubLink: string;
  gitHubBackendLink?: string;
  actualLink: string;
  imageSrcBefore: string;
  imageSrcAfter?: string;
}

export interface HtmlProject {
  name: string;
  screenshotUrl: string;
  projectUrl: string;
}
