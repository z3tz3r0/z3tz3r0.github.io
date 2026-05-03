import type { CSSProperties, ReactElement, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const LAYOUT_STYLE: CSSProperties = {
  paddingBlock: "var(--layout-section-gap)",
};

const Layout = ({ id, children, className }: LayoutProps): ReactElement => {
  const resolvedClassName = className ?? "";
  return (
    <div id={id} className={`px-4 text-center ${resolvedClassName}`} style={LAYOUT_STYLE}>
      {children}
    </div>
  );
};

export { Layout };
