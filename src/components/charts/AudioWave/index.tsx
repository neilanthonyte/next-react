import * as d3 from "d3";
import * as _ from "lodash";

import D3Component from "../D3Component";

if (typeof env.ekoUrl === "undefined") {
  throw Error("ekoUrl missing");
}

let maxPoints = 400;
const maxValue = 32768;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };

const SAMPLE_RATE = 4000;
const FRAMERATE = 30;
const DOWNSAMPLE_SIZE = 50;
const PER_FRAME_OFFSET_CHANGE = SAMPLE_RATE / DOWNSAMPLE_SIZE / FRAMERATE;

export interface IAudioWaveProps {}
export interface IAudioWaveState {
  data: number[];
}

class AudioWave extends D3Component<IAudioWaveProps, IAudioWaveState> {
  private sampleOffset: number;
  private rawSamples: number[];
  private downSampled: number[];
  private ws: WebSocket;
  private renderLoop: number;

  private g: d3.Selection<SVGGElement, any, SVGSVGElement, any>;
  private x: d3.ScaleLinear<number, number>;
  private y: d3.ScaleLinear<number, number>;

  private line: any;

  constructor(props: IAudioWaveProps) {
    super(props);
    this.state = {
      data: [],
    };
    this.sampleOffset = 0;
    this.rawSamples = [];
    this.downSampled = [];
    this.onSocketUpdate = this.onSocketUpdate.bind(this);
    this.selectSamples = this.selectSamples.bind(this);
    this.setupD3 = this.setupD3.bind(this);
    this.updateD3 = this.updateD3.bind(this);
  }

  public setupD3(
    el: HTMLDivElement,
    svg: d3.Selection<SVGSVGElement, any, SVGSVGElement, any>,
    width: number,
    height: number,
  ) {
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;
    maxPoints = width;

    this.ws = new WebSocket(env.ekoUrl);
    this.ws.onmessage = this.onSocketUpdate;

    // start render loop
    this.renderLoop = setInterval(
      this.selectSamples,
      1000 / FRAMERATE,
    ) as any as number;

    this.g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.x = d3.scaleLinear().rangeRound([0, width]);

    this.y = d3.scaleLinear().rangeRound([height, 0]);

    this.line = d3
      .line()
      .x((d, i) => this.x(i))
      .y((d) => this.y(d as any)); // hack

    this.x.domain([0, maxPoints]);
    this.y.domain([-maxValue, maxValue]);

    this.g
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(this.x))
      .select(".domain")
      .remove();

    this.g
      .append("g")
      .call(d3.axisLeft(this.y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end");
  }

  public onSocketUpdate(event: MessageEvent) {
    // decode data
    for (let n = 0; n < event.data.length; ++n) {
      let code = event.data.charCodeAt(n);
      if (code > 32767) {
        code = code - 65536;
      }
      this.rawSamples.push(code);
    }
    // reset the offset
    this.sampleOffset = 0;

    // downsample the data
    for (
      let m = DOWNSAMPLE_SIZE;
      m <= this.rawSamples.length;
      m += DOWNSAMPLE_SIZE
    ) {
      let mag = 0;
      let posNeg = 0;

      _.each(this.rawSamples.slice(m - DOWNSAMPLE_SIZE, m), (v) => {
        mag += Math.abs(v);
        posNeg += v;
      });
      // determine magnitude and pick most common direction (pos or neg)
      const avg = (mag / DOWNSAMPLE_SIZE) * (posNeg > 0 ? 1 : -1);
      this.downSampled.push(avg);

      // count the number of rawSamples we add
      this.sampleOffset++;
    }
    // remove downsampled data
    this.rawSamples = _.takeRight(
      this.rawSamples,
      this.rawSamples.length % DOWNSAMPLE_SIZE,
    );
    // avoid this getting too large
    this.downSampled = _.takeRight(this.downSampled, maxPoints * 2);
  }

  public componentWillUnmount() {
    clearInterval(this.renderLoop);
  }

  public selectSamples() {
    const offset = Math.round(this.sampleOffset);
    const subset = this.downSampled.slice(
      -maxPoints - offset,
      offset ? -offset : undefined,
    );
    this.setState({ data: subset });
    this.sampleOffset = Math.max(
      0,
      this.sampleOffset - PER_FRAME_OFFSET_CHANGE,
    );
  }

  public updateD3() {
    this.g.select("path").remove();
    this.g
      .append("path")
      .datum(this.state.data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", this.line);
  }
}

export default AudioWave;
