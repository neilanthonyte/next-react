import * as React from "react";
import moment from "moment";
import { useQuery } from "react-query";
import { useCallback } from "react";

import { Widget } from "../../generic/Widget";
import { checklistPaths } from "../../views/opsTasksRoutes";
import { useClient } from "../../../hooks/useClient";
import { ChecklistChart } from "../../ops-tasks/ChecklistChart";

export const ChecklistOverviewWidget = () => {
  const client = useClient();

  const fetchData = useCallback(() => {
    if (!client.auth.session) {
      return null;
    }
    return client.tasks.retrieveDailyTaskSummariesBetweenDates(
      moment().subtract(7, "days").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
    );
  }, [client.auth.session]);

  const { data, isError, refetch } = useQuery(
    "checklistOverviewWidget",
    fetchData,
  );

  return (
    <Widget
      label="Task progress"
      loading={!data}
      toMore={`${checklistPaths.root}${checklistPaths.checklistSummary}`}
    >
      {Array.isArray(data) && data.length > 0 && (
        <ChecklistChart dayPreviews={data} />
      )}
      {isError && (
        <p style={{ textAlign: "center" }}>
          Unable to show recent progress.
          <br />
          <a onClick={() => refetch()}>Try again</a>
        </p>
      )}
    </Widget>
  );
};
