import * as React from "react";

import CircularIcon from "../../generic/CircularIcon";
import { KeypadWrapper } from "../../generic/KeypadWrapper";
import { NumberKeypad } from "../../generic/Keypad";
import sharedStyles from "../styles.scss";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";

const css = cssComposer(styles);

export interface IIntegerInputProps {
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
 * Number input. Not suitable for phone numbers or other fields requiring special characters.
 */
export const IntegerInput: React.FC<IIntegerInputProps> = ({
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
    onInputChange(parseInt(evt.target.value));
  };

  // need to use text to allow for partial inputs using the keypad, e.g. "10."
  const input = (
    <input
      data-test="input"
      data-hint={hint}
      type="number"
      onChange={onChange}
      onClick={(evt) => evt.stopPropagation()}
      // need to check string and number value as the counters will
      // convert and not allow zero
      value={value ? `${value}` : ""}
      placeholder={placeholder}
      disabled={disabled}
      min={minValue}
      max={maxValue}
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
