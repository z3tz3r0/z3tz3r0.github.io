import type { ReactElement } from "react";

const STAR_WIDTH = 40;
const STAR_HEIGHT = 41;
const STAR_OPACITY = 0.15;

const StarIcon = (): ReactElement => (
  <span className="inline-block align-middle mx-1">
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={STAR_HEIGHT}
      viewBox="0 0 16 17"
      width={STAR_WIDTH}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0.5L10.1607 6.33927L16 8.5L10.1607 10.6607L8 16.5L5.83927 10.6607L0 8.5L5.83927 6.33927L8 0.5Z"
        fill="currentColor"
        opacity={STAR_OPACITY}
      />
    </svg>
  </span>
);

export { StarIcon };
