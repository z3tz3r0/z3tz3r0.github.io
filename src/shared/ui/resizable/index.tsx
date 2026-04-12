// oxlint-disable no-multi-comp -- Thin library wrappers intentionally co-located
// oxlint-disable react/jsx-props-no-spreading -- Library wrappers must forward all props
import type { ComponentProps, ReactElement } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { GripVerticalIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const ResizablePanelGroup = ({
  className,
  ...props
}: ComponentProps<typeof PanelGroup>): ReactElement => (
  <PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    data-slot="resizable-panel-group"
    {...props}
  />
);

const ResizablePanel = (
  props: ComponentProps<typeof Panel>
): ReactElement => (
  <Panel data-slot="resizable-panel" {...props} />
);

const ResizableHandle = ({
  className,
  withHandle,
  ...rest
}: ComponentProps<typeof PanelResizeHandle> & {
  withHandle?: boolean;
}): ReactElement => {
  let handleContent: ReactElement | null = null;
  if (withHandle) {
    handleContent = (
      <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
        <GripVerticalIcon className="size-2.5" />
      </div>
    );
  }

  return (
    <PanelResizeHandle
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      data-slot="resizable-handle"
      {...rest}
    >
      {handleContent}
    </PanelResizeHandle>
  );
};

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
