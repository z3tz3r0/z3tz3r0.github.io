import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  // DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface HtmlProjectCardProps {
  project: {
    name: string;
    screenshotUrl: string; // URL to the captured screenshot
    projectUrl: string; // URL to the actual HTML project (in public directory)
  };
}

const HtmlProjectCard: React.FC<HtmlProjectCardProps> = ({ project }) => {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <Card className="hover:scale-110 transition-all duration-300">
          <CardContent>
            <img
              src={project.screenshotUrl}
              alt={`Screenshot of ${project.name}`}
              className="w-full object-cover"
            />
            <CardFooter>
              <h3 className="text-xl font-semibold mt-4">{project.name}</h3>
            </CardFooter>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="min-w-fit">
        <Card>
          {project.projectUrl && (
            <iframe
              src={project.projectUrl}
              title={`${project.name} - Preview`}
              className="w-full h-full min-h-[80dvh] min-w-[90dvw]"
            ></iframe>
          )}
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default HtmlProjectCard;
