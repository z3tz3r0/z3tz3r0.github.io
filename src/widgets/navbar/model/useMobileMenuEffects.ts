import type { RefObject } from "react";
import { useEffect } from "react";

const useBodyScrollLock = (isOpen: boolean): void => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return (): void => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
};

const useOutsideClick = (
  isOpen: boolean,
  menuRef: RefObject<HTMLDivElement | null>,
  onClose: () => void,
): void => {
  useEffect(() => {
    if (!isOpen) { return; }

    const handleClick = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return (): void => { document.removeEventListener("mousedown", handleClick); };
  }, [isOpen, menuRef, onClose]);
};

export { useBodyScrollLock, useOutsideClick };
