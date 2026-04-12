interface SubTopicProps {
  children: React.ReactNode;
  className?: string;
}

function SubTopic({ children, className }: SubTopicProps) {
  return (
    <h3 className={`text-3xl lg:text-4xl font-bold mb-6 text-foreground ${className ?? ""}`}>
      {children}
    </h3>
  );
}

export default SubTopic;
