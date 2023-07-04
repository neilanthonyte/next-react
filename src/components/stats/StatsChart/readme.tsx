import * as React from "react";
import moment from "moment";

import { StatsChart } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { IDynamicStatisticsQuery } from "next-shared/src/types/IDynamicStatisticsQuery";

export const DemoStandard = () => {
  const query: IDynamicStatisticsQuery = {
    windowing: "day",
    groupByField: "location",
    eventType: "appSignUp",
    fromTime: moment().unix(),
    toTime: moment().subtract(30, "days").unix(),
  };

  return (
    <NextAppHandlerWeb>
      <div style={{ width: "400px", height: "400px" }}>
        <StatsChart query={query} />
      </div>
    </NextAppHandlerWeb>
  );
};
