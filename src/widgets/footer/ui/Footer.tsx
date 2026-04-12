import { Facebook, Github, Linkedin } from "lucide-react";
import Layout from "@/shared/ui/layout/Layout";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-muted-foreground">
      <Layout className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            <a
              href="https://www.facebook.com/kittipan.wang/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/kittipanwang"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com/z3tz3r0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
          </div>
          <p className="text-sm">
            &copy; {currentYear} Kittipan. All rights reserved.
          </p>
        </div>
      </Layout>
    </footer>
  );
}

export default Footer;
