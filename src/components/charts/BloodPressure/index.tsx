// 3rd party:
import * as PropTypes from "prop-types";
import * as d3 from "d3";
import * as _ from "lodash";

import D3Component from "../D3Component";

const MARGIN = { left: 40, right: 10, top: 20, bottom: 50 };

const REGIONS = [
  [40, 40],
  [60, 90],
  [80, 120],
  [90, 140],
  [100, 160],
  [120, 180],
];

const COLORS = [
  [66, 184, 172],
  [109, 178, 91],
  [246, 156, 64],
  [238, 111, 116],
  [234, 79, 94],
];

const lighten = (c: number) => _.floor(Math.min(255, 1.2 * c + 60));

const LIGHT_COLORS = COLORS.map((c) => [
  lighten(c[0]),
  lighten(c[1]),
  lighten(c[2]),
]);

const aryToCssColor = (a: number[]) =>
  "rgb(" + a[0] + "," + a[1] + "," + a[2] + ")";

const RGB_COLORS = COLORS.map((c) => aryToCssColor(c));
const RGB_LIGHT_COLORS = LIGHT_COLORS.map((c) => aryToCssColor(c));

const distance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};

const getColor = (x: number, y: number) => {
  return RGB_COLORS[
    Math.max(
      REGIONS.filter((r) => x > r[0]).length,
      REGIONS.filter((r) => y > r[1]).length,
    ) - 1
  ];
};

export interface IBloodPressureProps {
  className?: string;
  data: number[][];
  selectedIndex: number;
  onSelectionChange: (val: number) => void;
}
export interface IBloodPressureState {
  data: number[][];
  selectedIndex: number;
}

export class BloodPressure extends D3Component<
  IBloodPressureProps,
  IBloodPressureState
> {
  private x: d3.ScaleLinear<number, number>;
  private y: d3.ScaleLinear<number, number>;
  private g: d3.Selection<SVGGElement, any, SVGSVGElement, any>;

  constructor(props: IBloodPressureProps) {
    super(props);
    this.state = {
      selectedIndex: -1,
      data: this.props.data,
    };
    this.setupD3 = this.setupD3.bind(this);
  }

  public setupD3(
    el: HTMLDivElement,
    svg: d3.Selection<SVGSVGElement, any, SVGSVGElement, any>,
    width: number,
    height: number,
  ) {
    // elect a point on hover
    const onHover = (element: SVGGElement) => {
      const mouse = d3.mouse(element);
      const mouseX = this.x.invert(mouse[0]);
      const mouseY = this.y.invert(mouse[1]);

      if (this.state.data.length === 0) {
        return;
      }

      const firstPoint = this.state.data[0];
      let minDistance = distance(mouseX, mouseY, firstPoint[1], firstPoint[0]);
      let selectedPointIndex = 0;

      this.state.data.slice(1).map((r, i) => {
        const dist = distance(mouseX, mouseY, r[1], r[0]);
        if (dist < minDistance) {
          minDistance = dist;
          selectedPointIndex = i + 1;
        }
      });

      if (selectedPointIndex === this.state.selectedIndex) {
        return;
      }

      // notify others of the selection
      if (this.props.onSelectionChange) {
        // expect to be notified
        this.props.onSelectionChange(selectedPointIndex);
      } else {
        // directly update ourselves
        this.setState({
          selectedIndex: selectedPointIndex,
        });
      }
    };

    this.g = svg
      .append("g")
      .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")")
      .on("mousemove", function () {
        onHover(this);
      });

    width -= MARGIN.left + MARGIN.right;
    height -= MARGIN.top + MARGIN.bottom;

    this.x = d3
      .scaleLinear()
      .range([0, width])
      .domain(d3.extent(REGIONS, (d) => d[0]));

    this.y = d3
      .scaleLinear()
      .range([height, 0])
      .domain(d3.extent(REGIONS, (d) => d[1]));

    const rREGIONS = _.reverse([].concat(REGIONS));

    const firstRegion = _.first(REGIONS);
    const lastRegion = _.last(REGIONS);

    _.each(rREGIONS, (r, i) => {
      if (i === REGIONS.length - 1) {
        return;
      }

      this.g
        .append("rect")
        .attr("x", this.x(firstRegion[0]))
        .attr("width", this.x(r[0]))
        .attr("y", this.y(r[1]))
        .attr("height", this.y(lastRegion[1] + firstRegion[1] - r[1]))
        // .transition()
        //   .duration(1000 * i)
        .attr("fill", RGB_LIGHT_COLORS[COLORS.length - i - 1]);
    });

    // x axis
    this.g
      .append("g")
      .call(d3.axisLeft(this.y).tickValues(REGIONS.map((r) => r[1])))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end");

    // x axis
    this.g
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(this.x).tickValues(REGIONS.map((r) => r[0])));
  }

  public componentWillReceiveProps(nextProps: IBloodPressureProps) {
    // update based on new data
    this.setState({
      data: nextProps.data,
      selectedIndex: nextProps.selectedIndex,
    });
  }

  public updateD3() {
    this.g.selectAll("circle").remove();
    // add the scatterplot
    this.g
      .selectAll("dot")
      .data(this.state.data)
      .enter()
      .append("circle")
      .style("fill", (d) => getColor(d[1], d[0]))
      .attr("r", (val, i) => (i === this.state.selectedIndex ? 10 : 3.5))
      .attr("cx", (d) => this.x(d[1]))
      .attr("cy", (d) => this.y(d[0]));
  }
}

export default BloodPressure;
