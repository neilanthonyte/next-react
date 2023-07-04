import { useEffect, useState } from "react";

/**
 * Hooks listening to window size changes and returning whether the size is below a threshold
 */
export const useIsScreenBelowThreshold = (
  windowSizeThreshold: number = 768,
): boolean => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return width <= windowSizeThreshold;
};
