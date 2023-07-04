import { useRef, useCallback } from "react";

export const usePolling = (
  pollingFunction: any,
  delay: number,
): { startPolling: () => void; stopPolling: () => void } => {
  const pollingInterval = useRef(null);

  const clearPollingIntervalIfNeeded = useCallback(() => {
    if (pollingInterval.current !== null) {
      clearInterval(pollingInterval.current);
    }
  }, [pollingInterval]);

  const startPolling = useCallback(() => {
    // check if need to clear
    clearPollingIntervalIfNeeded();
    pollingInterval.current = setInterval(pollingFunction, delay);
  }, [clearPollingIntervalIfNeeded, delay, pollingFunction]);

  const stopPolling = useCallback(
    () => clearPollingIntervalIfNeeded(),
    [clearPollingIntervalIfNeeded],
  );

  return { startPolling, stopPolling };
};
