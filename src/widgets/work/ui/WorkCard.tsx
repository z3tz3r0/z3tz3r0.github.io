import SimpleIconDisplay from "@/shared/ui/simple-icon/SimpleIconDisplay";
import { Link } from "lucide-react";
import { siGithub } from "simple-icons";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/ui/resizable/index";

interface WorkCardProps {
  title: string;
  description: string;
  gitHubLink: string;
  gitHubBackendLink?: string;
  actualLink: string;
  imageSrcBefore: string;
  imageSrcAfter?: string;
}

function WorkCard({
  title,
  description,
  gitHubLink,
  gitHubBackendLink,
  actualLink,
  imageSrcBefore,
  imageSrcAfter,
}: WorkCardProps) {
  return (
    <div className="relative rounded-xl overflow-hidden group h-80 md:h-96 lg:h-100">
      {imageSrcAfter ? (
        <ResizablePanelGroup direction="horizontal" className="h-full w-full">
          <ResizablePanel defaultSize={50} className="overflow-hidden">
            <img
              src={imageSrcBefore}
              alt={`${title} - Before`}
              className="w-full h-full object-cover object-center"
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} className="overflow-hidden">
            <img
              src={imageSrcAfter}
              alt={`${title} - After`}
              className="w-full h-full object-cover object-center"
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <img
          src={imageSrcBefore}
          alt={`${title} project screenshot`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 className="text-foreground text-xl font-bold mb-2">{title}</h3>
        <p className="text-foreground/80 text-sm mb-4">{description}</p>
        <div className="flex gap-4 mx-auto">
          {gitHubLink && (
            <a
              href={gitHubLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Frontend Repository"
              className="p-4 bg-muted/50 rounded-full text-foreground hover:bg-muted/70 transition-colors flex justify-center items-center"
            >
              <SimpleIconDisplay icon={siGithub} size={30} />
            </a>
          )}
          {gitHubBackendLink && (
            <a
              href={gitHubBackendLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Backend Repository"
              className="p-4 bg-muted/50 rounded-full text-foreground hover:bg-muted/70 transition-colors flex items-center justify-center"
            >
              <SimpleIconDisplay icon={siGithub} size={30} />
            </a>
          )}
          {actualLink && (
            <a
              href={actualLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-muted/50 rounded-full text-foreground hover:bg-muted/70 transition-colors flex justify-center items-center"
            >
              <Link />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkCard;
