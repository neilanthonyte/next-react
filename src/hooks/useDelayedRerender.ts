import { useState, useEffect } from "react";

/**
 * Used to trigger a state rerender after a given delayed
 */
export const useDelayedRerender = (delay: number): boolean => {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), delay);
  }, []);

  return isReady;
};
