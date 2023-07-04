import * as d3 from "d3";
import * as _ from "lodash";

import D3Component from "../D3Component";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import createGradient from "./helpers/createGradient";
const css = cssComposer(styles);

const MARGIN = {
  top: 20,
  right: 50,
  bottom: 30,
  left: 20,
};

// TODO make dynamic based on label length
const LEGEND_ITEM_SEPARATION_HOR = 200;
const LEGEND_ITEM_SEPARATION_VERT = 40;
const LEGEND_PADDING = 6;
const LEGEND_DOT_SIZE = 14;

const toDatum = (data: any, index: number) => {
  return data
    .map((d: any) => [d[0], d[1][index], d[2]])
    .filter((d: any) => d[1] !== null);
};

// put into the multi-line format
const getLineData = (props: ILineChartProps) =>
  props.line ? props.line.map((d: any) => [d[0], [d[1]], d[2]]) : props.data;

export type ILineGradientStep = number[]; //[number, number];

export type TLineType = "smooth" | "hard";

export interface ILineOption {
  gradient?: ILineGradientStep[];
  label?: string;
  showDots?: boolean;
  dotSize?: number;
  dotText?: (value: number) => string;
  lineStyle?: TLineType;
}

const defaultLineOption: ILineOption = {
  gradient: null,
  label: null,
  dotSize: 4,
  dotText: undefined,
  lineStyle: "smooth",
};

export type ILineChartPoint = any[]; //[Date, number, boolean?];
export type ILineChartMultiPoint = any[]; //[Date, number[], boolean?];

type TChartLegendLayout = "horizontal" | "vertical";

export interface IChartLegend {
  show?: boolean;
  layout?: TChartLegendLayout;
}

export interface IChartAxis {
  show?: boolean;
  label?: string;
  showAllValues?: boolean;
}

export interface ILineChartProps {
  selection?: number;
  onSelectionChange?: (date: Date) => void;
  line?: ILineChartPoint[];
  data?: ILineChartMultiPoint[];
  lineOptions?: ILineOption[];
  selectedDate?: number;
  legend?: IChartLegend;
  xAxis?: IChartAxis;
  yAxis?: IChartAxis;
  enableZoomAndPan?: boolean;
}

export interface ILineChartState {
  data: any;
  selectedDate: number;
  scale: number;
  offset: number;
}

/**
 * Draws a time-based line chart.
 */
export class LineChart extends D3Component<ILineChartProps, ILineChartState> {
  private name: string;
  private options: ILineOption[];
  private labels: string[];
  private lineCount: number;
  private body: d3.Selection<SVGGElement, any, SVGSVGElement, any>;
  private x: d3.ScaleTime<number, number>;
  private xAxis: d3.Axis<
    | number
    | Date
    | {
        valueOf(): number;
      }
  >;
  private y: d3.ScaleLinear<number, number>;
  private yAxis: d3.Axis<
    | number
    | {
        valueOf(): number;
      }
  >;
  private xAxisElement: d3.Selection<SVGGElement, any, SVGSVGElement, any>;
  private chart: d3.Selection<SVGGElement, any, SVGSVGElement, any>;
  private line: d3.Line<[number, number]>;
  private zoom: d3.ZoomBehavior<Element, {}>;
  private getColor: (i: number) => string;
  private legend: IChartLegend = { show: false, layout: "horizontal" };

  constructor(props: ILineChartProps) {
    super(props);

    this.setupD3 = this.setupD3.bind(this);
    this.updateD3 = this.updateD3.bind(this);

    const data = getLineData(props);

    // put the options into a multi-line mode
    const { lineOptions: options } = props;
    this.options = (options || []).map((o) => ({ ...defaultLineOption, ...o }));

    // TODO: sanity check the data...
    // all have the same number of values for second entry
    // at least one value exists
    this.lineCount = this.options.length;

    this.labels = this.options.map((o) => o.label || "");
    this.legend = props.legend ? { ...this.legend, ...props.legend } : null;

    const color = d3.scaleOrdinal().domain(this.labels).range(d3.schemeSet2);

    this.getColor = (i: number): string => {
      return color(this.labels[i]) as string;
    };

    // used to uniquely identify ref content that can otherwise be referrenced by other charts
    this.name = _.uniqueId("lineChart");

    this.state = {
      data,
      selectedDate: this.props.selectedDate,
      scale: 1,
      offset: 0,
    };
  }

  private computeGradientName = (i: number) => `${this.name}-gradient-${i}`;

