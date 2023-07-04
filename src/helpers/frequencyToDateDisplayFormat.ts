import moment from "moment-timezone";

import { TFrequencies } from "next-shared/src/types/TFrequencies";
import { unixTimestamp } from "next-shared/src/types/dateTypes";

/**
 * Display a given timestamp based on a given frequency
 *
 *   day - 6th Mar 2020
 *   week - Week 10 2020
 *   month - March 2020
 *   biannual - 1st Half 2020
 *   year - Year 2020
 */
export const frequencyToDateDisplayFormat = (
  timestamp: unixTimestamp,
  frequency: TFrequencies,
): string => {
  switch (frequency) {
    case TFrequencies.Annual:
      return `Year ${moment.unix(timestamp).format("YYYY")}`;
    case TFrequencies.Biannual:
      const quarter = moment.unix(timestamp).clone().quarter();
      const half = quarter <= 2 ? 1 : 2;
      return `${half}${half === 1 ? "st" : "nd"} Half ${moment
        .unix(timestamp)
        .format("YYYY")}`;
    case TFrequencies.Quarter:
      return `Quarter ${moment.unix(timestamp).clone().quarter()} ${moment
        .unix(timestamp)
        .clone()
        .format("YYYY")}`;
    case TFrequencies.Month:
      return moment.unix(timestamp).format("MMMM YYYY");
    case TFrequencies.Week:
      return `Week ${moment.unix(timestamp).format("w YYYY")}`;
    case TFrequencies.Day:
      return moment.unix(timestamp).format("Do MMM YYYY");
    default:
      throw new Error(`${frequency} not supported`);
  }
};
