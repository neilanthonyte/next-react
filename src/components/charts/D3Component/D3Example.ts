/**
 * Based on: https://bl.ocks.org/mbostock/1346395
 */
import * as d3 from "d3";
import D3Component from "./index";
import { Selection } from "d3-selection";
import { ScaleOrdinal } from "d3-scale";
import { Arc, DefaultArcObject, Pie } from "d3";

interface ID3ExampleProps {
  data: any;
}

interface ID3ExampleState {
  data: any;
}

export class D3Example extends D3Component<ID3ExampleProps, ID3ExampleState> {
  private color: ScaleOrdinal<string, string>;
  private pie: Pie<this, any>;
  private arc: Arc<any, DefaultArcObject>;

  constructor(props: ID3ExampleProps) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  public componentWillReceiveProps(nextProps: ID3ExampleProps) {
    this.setState({
      data: nextProps.data,
    });
  }

  public setupD3(
    el: HTMLDivElement,
    svg: Selection<SVGSVGElement, any, SVGSVGElement, any>,
    width: number,
    height: number,
  ) {
    const padding = 10;
    width -= padding * 2;
    height -= padding * 2;
    const radius = Math.min(width, height) / 2;

    this.color = d3.scaleOrdinal(d3.schemeAccent);

    this.pie = d3
      .pie()
      .value((d) => d.valueOf())
      .sort(null);

    this.arc = d3
      .arc()
      .innerRadius(radius - 100)
      .outerRadius(radius - 20);

    this.svg = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  }

  public updateD3() {
    const { data = [] } = this.state;
    const { svg, pie, color, arc } = this;

    svg
      .datum(data)
      .selectAll("path")
      .data(pie)
      .enter()
      .append("path")
      .attr("fill", (d, i) => color(i.toString()))
      .attr("d", arc as any);
  }
}
