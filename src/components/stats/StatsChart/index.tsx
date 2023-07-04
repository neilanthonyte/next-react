import * as React from "react";
import * as _ from "lodash";
import moment from "moment";

import {
  LineChart,
  ILineChartMultiPoint,
  ILineOption,
} from "../../charts/LineChart";
import { NextClient } from "../../../client/NextClient";
import { useClient } from "../../../hooks/useClient";
import { useEffect, useState } from "react";
import {
  IDynamicStatisticsQuery,
  TDynamicStatisticsWindowedResponse,
} from "next-shared/src/types/IDynamicStatisticsQuery";

export interface IStatsChartProps {
  query: IDynamicStatisticsQuery;
}

export const StatsChart: React.FC<IStatsChartProps> = ({ query }) => {
  const client = useClient();

  const [chartData, setChartData] = useState<ILineChartMultiPoint[]>(null);
  const [chartOptions, setChartOptions] = useState<ILineOption[]>();

  useEffect(() => {
    if (!client.auth.session) {
      return;
    }
    (async () => {
      const data = await client.dynamicStatistics.query(query);

      if (query.windowing) {
        const windowData = data as TDynamicStatisticsWindowedResponse;

        if (!Array.isArray(windowData) || windowData.length === 0) {
          setChartData(null);
          setChartOptions(null);
          return;
        }

        const seriesData = windowData.map((d) => {
          return [
            moment.unix(d.windowStart).toDate(),
            query.groupByField ? Object.values(d.value) : d.value,
          ];
        });
        setChartData(seriesData);

        // determine the labels based on keys
        const labels: string[] = query.groupByField
          ? Object.keys(windowData[0].value)
          : ["All"];

        // build the options based on the labels
        setChartOptions(
          labels.map((label) => ({
            label,
            lineStyle: "hard",
          })),
        );
      }
    })();
  }, [query, client.auth.session]);

  if (!chartData || !chartOptions) {
    return null;
  }

  return (
    <LineChart
      data={chartData}
      legend={{ show: true, layout: "vertical" }}
      lineOptions={chartOptions}
    />
  );
};
