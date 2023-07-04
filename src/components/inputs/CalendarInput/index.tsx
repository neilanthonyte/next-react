import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import {
  DateRange,
  DayContent,
  DayContentProps,
  DayPicker,
  DayPickerBase,
} from "react-day-picker";
import "react-day-picker/dist/style.css";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.tz.setDefault("Australia/Sydney");

import { ISODate, ISODATE_FORMAT } from "next-shared/src/types/dateTypes";
import { EInputLayout } from "next-shared/src/types/layouts";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { Popover } from "../../generic/Popover";
import { DateView } from "./DateView";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "CalendarInput");

/**
 * This file exports two components:
 * CalendarSingleInput and CalendarRangeInput
 * this is because of types issues with the DayPicker,
 * which made it not possible to have a single render passing different props based on the mode ("single" vs "range")
 * Keeping both components here as they share a lot of rendering and styling
 *
 * TODO when used in a form, the CalendarRange prefill will not work as it is an object. The data is flattened to do the data-filed lookup in the form logic
 * need to rework data mapping to allow pass through and replace the current list of allowed pass-through inputs hack (e.g. CreditCard)
 */

// this is used to display in the UI and to wrap days in the popover to facilitate testing
export const CALENDAR_INPUT_DATE_FORMAT = "DD/MM/YYYY";
// for testing purposes
export const CALENDAR_INPUT_DISABLED_CLASSNAME = "-disabled";

/**
 * Custom day wrapper component to help with testing
 */
const CustomDay = (props: DayContentProps) => {
  return (
    <div
      data-test={`day-${dayjs(props.date).format(CALENDAR_INPUT_DATE_FORMAT)}`}
    >
      <DayContent {...props} />
    </div>
  );
};

const dayPickerDefaultProps: Partial<DayPickerBase> = {
  showOutsideDays: true,
  weekStartsOn: 1,
  modifiersClassNames: {
    selected: css("", "-selected"),
  },
  components: { DayContent: CustomDay },
  className: css("picker"),
};

export interface ISODateRange {
  from?: ISODate;
  to?: ISODate;
}

interface ICalendarInputProps<T> {
  value: T;
  onInputChange: (newValue: T) => unknown;
  disabled?: boolean;
  stdSize?: EStandardSizes;
  layout?: EInputLayout;
}

/**
 * Renders a single date input to pick a day from a calendar popup
 */
export const CalendarSingleInput: React.FC<ICalendarInputProps<ISODate>> = ({
  value = "",
  onInputChange,
  disabled,
  stdSize,
  layout = EInputLayout.Standard,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDaySelected = useCallback(
    (date: Date) => {
      const dayJsDate = dayjs(date);
      onInputChange?.(dayJsDate.format(ISODATE_FORMAT));
      setIsOpen(false);
    },
    [onInputChange],
  );

  const { formattedDate, selected } = useMemo(() => {
    const dayJsDate = dayjs(value);
    if (!dayJsDate.isValid()) {
      return {};
    }
    return {
      formattedDate: dayJsDate.format(CALENDAR_INPUT_DATE_FORMAT),
      selected: dayJsDate.toDate(),
    };
  }, [value]);

  const handleOnClick = useCallback(() => {
    if (disabled) {
      return;
    }
    setIsOpen(true);
  }, [disabled]);

  const target = useMemo(
    () => (
      <div
        className={css("date-field", `-stdSize-${stdSize}`, {
          [CALENDAR_INPUT_DISABLED_CLASSNAME]: disabled,
        })}
        onClick={handleOnClick}
        data-test="date-field"
      >
        <DateView date={formattedDate} />
      </div>
    ),
    [formattedDate, disabled, handleOnClick, stdSize],
  );

  if (layout === EInputLayout.Standard) {
    return (
      <div className={css("")} data-test="calendar-input">
        <Popover
          target={target}
          open={isOpen}
          closeHandler={() => setIsOpen(false)}
          placement={{ position: "above" }}
        >
          <DayPicker
            {...dayPickerDefaultProps}
            selected={selected}
            onSelect={handleDaySelected}
            mode="single"
            month={selected}
          />
        </Popover>
      </div>
    );
  }
  return (
    <div className={css("")} data-test="calendar-input">
      <DayPicker
        {...dayPickerDefaultProps}
        selected={selected}
        onSelect={handleDaySelected}
        mode="single"
        month={selected}
      />
    </div>
  );
};

/**
 * Renders two date inputs to pick a date range from a calendar popup
 */
export const CalendarRangeInput: React.FC<
  ICalendarInputProps<ISODateRange>
> = ({
  value = { from: "", to: "" },
  onInputChange,
  disabled,
  stdSize,
  layout = EInputLayout.Standard,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [focusedMonth, setFocusedMonth] = useState<Date>();

  const handleRangeSelected = useCallback(
    (dateRange: DateRange) => {
      const { from, to } = dateRange || {};

      const dayJsFrom = dayjs(from);
      const dayJsTo = dayjs(to);

      onInputChange?.({
        from: from ? dayJsFrom.format(ISODATE_FORMAT) : undefined,
        to: to ? dayJsTo.format(ISODATE_FORMAT) : undefined,
      });
    },
    [onInputChange],
  );

  const { formattedFrom, formattedTo, selected } = useMemo(() => {
    const dayJsFrom = dayjs(value?.from);
    const dayJsTo = dayjs(value?.to);

    const isFromValid = !!value?.from && dayJsFrom.isValid();
    const isToValid = !!value?.to && dayJsTo.isValid();

    return {
      formattedFrom: isFromValid
        ? dayJsFrom.format(CALENDAR_INPUT_DATE_FORMAT)
        : null,
      formattedTo: isToValid
        ? dayJsTo.format(CALENDAR_INPUT_DATE_FORMAT)
        : null,
      selected: {
        from: isFromValid ? dayJsFrom.toDate() : undefined,
        to: isToValid ? dayJsTo.toDate() : undefined,
      },
    };
  }, [value]);

  const handleOnClick = useCallback(() => {
    if (disabled) {
      return;
    }
    setIsOpen(true);
  }, [disabled]);

  const target = useMemo(
    () => (
      <div className={css("range-container")} onClick={handleOnClick}>
        <div
          className={css("date-field", `-stdSize-${stdSize}`, {
            [CALENDAR_INPUT_DISABLED_CLASSNAME]: disabled,
          })}
          data-test="date-field"
        >
          <DateView date={formattedFrom} />
        </div>
        {" - "}
        <div
          className={css("date-field", `-stdSize-${stdSize}`, {
            [CALENDAR_INPUT_DISABLED_CLASSNAME]: disabled,
          })}
          data-test="date-field"
        >
          <DateView date={formattedTo} />
        </div>
      </div>
    ),
    [formattedFrom, formattedTo, disabled, handleOnClick],
  );

  if (layout === EInputLayout.Standard) {
    return (
      <div className={css("")} data-test="calendar-input">
        <Popover
          target={target}
          open={isOpen}
          closeHandler={() => setIsOpen(false)}
          placement={{ position: "above" }}
        >
          <DayPicker
            {...dayPickerDefaultProps}
            onSelect={handleRangeSelected}
            mode="range"
            selected={selected}
            month={focusedMonth}
            onMonthChange={setFocusedMonth}
          />
        </Popover>
      </div>
    );
  }

  return (
    <div className={css("")} data-test="calendar-input">
      <DayPicker
        {...dayPickerDefaultProps}
        onSelect={handleRangeSelected}
        mode="range"
        selected={selected}
        month={focusedMonth}
        onMonthChange={setFocusedMonth}
      />
    </div>
  );
};
