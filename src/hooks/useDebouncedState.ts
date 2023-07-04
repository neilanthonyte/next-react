import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import _ from "lodash";

/**
 * Utility hook that wraps a React.useState() so that setState() calls are debounced. The API is modeled on
 * React's useState() hook, with a couple of additional pieces.

 * @param initialState the initial state
 * @param timeout optional -- the debounce timeout (defaults to 200)
 * @returns a triple with:
 *          - the state
 *          - the state update function
 *          - a boolean: true if there's a debounced update pending, false otherwise
 */
export const useDebouncedState = <S>(
  initialState: S,
  timeout: number = 200,
): [S, Dispatch<SetStateAction<S>>, boolean] => {
  const [wrappedState, setWrappedState] = useState<S>(initialState);

  const [awaitingDebounce, setAwaitingDebounce] = useState(false);

  const setWrappedStateAndReset = useCallback(
    _.debounce((state: S) => {
      setWrappedState(state);
      setAwaitingDebounce(false);
    }, timeout),
    [], // dependencies left empty intentionally
  );

  const setState = useCallback((state: S) => {
    setAwaitingDebounce(true);
    setWrappedStateAndReset(state);
  }, []); // dependencies left empty intentionally

  return useMemo(
    () => [wrappedState, setState, awaitingDebounce],
    [wrappedState, awaitingDebounce], // left setState out of dependencies intentionally
  );
};
