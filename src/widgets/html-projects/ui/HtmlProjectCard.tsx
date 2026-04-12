import { Button, Card, Modal } from "@heroui/react";
import type { HtmlProject } from "@/entities/project/model/types";
import type { ReactElement } from "react";

interface HtmlProjectCardProps {
  project: HtmlProject;
}

const HtmlProjectCard = ({ project }: HtmlProjectCardProps): ReactElement => (
  <Modal>
    <Button className="p-0 h-auto w-full" type="button" variant="ghost">
      <Card className="hover:scale-105 transition-all duration-300 w-full">
        <Card.Content>
          <img
            alt={`Screenshot of ${project.name}`}
            className="w-full object-cover"
            src={project.screenshotUrl}
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
                className="w-full h-full min-h-[80dvh]"
                sandbox="allow-scripts"
                src={project.projectUrl}
                title={`${project.name} - Preview`}
              />
            )}
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);

export { HtmlProjectCard };
