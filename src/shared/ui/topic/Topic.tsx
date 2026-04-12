import type React from "react";

interface TopicProps {
  children: React.ReactNode;
  className?: string;
}

function Topic({ children, className }: TopicProps) {
  return (
    <span className={`text-sm font-semibold uppercase tracking-widest text-accent mb-2 block ${className ?? ""}`}>
      {children}
    </span>
  );
}

export default Topic;
