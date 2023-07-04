import * as React from "react";
import { NextClient } from "../../client/NextClient";

export interface IApiClientProvider {
  client: NextClient;
}

export const ApiClientContext = React.createContext<IApiClientProvider>({
  client: undefined,
});
