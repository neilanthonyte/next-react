import * as React from "react";

export interface ITimeFrameContext {
  rangeOptions: Map<string, number>;
  // returns the number of days in the selected range
  daysInSelectedRange: number;
  selectedRangeKey: string;
  setSelectedRange: (rangeKey: string) => void;
}

/**
 * This context should be used to share a selected "time range (days)"
 */
export const TimeFrameContext = React.createContext<ITimeFrameContext>({
  rangeOptions: undefined,
  selectedRangeKey: undefined,
  daysInSelectedRange: undefined,
  setSelectedRange: undefined,
});
