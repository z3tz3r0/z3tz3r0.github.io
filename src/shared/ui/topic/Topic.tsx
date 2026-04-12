import type { ReactElement, ReactNode } from "react";

interface TopicProps {
  children: ReactNode;
  className?: string;
}

const Topic = ({ children, className }: TopicProps): ReactElement => {
  const resolvedClassName = className ?? "";
  return (
    <span className={`text-sm font-semibold uppercase tracking-widest text-accent mb-2 block ${resolvedClassName}`}>
      {children}
    </span>
  );
};

export { Topic };
