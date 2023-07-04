import * as React from "react";
import { useState } from "react";
import moment from "moment";

import { TFrequencies } from "next-shared/src/types/TFrequencies";
import { Button } from "../../generic/Button";
import { DatesSelector } from "../../generic/DatesSelector";
import { Disable } from "../../generic/Disable";
import { WeekGrid } from "../../structure/WeekGrid";
import { THorizontalPositions } from "next-shared/src/types/layouts";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { IDateRange } from "../../../hooks/useBookingSlots";

interface IDay {
  date: moment.Moment;
  badge: number;
}

interface IWeek {
  Mon: IDay | null;
  Tue: IDay | null;
  Wed: IDay | null;
  Thu: IDay | null;
  Fri: IDay | null;
  Sat: IDay | null;
  Sun: IDay | null;
}

const emptyWeek: IWeek = {
  Mon: null,
  Tue: null,
  Wed: null,
  Thu: null,
  Fri: null,
  Sat: null,
  Sun: null,
};

export interface IDateCount {
  [date: string]: number;
}

interface IBookingCalendarProps {
  initDate?: string;
  showDays?: boolean;
  showDatePicker?: boolean;
  dateCount: IDateCount;
  dateRange: IDateRange;
  isLoading?: boolean;
  onDateRangeChange: (dateRange: IDateRange) => any;
  onSelection: (dayOfMonth: number) => any;
  children?: any;
}

export const BookingCalendar: React.FC<IBookingCalendarProps> = ({
  initDate,
  showDays = true,
  showDatePicker = true,
  dateCount,
  dateRange,
  isLoading,
  onDateRangeChange,
  onSelection,
  children,
}) => {
  const [selectedDay, setSelectedDay] = useState<IDay>();

  const date = moment(initDate).unix();
  const disabled = isLoading || !dateCount;

  const weeks: IWeek[] = React.useMemo(() => {
    if (!dateRange) {
      return null;
    }

    const weeks: IWeek[] = [];
    const day = moment(dateRange.startDate).startOf("day");
    const endDay = moment(dateRange.endDate).endOf("day");

    while (day.diff(endDay) < 0) {
      const dayOfWeek = day.format("ddd");
      // start a new week
      if (dayOfWeek === "Mon" || weeks.length === 0) {
        weeks.push({ ...emptyWeek });
      }
      // get current week
      const week: IWeek = weeks[weeks.length - 1];

      // @ts-ignore
      week[dayOfWeek] = {
        date: day.clone(),
        badge: dateCount ? dateCount[day.date().toString()] : 0,
      };
      day.add(1, "day");
    }

    return weeks;
  }, [dateCount, dateRange]);

  return (
    <>
      {showDatePicker && (
        <DatesSelector
          onDateRangeChange={(startDate, endDate) => {
            const range = {
              startDate: moment.unix(startDate).format("YYYY-MM-DD"),
              endDate: moment.unix(endDate).format("YYYY-MM-DD"),
            };
            onDateRangeChange(range);
          }}
          initialEndDate={date}
          frequencies={[TFrequencies.Month]}
          position={THorizontalPositions.Right}
          size={EStandardSizes.ExtraSmall}
        />
      )}
      {showDays && (
        <WeekGrid>
          {Object.keys(emptyWeek).map((d, index) => (
            <label key={index}>{d}</label>
          ))}
        </WeekGrid>
      )}
      <Disable disabled={disabled}>
        {/* {showEmpty ? (
          <PlaceholderView
            instruction="No appointment slots are available at this time."
            stdSize={EStandardSizes.Small}
          />
        ) : ( */}
        {(weeks || []).map((w, i) => (
          <div key={i}>
            <WeekGrid>
              {Object.values(w).map((d: IDay, i: number) => (
                <span
                  key={i}
                  data-test={`day-${d ? d.date.date() : "TODO"}`}
                  data-available={d?.badge > 0 ? "true" : "false"}
                >
                  {!!d && (
                    <Button
                      isActive={selectedDay === d}
                      badge={d.badge}
                      onClick={() => {
                        setSelectedDay(d);
                        onSelection(d.date.date());
                      }}
                      disabled={d.badge === 0}
                      isBlock={true}
                    >
                      {d.date.format("Do")}
                    </Button>
                  )}
                </span>
              ))}
            </WeekGrid>
            {Object.values(w).includes(selectedDay) && children}
          </div>
        ))}
      </Disable>
    </>
  );
};
