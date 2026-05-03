import { DefaultPage } from "@/pages/home/ui/DefaultPage";
import type { ReactElement } from "react";
import { SpacePage } from "@/pages/home/ui/SpacePage";
import { useThemeStore } from "@/features/theme-switcher/model/useThemeStore";

const HomePage = (): ReactElement => {
  const theme = useThemeStore((state) => state.theme);
  if (theme === "space") {
    return <SpacePage />;
  }
  return <DefaultPage />;
};

export { HomePage };
