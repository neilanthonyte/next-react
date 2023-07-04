import * as React from "react";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

import { ISODate } from "next-shared/src/types/dateTypes";

import { CalendarSingleInput } from "../../../components/inputs/CalendarInput";
import { List, ListItem } from "../../../components/structure/List";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";
import { VStack } from "../../../components/structure/VStack";
import { useDebug } from "../../../debug/DemoWrapper";
import { humanDateFormat } from "../../../helpers/momentFormats";
import { timestampLabel } from "../../../helpers/time";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import { useGroupedActionFulfillments } from ".";

export const DemoStandard = () => {
  useDebug({ setSessionDebug: true });
  const { nextPatient } = useSyncedSessionData();
  const [date, setDate] = useState<Date>(new Date());
  const { groupedFulfillments, ...rest } = useGroupedActionFulfillments(
    nextPatient?.patientId,
    date.toISOString(),
  );

  const format = useMemo(
    () => ({
      value: date,
      format: humanDateFormat,
      formatDate: (d: Date, f: string) => dayjs(d).format(f),
      // parseDate,
      onDayChange: (date: Date) => {
        setDate(date);
      },
    }),
    [date],
  );

  const isActiveDateToday = useMemo(
    () => dayjs(date).isSame(dayjs(), "date"),
    [date],
  );

  return (
    <VStack>
      <CalendarSingleInput
        value={dayjs(date).toISOString()}
        onInputChange={(date: ISODate) => setDate(dayjs(date).toDate())}
      />
      <LoadingBlock {...rest}>
        {Object.keys(groupedFulfillments || {}).map((dueAt) => (
          // TODO replace with appropriate components once created
          <List key={dueAt}>
            <h4>Due at {dueAt}</h4>
            {groupedFulfillments[dueAt].map(({ action, fulfillment }) => (
              <ListItem key={fulfillment.uniqueId()}>
                <h5>{action.title}</h5>
                {isActiveDateToday && timestampLabel(fulfillment.dueAt)}
              </ListItem>
            ))}
          </List>
        ))}
      </LoadingBlock>
    </VStack>
  );
};
