import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useUIStore } from "@/shared/store/useUIStore";
import ThemeSwitcher from "@/features/theme-switcher/ui/ThemeSwitcher";

const NAV_LINKS = [
  { href: "#", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

function MobileMenu() {
  const { mobileMenuOpen, closeMobileMenu } = useUIStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Build timeline once
  useGSAP(() => {
    if (!menuRef.current) return;

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.out" },
    });

    tl.fromTo(
      menuRef.current,
      { height: 0, autoAlpha: 0 },
      { height: "auto", autoAlpha: 1, duration: 0.3 },
    );

    tl.fromTo(
      itemsRef.current,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.25 },
      "<0.1",
    );

    tlRef.current = tl;
  }, { scope: menuRef });

  // Play/reverse based on state
  useEffect(() => {
    if (!tlRef.current) return;
    if (mobileMenuOpen) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [mobileMenuOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;

    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMobileMenu();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileMenuOpen, closeMobileMenu]);

  return (
    <div
      ref={menuRef}
      className="md:hidden overflow-hidden border-t border-border/10"
      style={{ height: 0, visibility: "hidden" }}
    >
      <ul className="flex flex-col gap-1 px-4 py-4">
        {NAV_LINKS.map((link, i) => (
          <li
            key={link.href}
            ref={(el) => { if (el) itemsRef.current[i] = el; }}
            style={{ visibility: "hidden" }}
          >
            <a
              href={link.href}
              onClick={closeMobileMenu}
              className="block py-3 px-2 text-lg rounded-md hover:bg-muted/10 transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
        <li
          ref={(el) => { if (el) itemsRef.current[NAV_LINKS.length] = el; }}
          style={{ visibility: "hidden" }}
          className="pt-2 border-t border-border/10"
        >
          <div className="flex items-center gap-3 py-2 px-2">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeSwitcher />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default MobileMenu;
