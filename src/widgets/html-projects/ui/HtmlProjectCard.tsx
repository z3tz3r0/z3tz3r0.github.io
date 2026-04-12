import { Card, Modal, Button } from "@heroui/react";
import type { HtmlProject } from "@/entities/project/model/types";

interface HtmlProjectCardProps {
  project: HtmlProject;
}

function HtmlProjectCard({ project }: HtmlProjectCardProps) {
  return (
    <Modal>
      <Button variant="ghost" className="p-0 h-auto w-full">
        <Card className="hover:scale-105 transition-all duration-300 w-full">
          <Card.Content>
            <img
              src={project.screenshotUrl}
              alt={`Screenshot of ${project.name}`}
              className="w-full object-cover"
            />
            <Card.Footer>
              <h3 className="text-xl font-semibold mt-4">{project.name}</h3>
            </Card.Footer>
          </Card.Content>
        </Card>
      </Button>
      <Modal.Backdrop>
        <Modal.Container size="cover">
          <Modal.Dialog aria-label={`${project.name} preview`}>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{project.name}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              {project.projectUrl && (
                <iframe
                  src={project.projectUrl}
                  title={`${project.name} - Preview`}
                  className="w-full h-full min-h-[80dvh]"
                />
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export default HtmlProjectCard;
