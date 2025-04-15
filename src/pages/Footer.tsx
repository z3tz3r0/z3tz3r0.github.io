import Layout from "../containers/Layout";

const Footer = () => {
    return (
        <footer>
            <Layout className="h-screen bg-gray-200">
                <p className="text-6xl font-bold text-left text-black mb-8">
                    Design with class (literally).
                </p>
                <p className="text-6xl font-bold text-left text-black">
                    Make it with heart
                </p>
            </Layout>
        </footer>
    );
};

export default Footer;
