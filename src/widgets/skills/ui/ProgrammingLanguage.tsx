import type { CSSProperties, ReactElement } from "react";
import { useMemo } from "react";

interface ProgrammingLanguageProps {
  className?: string;
  deviconSvgPath: string;
  label: string;
}

const SVG_BASE_URL = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";
const ICON_DIMENSION_CLASSES = "w-10 h-10";
const WHITE_TEXT_CLASS = "text-white";

const ProgrammingLanguage = ({
  className,
  deviconSvgPath,
  label,
}: ProgrammingLanguageProps): ReactElement => {
  const fullSvgUrl = `${SVG_BASE_URL}${deviconSvgPath}`;

  const maskStyle = useMemo<CSSProperties>(
    () => ({
      WebkitMaskImage: `url(${fullSvgUrl})`,
      maskImage: `url(${fullSvgUrl})`,
      maskPosition: "center",
      maskRepeat: "no-repeat",
      maskSize: "contain",
    }),
    [fullSvgUrl],
  );

  let iconElement: ReactElement = (
    <img
      alt={`${label} logo`}
      className={`${ICON_DIMENSION_CLASSES} object-contain ${className ?? ""}`}
      src={fullSvgUrl}
    />
  );
  if (className === WHITE_TEXT_CLASS) {
    iconElement = (
      <div
        aria-label={`${label} logo`}
        className={`${ICON_DIMENSION_CLASSES} bg-foreground`}
        role="img"
        style={maskStyle}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 hover:scale-150 transition-all ease-out duration-300">
      <div className="bg-muted/20 p-4 rounded-xl w-fit">
        {iconElement}
      </div>
      <p>{label}</p>
    </div>
  );
};

export { ProgrammingLanguage };
