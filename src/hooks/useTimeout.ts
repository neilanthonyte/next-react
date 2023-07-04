import { useRef, useEffect } from "react";

/**
 * Custom React hook that executes a given callback in the future based on the timestamp passed in.
 *
 * The idea behind abstracting this logic from the actual component stems from the
 * nature and use cases of react hooks - being able to remove imperative logic,
 * and write pure declarative code in the actual component.
 *
 * This hook handles certain edge cases like:
 *  1. timestamp is null => returns early, no side effects.
 *  2. the timestamp passed in is in the past => returns early, no side effects.
 *  3. On re-render, the cleanup function from inside `useEffect` is ran and the timeout is cleared.
 *     1. So a safe assumption given the flow of logic is: "If a timeout IS set, then it WILL be cleared on re-render".
 *
 * @example
 * // "Hello world" will be logged in 30 seconds
 * useTimeout(() => {
 *    // do something
 * }, 30000);
 *
 * @example
 * // nothing will happen as the timestamp is null.
 * useTimeout(() => {
 *    // do something
 * }, null);
 *
 * @param {() => any} cb the callback you want executed
 * @param {number} msTimestamp the time you want the callback to be executed
 */
export const useTimeout = (cb: () => any, msTimestamp: number) => {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  useEffect(() => {
    if (msTimestamp === null) {
      // timer has not been set.
      return;
    }
    if (Date.now() > msTimestamp) {
      // time is in the past.
      return;
    }
    // if not null and timestamp is in the future, set a new timer.
    const timer = setTimeout(() => cbRef.current(), msTimestamp - Date.now());
    return () => clearTimeout(timer);
  }, [msTimestamp]);
};
