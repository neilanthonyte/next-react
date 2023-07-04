import * as React from "react";

import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { OpsActionsHandler } from "./";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { OpsActionsContext } from "../../../contexts/OpsActionsContext";
import { Button } from "../../generic/Button";
import { ActionUpdate } from "../../ops-actions/ActionUpdate";
import { ActionCreate } from "../../ops-actions/ActionCreate";

const OpsActions = () => {
  const { opsActions } = useRequiredContext(OpsActionsContext);
  return (
    <div>
      <h1>Ops Actions</h1>
      {Array.isArray(opsActions) ? (
        opsActions.map((opsAction, i) => {
          return (
            <pre key={i}>
              {JSON.stringify(opsAction.serialize(), undefined, 2)}
            </pre>
          );
        })
      ) : (
        <pre>loading...</pre>
      )}
    </div>
  );
};

const OpsActionMetrics = () => {
  const { opsActionMetrics } = useRequiredContext(OpsActionsContext);
  return (
    <div>
      <h1>Ops Action Metrics</h1>
      <pre>
        {opsActionMetrics
          ? JSON.stringify(opsActionMetrics, undefined, 2)
          : "loading..."}
      </pre>
    </div>
  );
};

const OpsActionUpdate = () => {
  const { opsActions } = useRequiredContext(OpsActionsContext);
  const [showUpdate, setShowUpdate] = React.useState(false);

  return (
    <div>
      <h1>Update Ops Action</h1>
      {Array.isArray(opsActions) && opsActions.length ? (
        <table>
          <tbody>
            <tr>
              <td>
                <pre>{JSON.stringify(opsActions[0], undefined, 2)}</pre>
              </td>
              <td>
                <Button onClick={() => setShowUpdate(!showUpdate)}>
                  Update
                </Button>
                <ActionUpdate
                  showUpdateAction={showUpdate}
                  setShowUpdateAction={setShowUpdate}
                  action={opsActions[0]}
                />
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <pre>loading...</pre>
      )}
    </div>
  );
};

const OpsActionCreate = () => {
  const [showCreate, setShowCreate] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setShowCreate(true)}>Create Ops Action</Button>
      <ActionCreate
        showCreateAction={showCreate}
        setShowCreateAction={setShowCreate}
      />
    </div>
  );
};

const OpsActionMetricsForAllLocations = () => {
  const { getActionMetricsForAllAvailableLocations } =
    useRequiredContext(OpsActionsContext);
  const [metrics, setMetrics] = React.useState(null);
  const retrieve = async () => {
    const data = await getActionMetricsForAllAvailableLocations();
    setMetrics(data);
  };
  return (
    <div>
      <Button onClick={retrieve}>Retrieve Metrics For All Locations</Button>
      {metrics && <pre>{JSON.stringify(metrics, undefined, 2)}</pre>}
    </div>
  );
};

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <OpsActionsHandler>
        <OpsActions />
        <OpsActionMetrics />
        <OpsActionUpdate />
        <OpsActionCreate />
        <br />
        <OpsActionMetricsForAllLocations />
      </OpsActionsHandler>
    </NextAppHandlerWeb>
  );
};
