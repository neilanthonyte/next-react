/**
 * Renders an email box.
 */
import * as React from "react";

import { KeypadWrapper } from "../../generic/KeypadWrapper";
import { EmailKeypad } from "../../generic/Keypad";
import { emailPadOptions } from "../../generic/Keypad/helpers/emailPadOptions";
import sharedStyles from "../styles.scss";

export interface IEmailProps {
  value: string;
  placeholder: string;
  onInputChange: (value: string) => void;
  disabled: boolean;
  hideKeypad: boolean;
}

export const EmailInput: React.FC<IEmailProps> = ({
  value,
  placeholder = "john.smith@example.com",
  onInputChange,
  disabled,
  hideKeypad = false,
}) => {
  const input = (
    <input
      data-test="input"
      type="email"
      onChange={(evt) => onInputChange(evt.target.value)}
      value={value || ""}
      placeholder={placeholder}
      disabled={disabled}
      className={sharedStyles.Input}
    />
  );
  return hideKeypad ? (
    input
  ) : (
    <KeypadWrapper
      inputComponent={input}
      replace={emailPadOptions}
      keypadComponent={<EmailKeypad />}
    />
  );
};
