import * as React from "react";

import {
  toNationalFormat,
  toUnformattedInternational,
} from "next-shared/src/helpers/phoneNumberHelpers";

import { NumberKeypad } from "../../generic/Keypad";
import { IBaseInputProps } from "../BaseInput";
import { KeypadWrapper } from "../../generic/KeypadWrapper";
import sharedStyles from "../styles.scss";

const toPresentationFormat = (phone: string) =>
  toNationalFormat(phone) ?? phone ?? "";

const toInternalFormat = (phone: string) =>
  toUnformattedInternational(phone) ?? phone ?? "";

interface ITelephoneInputProps extends IBaseInputProps {}

export const TelephoneInput: React.FC<ITelephoneInputProps> = ({
  value,
  placeholder = "Please enter a phone number",
  disabled = false,
  hint,
  hideKeypad = false,
  readonly = false,
  onInputChange,
}) => {
  /**
   * If hideKeypad (hide the custom keypad, not the native) is true, we want to show the native keyboard.
   */
  const readOnlyValue = readonly && hideKeypad === false ? true : null;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = toInternalFormat(evt.target.value);
    onInputChange(inputValue);
  };

  const internalValue = toPresentationFormat(value);

  const input = (
    <input
      data-test="input"
      data-hint={hint}
      type="tel"
      onChange={handleChange}
      value={internalValue}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnlyValue}
      className={sharedStyles.Input}
    />
  );

  return hideKeypad ? (
    input
  ) : (
    <KeypadWrapper inputComponent={input} keypadComponent={<NumberKeypad />} />
  );
};
