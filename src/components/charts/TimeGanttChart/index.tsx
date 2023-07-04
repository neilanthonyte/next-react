import * as React from "react";
import * as d3 from "d3";
import { useCallback, useRef } from "react";
import { useEffect } from "react";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import moment from "moment";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { useCurrentDate } from "../../../hooks/useCurrentDate";
import { withSize, SizeMeProps } from "react-sizeme";

export interface ITimeGanttChartData {
  item: string;
  range: [unixTimestamp, unixTimestamp];
}

export interface ITimeGanttChartProps {
  chartData: ITimeGanttChartData[];
  chartHeight: number;
  showCurrentTime: boolean;
}

const _TimeGanttChart: React.FC<ITimeGanttChartProps> = ({
  chartData,
  showCurrentTime,
  chartHeight,
}) => {
  const chartElement = useRef(null);
  const tickDate = useCurrentDate(60, "DD-MM HH:mm");

  const getColors = useCallback((chartData: ITimeGanttChartData) => {
    const endingTime = moment.unix(chartData.range[1]);
    const currentTime = moment();

    if (endingTime.isBefore(currentTime)) {
      return "#ff0000";
    }

    if (endingTime.diff(currentTime, "h") < 2) {
      return "#fbe7b7";
    }

    return "#4ca94d";
  }, []);

  // wait till page has loaded before adding chart
  useEffect(() => {
    if (!chartElement.current) {
      return;
    }

    // clear any existing rendering
    chartElement.current.innerHTML = "";

    // set the dimensions and margins of the graph
    const margin = { top: 20, right: -10, bottom: 30, left: 120 },
      width = chartElement.current.clientWidth - (margin.left - margin.right),
      height = chartHeight - margin.top - margin.bottom;

    // set the ranges
    const y = d3.scaleBand().range([height, 0]).padding(0.1);

    const x = d3.scaleLinear().range([0, width]);

    const svg = d3
      .select(chartElement.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const minScale = d3.min(chartData, (chartData) => {
      return moment.unix(chartData.range[0]).subtract("3", "h").unix();
    });

    const maxScale = d3.max(chartData, (chartData) => {
      const maxInData = moment.unix(chartData.range[1]);

      if (maxInData.isBefore(moment())) {
        return moment().add("3", "h").unix();
      }

      return moment.unix(chartData.range[1]).add("3", "h").unix();
    });

    // Scale the range of the data in the domains
    x.domain([minScale, maxScale]);
    y.domain(
      chartData.map((chartData) => {
        return chartData.item;
      }),
    );

    // append the rectangles for the bar chart
    svg
      .selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("fill", (d) => getColors(d))
      .attr("class", "bar")
      .attr("width", (chartData) => {
        return x(chartData.range[1]) - x(chartData.range[0]);
      })
      .attr("x", (chartData) => {
        return x(chartData.range[0]);
      })
      .attr("y", (chartData) => {
        return y(chartData.item);
      })
      .attr("height", y.bandwidth());

    // add the x Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3
          .axisBottom(x)
          .ticks(4)
          .tickFormat((x) => moment.unix(x as number).format("ddd Do HH:mm")),
      );

    // add the y Axis
    svg.append("g").call(d3.axisLeft(y));

    // add the current time
    if (showCurrentTime) {
      svg
        .append("line")
        .attr("class", "current-time")
        .style("stroke", "blue") // colour the line
        .style("stroke-width", "3") // line thickness
        .style("stroke-opacity", "0.7")
        .attr("x1", x(currentUnixTimestamp()))
        .attr("x2", x(currentUnixTimestamp()))
        .attr("y1", 0)
        .attr("y2", height);
    }
  }, [chartElement, showCurrentTime, chartData, tickDate]);

  return <div ref={chartElement} />;
};

interface IAdaptiveTimeGanttChartProps
  extends ITimeGanttChartProps,
    SizeMeProps {}

const AdaptiveTimeGanttChart: React.FC<IAdaptiveTimeGanttChartProps> = ({
  size,
  ...props
}) => {
  return <_TimeGanttChart {...props} key={size.width} />;
};

export const TimeGanttChart = withSize({
  monitorWidth: true,
  monitorHeight: true,
})(AdaptiveTimeGanttChart) as React.FC<ITimeGanttChartProps>;
