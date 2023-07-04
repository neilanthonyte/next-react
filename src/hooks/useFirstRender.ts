import { useRef } from "react";

/**
 * Run the provided function synchronously during the first render only.
 */
export const useFirstRender = (fn: () => void) => {
  const isFirstRender = useRef(true);
  if (isFirstRender.current) {
    isFirstRender.current = false;
    fn();
  }
};
