import { useEffect, useMemo, useState } from "react";

/**
 * Watches a URL hash (#watchme) and triggers when it matches the provided value.
 */
export const useHashWatcher = (hashValue: string): boolean => {
  const [show, setShow] = useState<boolean>();

  useEffect(() => {
    if (!hashValue) {
      return;
    }
    const hashChanged = () => {
      setShow(window.location.hash?.includes(hashValue));
    };
    window.addEventListener("hashchange", hashChanged, false);
    hashChanged();

    return () => window.removeEventListener("hashchange", hashChanged);
  }, [hashValue]);

  return show;
};
