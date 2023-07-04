import * as React from "react";

import { Icon } from "../Icon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

export interface ISliderProps {
  /** Slider min value */
  min: number;
  /** Slider max value */
  max: number;
  /** Slider initial value */
  value?: number;
  /** Incremental step */
  step?: number;
  /** On input change callback */
  onChange: (value: number) => void;
  /** Flag to show min and max values labels */
  showLimits?: boolean;
  /** Flag to show the current value */
  showValue?: boolean;
  /** Flag to show increase and decrease control buttons */
  showControls?: boolean;
  /** Function to format value and labels */
  formatFn?: (value: number) => number | string;
}

export default class Slider extends React.Component<ISliderProps, {}> {
  constructor(props: ISliderProps) {
    super(props);
    if (props.min >= props.max) {
      throw new Error("Min value has to be smaller than Max value");
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
  }

  private handleChange(value: number) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  private handleIncrease() {
    const { max, value, step = 1 } = this.props;
    const currentValue = value;
    const newValue = currentValue + step;
    if (newValue <= max) {
      this.handleChange(newValue);
    }
  }

  private handleDecrease() {
    const { min, value, step = 1 } = this.props;
    const currentValue = value;
    const newValue = currentValue - step;
    if (newValue >= min) {
      this.handleChange(newValue);
    }
  }

  private getFormattedValue(v: number) {
    const { formatFn } = this.props;
    return formatFn ? formatFn(v) : v;
  }

  public render() {
    const { value, showControls, showLimits, showValue, min, max } = this.props;
    return (
      <React.Fragment>
        {showValue && (
          <div className={css("slider_value")}>
            {this.getFormattedValue(value)}
          </div>
        )}
        <div className={css("slider")}>
          {showControls && (
            <div
              onClick={this.handleDecrease}
              className={css("slider_control")}
            >
              <Icon name="circle-minus" />
            </div>
          )}
          {showLimits && <span>{this.getFormattedValue(min)}</span>}
          <InputSlider
            {...this.props}
            value={value}
            onChange={this.handleChange}
          />
          {showLimits && <span>{this.getFormattedValue(max)}</span>}
          {showControls && (
            <div
              onClick={this.handleIncrease}
              className={css("slider_control")}
            >
              <Icon name="circle-plus" />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export const InputSlider = (props: ISliderProps) => {
  const { min, max, value, step, onChange, showLimits } = props;
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // @ts-ignore
    if (onChange) {
      onChange(parseFloat(e.target.value));
    }
  }
  return (
    <input
      onChange={handleChange}
      type="range"
      min={min}
      max={max}
      value={value}
      step={step}
      className={css("slider_input")}
    />
  );
};
