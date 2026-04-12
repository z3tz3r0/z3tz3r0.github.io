import type { CSSProperties, ReactElement } from "react";
import { Toaster as Sonner } from "sonner";
import type { ToasterProps } from "sonner";

const SONNER_STYLE: CSSProperties = {
  "--normal-bg": "var(--popover)",
  "--normal-border": "var(--border)",
  "--normal-text": "var(--popover-foreground)",
} as CSSProperties;

const Toaster = (props: ToasterProps): ReactElement => (
    <Sonner
      className="toaster group"
      richColors={props.richColors}
      style={SONNER_STYLE}
      theme="dark"
    />
  );

export { Toaster };
