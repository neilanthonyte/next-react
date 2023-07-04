import { useEffect, useMemo, useState } from "react";
import { QueryResult, useQuery } from "react-query";
import moment from "moment";
import { orderBy } from "lodash";

import { useClient } from "./useClient";
import { AppointmentType } from "next-shared/src/models/AppointmentType";
import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { delay } from "../helpers/delay";

export interface IDateRange {
  startDate: string;
  endDate: string;
}

export const useBookingSlots = (
  appointmentType?: AppointmentType,
  dateRange?: IDateRange,
  hcpId?: string,
  overrideAppointmentLength?: number,
  isEnabled?: boolean,
): QueryResult<ISlotWithHcp[], Error> & { initDate: string } => {
  const client = useClient();
  const [initDate, setInitDate] = useState<string>();

  // require a type
  isEnabled = isEnabled !== undefined ? isEnabled : !!appointmentType;

  const slotsQuery: QueryResult<ISlotWithHcp[], Error> = useQuery(
    ["slots", appointmentType?.slug, dateRange, hcpId],
    async () => {
      // when no dateRange is provided, it defaults to fetching the most recent day
      const slots = await client.bookings.retrieveSlots(
        appointmentType,
        dateRange,
        hcpId,
        overrideAppointmentLength,
      );

      return orderBy(slots, (s) => moment(s.start).unix());
    },
    {
      enabled: isEnabled,
      // keep returned data as fresh for 5 seconds
      staleTime: 1000 * 5,
    },
  );

  const _initDate = useMemo(
    () => slotsQuery.data?.[0]?.start,
    [slotsQuery.data],
  );

  // we only want initDate to be set once.
  useEffect(() => setInitDate((old) => old || _initDate), [_initDate]);

  return {
    ...slotsQuery,
    initDate,
  };
};
