import * as React from "react";
import { Hcp } from "next-shared/src/models/Hcp";

export interface IHcpsContextValue {
  hcps: Hcp[] | null;
  fetchHcps: () => Promise<Hcp[] | void>;
  isLoading: boolean;
  error: Error;
}

export const HcpsContext = React.createContext<IHcpsContextValue>({
  hcps: undefined,
  fetchHcps: undefined,
  isLoading: undefined,
  error: undefined,
});
