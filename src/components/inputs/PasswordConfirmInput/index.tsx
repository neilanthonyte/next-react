/**
 * Provides a password input and a password confirmation field.
 * If the two fields are identical the string will be returned. If the two fields are not identical an empty string will be returned
 */
import * as React from "react";
import * as _ from "lodash";

import { PasswordInput } from "../PasswordInput";

/**
 * @param value - The value prop is the current value of the field. If a value is not passed it will provide a default value.
 * @param onInputChange - A function called on every value change. First parameter is the value.
 */
export interface IPasswordConfirmInputProps {
  value?: any;
  onInputChange: Function;
  disabled?: boolean;
}

export interface IPasswordConfirmInputState {
  password: string;
  confirmPassword: string;
  [key: string]: string;
}

export class PasswordConfirmInput extends React.Component<
  IPasswordConfirmInputProps,
  IPasswordConfirmInputState
> {
  constructor(props: IPasswordConfirmInputProps) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: IPasswordConfirmInputProps) {
    if (nextProps.value !== null) {
      this.setState({
        password: nextProps.value,
        confirmPassword: nextProps.value,
      });
    }
  }

  passwordFieldChange = (key: any, value: any) => {
    this.setState({ [key]: value }, this.informParentThroughCallback);
  };

  checkBothFieldsArePopulated = () => {
    const isMissing =
      _.keys(this.state).filter((n) => !this.state[n]).length > 0;

    return !isMissing ? this.confirmPasswordMatches() : null;
  };

  confirmPasswordMatches = () => {
    return this.state.password === this.state.confirmPassword
      ? this.state.password
      : null;
  };

  informParentThroughCallback = () => {
    // Avoid responding to out own update to avoid clearing all fields in some circumstances
    this.props.onInputChange(this.checkBothFieldsArePopulated());
  };

  render() {
    return (
      <div>
        <PasswordInput
          value={this.state.password}
          onInputChange={(data: any) =>
            this.passwordFieldChange("password", data)
          }
          disabled={this.props.disabled}
          placeholder={"Password"}
        />
        <PasswordInput
          value={this.state.confirmPassword}
          onInputChange={(data: any) =>
            this.passwordFieldChange("confirmPassword", data)
          }
          disabled={this.props.disabled}
          placeholder={"Confirm password"}
        />
      </div>
    );
  }
}
