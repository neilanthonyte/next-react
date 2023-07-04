import calculateSize from "calculate-size";
import * as d3 from "d3";
import * as React from "react";
import { useEffect, useRef } from "react";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "stackedBarChart");

// values type
type valuesType = { name: string; y0: number; y1: number; className?: string };

// data type
type dataType = {
  label: string;
  [name: string]: any;
  values?: valuesType[];
  minRange?: number;
  maxRange?: number;
  marker?: number;
  total?: number;
};

// margin type
type marginType = { top: number; right: number; bottom: number; left: number };

export interface IStackedBarChartProps {
  /**
   * Data use to build the chart.
   * Example:
   * const data = [
   *   {
   *     label: "Art and Humanities",
   *     "Not Satisfied": 30,
   *     "Not Much Satisfied": 40,
   *     Satisfied: 35,
   *     "Very Satisfied": 20
   *   },
   *   {
   *     label: "Sciences",
   *     "Not Satisfied": 10,
   *     "Not Much Satisfied": 30,
   *     Satisfied: 50,
   *     "Very Satisfied": 15
   *   }
   * ];
   */
  data: dataType[];
  /**
   * Manual override for height of the chart.
   */
  height?: number;
  /**
   * Label for the marker line.
   */
  markerLabel?: string;
  /**
   * Whether bars are colored based on their ratio to the marker line.
   */
  colorByMarkerRatio?: boolean;
  /**
   * Maximum width of the bars in the chart.
   */
  maxBarWidth?: number;
}

/**
 * Stacked bar chart.
 *  - Can show min/max ranges on each bar.
 *  - Can also include a single marker line which will be the average of all
 *  markers of the bars.
 *  - Can also show show chart with bars highlighted based on their
 *  position from the marker line.
 *  With red being extremely below, orange to just below and
 *  green equal to or above the marker line.
 *  - Can also define the maximum width of the bars so they don't look too
 *  big when you have a small data set.
 */