  // draw the initial chart
  public setupD3(
    el: HTMLDivElement,
    svg: d3.Selection<SVGSVGElement, any, SVGSVGElement, any>,
    width: number,
    height: number,
  ) {
    const { legend } = this.props;

    // select a point on hover
    const onHover = (element: SVGRectElement) => {
      const mouse = d3.mouse(element);
      const mouseX: any = this.x.invert(mouse[0]);

      // notify others of the selection
      if (this.props.onSelectionChange) {
        this.props.onSelectionChange(mouseX);
      } else {
        // triggers a re-render
        this.setState({
          selectedDate: mouseX,
        });
      }
    };

    this.width = width - MARGIN.left - MARGIN.right;
    this.height = height - MARGIN.top - MARGIN.bottom;

    this.body = svg
      .attr("class", css("lineChart"))
      .append("g")
      .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");

    this.defs = this.svg.append("defs");

    // clip the charts
    this.defs
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", this.width)
      .attr("height", this.height);

    this.body = svg
      .append("g")
      .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");

    this.x = d3.scaleTime().rangeRound([0, this.width]);
    this.xAxis = d3.axisBottom(this.x).ticks(3);

    this.y = d3.scaleLinear().rangeRound([this.height, 0]);
    // merge all Y data into a single array
    const allYData = _.flatten(this.state.data.map((d: any) => d[1]));
    // @ts-ignore think this is a bug with d3.
    this.y.domain(d3.extent(allYData));

    this.yAxis = d3
      .axisRight(this.y)
      .tickSizeInner(-this.width)
      .tickSizeOuter(2)
      .ticks(5);

    // x-axis
    this.xAxisElement = this.body
      .append("g")
      .attr("class", css("axis"))
      .attr("transform", "translate(0," + this.height + ")");

    // y-axis
    this.body
      .append("g")
      .attr("class", css("axis"))
      .attr("transform", `translate(${this.width},0)`)
      .call(this.yAxis)
      .append("text")
      // .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end");

    // holds the chart data
    this.chart = this.body
      .append("g")
      .attr("class", css("chart"))
      .attr("width", this.width)
      .attr("height", this.height);

    for (let i = 0; i < this.lineCount; i++) {
      // const datum = toDatum(this.state.data, i);
      const lineOptions = this.options[i];
      const lineGradient = lineOptions ? lineOptions.gradient : false;

      // draw the line
      const line = this.chart
        .append("path")
        .datum(i)
        .attr("class", `${css("line")} line-${i}`);

      // apply a gradient
      if (lineGradient) {
        const gradientName = this.computeGradientName(i);
        createGradient(gradientName, this.defs, this.y, lineOptions.gradient);
        line.style("stroke", `url(#${gradientName})`);
      } else {
        line.style("stroke", () => this.getColor(i));
      }
    }

    const { enableZoomAndPan = false } = this.props;

    if (enableZoomAndPan) {
      this.zoom = d3
        .zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([
          [0, 0],
          [this.width, this.height],
        ])
        .extent([
          [0, 0],
          [this.width, this.height],
        ])
        .on("zoom", () => {
          const t = d3.event.transform;
          this.setState({
            scale: t.k,
            offset: t.x,
          });
        });

      // zoom catcher
      svg
        .append("rect")
        .attr("class", css("zoom"))
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")")
        .call(this.zoom as any)
        .on("mousemove", function () {
          onHover(this);
        });
    }

