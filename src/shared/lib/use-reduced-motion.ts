import { useEffect, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const detectReducedMotion = (): boolean => {
  if (typeof window === "undefined") { return false; }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
};

const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState<boolean>(detectReducedMotion);
  useEffect(() => {
    const mql = window.matchMedia(REDUCED_MOTION_QUERY);
    const handler = (event: MediaQueryListEvent): void => { setReduced(event.matches); };
    mql.addEventListener("change", handler);
    return (): void => { mql.removeEventListener("change", handler); };
  }, []);
  return reduced;
};

export { useReducedMotion };
