import { Menu, X } from "lucide-react";
import ThemeSwitcher from "@/features/theme-switcher/ui/ThemeSwitcher";
import MobileMenu from "@/widgets/navbar/ui/MobileMenu";
import { useUIStore } from "@/shared/store/useUIStore";

function NavBar() {
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore();

  return (
    <header className="sticky top-0 z-10">
      <nav
        className="h-16 flex items-center justify-between px-4 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-border"
        aria-label="Main navigation"
      >
        <span className="text-xl font-bold">
          <a href="#">Kittipan</a>
        </span>
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-8">
            <li><a href="#">Home</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
          <button
            className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      <MobileMenu />
    </header>
  );
}

export default NavBar;
