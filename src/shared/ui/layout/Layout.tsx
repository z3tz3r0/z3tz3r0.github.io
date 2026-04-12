import type { ReactElement, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const Layout = ({ id, children, className }: LayoutProps): ReactElement => {
  const resolvedClassName = className ?? "";
  return (
    <div id={id} className={`p-4 py-16 text-center ${resolvedClassName}`}>
      {children}
    </div>
  );
};

export { Layout };
