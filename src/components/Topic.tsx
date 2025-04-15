import React from "react";

interface TopicProps {
    children: React.ReactNode;
    className?: string;
}

const Topic = ({ children, className }: TopicProps) => {
    return (
        <h2 className={`text-lg font-semibold text-orange-500 ${className}`}>
            {children}
        </h2>
    );
};

export default Topic;
