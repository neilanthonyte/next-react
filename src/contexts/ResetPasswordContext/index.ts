import * as React from "react";

export interface IResetPasswordContextValue {
  onForgotPassword: any;
}

export const ResetPasswordContext =
  React.createContext<IResetPasswordContextValue>({
    onForgotPassword: undefined,
  });
