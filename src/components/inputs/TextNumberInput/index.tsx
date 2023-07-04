import * as React from "react";

import { BaseInput, IBaseInputProps } from "../BaseInput";
import { KeypadWrapper } from "../../generic/KeypadWrapper";
import { NumberKeypad } from "../../generic/Keypad";
import sharedStyles from "../styles.scss";

export interface ITextNumberInputProps extends IBaseInputProps<string> {
  maxLength?: number;
  allowableValues?: string;
}

export class TextNumberInput extends BaseInput<string, ITextNumberInputProps> {
  public allowableValues: string;
  constructor(props: ITextNumberInputProps) {
    super(props);
    this.bannedValuesRegex = /[^\d\s]/g;
  }
  render() {
    const {
      value = "",
      placeholder = "",
      disabled = false,
      hideKeypad = false,
      maxLength,
    } = this.props;

    const input = (
      <input
        data-test="input"
        type="text"
        onChange={(evt) => {
          this.onInputChange(evt.target.value);
        }}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={sharedStyles.Input}
        pattern="^-?[0-9]\d*(\.\d+)?$"
      />
    );
    return hideKeypad ? (
      input
    ) : (
      <KeypadWrapper
        inputComponent={input}
        keypadComponent={<NumberKeypad />}
      />
    );
  }
}
