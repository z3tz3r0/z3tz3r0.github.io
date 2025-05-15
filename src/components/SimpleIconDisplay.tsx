import type { SimpleIcon } from "simple-icons";

interface SimpleIconDisPlayProps {
  icon: SimpleIcon;
  size?: number;
}

import React from "react";

const SimpleIconDisplay: React.FC<SimpleIconDisPlayProps> = ({
  icon,
  size,
  ...props
}) => {
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
};

export default SimpleIconDisplay;
