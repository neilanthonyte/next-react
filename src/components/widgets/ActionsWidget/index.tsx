import * as React from "react";
import { useContext, useMemo } from "react";

import { OpsAction } from "../../ops-actions/OpsAction";
import { OpsActionsContext } from "../../../contexts/OpsActionsContext";
import { Widget } from "../../generic/Widget";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { PlaceholderView } from "../../views/PlaceholderView";
import { opsActionsPaths } from "../../views/opsActionsRoutes";

export interface IActionsWidgetProps {}

export const ActionsWidget: React.FC<IActionsWidgetProps> = () => {
  const { opsActions, opsActionMetrics } = useContext(OpsActionsContext);

  const filteredActions = useMemo(() => {
    if (opsActions === null) {
      return;
    }
    return opsActions.filter((opsAction) => opsAction.isActive()).slice(0, 2);
  }, [opsActions]);

  const activeCount = useMemo(() => {
    if (opsActions === null) {
      return;
    }
    return opsActions.filter((a) => a.isActive()).length;
  }, [opsActions]);

  return (
    <Widget
      label="Actions"
      badge={activeCount}
      toMore={opsActionsPaths.actions}
      loading={!filteredActions}
    >
      {filteredActions.length > 0 ? (
        <>
          {filteredActions.map((a, index) => (
            <OpsAction key={index} action={a} />
          ))}
        </>
      ) : (
        <PlaceholderView
          stdSize={EStandardSizes.Small}
          icon={"image"}
          instruction={"No issues"}
        />
      )}
    </Widget>
  );
};
