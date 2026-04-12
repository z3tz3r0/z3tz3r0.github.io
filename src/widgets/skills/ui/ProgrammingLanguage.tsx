interface ProgrammingLanguageProps {
  label: string;
  deviconSvgPath: string;
  className?: string;
}

function ProgrammingLanguage({
  label,
  deviconSvgPath,
  className,
}: ProgrammingLanguageProps) {
  const svgBaseUrl =
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";
  const fullSvgUrl = `${svgBaseUrl}${deviconSvgPath}`;
  const iconDimensionClasses = "w-10 h-10";

  return (
    <div className="flex flex-col items-center gap-2 hover:scale-150 transition-all ease-out duration-300">
      <div className="bg-muted/20 p-4 rounded-xl w-fit">
        {className === "text-white" ? (
          <div
            className={`${iconDimensionClasses} bg-foreground`}
            style={{
              maskImage: `url(${fullSvgUrl})`,
              WebkitMaskImage: `url(${fullSvgUrl})`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
            role="img"
            aria-label={`${label} logo`}
          />
        ) : (
          <img
            className={`${iconDimensionClasses} object-contain ${className || ""}`}
            src={fullSvgUrl}
            alt={`${label} logo`}
          />
        )}
      </div>
      <p>{label}</p>
    </div>
  );
}

export default ProgrammingLanguage;
