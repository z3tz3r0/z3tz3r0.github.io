interface SubTopicProps {
    children: React.ReactNode;
    className?: string;
}

const SubTopic = ({ children, className }: SubTopicProps) => {
    return <p className={`text-5xl mb-8 ${className}`}>{children}</p>;
};

export default SubTopic;
