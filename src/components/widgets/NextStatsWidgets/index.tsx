import * as React from "react";
import * as _ from "lodash";

import { IDynamicStatisticsQuery } from "next-shared/src/types/IDynamicStatisticsQuery";
import { IStatsWidgetConfig, StatsWidget } from "../StatsWidget";

export interface IPatientStatsWidgetProps {}

export const PatientStatsWidget: React.FC<IPatientStatsWidgetProps> = ({}) => {
  // TODO replace with a real query
  const query: IDynamicStatisticsQuery = {
    windowing: "day",
    groupByField: "location",
    eventType: "appSignUp",
    fromTime: null,
    toTime: null,
  };

  const configs: IStatsWidgetConfig[] = [
    {
      label: "7d",
      window: "day",
      windowCount: 7,
    },
    {
      label: "4w",
      window: "week",
      windowCount: 4,
    },
    {
      label: "6m",
      window: "month",
      windowCount: 6,
    },
  ];

  return (
    <StatsWidget label="Patient details" query={query} configs={configs} />
  );
};
