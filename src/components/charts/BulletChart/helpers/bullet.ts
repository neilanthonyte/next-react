import { descending as d3Descending } from "d3-array";
import { ScaleLinear, scaleLinear as d3ScaleLinear } from "d3-scale";
import { BaseType, select as d3Select, Selection, ValueFn } from "d3-selection";
import { timerFlush as d3TimerFlush } from "d3-timer";
import * as d3 from "d3";
import "d3-transition";

interface IOptions {
  minMarkerStroke: string;
  maxMarkerStroke: string;
  markerStroke: string;
  minTextHeight: number;
  maxTextHeight: number;
  markerTextHeight: number;
  markerStrokeColor: string;
  markerStrokeY1: number;
  markerFontSize: string;
  textFontSize: string;
  markerStrokeY2IncludeTextHeight: boolean;
}

/**
 * data interface
 */
interface IData {
  title: string;
  measures: number[];
  minRange: number;
  maxRange: number;
  marker: number;
  colours: string[];
  measurement: string;
  tickFormat: string;
  minScale: number;
  options: IOptions;
}

/**
 * bullet interface
 */
interface IBullet {
  build: (g: Selection<BaseType, ValueFn<BaseType, {}, {}[]>, any, {}>) => void;
  setWidth: (_: number) => void;
  setHeight: (_: number) => void;
  setDuration: (x: number) => void;
  setVertical: () => void;
  setHorizontal: () => void;
}

/**
 * bullet chart
 *
 * @returns {IBullet}
 */
export class Bullet implements IBullet {
  // chart properties
  private duration = 0;
  private measures = bulletMeasures;
  private minRange = bulletMinRange;
  private maxRange = bulletMaxRange;
  private marker = bulletMarker;
  private colours = bulletColours;
  private measurement = bulletMeasurement;
  private tickFormat = bulletTickFormat;
  private minScale = bulletMinScale;
  private options = bulletOptions;
  private width = 380;
  private height = 30;
  private vertical = false;

