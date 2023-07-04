import moment from "moment-timezone";

import { TFrequencies } from "next-shared/src/types/TFrequencies";
import { unixTimestamp } from "next-shared/src/types/dateTypes";

/**
 * Converts a given timestamp to the start or end of the given frequency
 *
 * @param timestamp The time stamp to convert
 * @param frequency The frequency to change the timestamp range
 * @param momentRangeFunc The moment range func to change the timestamp. Can
 * either be startOf or endOf
 */
export const frequencyToStartOrEndDateRange = (
  timestamp: unixTimestamp,
  frequency: TFrequencies,
  momentRangeFunc: moment.Moment["startOf"] | moment.Moment["endOf"],
): unixTimestamp => {
  switch (frequency) {
    case TFrequencies.Annual:
      return momentRangeFunc.call(moment.unix(timestamp), "year").unix();
    case TFrequencies.Biannual:
      let quarter = moment.unix(timestamp).quarter();
      if (quarter & 1) {
        // odd, but end range so add quarter
        if (momentRangeFunc === moment.prototype.endOf) {
          quarter += 1;
        }
      } else {
        // even, but start range so minus quarter
        if (momentRangeFunc === moment.prototype.startOf) {
          quarter -= 1;
        }
      }
      return momentRangeFunc
        .call(moment.unix(timestamp).quarter(quarter), "quarter")
        .unix();
    case TFrequencies.Quarter:
      return momentRangeFunc
        .call(moment.unix(timestamp).quarter(), "quarter")
        .unix();
    case TFrequencies.Month:
      return momentRangeFunc.call(moment.unix(timestamp), "month").unix();
    case TFrequencies.Week:
      return momentRangeFunc.call(moment.unix(timestamp), "week").unix();
    case TFrequencies.Day:
      return momentRangeFunc.call(moment.unix(timestamp), "day").unix();
    default:
      throw new Error(`${frequency} not supported`);
  }
};
