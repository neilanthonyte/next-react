import * as React from "react";
import moment from "moment";

import { IStatsWidgetConfig, StatsWidget } from ".";
import { IDynamicStatisticsQuery } from "next-shared/src/types/IDynamicStatisticsQuery";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { StatsChart } from "../../stats/StatsChart";

export const DemoStandard = () => {
  // TODO replace with a real query
  const query: IDynamicStatisticsQuery = {
    windowing: "day",
    groupByField: "location",
    eventType: "appSignUp",
    fromTime: moment().subtract(30, "days").unix(),
    toTime: moment().unix(),
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
    <NextAppHandlerWeb>
      <StatsWidget label="Patient details" query={query} configs={configs}>
        {/* HACK to ensure height works - adapt once the final content is available */}
        <div style={{ height: "300px" }}>
          <StatsChart query={query} />
        </div>
      </StatsWidget>
    </NextAppHandlerWeb>
  );
};