  /**
   * build the chart
   *
   * @param {Selection<BaseType, ValueFn<BaseType, {}, {}[]>, any, {}>} g
   */
  public build(
    g: Selection<BaseType, ValueFn<BaseType, {}, {}[]>, any, {}>,
  ): void {
    const scope = this;
    /**
     * we loop through each data object given in the array
     * this should only be one chart to build anyway
     */
    g.each(function (
      this: any,
      d: ValueFn<BaseType, ValueFn<BaseType, {}, {}[]>, void>,
      i: number,
    ): void {
      // chart data
      const measurez = scope.measures
          .call(this, d, i)
          .slice()
          .sort(d3Descending),
        minRangez = scope.minRange.call(this, d, i),
        maxRangez = scope.maxRange.call(this, d, i),
        markerz = scope.marker.call(this, d, i),
        colourz = scope.colours.call(this, d, i),
        measurement = scope.measurement.call(this, d, i),
        tickFormat = scope.tickFormat.call(this, d, i),
        minScale = scope.minScale.call(this, d, i),
        options = scope.options.call(this, d, i);

      // the main d3 chart
      const g2 = d3Select(this);

      // chart bounds
      let extentX, extentY;

      // add a wrap container to hold the chart
      let wrap = g2.select("g.wrap") as Selection<
        SVGGElement,
        {},
        null,
        undefined
      >;
      if (wrap.empty())
        wrap = g2
          .append("g")
          .attr("class", "wrap")
          .attr("stroke", "#999")
          .attr("stroke-width", "1px");

      // depending on the mode
      // set the chart bounds based on the height and width
      // set the chart orientation
      if (scope.vertical) {
        extentX = scope.height;
        extentY = scope.width;
        wrap.attr("transform", "rotate(90)translate(0," + -scope.width + ")");
      } else {
        extentX = scope.width;
        extentY = scope.height;
        wrap.attr("transform", null);
      }

      // get max value
      const max = Math.max(
        minRangez,
        maxRangez,
        markerz,
        Math.max(...measurez),
      );

      // Compute the new x-scale.
      const x1 = d3ScaleLinear()
        .domain([minScale, max])
        .range(scope.vertical ? [extentX, 0] : [0, extentX]);

      // Retrieve the old x-scale, if this is an update.
      const x0 =
        this["__chart__"] ||
        d3ScaleLinear().domain([0, Infinity]).range(x1.range());

      // Stash the new scale.
      this["__chart__"] = x1;

      // Derive width-scales from the x-scales.
      // const w0 = bulletWidth(x0);
      const w1 = bulletWidth(x1);

      // Update the measure rects.
      const measure = wrap.selectAll("rect.measure").data(measurez);

      // add measure bars
      measure
        .enter()
        .append("rect")
        // set the size of the rect
        .attr(
          "width",
          w1 as unknown as ValueFn<
            SVGRectElement,
            {},
            string | number | boolean
          >,
        )
        .attr("height", extentY)
        // set the orientation
        .attr(
          "x",
          (scope.vertical ? x1 : 0) as unknown as ValueFn<
            SVGRectElement,
            {},
            string | number | boolean
          >,
        )
        // set the colour of the bar from the data array
        .attr("fill", (d: {}, i: number) => colourz[colourz.length - 1 - i]);

      /**
       * add line for marker or range
       *
       * @param {number} value
       * @param {string} type
       * @param {string} strokeWidth
       * @param {boolean} dashedLine
       * @param {boolean} largeText
       * @param {number} textHeight
       */
      const addLine = (
        value: number,
        type: string,
        strokeWidth: string,
        dashedLine: boolean,
        largeText: boolean,
        textHeight: number,
      ): void => {
        // cast value to an array
        let values = [value];

        // set negative values to start their marker at 0
        values = values.map((value: number) => (value < 0 ? 0 : value));
        // create line
        const line = wrap.selectAll(`line.${type}`).data(values);

        let y2Value;

        // Work out y2 length, the stoke height of the marker
        if (scope.vertical) {
          y2Value = scope.width + 10;
        } else {
          y2Value =
            options.markerStrokeY2IncludeTextHeight && type === "marker"
              ? scope.height + textHeight
              : scope.height;
        }
        if (options.showRangeMarkers || type === "marker") {
          line
            .enter()
            .append("line")
            .attr("class", type)
            // orientation should handle the line direction but we need to fix the y2 value
            .attr(
              "x1",
              x1 as unknown as ValueFn<
                SVGLineElement,
                {},
                string | number | boolean
              >,
            )
            .attr(
              "x2",
              x1 as unknown as ValueFn<
                SVGLineElement,
                {},
                string | number | boolean
              >,
            )
            .attr("y1", options.markerStrokeY1)
            .attr("y2", y2Value)
            // set the line colour
            .attr("stroke", options.markerStrokeColor)
            // set the stroke width from the passed in argument
            .attr("stroke-width", strokeWidth);

          // create a dash line if necessary
          if (dashedLine) {
            line
              .enter()
              .selectAll(`line.${type}`)
              .attr("stroke-dasharray", "2, 2");
          }
        }

        // Compute the tick format.
        const format = x1.tickFormat(8);
        const formatDate = d3.timeFormat("%d %b %H:%M");

        // get the data values for each line
        const tickVals: any[] = [];
        values.forEach((e: number) => {
          if (tickVals.indexOf(e) === -1) tickVals.push(e);
        });

        // create the tick where the line meets
        // Update the tick values to the correct format.
        const tick = g
          .selectAll(`g.${type}TextContainer`)
          .data(tickVals, (d: any): string => format(d));

        // add a text container for the tic
        const tickEnter = tick
          .enter()
          .append("g")
          .attr("class", `${type}TextContainer`)
          // initialize the ticks with the old scale, x0.
          .attr("transform", bulletTranslate(x0, scope.vertical))
          .style("opacity", 1e-6);

        if (
          (options.showMarkerText && type === "marker") ||
          type === "minRange" ||
          type === "maxRange"
        ) {
          /**
           * text to show against the line tick
           *
           * @param {number} d
           * @returns {string}
           */

          // currently supports date and number data types, if a further is required provide an additional formatting function
          // and add to the switch case
          // we use the passed in value for the text as this could be negative
          const text = (): string => {
            let textValue: string;
            switch (tickFormat) {
              case "date":
                textValue = formatDate(new Date(value * 1000));
                break;
              default:
                textValue = format(value);
                break;
            }

            return textValue + (measurement ? measurement : "");
          };

          // create the text
          // position the text accordingly to the chart mode
          if (scope.vertical) {
            tickEnter
              .append("text")
              .attr("alignment-baseline", "middle")
              .attr("text-anchor", "start")
              .attr("dx", scope.width + 15)
              .attr("y", 0)
              .text(text);
          } else {
            tickEnter
              .append("text")
              .attr("text-anchor", (d: number) => {
                let valuePercentOfMax;

                if (minScale === 0) {
                  valuePercentOfMax = d / max;
                } else {
                  const normalizedMax = max - minScale;
                  const normalizedValue = d - minScale;

                  valuePercentOfMax = normalizedValue / normalizedMax;
                }

                switch (true) {
                  case valuePercentOfMax < 0.25:
                    return "start";
                  case valuePercentOfMax > 0.75:
                    return "end";
                  default:
                    return "middle";
                }
              })
              .attr("dy", "1em")
              .attr("y", scope.height + textHeight)
              .text(text);
          }

          // set the size and boldness of the text based on the argument given
          if (largeText) {
            tickEnter
              .style("font-size", options.markerFontSize)
              .style("font-weight", "bold");
          } else {
            tickEnter.style("font-size", options.textFontSize);
          }

          // transition the entering ticks to the new scale, x1.
          tickEnter
            .attr("transform", bulletTranslate(x1, scope.vertical))
            .style("opacity", 1);

          // transition the updating ticks to the new scale, x1.
          const tickUpdate = tick
            .attr("transform", bulletTranslate(x1, scope.vertical))
            .style("opacity", 1);

          // transition the updating tick lines to their given position
          // transition the line text to their given position
          if (scope.vertical) {
            tickUpdate.select("line").attr("x1", -10).attr("x2", 0);

            tickUpdate.select("text").attr("y", -10);
          } else {
            tickUpdate
              .select("line")
              .attr("y1", -10)
              .attr("y2", scope.height + 10);

            tickUpdate.select("text").attr("y", -5 - scope.height);
          }
        }
      };

      addLine(
        minRangez,
        "minRange",
        options.minMarkerStroke,
        true,
        false,
        options.minTextHeight,
      );
      addLine(
        maxRangez,
        "maxRange",
        options.maxMarkerStroke,
        true,
        false,
        options.maxTextHeight,
      );

      // add lines for the markers
      addLine(
        markerz,
        "marker",
        options.markerStroke,
        false,
        true,
        options.markerTextHeight,
      );
    });

    // flush the animation timer
    d3TimerFlush();
  }

