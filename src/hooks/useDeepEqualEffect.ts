import { useEffect, useRef } from "react";
import * as _ from "lodash";

// same as useEffect, but only re-calls the function if the deps deeply change
// should very rarely be used

export const useDeepEqualEffect = (fn: () => () => void, deps: any[]) => {
  const undoFunc = useRef<() => void>();

  // call undoFunc on unmount (if set)
  useEffect(
    () => () => {
      if (undoFunc.current) {
        undoFunc.current();
      }
    },
    [],
  );

  const lastDeps = useRef<any>(null);
  useEffect(() => {
    if (_.isEqual(deps, lastDeps.current)) {
      // nothing has changed, abort
      return;
    }

    // deps has deeply changed
    if (undoFunc.current) {
      // call last stored undoFunc
      undoFunc.current();
    }
    undoFunc.current = fn();

    // store new deps
    lastDeps.current = deps;
  }, [deps]);
};
