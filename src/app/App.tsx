import { HomePage } from "@/pages/home/ui/HomePage";
import type { ReactElement } from "react";
import { Toaster } from "@/shared/ui/sonner";
import { useEffect } from "react";
import { useThemeStore } from "@/features/theme-switcher/model/useThemeStore";

const App = (): ReactElement => {
  const hydrate = useThemeStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <HomePage />
      <Toaster richColors />
    </>
  );
};

export { App };
