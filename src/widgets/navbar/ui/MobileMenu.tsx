import { HIDDEN_STYLE, MOBILE_MENU_INITIAL_STYLE } from "@/shared/lib/styles";
import { useBodyScrollLock, useOutsideClick } from "@/widgets/navbar/model/useMobileMenuEffects";
import { useCallback, useEffect, useRef } from "react";
import type { ReactElement } from "react";
import { ThemeSwitcher } from "@/features/theme-switcher/ui/ThemeSwitcher";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useUIStore } from "@/shared/store/useUIStore";

const MENU_ANIM_DURATION = 0.3;
const ITEM_ANIM_DURATION = 0.25;
const ITEM_OFFSET_Y = 20;
const ITEM_STAGGER = 0.05;
const ITEM_DELAY = 0.1;

const NAV_LINKS = [
  { href: "#main-content", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const MobileMenu = (): ReactElement => {
  const { closeMobileMenu, mobileMenuOpen } = useUIStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!menuRef.current) { return; }
    const timeline = gsap.timeline({ defaults: { ease: "power2.out" }, paused: true });
    timeline.fromTo(menuRef.current, { autoAlpha: 0, height: 0 }, { autoAlpha: 1, duration: MENU_ANIM_DURATION, height: "auto" });
    timeline.fromTo(itemsRef.current, { autoAlpha: 0, y: ITEM_OFFSET_Y }, { autoAlpha: 1, duration: ITEM_ANIM_DURATION, stagger: ITEM_STAGGER, y: 0 }, `<${ITEM_DELAY}`);
    timelineRef.current = timeline;
  }, { scope: menuRef });

  useEffect(() => {
    if (!timelineRef.current) { return; }
    if (mobileMenuOpen) { timelineRef.current.play(); } else { timelineRef.current.reverse(); }
  }, [mobileMenuOpen]);

  useBodyScrollLock(mobileMenuOpen);
  useOutsideClick(mobileMenuOpen, menuRef, closeMobileMenu);

  const setItemRef = useCallback((index: number) => (element: HTMLLIElement | null): void => {
    if (element) { itemsRef.current[index] = element; }
  }, []);

  return (
    <div className="md:hidden overflow-hidden border-t border-border/10" ref={menuRef} style={MOBILE_MENU_INITIAL_STYLE}>
      <ul className="flex flex-col gap-1 px-4 py-4">
        {NAV_LINKS.map((link, index) => (
          <li key={link.href} ref={setItemRef(index)} style={HIDDEN_STYLE}>
            <a className="block py-3 px-2 text-lg rounded-md hover:bg-muted/10 transition-colors" href={link.href} onClick={closeMobileMenu}>
              {link.label}
            </a>
          </li>
        ))}
        <li className="pt-2 border-t border-border/10" ref={setItemRef(NAV_LINKS.length)} style={HIDDEN_STYLE}>
          <div className="flex items-center gap-3 py-2 px-2">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeSwitcher />
          </div>
        </li>
      </ul>
    </div>
  );
};

export { MobileMenu };
