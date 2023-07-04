import * as React from "react";
import {
  ITimeFrameContext,
  TimeFrameContext,
} from "../../../contexts/TimeFrameContext";

export interface ITimeFrameHandlerProps {
  /**
   * @note the Map key should denote the range/period, e.g. "7 Days" or "1 Month"
   * @note the Map value should denote the amount of days in that period of they key. E.g. if key was "2 weeks", the value would be 14.
   */
  rangeOptions: Map<string, number>;
  /**
   * Used to ensure that on the first render a date range is selected.
   * @note this should be a key from the `rangeOptions` Map prop
   */
  initialRangeKey?: string;
}

export const TimeFrameHandler: React.FC<ITimeFrameHandlerProps> = ({
  children,
  rangeOptions,
  initialRangeKey,
}) => {
  const [selectedRangeKey, setSelectedRangeKey] = React.useState<string | null>(
    initialRangeKey || null,
  );

  const onSetSelectedRange = React.useCallback((rangeKey: string) => {
    setSelectedRangeKey(rangeKey);
  }, []);

  const timeFrameContextProviderValue = React.useMemo(
    () => ({
      rangeOptions: rangeOptions,
      daysInSelectedRange: rangeOptions.get(selectedRangeKey),
      selectedRangeKey: selectedRangeKey,
      setSelectedRange: onSetSelectedRange,
    }),
    [rangeOptions, selectedRangeKey],
  );

  return (
    <TimeFrameContext.Provider value={timeFrameContextProviderValue}>
      {children}
    </TimeFrameContext.Provider>
  );
};