  /**
   * width
   *
   * @param {number} _
   * @returns {Bullet}
   */
  public setWidth = (_: number): Bullet => {
    this.width = _;
    return this;
  };

  /**
   * height
   *
   * @param {number} _
   * @returns {Bullet}
   */
  public setHeight = (_: number): Bullet => {
    this.height = +_;
    return this;
  };

  /**
   * duration
   *
   * @param {number} x
   * @returns {Bullet}
   */
  public setDuration = (x: number): Bullet => {
    this.duration = x;
    return this;
  };

  /**
   * vertical
   *
   * @returns {Bullet}
   */
  public setVertical = (): Bullet => {
    this.vertical = true;
    return this;
  };

  /**
   * horizontal
   *
   * @returns {Bullet}
   */
  public setHorizontal = (): Bullet => {
    this.vertical = false;
    return this;
  };
}

/**
 * helper function to set the measures
 *
 * @param {IData} d
 * @returns {number[]}
 */
const bulletMeasures = (d: IData): number[] => {
  return d.measures;
};

/**
 * helper function to set the min range
 *
 * @param {IData} d
 * @returns {number}
 */
const bulletMinRange = (d: IData): number => {
  return d.minRange;
};

/**
 * helper function to set the min range
 *
 * @param {IData} d
 * @returns {number}
 */
const bulletMaxRange = (d: IData): number => {
  return d.maxRange;
};

/**
 * helper function to set the markers
 *
 * @param {IData} d
 * @returns {number}
 */
const bulletMarker = (d: IData): number => {
  return d.marker;
};

/**
 * helper function to set the colours
 *
 * @param {IData} d
 * @returns {string[]}
 */
const bulletColours = (d: IData): string[] => {
  return d.colours;
};

/**
 * helper function to set the measurement
 *
 * @param {IData} d
 * @returns {string}
 */
const bulletMeasurement = (d: IData): string => {
  return d.measurement;
};

// if tickFormat is set will use otherwise defaults to number
const bulletTickFormat = (d: IData): string => {
  return d.tickFormat ? d.tickFormat : "number";
};

const bulletMinScale = (d: IData) => {
  return d.minScale ? d.minScale : 0;
};

const bulletOptions = (d: IData) => {
  const specOptions = d.options;

  const baseOptions: IOptions = {
    markerStroke: "4px",
    markerTextHeight: 35,
    minMarkerStroke: "2px",
    minTextHeight: 10,
    maxTextHeight: 25,
    maxMarkerStroke: "2px",
    markerStrokeColor: "#999",
    markerStrokeY1: -10,
    markerFontSize: "24px",
    textFontSize: "12px",
    markerStrokeY2IncludeTextHeight: true,
  };

  return Object.assign(baseOptions, specOptions);
};

/**
 * helper function to translate a position
 *
 * @param {ScaleLinear<number, number>} x
 * @param {boolean} vertical
 * @returns {(d: number) => string}
 */
const bulletTranslate =
  (
    x: ScaleLinear<number, number>,
    vertical: boolean,
  ): ((d: number) => string) =>
  (d: number): string =>
    vertical ? "translate(0," + x(d) + ")" : "translate(" + x(d) + ",0)";

/**
 * helper function to calculate width
 *
 * @param {ScaleLinear<number, number>} x
 * @returns {(d: any) => number}
 */
const bulletWidth = (x: ScaleLinear<number, number>) => {
  const x0 = x(0);
  return (d: number) => Math.abs(x(d) - x0);
};
