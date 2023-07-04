import * as React from "react";
import * as _ from "lodash";
import moment from "moment";
import { Moment } from "moment";

import { HStack } from "../../structure/HStack";
import { SingleOptionsInput } from "../SingleOptionsInput";
import { dateStringMatchesFormatString } from "./helpers/dateStringMatchesFormatString";
import { dateStringToObject } from "./helpers/dateStringToObject";
import { getApplicableDateSegments } from "./helpers/getApplicableDateSegments";
import { padNumber } from "./helpers/padNumber";

export interface IDateInputProps {
  value: string;
  dateFormat: string;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
  placeholderIndex?: string;
  onInputChange: (newValue: string) => void;
}

export interface IDateInputState {
  year: string;
  month: string;
  day: string;
}

const months = moment.months();

const monthOptions = months.map((m, i) => {
  return { value: padNumber(i + 1), label: m };
});

const days = _.times(31, (n) => padNumber(n + 1));

/**
 * Renders a date selector
 */
export class DateInput extends React.Component<
  IDateInputProps,
  IDateInputState
> {
  public maxDateObject: Moment;
  public minDateObject: Moment;
  public applicableDateSegments: {
    day: boolean;
    month: boolean;
    year: boolean;
  };
  public years: string[];
  public emptyOptionsIndex: number;
  constructor(props: IDateInputProps) {
    super(props);

    const { value, dateFormat, minDate, maxDate } = this.props;

    if (!dateFormat) {
      throw new Error("dateFormat is required");
    }
    if (value && !dateStringMatchesFormatString(value, dateFormat)) {
      throw new Error("date does not match format");
    }
    if (minDate && !dateStringMatchesFormatString(minDate, dateFormat)) {
      throw new Error("min date does not match format");
    }
    if (maxDate && !dateStringMatchesFormatString(maxDate, dateFormat)) {
      throw new Error("max date does not match format");
    }

    // Determine what types of data to collect
    this.applicableDateSegments = getApplicableDateSegments(dateFormat);
    this.state = dateStringToObject(value, dateFormat);

    this.maxDateObject = maxDate
      ? moment(maxDate, dateFormat, true)
      : moment().add(100, "year");
    this.minDateObject = minDate
      ? moment(minDate, dateFormat, true)
      : moment().subtract(100, "year");

    const now = moment(moment().format(dateFormat), dateFormat);

    // min or max are not the current date, we default the other side of the scale to now.
    if (maxDate && this.maxDateObject.diff(now) > 0 && !minDate) {
      this.minDateObject = now;
    }
    if (minDate && this.minDateObject.diff(now) < 0 && !maxDate) {
      this.maxDateObject = now;
    }

    if (maxDate < minDate) {
      throw new Error("MinDate cannot be greater then MaxDate");
    }

    const yearRange = this.maxDateObject.year() - this.minDateObject.year();
    this.years = _.times(yearRange + 1, (n) =>
      (this.maxDateObject.year() - n).toString(),
    );

    // determine where the placeholder is
    this.emptyOptionsIndex = 0;
    if (this.maxDateObject.year() > moment().year()) {
      this.emptyOptionsIndex = this.maxDateObject.year() - moment().year() + 1;
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: IDateInputProps) {
    // use DateStringToObject - check if compatible, if not return empty strings

    // Avoid clearing all inputs when the update was caused by ourselves. This could happen if full
    // date has one of its parts cleared and we don't want to clear the other parts automatically
    const normalisedValue = nextProps.value === null ? "" : nextProps.value;
    if (normalisedValue === this.stateToDate()) return;
    this.setState(dateStringToObject(normalisedValue, this.props.dateFormat));
  }

  // Called on input change
  dateElementChange = (key: keyof IDateInputState, value: string) => {
    this.setState({ [key]: value } as any, this.informParentThroughCallback);
  };

  // Called by 'today' button
  // setToToday() {
  //   this.setState({
  //     year: moment().year(),
  //     month: padNumber(moment().month() + 1),
  //     day: padNumber(moment().date())
  //   });
  //   this.informParentThroughCallback();
  // }
  //
  stateToDate = () => {
    // Will only update the state with the inputs that are in dateFormat
    return ["year", "month", "day"]
      .filter((x) => (this.applicableDateSegments as any)[x])
      .map((x) => (this.state as any)[x])
      .join("-");
  };

  informParentThroughCallback = () => {
    // Avoid responding to out own update to avoid clearing all fields in some circumstances
    this.props.onInputChange(this.stateToDate());
  };

  render() {
    return (
      <div
        data-test="date-input"
        data-test-date-format={this.props.dateFormat}
        data-test-month-array={months}
      >
        <HStack>
          {this.applicableDateSegments.day ? (
            <span data-test="date-input-day">
              <SingleOptionsInput
                options={days}
                value={this.state.day}
                variant={"dropdown"}
                placeholder="Day"
                key={"day"}
                onInputChange={(data: string) =>
                  this.dateElementChange("day", data)
                }
                disabled={this.props.disabled}
              />
            </span>
          ) : null}
          {this.applicableDateSegments.month ? (
            <span data-test="date-input-month">
              <SingleOptionsInput
                options={monthOptions}
                value={this.state.month}
                variant={"dropdown"}
                placeholder="Month"
                key={"month"}
                onInputChange={(data: string) =>
                  this.dateElementChange("month", data)
                }
                disabled={this.props.disabled}
              />
            </span>
          ) : null}
          {this.applicableDateSegments.year ? (
            <span data-test="date-input-year">
              <SingleOptionsInput
                options={this.years}
                value={this.state.year}
                variant={"dropdown"}
                placeholder="Year"
                placeholderIndex={this.emptyOptionsIndex}
                key={"year"}
                onInputChange={(data: string) =>
                  this.dateElementChange("year", data)
                }
                disabled={this.props.disabled}
              />
            </span>
          ) : null}
        </HStack>
      </div>
    );
  }
}
