import * as React from "react";
import { AppConfig } from "next-shared/src/models/AppConfig";

export interface IConfigContextValue {
  config: AppConfig;
}

export const ConfigContext = React.createContext<IConfigContextValue>({
  config: undefined,
});
