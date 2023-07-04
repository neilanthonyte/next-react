import { useEffect, useRef } from "react";

/**
 * Taken from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export const useInterval = (callback: (args?: any) => any, delay: number) => {
  const savedCallback = useRef<(args?: any) => any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
