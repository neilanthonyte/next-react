import * as React from "react";

export type TErrorHandlingApproach = "modal" | "inline" | "silent";

export interface IErrorDescription {
  title: string;
  description?: string;
  retry?: () => any;
  approach?: TErrorHandlingApproach;
}

export interface IErrorResolverContextValue {
  resolveError: (options: IErrorDescription) => void;
}

export const ErrorResolverContext =
  React.createContext<IErrorResolverContextValue>({
    resolveError: undefined,
  });
