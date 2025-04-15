import { ReactNode } from "react";

interface LayoutProps {
    id: string;
    children: ReactNode;
    className?: string;
}

const Layout = ({ id, children, className }: LayoutProps) => {
    return (
        <section id={id} className={`p-4 py-16 text-center ${className}`}>
            {children}
        </section>
    );
};

export default Layout;
