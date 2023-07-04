import * as React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { withSize, SizeMeProps } from "react-sizeme";

// css
import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
import { Bullet } from "./helpers/bullet";
const css = cssComposer(styles, "bulletChart");

/**
 * chart mode type
 */
export type modeType = "vertical" | "horizontal";

/**
 * margin type
 */
type marginType = { top: number; right: number; bottom: number; left: number };

/**
 * Single stacked bar chart.
 * Can display:
 *  - multiple measures as different colored bars.
 *  - ranges as text
 *  - line marker
 *  - legend
 */
export interface IBulletChartProps {
  /**
   * data use to build the chart
   * example:
   * const data = {
   *   title: "Count",
   *   measures: [1400, 1750, 2100, 2500],
   *   ranges: [1000, 2500],
   *   markers: [2200],
   *   colours: ["#68BB37", "#00BFC0", "#FFFFBF", "#DADADA"],
   *   measurement: "kg"
   * };
   */
  data: any;
  /**
   * whether to show the bullet chart vertically or horizontally
   */
  mode: modeType;
  barSize: number;
  elementHeight?: number;
}

export const _BulletChart: React.FC<SizeMeProps & IBulletChartProps> = ({
  size,
  data,
  mode,
  barSize,
  elementHeight,
}): React.ReactElement<any> => {
  // get the element reference to attach the bullet chart
  const element = useRef(null);

  // find the orientation of the chart from the passed in mode
  const vertical = mode === "vertical";

  // wait till page has loaded before adding bullet chart
  useEffect(
    () => {
      if (element.current) {
        // reset current svgs
        element.current.innerHTML = "";
        // set the size of the bullet chart base on the mode
        let margin: marginType, width: number, height: number;
        if (vertical) {
          margin = { top: 10, right: 150, bottom: 50, left: 70 };
          width = barSize;
          height =
            element.current.parentNode.clientHeight -
            margin.top -
            margin.bottom;
        } else {
          margin = { top: data.title ? 30 : 15, right: 0, bottom: 40, left: 0 };
          width = element.current.clientWidth - margin.left - margin.right;
          height = barSize;
        }

        // instantiate the chart and set the size
        const chart = new Bullet().setWidth(width).setHeight(height);

        // set the orientation of the chart
        if (vertical) {
          chart.setVertical();
        } else {
          chart.setHorizontal();
        }

        // add the bullet chart to the given element as an svg
        const svg = d3
          .select(element.current)
          .selectAll("div")
          .data([data])
          .enter()
          .append("svg");

        // set the chart size based on the mode
        if (vertical) {
          const eleHeight: number | string = elementHeight
            ? elementHeight
            : "100%";
          svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", eleHeight);
        } else {
          const eleHeight: number = elementHeight
            ? elementHeight
            : height + margin.top + margin.bottom;
          svg.attr("width", "100%").attr("height", eleHeight);
        }

        // add the bullet chart to the svg
        svg
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")",
          );

        // build the chart
        chart.build(svg.select("g"));

        // create the secondary title and position it accordingly to the chart
        // mode
        let secondaryTitle;
        if (vertical) {
          secondaryTitle = svg
            .append("g")
            .style("text-anchor", "middle")
            .attr(
              "transform",
              "translate(" +
                (margin.left + width / 2) +
                "," +
                (height + 45) +
                ")",
            );
        } else {
          secondaryTitle = svg
            .append("g")
            .style("text-anchor", "end")
            .attr("transform", `translate(${width},15)`);
        }

        // add the title text and style it
        secondaryTitle
          .append("text")
          .style("font-size", "14px")
          .text(function (d: any) {
            return d.secondaryTitle;
          });

        // get the length of the secondary title so we can caculate the width
        // of the primary title so they don't overlap
        const text = secondaryTitle.select("text").node() as SVGTextElement;
        const secondaryTitleTextLength = text.getComputedTextLength();

        // create the title and position it accordingly to the chart mode
        let title;
        if (vertical) {
          title = svg
            .append("g")
            .style("text-anchor", "middle")
            .attr(
              "transform",
              "translate(" +
                (margin.left + width / 2) +
                "," +
                (height + 30) +
                ")",
            );
        } else {
          title = svg
            .append("g")
            .style("text-anchor", "start")
            .attr("transform", "translate(0,15)");
        }

        // add the title text and style it
        title
          .append("text")
          .style("font-size", "14px")
          .text(function (d: any) {
            return d.title;
          })
          .each(function () {
            // fix overlapping of primary and secondary title by ellipsing the
            // primary text.
            // this only happens on the horizontal chart
            if (!vertical) {
              const self = d3.select(this);
              let textLength = self.node().getComputedTextLength();
              let text = self.text();
              while (
                textLength > width - secondaryTitleTextLength &&
                text.length > 0 &&
                text[text.length - 1] !== " "
              ) {
                text = text.slice(0, -3);
                self.text(text + "..");
                textLength = self.node().getComputedTextLength();
              }
            }
          });

        // add labels for colours
        if (data.labels) {
          // we create a new svg so we can constrain the width
          const svg = d3
            .select(element.current)
            .selectAll("div")
            .data([data])
            .enter()
            .append("svg");

          // calculate width based on boxes and labels
          let totalWidth = 0;
          data.labels.forEach((label: string, index: number) => {
            totalWidth = totalWidth + data.labels[index].length * 10 + 25;
          });

          // find the max text length out of all labels
          const maxTextLength = data.labels.reduce(
            (max: number, currentLabel: string) =>
              Math.max(max, currentLabel.length),
            0,
          );

          // set svg properties
          svg
            .attr("width", vertical ? maxTextLength * 10 + 25 : totalWidth)
            .attr("height", vertical ? data.labels.length * 30 : 18);

          // create the legend
          const legend = svg.append("g");
          let x = 0;
          // create a label for each color
          data.labels.forEach((label: string, index: number) => {
            // add box for label color
            legend
              .append("rect")
              .attr("class", css("labelBox"))
              // position based on box and text width
              // all should be next to each other
              .attr("x", () => (vertical ? 0 : index * 30 + x))
              .attr("y", () => (vertical ? index * 30 : 0))
              .attr("width", 18)
              .attr("height", 18)
              .style(
                "fill",
                // fill of box is from the colours array in the data
                (d: any) => d.colours[index],
              );

            // create text for the label
            legend
              .append("text")
              .attr("class", css("labelText"))
              // position based on box and text width
              // all should be next to each other
              .attr("x", () => (vertical ? 25 : index * 30 + (x + 25)))
              .attr("y", () => (vertical ? index * 30 + 10 : 10))
              .attr("height", 14)
              .text(data.labels[index]);

            // calculate the current x position based on text width
            x = 0;
            for (let i = 0; i <= index; i++) {
              x = x + data.labels[i].length * 10;
            }
          });
        }
      }
      // update chart when data or window width changes
    },
    vertical ? [data, size.height] : [data, size.width],
  );

  // render
  return (
    // hack: have to wrap in a relative div otherwise sizeMe doesn't report
    // size changes
    <div className={css("")}>
      <div
        className={css("container", { "-vertical": vertical })}
        ref={element}
      />
    </div>
  );
};

export const BulletChart: React.FC<IBulletChartProps> = withSize({
  monitorWidth: true,
  monitorHeight: true,
})(_BulletChart) as React.FC<IBulletChartProps>;