export const StackedBarChart: React.FC<IStackedBarChartProps> = ({
  data,
  height,
  markerLabel = "",
  colorByMarkerRatio = false,
  maxBarWidth = 50,
}): React.ReactElement<any> => {
  // get the element reference to attach the bullet chart
  const element = useRef(null);

  // keys not to count as data for the bars
  const nonBarkeys = [
    "label",
    "marker",
    "values",
    "total",
    "minRange",
    "maxRange",
  ];

  // wait till page has loaded before adding stacked bar chart
  useEffect(() => {
    if (element.current) {
      // reset current svg
      element.current.innerHTML = "";

      // calculate the longest label length to dynamically set the bottom margin to fit
      let maxLabelLength = 0;
      let maxLabel = "";
      data.forEach((d: dataType) => {
        if (d.label.length >= maxLabelLength) {
          maxLabelLength = d.label.length;
          maxLabel = d.label;
        }
      });

      // set the size of the stacked bar chart
      const margin: marginType = {
        top: 20,
        right: 0,
        // add bottom margin to fit all labels based on the longest label width
        // add top margin because it gets pushed down
        bottom:
          calculateSize(maxLabel, {
            font: styles.fontBody,
            fontSize: styles.labelFontSize,
          }).width + 20,
        // add left margin to the text width of the marker label if present
        left: markerLabel
          ? calculateSize(markerLabel.toUpperCase(), {
              font: styles.fontBody,
              fontWeight: styles.markerLabelFontWeight,
              fontSize: styles.markerLabelFontSize,
            }).width + 10
          : 0,
      };
      const width: number =
        element.current.clientWidth - margin.left - margin.right;
      height = height
        ? height
        : element.current.parentNode.clientHeight - margin.top - margin.bottom;

      // x band
      const x = d3
        .scaleBand()
        .range([margin.left, width + margin.left + margin.right]) // set the
        // width of the x axis
        .paddingInner(0.5) // set the padding between bars
        .paddingOuter(0.1); // set the outer padding for the first and last bar

      // add bottom x axis for label
      const xAxis = d3.axisBottom(x);

      // set size of y
      const y = d3.scaleLinear().rangeRound([height, 0]);

      // loop through data and set the bar values and totals
      data.forEach((d: dataType) => {
        // set bar values
        let y0 = 0;
        let keys = Object.keys({ ...d });
        keys = keys.filter((k: string) => !nonBarkeys.includes(k));
        d.values = keys.map((name: string) => {
          return { name, y0, y1: (y0 += +d[name]) };
        });

        // set bar total
        d.total = d.values[d.values.length - 1].y1;
      });

      // add the stacked bar chart to the given element as an svg
      const svg = d3
        .select(element.current)
        .selectAll("div")
        .data([data])
        .enter()
        .append("svg");

      // add the bullet chart to the svg
      svg
        .attr("class", css(""))
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      // add labels to the x domain
      x.domain(data.map((d: dataType) => d.label));

      // calculate where marker line will be
      let marker = 0;
      data.forEach((d: dataType) => {
        if ("marker" in d) {
          marker += d.marker;
        }
      });
      marker = marker / data.length;

      // calculate the highest given value
      const yMax = Math.max(
        d3.max(data, (d: dataType) => d.total),
        d3.max(data, (d: dataType) =>
          d.minRange !== undefined ? d.minRange : 0,
        ),
        d3.max(data, (d: dataType) =>
          d.maxRange !== undefined ? d.maxRange : 0,
        ),
        marker,
      );

      // set y domain range base on 0 to max total value
      y.domain([0, yMax]);

      // add x-axis to chart
      svg
        .append("g")
        .attr("transform", "translate(0," + (height + margin.top) + ")")
        .call(xAxis);

      // position label text correctly
      svg
        .selectAll("text")
        .attr("class", css("label"))
        .attr("dx", "-1em")
        .attr("dy", "-.5em")
        .attr("transform", "rotate(-90)");

      // add bars
      const bar = svg
        .selectAll("svg")
        .data(data)
        .enter()
        .append("g")
        .attr(
          "transform",
          (d: dataType) => "translate(" + x(d.label) + "," + margin.top + ")",
        );

      // set stacked bar values for bar
      const bar_enter = bar
        .selectAll("rect")
        .data((d: dataType) => d.values)
        .enter();

      // if chart is sorted we set the bar color based on the ratio to the
      // marker line
      if (colorByMarkerRatio) {
        data.forEach((d: dataType) => {
          let className = "";
          const ratio = d.total / marker;
          if (ratio <= 0.5) {
            className = "bar-danger";
          } else if (ratio < 1) {
            className = "bar-warning";
          } else {
            className = "bar-success";
          }
          d.values.forEach((v: valuesType) => (v.className = className));
        });
      }

      // set the actual bar width
      const barWidth = Math.min(x.bandwidth(), maxBarWidth);

      // set width, x/y position, height and fill colour for stacked bar
      bar_enter
        .append("rect")
        .attr("width", barWidth)
        // if the bar width is the max bar width then we need to reposition
        // the bar based on the band width so it's centered on the label
        .attr(
          "x",
          barWidth === maxBarWidth ? x.bandwidth() / 2 - maxBarWidth / 2 : 0,
        )
        .attr("y", (d: valuesType) => y(d.y1))
        .attr("height", (d: valuesType) => y(d.y0) - y(d.y1))
        .attr("class", (d: valuesType, i: number) => {
          return colorByMarkerRatio ? d.className : `bar-${i + 1}`;
        });

      // add min range line for stacked bar
      const minLine = svg
        .selectAll("svg")
        .data(data)
        .enter()
        .append("g")
        .attr(
          "transform",
          (d: dataType) => "translate(" + x(d.label) + "," + margin.top + ")",
        );
      const minLine_enter = minLine
        .selectAll("line")
        .data((d: dataType) => [d.minRange])
        .enter();
      minLine_enter
        .append("line")
        .attr("class", css("rangeLine"))
        .attr("x1", (d: number) => (d ? -3 : 0))
        .attr("x2", (d: number) => (d ? x.bandwidth() + 3 : 0))
        .attr("y1", (d: number) => height - (d / yMax) * height)
        .attr("y2", (d: number) => height - (d / yMax) * height);

      // add max range line for stacked bar
      const maxLine = svg
        .selectAll("svg")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "g")
        .attr(
          "transform",
          (d: dataType) => "translate(" + x(d.label) + "," + margin.top + ")",
        );
      const maxLine_enter = maxLine
        .selectAll("line")
        .data((d: dataType) => [d.maxRange])
        .enter();
      maxLine_enter
        .append("line")
        .attr("class", css("rangeLine"))
        .attr("x1", (d: number) => (d ? -3 : 0))
        .attr("x2", (d: number) => (d ? x.bandwidth() + 3 : 0))
        .attr("y1", (d: number) => height - (d / yMax) * height)
        .attr("y2", (d: number) => height - (d / yMax) * height);

      /**
       * Add marker line which is a line that fully goes across the chart.
       */
      const addMarkerLine = (data: number) => {
        // calculate y position of line and text
        const y = height - (data / yMax) * height;

        // add container for line
        const line = svg
          .selectAll("svg")
          .data([data])
          .enter()
          .append("g")
          .attr("transform", "translate(0," + (y + margin.top) + ")");

        // set line
        const line_enter = line.selectAll("line").data([data]).enter();

        // create line
        line_enter
          .append("line")
          .attr("class", css("markerLine"))
          // set line size
          .attr("x1", markerLabel ? margin.left : 0)
          .attr("x2", width + margin.left + margin.right)
          .attr("y1", 0)
          .attr("y2", 0);

        // Add marker label if given
        if (markerLabel) {
          line_enter
            .append("text")
            .attr("class", css("markerLabel"))
            .text(markerLabel);
        }
      };
      addMarkerLine(marker);
    }
    // if data changes re-draw chart
  }, [data]);

  // render
  return <div ref={element} />;
};
