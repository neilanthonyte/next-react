import * as React from "react";
import { useState, useMemo } from "react";
import moment from "moment";
import * as _ from "lodash";

import {
  TDynamicStatisticsWindow,
  IDynamicStatisticsQuery,
} from "next-shared/src/types/IDynamicStatisticsQuery";
import { IWidgetProps, Widget } from "../../generic/Widget";
import { StatsChart } from "../../stats/StatsChart";

export interface IStatsWidgetConfig {
  label: string;
  window: TDynamicStatisticsWindow;
  /** The number of windows to show */
  windowCount: number;
}

export interface IStatsWidgetProps extends IWidgetProps {
  query: IDynamicStatisticsQuery;
  configs?: IStatsWidgetConfig[];
}

export const StatsWidget: React.FC<IStatsWidgetProps> = ({
  query,
  configs,
  ...rest
}) => {
  // snapshot the config in case the parent component keeps replacing it
  configs = useMemo(() => configs, []);

  const [config, setConfig] = useState<IStatsWidgetConfig>(
    Array.isArray(configs) && configs[0],
  );

  // TODO replace with a real query
  const updatedQuery: IDynamicStatisticsQuery = useMemo(() => {
    const modifiedQuery: IDynamicStatisticsQuery = {
      ...query,
    };

    if (config) {
      const now = moment();
      modifiedQuery.windowing = config.window;
      (modifiedQuery.fromTime = now.unix()),
        (modifiedQuery.toTime = now
          .subtract(config.windowCount, config.window)
          .unix());
    }
    return modifiedQuery;
  }, [config]);

  const options = useMemo(() => {
    if (Array.isArray(config)) {
      return null;
    }
    return {
      labels: configs.map((c) => c.label),
      selected: config.label,
      onSelect: (label: string) =>
        setConfig(configs.find((c) => c.label === label)),
    };
  }, [config]);

  return (
    <Widget {...rest} options={options}>
      {/* HACK to ensure height works - adapt once the final content is available */}
      <div style={{ height: "300px" }}>
        <StatsChart query={updatedQuery} />
      </div>
    </Widget>
  );
};
