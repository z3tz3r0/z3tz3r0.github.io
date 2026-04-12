import { Menu, X } from "lucide-react";
import { MobileMenu } from "@/widgets/navbar/ui/MobileMenu";
import type { ReactElement } from "react";
import { ThemeSwitcher } from "@/features/theme-switcher/ui/ThemeSwitcher";
import { useUIStore } from "@/shared/store/useUIStore";

const MENU_ICON_SIZE = 24;

const NavBar = (): ReactElement => {
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore();

  let menuAriaLabel = "Open menu";
  if (mobileMenuOpen) {
    menuAriaLabel = "Close menu";
  }

  let menuIcon: ReactElement = <Menu size={MENU_ICON_SIZE} />;
  if (mobileMenuOpen) {
    menuIcon = <X size={MENU_ICON_SIZE} />;
  }

  return (
    <header className="sticky top-0 z-10">
      <nav
        aria-label="Main navigation"
        className="h-16 flex items-center justify-between px-4 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-border"
      >
        <span className="text-xl font-bold">
          <a href="#main-content">Kittipan</a>
        </span>
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-8">
            <li><a href="#main-content">Home</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
          <button
            aria-expanded={mobileMenuOpen}
            aria-label={menuAriaLabel}
            className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={toggleMobileMenu}
            type="button"
          >
            {menuIcon}
          </button>
        </div>
      </nav>
      <MobileMenu />
    </header>
  );
};

export { NavBar };
