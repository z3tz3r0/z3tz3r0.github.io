import type { CSSProperties, MouseEvent, ReactElement } from "react";
import type { ThemeName } from "@/features/theme-switcher/model/useThemeStore";

const SWATCH_BASE_CLASS = "w-10 h-10 rounded-full transition-all duration-200 cursor-pointer hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const SWATCH_ACTIVE_CLASS = "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110";
const SWATCH_INACTIVE_CLASS = "opacity-70 hover:opacity-100";

const getSwatchClassName = (isActive: boolean): string => {
  if (isActive) { return `${SWATCH_BASE_CLASS} ${SWATCH_ACTIVE_CLASS}`; }
  return `${SWATCH_BASE_CLASS} ${SWATCH_INACTIVE_CLASS}`;
};

interface SwatchItem {
  color: string;
  label: string;
  name: ThemeName;
}

interface SwatchGridProps {
  activeTheme: ThemeName;
  onSwatchClick: (event: MouseEvent<HTMLButtonElement>) => void;
  swatchStyles: Record<ThemeName, CSSProperties>;
  themes: readonly SwatchItem[];
}

const SwatchGrid = ({
  activeTheme,
  onSwatchClick,
  swatchStyles,
  themes,
}: SwatchGridProps): ReactElement => (
  <div className="grid grid-cols-4 gap-3">
    {themes.map((themeItem) => (
      <div className="flex flex-col items-center gap-1" key={themeItem.name}>
        <button
          aria-label={`Switch to ${themeItem.label} theme`}
          aria-pressed={themeItem.name === activeTheme}
          className={getSwatchClassName(themeItem.name === activeTheme)}
          data-theme={themeItem.name}
          data-theme-swatch={themeItem.name}
          onClick={onSwatchClick}
          style={swatchStyles[themeItem.name]}
          title={themeItem.label}
          type="button"
        />
        <span className="text-[10px] text-muted-foreground leading-tight text-center">
          {themeItem.label}
        </span>
      </div>
    ))}
  </div>
);

export type { SwatchItem };
export { SwatchGrid };
