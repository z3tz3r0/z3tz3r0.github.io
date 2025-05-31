import SimpleIconDisplay from "@/components/SimpleIconDisplay";
import { Link } from "lucide-react";
import { siGithub } from "simple-icons";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface WorkCardProps {
  title: string;
  description: string;
  gitHubLink: string;
  gitHubBackendLink?: string;
  actualLink: string;
  imageSrcBefore: string;
  imageSrcAfter?: string;
}

const WorkCard: React.FC<WorkCardProps> = ({
  title,
  description,
  gitHubLink,
  gitHubBackendLink,
  actualLink,
  imageSrcBefore,
  imageSrcAfter,
}) => {
  return (
    // Container for the card, relative for absolute positioning of overlay
    <div className="relative rounded-xl overflow-hidden group h-80 md:h-96 lg:h-100">
      {" "}
      {/* Adjust height as needed */}
      {/* Project Image */}
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
      {/* Overlay and Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        {/* Title and Description */}
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/80 text-sm mb-4">{description}</p>

        {/* Buttons */}
        <div className="flex gap-4 mx-auto">
          {gitHubLink && (
            <>
              <a
                href={gitHubLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Frontend Repository"
                className="p-4 bg-gray-700/50 rounded-full text-white hover:bg-gray-600/70 transition-colors flex justify-center items-center"
              >
                <SimpleIconDisplay icon={siGithub} size={30} />
              </a>
            </>
          )}
          {gitHubBackendLink && ( // Only show Backend GitHub button if link exists
            <>
              <a
                href={gitHubBackendLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Backend Repository" // Tooltip for differentiation
                className="p-4 bg-gray-700/50 rounded-full text-white hover:bg-gray-600/70 transition-colors flex items-center justify-center"
              >
                <SimpleIconDisplay icon={siGithub} size={30} />
              </a>
            </>
          )}
          {actualLink && ( // Only show Live Link button if link exists
            <a
              href={actualLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-700/50 rounded-full text-white hover:bg-gray-600/70 transition-colors flex justify-center items-center"
            >
              <Link />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
