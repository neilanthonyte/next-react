import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { Moment } from "moment";

import { frequencyToDateDisplayFormat } from "../../../helpers/frequencyToDateDisplayFormat";
import { frequencyToMomentUnitAndAmount } from "next-shared/src/helpers/frequencyToMomentUnitAndAmount";
import { frequencyToStartOrEndDateRange } from "../../../helpers/frequencyToStartOrEndDateRange";
import { TFrequencies } from "next-shared/src/types/TFrequencies";
import { THorizontalPositions } from "next-shared/src/types/layouts";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import CircularIcon from "../CircularIcon";
import { CircularText } from "../CircularText";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "datesSelector");

export interface IDatesSelectorProps {
  /** start and end */
  onDateRangeChange(startDate: unixTimestamp, endDate: unixTimestamp): void;
  /** range of frequencies */
  frequencies?: TFrequencies[];
  position?: THorizontalPositions;
  /** preselect frequency on load */
  preselectedFrequency?: TFrequencies;
  /** Start date - this component does not respond to changes */
  initialEndDate?: unixTimestamp;
  /** limit on max date that can be jumped to */
  maxDate?: unixTimestamp;
  size?: EStandardSizes;
}

/**
 * DatesSelector - Shows a range of frequencies, which can be used to get a date range, start to end.
 */
export const DatesSelector: React.FC<IDatesSelectorProps> = ({
  onDateRangeChange,
  frequencies = [TFrequencies.Day, TFrequencies.Week, TFrequencies.Month],
  position = THorizontalPositions.Left,
  preselectedFrequency = null,
  initialEndDate = null,
  maxDate = null,
  size = EStandardSizes.Small,
}) => {
  // ensure at least one frequency is given
  if (!Array.isArray(frequencies) || !frequencies.length) {
    throw new Error("Must pass at least one frequency");
  }

  // if no preset frequency default to first in array
  preselectedFrequency = preselectedFrequency || frequencies[0];

  const [selectedFrequency, setSelectedFrequency] =
    useState<TFrequencies>(preselectedFrequency);

  const [proposedEndDate, setProposedEndDate] = useState<unixTimestamp>(
    initialEndDate || moment().unix(),
  );
  const [normStartDate, setNormStartDate] = useState<unixTimestamp>(null);
  const [normEndDate, setNormEndDate] = useState<unixTimestamp>(null);

  // normalise dates
  useEffect(() => {
    if (!proposedEndDate || !selectedFrequency) {
      console.warn(
        "unexpectedly missing details",
        proposedEndDate,
        selectedFrequency,
      );
      setNormStartDate(null);
      setNormEndDate(null);
      return;
    }

    const newStartDate: unixTimestamp = frequencyToStartOrEndDateRange(
      proposedEndDate,
      selectedFrequency,
      moment.prototype.startOf,
    );
    const newEndDate: unixTimestamp = frequencyToStartOrEndDateRange(
      proposedEndDate,
      selectedFrequency,
      moment.prototype.endOf,
    );

    setNormStartDate(newStartDate);
    setNormEndDate(newEndDate);
    // report change
    onDateRangeChange(newStartDate, newEndDate);
  }, [proposedEndDate, selectedFrequency]);

  const wouldPassMaxDate: boolean = useMemo(() => {
    if (maxDate === null) {
      return false;
    }

    const { amount, unit } = frequencyToMomentUnitAndAmount(selectedFrequency);

    const whatWouldBeStartDate = moment
      .unix(normStartDate)
      .add(amount, unit)
      .startOf("day")
      .unix();

    const maxDateCheck = whatWouldBeStartDate >= maxDate;

    return maxDateCheck;
  }, [normEndDate]);

  // calculates frequency, requires selected frequency and direction of date
  // travel
  const changeDates = useCallback(
    (frequency: TFrequencies, forwards: boolean): void => {
      if (forwards && wouldPassMaxDate) {
        return;
      }

      const newEndDate: Moment = moment.unix(normEndDate);
      const { amount, unit } = frequencyToMomentUnitAndAmount(frequency);
      if (forwards) {
        newEndDate.add(amount, unit);
      } else {
        newEndDate.subtract(amount, unit);
      }

      setProposedEndDate(newEndDate.unix());
    },
    [normEndDate],
  );

  const displayDate: string = useMemo(() => {
    return frequencyToDateDisplayFormat(normEndDate, selectedFrequency);
  }, [selectedFrequency, normEndDate]);

  return (
    <div
      className={css("", `-position-${position}`)}
      data-test="datesSelector"
      data-test-position={position}
    >
      <div className={css("container")}>
        <div
          className={css("frequencies", `-position-${position}`)}
          data-test="frequencies"
        >
          {frequencies.length > 1 &&
            frequencies.map((frequency: TFrequencies, index: number) => (
              <div
                key={frequency}
                onClick={() => setSelectedFrequency(frequency)}
                className={css(
                  "frequency",
                  selectedFrequency === frequency ? "-selected" : "",
                )}
                data-test={frequency}
              >
                <p>{frequency}</p>
              </div>
            ))}
        </div>
        <div className={css("dates", `-position-${position}`)}>
          <span data-test="previous">
            <CircularIcon
              onClick={() => changeDates(selectedFrequency, false)}
              size={size}
              name={"caret-left"}
            />
          </span>
          <span
            className={css("displayDate", `-frequency-${selectedFrequency}`)}
            data-test="displayDate"
          >
            <CircularText size={size} isBlock={true}>
              {displayDate}
            </CircularText>
          </span>
          <span data-test="next">
            <CircularIcon
              disabled={wouldPassMaxDate}
              onClick={() => changeDates(selectedFrequency, true)}
              size={size}
              name={"caret-right"}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
