import { Facebook, Github, Linkedin } from "lucide-react";
import Layout from "../containers/Layout";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white/70">
      <Layout className="py-8 md:py-12">
        {" "}
        {/* Adjusted padding, removed h-screen and bg-gray-200 */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Media Icons */}
          <div className="flex gap-6">
            <a
              href="https://www.facebook.com/kittipan.wang/" // Replace with your actual link
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/kittipanwang" // Replace with your actual link
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com/z3tz3r0" // Replace with your actual link
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
          </div>

          {/* Copyright Notice */}
          <p className="text-sm">
            &copy; {currentYear} Kittipan. All rights reserved.
          </p>
        </div>
      </Layout>
    </footer>
  );
};

export default Footer;
