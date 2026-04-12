import { useEffect } from "react";
import { Toaster } from "@/shared/ui/sonner";
import HomePage from "@/pages/home/ui/HomePage";
import { useThemeStore } from "@/features/theme-switcher/model/useThemeStore";

function App() {
  const hydrate = useThemeStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <HomePage />
      <Toaster richColors />
    </>
  );
}

export default App;
