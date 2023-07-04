import D3Component from "../D3Component";
import * as d3 from "d3";
import { Arc, BaseType, Pie, ScaleOrdinal, Selection } from "d3";

export interface IPieChartDataSlice {
  label: string;
  size: number;
  completed: number;
}

export interface IPieChartProps {
  data: IPieChartDataSlice[];
}

export default class PieChart extends D3Component<IPieChartProps> {
  private pie: Pie<any, any>;
  private color: ScaleOrdinal<string, string>;
  private arc: Arc<any, any>;
  private outlineArc: Arc<any, any>;
  private path: Selection<SVGPathElement, any, BaseType, any[]>;
  private g: any;

  public setupD3(el: any, svg: any, svgWidth: any, svgHeight: any): void {
    const radius = Math.min(svgWidth, svgHeight) / 2;
    const innerRadius = 0.2 * radius;

    this.pie = d3
      .pie()
      .value((d: any) => d.size)
      .sort(null);

    this.color = d3.scaleOrdinal(d3.schemeAccent);

    this.outlineArc = d3.arc().innerRadius(innerRadius).outerRadius(radius);

    this.arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius((d: any) => {
        d.data.completed = d.data.completed ? d.data.completed : 1;
        const size =
          innerRadius +
          (radius - innerRadius) * (d.data.completed / d.data.size);
        return size;
      });

    this.g = svg
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append("g")
      .attr(
        "transform",
        "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")",
      );

    const { g, pie, color, arc, outlineArc } = this;
    const { data = [] } = this.props;

    this.path = g
      .datum(data)
      .selectAll("path")
      .data(pie)
      .enter()
      .append("path")
      .attr("fill", (d: any, i: any) => color(i))
      .attr("d", arc);

    g.datum(data)
      .selectAll("g")
      .data(pie)
      .enter()
      .append("path")
      .attr("fill", "#dcdcdc")
      .attr("fill-opacity", "0.1")
      .attr("stroke", "#989898")
      .attr("d", outlineArc);
  }

  public updateD3() {
    const { data = [] } = this.props;
    const { g, arc, path } = this;

    g.datum(data);
    path.attr("d", arc);
  }
}
