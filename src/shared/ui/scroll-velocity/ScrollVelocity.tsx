import type { ReactElement } from "react";
import { VelocityRow } from "@/shared/ui/scroll-velocity/VelocityRow";

const DEFAULT_VELOCITY = 100;
const DEFAULT_NUM_COPIES = 6;
const EVEN_DIVISOR = 2;

interface ScrollVelocityProps {
  className?: string;
  numCopies?: number;
  texts: string[];
  velocity?: number;
}

const getBaseVelocity = (index: number, velocity: number): number => {
  if (index % EVEN_DIVISOR !== 0) {
    return -velocity;
  }
  return velocity;
};

const ScrollVelocity = ({
  className = "",
  numCopies = DEFAULT_NUM_COPIES,
  texts,
  velocity = DEFAULT_VELOCITY,
}: ScrollVelocityProps): ReactElement => (
  <section>
    {texts.map((text, index) => (
      <VelocityRow
        baseVelocity={getBaseVelocity(index, velocity)}
        className={className}
        key={`scroll-text-${text}`}
        numCopies={numCopies}
        text={text}
      />
    ))}
  </section>
);

export { ScrollVelocity };
