import * as React from "react";

import moment from "moment-timezone";
import { List, ListItem } from "../../../components/structure/List";
import { useDebug } from "../../../debug/DemoWrapper";

import { useSyncedActionSummary } from ".";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";

export const DemoStandard = () => {
  const { nextPatient } = useSyncedSessionData();

  const { setOutput } = useDebug({
    setSessionDebug: true,
    requireSession: "patient",
    test: {
      componentName: "useSyncedActionSummary",
      scenario: "standard",
    },
  });
  // to show one future date.
  const toDate = moment().add(1, "day").format("YYYY-MM-DD");
  const fromDate = moment().subtract(1, "week").format("YYYY-MM-DD");

  const { actionSummary, error, isLoading } = useSyncedActionSummary(
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
      <div>
        Getting <strong>Medication Action Summary</strong> for{" "}
        {`${nextPatient?.getDisplayName() || "no one"}`}
      </div>
      <List>
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
