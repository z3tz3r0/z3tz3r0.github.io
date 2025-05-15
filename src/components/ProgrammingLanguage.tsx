interface ProgrammingLanguageProps {
  label: string;
  deviconSvgPath: string;
  className?: string;
}

const ProgrammingLanguage = ({
  label,
  deviconSvgPath,
  className,
}: ProgrammingLanguageProps) => {
  const svgBaseUrl =
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";
  const fullSvgUrl = `${svgBaseUrl}${deviconSvgPath}`;

  // Base classes for the icon display area (width and height)
  const iconDimensionClasses = "w-10 h-10";

  return (
    <div className="flex flex-col items-center gap-2 hover:scale-150 transition-all ease-out duration-300">
      <div className="bg-gray-500/10 p-4 rounded-xl w-fit">
        {/* If className is 'text-white', use masking to color the icon */}
        {className === "text-white" ? (
          <div
            className={`${iconDimensionClasses} bg-white`} // Apply dimensions and white background for the mask
            style={{
              maskImage: `url(${fullSvgUrl})`,
              WebkitMaskImage: `url(${fullSvgUrl})`, // For Safari/older Chrome compatibility
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
            role="img" // ARIA role for semantic meaning as it's behaving like an image
            aria-label={`${label} logo`}
          />
        ) : (
          // Otherwise, use the standard img tag with original colors
          <img
            className={`${iconDimensionClasses} object-contain ${
              className || ""
            }`} // Apply dimensions, object-contain, and any other passed className
            src={fullSvgUrl}
            alt={`${label} logo`}
          />
        )}
      </div>
      <p>{label}</p>
    </div>
  );
};

export default ProgrammingLanguage;
