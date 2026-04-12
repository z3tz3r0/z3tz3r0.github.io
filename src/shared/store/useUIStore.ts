import { create } from "zustand";

interface UIStore {
  closeMobileMenu: () => void;
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const useUIStore = create<UIStore>()((set) => ({
  closeMobileMenu: (): void => { set({ mobileMenuOpen: false }); },
  mobileMenuOpen: false,
  toggleMobileMenu: (): void => { set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })); },
}));

export { useUIStore };
