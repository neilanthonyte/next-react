import { useRef, useState, useEffect } from "react";

import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";

/**
 * Custom hook to check whether we are before a given timestamp.
 */
export function useIsBeforeTimestamp(timestamp: unixTimestamp): boolean {
  const timer = useRef<number | null>(null);
  const [isBefore, setIsBefore] = useState<boolean>(
    currentUnixTimestamp() < timestamp,
  );
  useEffect(() => {
    // clear any existing timers
    clearTimeout(timer.current);

    if (!isBefore) {
      // already past, nothing to watch
      return;
    }

    // we are before the time - watch for when we go past the time
    const timeUntilAfter = timestamp - currentUnixTimestamp();
    timer.current = setTimeout(() => {
      // executes as we cross the timestamp
      setIsBefore(false);
    }, timeUntilAfter * 1000) as any as number;
  }, [timestamp]);

  return isBefore;
}
