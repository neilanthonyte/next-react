import * as _ from "lodash";
import { ScaleLinear } from "d3-scale";
import { Selection } from "d3";

const colors = ["rgb(220,235,55)", "rgb(250,175,50)", "rgb(250,75,40)"];

/**
 * @params values Array of value and severity (0 = fine, -1/1 = warning, -2/2 = danger)
 */
export default (
  name: string,
  defs: Selection<any, any, any, any>,
  axisScale: ScaleLinear<number, number>,
  values: number[][],
) => {
  // determine arrayOfRanges for linearGradient (line color)
  const start = values[0][0];
  const end = _.last(values)[0];
  const range = end - start;
  const halfFadeDistance = 4;

  const colorSections = _.flatten(
    _.tail(values).map((p, i) => {
      const pPoint = values[i];
      const offset = ((p[0] - start) / range) * 100;

      return [
        {
          offset: `${offset - halfFadeDistance}%`,
          color: colors[Math.abs(pPoint[1])],
        },
        {
          offset: `${offset + halfFadeDistance}%`,
          color: colors[Math.abs(p[1])],
        },
      ];
    }),
  );

  // apply color gradient to lines
  defs
    .append("linearGradient")
    .attr("id", name)
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", axisScale(start))
    .attr("x2", 0)
    .attr("y2", axisScale(end))
    .selectAll("stop")
    .data(colorSections)
    .enter()
    .append("stop")
    .attr("offset", (d) => d.offset)
    .attr("stop-color", (d) => d.color);
};
