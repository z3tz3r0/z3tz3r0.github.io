import type { ReactElement } from "react";
import type { SimpleIcon } from "simple-icons";

interface SimpleIconDisplayProps {
  fill?: string;
  icon: SimpleIcon;
  size?: number;
}

const SimpleIconDisplay = ({ icon, size, fill = "currentColor" }: SimpleIconDisplayProps): ReactElement => (
    <svg
      aria-hidden="true"
      fill={fill}
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={icon.path} />
    </svg>
  );

export { SimpleIconDisplay };
