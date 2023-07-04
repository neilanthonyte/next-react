import moment from "moment";
import { List, ListItem } from "next-react/src/components/structure/List";
import { useDebug } from "next-react/src/debug/DemoWrapper";
import * as React from "react";
import { useActionSummary } from ".";

import { useSyncedSessionData } from "../../core/useSyncedSessionData";

export const DemoStandard = () => {
  const { nextPatient } = useSyncedSessionData();

  const { setOutput } = useDebug({
    setSessionDebug: true,
    requireSession: "patient",
    test: {
      componentName: "useActionSummary",
      scenario: "standard",
    },
  });
  // to show future date.
  const toDate = moment().add(1, "day").format("YYYY-MM-DD");
  const fromDate = moment().subtract(1, "week").format("YYYY-MM-DD");

  const { actionSummary, error, isLoading } = useActionSummary(
    nextPatient?.patientId,
    {
      fromDate,
      toDate,
    },
  );

  return isLoading ? (
    "Loading"
  ) : (
    <>
      <List>
        <div>
          Getting <strong>Medication Action Summary</strong> for{" "}
          {`${nextPatient?.getDisplayName() || "no one"}`}
        </div>
        {actionSummary &&
          Object.entries(actionSummary).map((summaryData) => {
            const [dateString, dayStatistics] = summaryData;
            return (
              <ListItem key={dateString}>
                <h3>{dateString}</h3>
                <span>
                  <strong>Status: </strong> {dayStatistics.status}
                </span>{" "}
                |&nbsp;
                <span>
                  <strong>Completion: </strong> {dayStatistics.totalSuccess}/
                  {dayStatistics.totalTasks}
                </span>
              </ListItem>
            );
          })}
      </List>
      {error && setOutput(error)}
    </>
  );
};
