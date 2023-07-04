import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import * as _ from "lodash";

interface IDimension {
  clientHeight?: number;
  clientWidth?: number;
  parentHeight?: number;
  parentWidth?: number;
}

/**
 * Hook returning a ref and dimensions of the div the ref attaches to. Updates occur on any component resize (not just
 * window resize events).
 *
 * Care needs to be taken to avoid an infinite render loop.
 */
export const useElementDimension = (): [
  React.Ref<HTMLDivElement>,
  IDimension,
] => {
  const elRef = useRef<HTMLDivElement>();

  const [elDimensions, setElDimensions] = useState<IDimension>({});

  const debouncedResize = useCallback(
    _.debounce(() => {
      if (!elRef.current) return;
      setElDimensions({
        clientHeight: elRef.current.clientHeight,
        clientWidth: elRef.current.clientWidth,
        parentHeight: elRef.current.parentElement.clientHeight,
        parentWidth: elRef.current.parentElement.clientWidth,
      });
    }, 200),
    [],
  );

  useEffect(() => {
    if (elRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        // keep it light here
        debouncedResize();
      });

      resizeObserver.observe(elRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [elRef.current]);

  return useMemo(() => [elRef, { ...elDimensions }], [elRef, elDimensions]);
};
