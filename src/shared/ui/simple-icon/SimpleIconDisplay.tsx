import type { SimpleIcon } from "simple-icons";

interface SimpleIconDisplayProps {
  icon: SimpleIcon;
  size?: number;
}

function SimpleIconDisplay({ icon, size, ...props }: SimpleIconDisplayProps) {
  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={icon.path} />
    </svg>
  );
}

export default SimpleIconDisplay;