    // legend
    if (this.legend) {
      const isFlat = this.legend.layout === "horizontal";

      // Add one dot in the legend for each name.
      this.body
        .selectAll("legendDots")
        .data(this.labels)
        .enter()
        .append("circle")
        .attr(
          "cx",
          (d, i) =>
            LEGEND_PADDING + (isFlat ? i * LEGEND_ITEM_SEPARATION_HOR : 0),
        )
        .attr(
          "cy",
          (d, i) =>
            LEGEND_PADDING + (isFlat ? 0 : i * LEGEND_ITEM_SEPARATION_VERT),
        )
        .attr("r", LEGEND_DOT_SIZE / 2)
        .style("fill", (d, i) => this.getColor(i));

      // Add one dot in the legend for each name.
      this.body
        .selectAll("legendLabels")
        .data(this.labels)
        .enter()
        .append("text")
        .attr(
          "x",
          (d, i) =>
            LEGEND_PADDING +
            LEGEND_DOT_SIZE +
            (isFlat ? i * LEGEND_ITEM_SEPARATION_HOR : 0),
        )
        .attr(
          "y",
          (d, i) =>
            LEGEND_PADDING + (isFlat ? 0 : i * LEGEND_ITEM_SEPARATION_VERT),
        )
        .style("fill", (d, i) => this.getColor(i))
        .text(function (d) {
          return d;
        })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle");
    }
  }

  public componentWillReceiveProps(nextProps: ILineChartProps) {
    // update based on new data
    const data = getLineData(nextProps);
    this.setState({
      data,
      selectedDate: nextProps.selectedDate,
    });
  }

  public updateD3() {
    // determine the scale for elements
    const t = d3.zoomIdentity
      .translate(this.state.offset, 0)
      .scale(this.state.scale);

    // update the x scale
    const x = d3.scaleTime().rangeRound([0, this.width]);
    const xDomain: any = d3.extent(this.state.data, (d: any) => d[0]);
    const xRange = xDomain[1] - xDomain[0];
    const xRangeBuffer = xRange * 0.05;
    x.domain([
      new Date(xDomain[0].getTime() - xRangeBuffer),
      new Date(xDomain[1].getTime() + xRangeBuffer),
    ]);
    this.x.domain(t.rescaleX(x).domain());

    // update the y scale
    const allYData: any = _.flatten(this.state.data.map((d: any) => d[1]));
    const yDomain: any = d3.extent(allYData);
    const yRange = yDomain[1] - yDomain[0];
    const yRangeBuffer = yRange * 0.1;
    this.y.domain([yDomain[0] - yRangeBuffer, yDomain[1] + yRangeBuffer]);

    // update the lines
    // this.chart.selectAll(".line").attr("d", this.line);

    // delete prior data
    this.chart.selectAll(".dot").remove();
    this.chart.selectAll(".dotLabel").remove();

    for (let i = 0; i < this.lineCount; i++) {
      const datum = toDatum(this.state.data, i);
      const lineOptions = this.options[i];
      const lineGradient = lineOptions ? lineOptions.gradient : false;

      let lineCurve = null;
      switch (lineOptions.lineStyle) {
        case "smooth":
          lineCurve = d3.curveCardinal;
          break;
        case "hard":
          lineCurve = d3.curveLinear;
          break;
      }

      const line = d3
        .line()
        .x((d) => this.x(d[0]))
        .y((d) => this.y(d[1]))
        .curve(lineCurve);

      this.chart
        .select(`.line-${i}`)
        .datum(datum)
        .attr("d", line)
        .attr("stroke-width", lineOptions.dotText ? 5 : 2);

      const gradientName = this.computeGradientName(i);

      // add the dots
      if (lineOptions.dotSize > 0) {
        const size = lineOptions.dotText
          ? Math.max(lineOptions.dotSize, 20)
          : lineOptions.dotSize;

        const dots = this.chart
          .selectAll(".dot")
          .data(datum)
          .enter()
          .append("circle")
          .attr("r", (d: any) => size / 2)
          .attr("class", (d: any) => `dot ${css("point", `-color-${d[2]}`)}`)
          .attr("cx", (d: any) => this.x(d[0]))
          .attr("cy", (d: any) => this.y(d[1]));

        // draw labels for the dots
        if (typeof lineOptions.dotText === "function") {
          this.chart
            .selectAll(".dotLabel")
            .data(datum)
            .enter()
            .append("text")
            .attr("x", (d: any) => this.x(d[0]))
            .attr("y", (d: any) => this.y(d[1]))
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "central")
            .attr("font-weight", "bold")
            .attr("fill", "white")
            .attr("class", "dotLabel")
            // @ts-ignore
            .text((d) => lineOptions.dotText(d[1]));
        }

        if (lineGradient) {
          dots
            .style("fill", `url(#${gradientName})`)
            .style("stroke", `url(#${gradientName})`);
        } else {
          dots
            .attr("fill", () => this.getColor(i))
            .attr("stroke", () => this.getColor(i));
        }
      }

      // determine nearest dot
      let selected: any = null;
      let nearest = Infinity;
      datum.map((n: any) => {
        const dist = Math.abs(n[0] - this.state.selectedDate);
        if (dist < nearest) {
          nearest = dist;
          selected = n;
        }
      });

      // draw active dot
      if (selected != null) {
        const selectedDotOuter = this.chart
          .append("circle")
          .attr(
            "class",
            css("point", "-active", {
              "-pending": selected[2],
            }),
          )
          .attr("stroke-dasharray", selected[2] ? "1, 1" : "")
          .attr("r", 10)
          .attr("cx", () => this.x(selected[0]))
          .attr("cy", () => this.y(selected[1]));

        const selectedDotInner = this.chart
          .append("circle")
          .attr(
            "class",
            css("point", {
              "-pending": selected[2],
            }),
          )
          .attr("r", 5)
          .attr("cx", () => this.x(selected[0]))
          .attr("cy", () => this.y(selected[1]));

        if (lineGradient) {
          selectedDotOuter
            .style("fill", `url(#${gradientName})`)
            .style("stroke", `url(#${gradientName})`);
          selectedDotInner
            .style("fill", `url(#${gradientName})`)
            .style("stroke", `url(#${gradientName})`);
        } else {
          selectedDotOuter
            .attr("fill", "#fff")
            .attr("stroke", () => this.getColor(i));
          selectedDotInner
            .attr("fill", () => this.getColor(i))
            .attr("stroke", () => this.getColor(i));
        }
      }
    }

    // redraw the axes
    this.xAxisElement.call(this.xAxis);
    // this.body.select(css("axis", "-x")).call(this.xAxis);
    // this.body.select(".axis.-y").call(this.yAxis);
  }
}
