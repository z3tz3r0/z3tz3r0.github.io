import type { ReactElement, ReactNode } from "react";

interface SubTopicProps {
  children: ReactNode;
  className?: string;
}

const SubTopic = ({ children, className }: SubTopicProps): ReactElement => {
  const resolvedClassName = className ?? "";
  return (
    <h3 className={`text-3xl lg:text-4xl font-bold mb-6 text-foreground ${resolvedClassName}`}>
      {children}
    </h3>
  );
};

export { SubTopic };
