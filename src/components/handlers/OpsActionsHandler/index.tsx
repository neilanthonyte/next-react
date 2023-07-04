import * as React from "react";
import { useState, useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import * as _ from "lodash";

import { useClient } from "../../../hooks/useClient";
import { OpsActionsContext } from "../../../contexts/OpsActionsContext";
import { OpsAction } from "next-shared/src/models/OpsAction";
import {
  IActionMetricsSerialized,
  IActionMetricsByLocationId,
} from "next-shared/src/types/IActionMetricsSerialized";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { ErrorResolverContext } from "../../../contexts/ErrorResolver";

export const OpsActionsHandler: React.FC = ({ children }) => {
  const client = useClient();
  const { resolveError } = useRequiredContext(ErrorResolverContext);

  const [opsActions, setOpsActions] = useState<OpsAction[]>([]);
  const [opsActionMetrics, setOpsActionMetrics] =
    useState<IActionMetricsSerialized>(null);

  const opsActionsQuery = useQuery("opsActions", () =>
    client.opsActions.getActions().then(({ actions, actionMetrics }) => {
      setOpsActions(actions);
      setOpsActionMetrics(actionMetrics);
    }),
  );

  // opsActionsQuery error handling.
  if (opsActionsQuery.isError) {
    const { error, refetch } = opsActionsQuery;
    console.error(error);
    resolveError({
      title: `Unfortunately operational actions cannot be retrieved at this time.`,
      approach: "modal",
      retry: refetch,
    });
  }

  const [insertActionMutation] = useMutation(
    async (action: OpsAction) => {
      const { insertedOpsAction, opsActionMetrics } =
        await client.opsActions.insertAction(action);
      setOpsActions((old) => old.concat([insertedOpsAction]));
      setOpsActionMetrics(opsActionMetrics);
      return insertedOpsAction;
    },
    {
      onError: (error: Error) => {
        console.error(error);
        resolveError({
          title: `Unfortunately an action cannot be created at this time.`,
          approach: "modal",
        });
      },
    },
  );

  const [updateActionMutation] = useMutation(
    async (action: OpsAction) => {
      const { updatedOpsAction, opsActionMetrics } =
        await client.opsActions.updateAction(action);
      const mergedOpsActions = _.uniqBy(
        opsActions.concat([updatedOpsAction]),
        "id",
      );

      setOpsActions(mergedOpsActions);
      setOpsActionMetrics(opsActionMetrics);
      return updatedOpsAction;
    },
    {
      onError: (error: Error) => {
        console.error(error);
        resolveError({
          title: `Unfortunately an action cannot be updated at this time.`,
          approach: "modal",
        });
      },
    },
  );

  const actionMetricsForAllAvailableLocationsQuery = useQuery(
    "actionMetricsForAllAvailableLocations",
    () => client.opsActions.getActionMetricsForAllAvailableLocations(),
  );

  // actionMetricsForAllAvailableLocationsQuery error handling.
  if (actionMetricsForAllAvailableLocationsQuery.isError) {
    const { error, refetch } = actionMetricsForAllAvailableLocationsQuery;
    console.error(error);
    resolveError({
      title: `Unfortunately operational metrics cannot be retrieved at this time.`,
      approach: "modal",
      retry: refetch,
    });
  }

  // to maintain previous api.
  const getActionMetricsForAllAvailableLocations =
    async (): Promise<IActionMetricsByLocationId> =>
      actionMetricsForAllAvailableLocationsQuery.data;

  const provider = useMemo(
    () => ({
      opsActions,
      opsActionMetrics,
      onInsertOpsAction: insertActionMutation,
      onUpdateOpsAction: updateActionMutation,
      getActionMetricsForAllAvailableLocations,
    }),
    [
      opsActions,
      opsActionMetrics,
      insertActionMutation,
      updateActionMutation,
      getActionMetricsForAllAvailableLocations,
    ],
  );

  return (
    <OpsActionsContext.Provider value={provider}>
      {children}
    </OpsActionsContext.Provider>
  );
};
