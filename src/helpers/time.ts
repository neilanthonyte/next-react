import { Moment } from "moment-timezone";
import moment from "moment-timezone";

import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { ISODate } from "next-shared/src/types/dateTypes";

export const matchesMilitaryTime = (militaryTime: string): boolean =>
  /^([01]\d|2[0-3]):?([0-5]\d)$/.test(militaryTime);

export const matchesIsoDate = (isoDate: ISODate): boolean =>
  /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(
    isoDate,
  );

export const convertMilitaryTimeToHourAndMinutes = (
  militaryTime: string,
): { hour: number; minute: number } => ({
  hour: parseInt(militaryTime.substring(0, 2), 10),
  minute: parseInt(militaryTime.substring(2, 4), 10),
});

export const convertIsoDateAndHoursToLocalMomentDate = (
  date: ISODate,
  militaryTime: string,
  timezone: string,
): Moment => {
  if (!matchesIsoDate(date)) {
    throw new Error(
      `must provide date in the iso format (eg 2021-04-06) - ${date} given`,
    );
  }

  if (!matchesMilitaryTime(militaryTime)) {
    throw new Error(
      `must provide military time in the format (eg. 0900) - ${militaryTime} given`,
    );
  }

  const hour = militaryTime.substring(0, 2);
  const minute = militaryTime.substring(2, 4);
  return moment.tz(`${date} ${hour}:${minute}`, timezone);
};

/**
 * Human friendly label to show current time from given timestamp
 *
 * Examples:
 *  - in 1 hour
 *  - 33 minutes ago
 *  - 5 hours ago
 *  - 2 weeks ago
 */
export function timestampLabel(
  timestamp: unixTimestamp,
  label?: string,
): string {
  if (timestamp === null) {
    return "";
  }
  const d1 = moment();
  const d2 = moment.unix(timestamp);
  if (d1.diff(d2) < 0) {
    const humanTime = moment.duration(d2.diff(d1)).humanize();
    label = label || "in";
    return `${label} ${humanTime}`;
  }
  const humanTime = moment.duration(d1.diff(d2)).humanize();
  label = label || "ago";
  return `${humanTime} ${label}`;
}
