/*
 * This class is intended to be extended to make rendering d3 in react easier
 *
 * Life cycle of how this works
 *
 * 1) This class acts as kind of like a middle layer that does the trivial
 * canvas rendering and dom referencing for you
 *
 * 2) You must implement the updateD3
 */

import * as React from "react";
import * as d3 from "d3";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { Selection } from "d3";
const css = cssComposer(styles);

export default class D3Component<P = {}, S = {}> extends React.Component<P, S> {
  protected element: null | HTMLDivElement = null;
  protected svg: Selection<any, any, any, any> = null;

  protected width: number = 0;
  protected height: number = 0;

  private _setup: boolean = false;

  protected defs: null | Selection<SVGDefsElement, any, SVGDefsElement, any> =
    null;

  // warning: do not override
  public componentDidMount() {
    const { element } = this;

    if (!element) {
      throw new Error("Unable to find the dom element, cannot render d3");
    }

    // HACK required for heights to work properly with styleguidist - added the _setup
    // field to avoid an update before the initial set up
    setTimeout(() => {
      // draw the base svg with d3
      this.width = element.clientWidth;
      this.height = Math.max(200, element.clientHeight);

      this.svg = d3
        .select(element)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);

      // initialize defs
      this.defs = this.svg.append("defs");

      this.setupD3(this.element, this.svg, this.width, this.height);
      this._setup = true;
      this.updateD3();
    });
  }

  // the component directly updates the DOM, so we block the usual render method.
  // note: if you override, you will need to call updateD3 when the component changes.
  public componentDidUpdate() {
    if (this._setup) {
      this.updateD3();
    }
    return false;
  }

  public render() {
    return <div className={css("main")} ref={(ref) => (this.element = ref)} />;
  }

  // must be overriden in subclass. Please use the same notation, ie. setupD3 = (svg) => {
  protected setupD3(
    element: HTMLDivElement,
    svg: Selection<SVGSVGElement, any, SVGSVGElement, any>,
    width: number,
    height: number,
  ) {
    throw new Error("setupD3 must be overridden");
  }

  // must be overriden in subclass. Please use the same notation, ie. updateD3 = (svg) => {
  protected updateD3() {
    throw new Error("updateD3 must be overridden");
  }
}
