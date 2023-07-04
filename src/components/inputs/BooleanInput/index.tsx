/**
 * Renders a check box.
 */
import * as React from "react";

import { ButtonOptionsInput } from "../ButtonOptionsInput";

export interface IBooleanInputProps {
  value: boolean;
  onInputChange: (value: boolean) => void;
  disabled?: boolean;
}

export const BooleanInput: React.FC<IBooleanInputProps> = (props) => (
  // @ts-ignore
  <ButtonOptionsInput options={{ Yes: true, No: false }} {...props} />
);
