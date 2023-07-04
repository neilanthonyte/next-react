import { useState, useEffect } from "react";

import moment from "moment";

/**
 * A hooks that returns the current date.
 * This is live and will refresh by default every hour.
 */
export const useCurrentDate = (
  /** 1 hour */
  refreshTimer = 60 * 60,
  format: string = "YYYY-MM-DD",
) => {
  const getDate = () => moment().format(format);

  // set default so that first load does not have to wait for timer.
  const [currentDate, setCurrentDate] = useState<string>(getDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(getDate());
    }, refreshTimer * 1000);

    return () => window.clearInterval(interval);
  }, [refreshTimer]);

  return currentDate;
};
