import * as React from "react";
import FilterControl, { FilterControlProps } from "../FilterControl";
import { TimeFrameContext } from "../../../contexts/TimeFrameContext";

export interface ITimeFrameToggleProps
  extends Pick<FilterControlProps, "condensed"> {}

/**
 * This component simply wraps the `FilterControl` and connects it to the `TimeFrameContext`
 *
 * @note this relies on the `TimeFrameContext` being provided
 */
export const TimeFrameToggle: React.FC<ITimeFrameToggleProps> = ({
  condensed,
}) => {
  const { rangeOptions, setSelectedRange, selectedRangeKey } =
    React.useContext(TimeFrameContext);

  return (
    <FilterControl
      condensed={condensed}
      values={[...rangeOptions.keys()]}
      selectedValue={selectedRangeKey}
      onClick={setSelectedRange}
    />
  );
};
