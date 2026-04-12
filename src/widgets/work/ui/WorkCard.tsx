import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/ui/resizable/index";
import { Link } from "lucide-react";
import type { ReactElement } from "react";
import { SimpleIconDisplay } from "@/shared/ui/simple-icon/SimpleIconDisplay";
import { siGithub } from "simple-icons";

const GITHUB_ICON_SIZE = 30;
const RESIZABLE_DEFAULT_SIZE = 50;

interface WorkCardProps {
  actualLink: string;
  description: string;
  gitHubBackendLink?: string;
  gitHubLink: string;
  imageSrcAfter?: string;
  imageSrcBefore: string;
  title: string;
}

const WorkCard = ({ actualLink, description, gitHubBackendLink, gitHubLink, imageSrcAfter, imageSrcBefore, title }: WorkCardProps): ReactElement => {
  let imageSection: ReactElement = (
    <img
      alt={`${title} project screenshot`}
      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      src={imageSrcBefore}
    />
  );
  if (imageSrcAfter) {
    imageSection = (
      <ResizablePanelGroup className="h-full w-full" direction="horizontal">
        <ResizablePanel className="overflow-hidden" defaultSize={RESIZABLE_DEFAULT_SIZE}>
          <img
            alt={`${title} - Before`}
            className="w-full h-full object-cover object-center"
            src={imageSrcBefore}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="overflow-hidden" defaultSize={RESIZABLE_DEFAULT_SIZE}>
          <img
            alt={`${title} - After`}
            className="w-full h-full object-cover object-center"
            src={imageSrcAfter}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }
  return (
    <div className="relative rounded-xl overflow-hidden group h-80 md:h-96 lg:h-100">
      {imageSection}
      <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 className="text-foreground text-xl font-bold mb-2">{title}</h3>
        <p className="text-foreground/80 text-sm mb-4">{description}</p>
        <div className="flex gap-4 mx-auto">
          {gitHubLink && (
            <a
              className="p-4 bg-muted/50 rounded-full text-foreground hover:bg-muted/70 transition-colors flex justify-center items-center"
              href={gitHubLink}
              rel="noopener noreferrer"
              target="_blank"
              title="Frontend Repository"
            >
              <SimpleIconDisplay icon={siGithub} size={GITHUB_ICON_SIZE} />
            </a>
          )}
          {gitHubBackendLink && (
            <a
              className="p-4 bg-muted/50 rounded-full text-foreground hover:bg-muted/70 transition-colors flex items-center justify-center"
              href={gitHubBackendLink}
              rel="noopener noreferrer"
              target="_blank"
              title="Backend Repository"
            >
              <SimpleIconDisplay icon={siGithub} size={GITHUB_ICON_SIZE} />
            </a>
          )}
          {actualLink && (
            <a
              className="p-4 bg-muted/50 rounded-full text-foreground hover:bg-muted/70 transition-colors flex justify-center items-center"
              href={actualLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Link />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export { WorkCard };
