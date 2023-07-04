import * as React from "react";
import { useEffect } from "react";
import moment from "moment";

import { mockSummary } from "next-shared/src/mockData/mockActionSummary";

import { ActiveTimeHandler } from "../../../components/handlers/ActiveTimeHandler";
import { List, ListItem } from "../../../components/structure/List";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";
import { useDebug } from "../../../debug/DemoWrapper";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import { useDayAndWeekSyncedActionSummary } from ".";
import { useRequiredContext } from "../../useRequiredContext";
import { ActiveTimeContext } from "../../../contexts/ActiveTimeContext";
import {
  activeTimeContextDateFormat,
  humanDateFormat,
} from "../../../helpers/momentFormats";

export const DemoStandard = () => {
  useDebug({
    setSessionDebug: true,
    requireSession: "patient",
    test: {
      componentName: "useDayAndWeekSyncedActionSummary",
      scenario: "standard",
    },
  });

  return (
    <ActiveTimeHandler>
      <Inner />
    </ActiveTimeHandler>
  );
};

export const Inner = () => {
  const { activeDate, setActiveDate } = useRequiredContext(ActiveTimeContext);
  const { nextPatient } = useSyncedSessionData();

  useEffect(() => {
    // HACK
    setActiveDate(Object.keys(mockSummary)[0]);
  }, []);

  const { weekSummary, daySummary, isLoading } =
    useDayAndWeekSyncedActionSummary(nextPatient?.patientId);

  return (
    <LoadingBlock isLoading={isLoading}>
      {daySummary && (
        <List>
          <ListItem>
            <h3>
              Active day{" "}
              {moment(activeDate, activeTimeContextDateFormat).format(
                humanDateFormat,
              )}{" "}
              summary
            </h3>
            <span>
              <strong>Status: </strong> {daySummary.status}
            </span>{" "}
            |&nbsp;
            <span>
              <strong>Completion: </strong> {daySummary.totalSuccess}/
              {daySummary.totalTasks}
            </span>
          </ListItem>
        </List>
      )}
      {weekSummary && (
        <List>
          {Object.entries(weekSummary).map((summaryData) => {
            const [dateString, dayStatistics] = summaryData;
            const humanDate = moment(
              dateString,
              activeTimeContextDateFormat,
            ).format(humanDateFormat);
            return (
              <ListItem key={dateString}>
                <h3>{humanDate}</h3>
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
      )}
    </LoadingBlock>
  );
};
