import { Facebook, Github, Linkedin } from "lucide-react";
import { Layout } from "@/shared/ui/layout/Layout";
import type { ReactElement } from "react";

const SOCIAL_ICON_SIZE = 24;

const Footer = (): ReactElement => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-muted-foreground">
      <Layout className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            <a
              aria-label="Facebook"
              className="hover:text-accent transition-colors"
              href="https://www.facebook.com/kittipan.wang/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Facebook size={SOCIAL_ICON_SIZE} />
            </a>
            <a
              aria-label="LinkedIn"
              className="hover:text-accent transition-colors"
              href="https://www.linkedin.com/in/kittipanwang"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Linkedin size={SOCIAL_ICON_SIZE} />
            </a>
            <a
              aria-label="GitHub"
              className="hover:text-accent transition-colors"
              href="https://github.com/z3tz3r0"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github size={SOCIAL_ICON_SIZE} />
            </a>
          </div>
          <p className="text-sm">
            &copy; {currentYear} Kittipan. All rights reserved.
          </p>
        </div>
      </Layout>
    </footer>
  );
};

export { Footer };
