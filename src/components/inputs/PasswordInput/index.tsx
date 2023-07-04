import * as React from "react";
import { useContext } from "react";
import { ResetPasswordContext } from "../../../contexts/ResetPasswordContext";
import sharedStyles from "../styles.scss";

/**
 * @param value - The value prop is the current value of the field. If a value is not passed it will provide a default value.
 * @param onInputChange - A function called on every value change. First parameter is the value.
 * @param disabled - Disables field if true.
 */
export interface IPasswordInputProps {
  value?: any;
  onInputChange: Function;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * Provides a password input.
 */
export const PasswordInput = ({
  value,
  onInputChange,
  disabled = false,
  placeholder = "*********",
}: IPasswordInputProps) => {
  const { onForgotPassword } = useContext(ResetPasswordContext);
  return (
    <>
      <input
        data-test="input"
        type="password"
        onChange={(evt) => onInputChange(evt.target.value)}
        value={value || ""}
        disabled={disabled}
        placeholder={placeholder}
        className={sharedStyles.Input}
      />
      {!!onForgotPassword && (
        <p>
          <small>
            <a onClick={onForgotPassword}>Forgot password?</a>
          </small>
        </p>
      )}
    </>
  );
};
