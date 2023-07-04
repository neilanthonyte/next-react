import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

export interface IColorsSwatchState {
  colors: Array<{
    el: HTMLDivElement;
    color: string;
  }>;
}

/**
 *  Component showing system colors.
 *
 *  Used for reference and documentation purposes only.
 */
class ColorsSwatch extends React.PureComponent<{}, IColorsSwatchState> {
  public state: IColorsSwatchState = { colors: [] };
  private timeout: number;
  private colors: Array<{
    el: HTMLDivElement;
  }> = [];

  public componentDidMount() {
    // tslint:disable-next-line:comment-format
    // HACK set timer to let browser render css colors
    this.timeout = window.setTimeout(() => {
      const newCols = this.colors.map((col) => {
        return {
          ...col,
          color: window
            .getComputedStyle(col.el, null)
            .getPropertyValue("background-color"),
        };
      });
      this.setState({ colors: newCols });
    }, 500);
  }

  public componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  public render() {
    const { colors } = this.state;
    const cols = Object.keys(styles);
    return cols.map((col, i) => (
      <div key={i}>
        <div className={css(col)} ref={(el) => this.colors.push({ el })} />
        <p>
          {col} <br />
          {colors.length && colors[i].color}
        </p>
      </div>
    ));
  }
}

export default ColorsSwatch;
