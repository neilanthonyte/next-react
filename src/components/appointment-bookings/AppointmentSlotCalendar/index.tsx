import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import moment from "moment";

import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { useBookingSlots, IDateRange } from "../../../hooks/useBookingSlots";
import { SlotList } from "../SlotList";
import { BookingCalendar } from "../BookingCalendar";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { useDebouncedState } from "../../../hooks/useDebouncedState";

/**
 * Displays the available slots for the selected appointment type in a calendar style view.
 */
export const ApppointmentSlotCalendar = () => {
  const { hcp, setSlot, appointmentType, appointmentLengthWithExtensions } =
    useRequiredContext(BookingContext);

  // HACK A descendant calculates the initial date range, and we only want to debounce updates.
  //      Would be good to lift the date range calculation into a hook so that we don't have to
  //      keep separate state for the initial value, but that's too much refactoring for now.
  const [initialDateRange, setInitialDateRange] = useState<IDateRange>(null);
  const [updatedDateRange, setUpdatedDateRange, debouncing] =
    useDebouncedState<IDateRange>(null);
  const handleDateRangeChange = useCallback(
    (r) => (initialDateRange ? setUpdatedDateRange(r) : setInitialDateRange(r)),
    [initialDateRange],
  );
  const dateRange = updatedDateRange || initialDateRange;

  const [activeSlots, setActiveSlots] = useState<ISlotWithHcp[]>();

  const enabled = !!(appointmentType && dateRange);

  const {
    initDate,
    data: slots,
    isLoading: waitingForFetch,
    ...rest
  } = useBookingSlots(
    // disable until there is a range
    appointmentType,
    dateRange,
    hcp ? hcp.npServicesId : undefined,
    appointmentLengthWithExtensions,
    enabled,
  );

  // collate the slots for each day
  const daySlots = useMemo(() => {
    if (!slots || !dateRange) {
      return null;
    }

    const slotMap: { [key: string]: ISlotWithHcp[] } = {};
    const day = moment(dateRange.startDate).startOf("day");
    const endDay = moment(dateRange.endDate).endOf("day");

    while (day.diff(endDay) < 0) {
      slotMap[day.date()] = (slots || []).filter((s) =>
        day.isSame(moment(s.start), "date"),
      );
      day.add(1, "day");
    }

    return slotMap;
  }, [slots]);

  const dateCount = useMemo(() => {
    if (!daySlots) {
      return null;
    }
    const dayCounts: {
      [date: string]: number;
    } = {};
    Object.keys(daySlots).map((day: string) => {
      dayCounts[day] = daySlots[day].length;
    });
    return dayCounts;
  }, [daySlots]);

  const isLoading = debouncing || waitingForFetch;

  const showHcpHint = !hcp;

  return (
    <BookingCalendar
      initDate={initDate}
      dateCount={dateCount}
      dateRange={dateRange}
      isLoading={isLoading}
      onSelection={(day) => setActiveSlots(daySlots[day])}
      onDateRangeChange={handleDateRangeChange}
    >
      <LoadingBlock {...rest} isLoading={isLoading} showContents={true}>
        {!!activeSlots && (
          <div style={{ marginBottom: "40px" }}>
            <SlotList
              slots={activeSlots}
              showHcpHint={showHcpHint}
              onSelection={setSlot}
            />
          </div>
        )}
      </LoadingBlock>
    </BookingCalendar>
  );
};
