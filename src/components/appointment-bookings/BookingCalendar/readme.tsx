import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import moment, { Moment } from "moment";
import { random } from "lodash";

import { BookingCalendar, IDateCount } from ".";
import { useDebug } from "../../../debug/DemoWrapper";
import { IDateRange } from "../../../hooks/useBookingSlots";

export const DemoStandard = () => {
  const { setOutput, setActions, setTestAttributes } = useDebug({
    output: null,
    test: {
      componentName: "BookingCalendar",
      scenario: "standard",
    },
  });

  const [nextAvailable, setNextAvailable] = useState<Moment>(null);
  const [range, setRange] = useState<IDateRange>();

  useEffect(() => {
    // provides data to the test cases
    setTestAttributes({
      start: range?.startDate,
      end: range?.endDate,
    });
  }, [range]);

  useEffect(() => {
    setActions([
      {
        test: "mode",
        label: nextAvailable ? "Set to normal" : "Set to scarce",
        action: () => {
          setNextAvailable(nextAvailable ? null : moment().add(1, "M"));
        },
      },
    ]);
  }, [nextAvailable]);

  const dateCount: IDateCount = useMemo(() => {
    if (!range) {
      return {};
    }
    const start = moment(range.startDate, "YYYY-MM-DD").startOf("D");
    const end = moment(range.endDate, "YYYY-MM-DD").endOf("D");
    const today = moment().format("YYYY-MM-DD");

    const tmpDateCount: IDateCount = {};
    while (start.isBefore(end)) {
      if (nextAvailable) {
        tmpDateCount[start.date().toString()] = start.isAfter(nextAvailable)
          ? random(0, 3)
          : 0;
      } else {
        // for testing we ensure the day has availability
        tmpDateCount[start.date().toString()] =
          start.format("YYYY-MM-DD") === today ? 1 : random(0, 3);
      }
      start.add(1, "day");
    }
    return tmpDateCount;
  }, [range, nextAvailable]);

  return (
    <BookingCalendar
      dateRange={range}
      onDateRangeChange={setRange}
      onSelection={(date) => {
        setOutput(date);
      }}
      dateCount={dateCount}
    />
  );
};
