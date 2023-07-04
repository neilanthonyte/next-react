import D3Component from "../D3Component";
import * as d3 from "d3";

export interface IBarChartProps {
  data: IDataPoint[];
}

export interface IDataPoint {
  value: number;
  date: Date;
}

export class BarChart extends D3Component<IBarChartProps> {
  public setupD3(el: any, svg: any, svgWidth: any, svgHeight: any): void {
    const dataset = this.props.data;
    const barPadding = 5;
    const barWidth = svgWidth / dataset.length;

    const xScale = d3.scaleBand().range([0, svgWidth]).padding(0.4);

    const yScale = d3.scaleLinear().range([svgHeight, 0]);

    xScale.domain(dataset.map((d) => d.date.toString()));
    yScale.domain([0, d3.max(dataset, (d) => d.value)]);

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("y", (d: IDataPoint) => svgHeight - d.value)
      .attr("height", (d: IDataPoint) => d.value)
      .attr("width", barWidth - barPadding)
      .attr(
        "transform",
        (d: IDataPoint, i: number) => `translate(${barWidth * i}, 0)`,
      );

    svg
      .append("g")
      .attr("transform", "translate(0," + svgHeight + ")")
      .call(d3.axisBottom(xScale));

    // add the y Axis
    svg.append("g").call(d3.axisLeft(yScale));
  }

  public updateD3() {
    // const { data = [] } = this.state;
    // const { g, arc, path } = this;
    // g.datum(data);
    // path.attr("d", arc);
  }
}
