import type React from "react";

interface LayoutProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

function Layout({ id, children, className }: LayoutProps) {
  return (
    <div id={id} className={`p-4 py-16 text-center ${className ?? ""}`}>
      {children}
    </div>
  );
}

export default Layout;
