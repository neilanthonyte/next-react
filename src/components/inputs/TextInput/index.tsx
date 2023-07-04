import * as React from "react";

import { BaseInput, IBaseInputProps } from "../BaseInput";
import { KeypadWrapper } from "../../generic/KeypadWrapper";
import sharedStyles from "../styles.scss";

/**
 * Provides a text input.
 */

export interface ITextInputProps<T> extends IBaseInputProps<T> {
  allowNewlines?: boolean;
  keypadOptions?: { label: string; value: string | number }[] | null;
  /** true by default. needed for some special cases where trailing spaces are relevant (calendar input dealing with dates) */
  trimOnBlur?: boolean;
}

export class TextInput extends BaseInput<string, ITextInputProps<string>> {
  render() {
    const {
      value,
      placeholder = "",
      allowNewlines = false,
      disabled = false,
      keypadOptions = null,
      hint,
      trimOnBlur = true,
    } = this.props;

    const getInput = () => {
      if (allowNewlines) {
        return (
          <textarea
            data-test="input"
            data-hint={hint}
            onChange={(evt) => {
              this.onInputChange(evt.target.value);
            }}
            onBlur={(evt) => {
              this.onInputChange(
                trimOnBlur ? evt.target.value.trim() : evt.target.value,
              );
            }}
            value={value || ""}
            placeholder={placeholder}
            disabled={disabled}
            data-input-type="textarea"
            className={sharedStyles.Input}
          />
        );
      } else {
        return (
          <input
            data-test="input"
            data-hint={hint}
            type="text"
            onChange={(evt) => {
              this.onInputChange(evt.target.value);
            }}
            onBlur={(evt) => {
              this.onInputChange(
                trimOnBlur ? evt.target.value.trim() : evt.target.value,
              );
            }}
            value={value || ""}
            placeholder={placeholder}
            disabled={disabled}
            data-input-type="singleLine"
            className={sharedStyles.Input}
          />
        );
      }
    };

    const input = getInput();
    return keypadOptions ? (
      <KeypadWrapper inputComponent={input} keypadOptions={keypadOptions} />
    ) : (
      input
    );
  }
}
