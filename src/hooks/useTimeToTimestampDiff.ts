import { useState, useEffect, useMemo, useRef } from "react";
import moment from "moment";

import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";

// gives the time difference between current timestamp and a passed in timestamp, note that dates passed will return negative values
export function useTimeDiffToTimestampDiff(timestamp: unixTimestamp): string {
  const currentTimeStamp = useMemo(() => currentUnixTimestamp(), []);
  const timer = useRef<number | null>(null);

  // set initial difference
  const [timeDiffDuration, setTimeDiffDuration] = useState<string>(
    moment
      .duration(moment.unix(currentTimeStamp).diff(moment.unix(timestamp)))
      .humanize(),
  );

  useEffect(() => {
    // clear any existing timers
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      const duration = moment.duration(
        moment.unix(currentTimeStamp).diff(moment.unix(timestamp)),
      );
      // executes as we cross the timestamp
      setTimeDiffDuration(duration.humanize());
    }, 1000) as any as number;
  }, [timestamp]);

  return timeDiffDuration;
}
