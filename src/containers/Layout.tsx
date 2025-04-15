import React from "react";

interface LayoutProps {
    id?: string;
    children: React.ReactNode;
    className?: string;
}

const Layout = ({ id, children, className }: LayoutProps) => {
    return (
        <div id={id} className={`p-4 py-16 text-center  ${className}`}>
            {children}
        </div>
    );
};

export default Layout;
