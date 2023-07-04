import * as React from "react";

import CircularIcon from "../../generic/CircularIcon";
import { KeypadWrapper } from "../../generic/KeypadWrapper";
import { NumberKeypad } from "../../generic/Keypad";
import sharedStyles from "../styles.scss";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";

const css = cssComposer(styles);

export interface INumberInputProps {
  onInputChange: (value: any) => void;
  incrementValue?: number;
  value: any;
  placeholder?: string;
  disabled?: boolean;
  minValue?: number;
  maxValue?: number;
  hint?: string;
  /** Disable the keypad */
  hideKeypad?: boolean;
  /** Show the keypad at all times (typically only on focus) */
  alwaysShowKeypad?: boolean;
}

/**
 * Number input
 */
export const NumberInput: React.FC<INumberInputProps> = ({
  onInputChange,
  incrementValue,
  value,
  placeholder,
  disabled,
  minValue,
  maxValue,
  hint,
  hideKeypad = true,
  alwaysShowKeypad = false,
}) => {
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = evt.target.value;
    // only allows valid numbers
    // this still allows for leading/trailing zeroes, a single dash and negative
    // zero
    // this is so we can still enter valid values without it being reset
    // the pattern on the component however should complain about not valid
    // numbers
    const match = newValue.match(/^-$|^-?[0-9]*(?:\.[0-9]*)?$/g);
    if (match === null) {
      newValue = evt.target.defaultValue;
    }
    onInputChange(newValue);
  };

  // need to use text to allow for partial inputs using the keypad, e.g. "10."
  const input = (
    <input
      data-test="input"
      data-hint={hint}
      type="text"
      onChange={onChange}
      onClick={(evt) => evt.stopPropagation()}
      // need to check string and number value as the counters will
      // convert and not allow zero
      value={value || typeof value === "number" ? `${value}` : ""}
      placeholder={placeholder}
      disabled={disabled}
      min={minValue}
      max={maxValue}
      pattern="^-?[0-9]\d*(\.\d+)?$"
      className={sharedStyles.Input}
    />
  );

  const wrapComponent = (component: React.ReactElement<any>) => {
    const numValue = typeof value === "number" ? value : parseFloat(value);

    return (
      <div className={css("counters")}>
        <span
          className={css("counters_counter", "-left")}
          data-test="minus-counter"
        >
          <CircularIcon
            className={css("counters_icon")}
            name={"minus"}
            onClick={() => {
              // need to check if parsed number is NaN
              // otherwise the input will put that as the value
              if (!isNaN(numValue)) {
                onInputChange(numValue - incrementValue);
              }
            }}
          />
        </span>
        {component}
        <span
          className={css("counters_counter", "-right")}
          data-test="plus-counter"
        >
          <CircularIcon
            className={css("counters_icon")}
            name={"plus"}
            onClick={() => {
              // need to check if parsed number is NaN
              // otherwise the input will put that as the value
              if (!isNaN(numValue)) {
                onInputChange(numValue + incrementValue);
              }
            }}
          />
        </span>
      </div>
    );
  };

  const component = incrementValue !== undefined ? wrapComponent(input) : input;

  return hideKeypad ? (
    component
  ) : (
    <KeypadWrapper
      inputComponent={component}
      alwaysShowKeypad={alwaysShowKeypad}
      keypadComponent={<NumberKeypad />}
    />
  );
};
