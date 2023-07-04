import * as React from "react";
import { OpsAction } from "next-shared/src/models/OpsAction";
import {
  IActionMetricsSerialized,
  IActionMetricsByLocationId,
} from "next-shared/src/types/IActionMetricsSerialized";

export interface IOpsActionsContext {
  opsActions: OpsAction[];
  opsActionMetrics: IActionMetricsSerialized;
  onInsertOpsAction: (serializedAction: OpsAction) => Promise<OpsAction>;
  onUpdateOpsAction: (action: OpsAction) => Promise<OpsAction>;
  getActionMetricsForAllAvailableLocations(): Promise<IActionMetricsByLocationId>;
}

export const OpsActionsContext = React.createContext<IOpsActionsContext>({
  opsActions: null,
  opsActionMetrics: null,
  onInsertOpsAction: null,
  onUpdateOpsAction: null,
  getActionMetricsForAllAvailableLocations: null,
});
