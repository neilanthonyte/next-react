import * as React from "react";

export interface INextAgentContextValue {
  locationName: null | string;
  isConnected: boolean;
  serverMessage: null | string;

  userConfig: any;
  setUserConfig(updatedUserConfig: any): void;

  login(jwt: string): Promise<void>;
  logout(): Promise<void>;
}

export const NextAgentContext = React.createContext<INextAgentContextValue>({
  locationName: undefined,
  isConnected: undefined,
  userConfig: undefined,
  setUserConfig: undefined,
  login: undefined,
  logout: undefined,
  serverMessage: undefined,
});
