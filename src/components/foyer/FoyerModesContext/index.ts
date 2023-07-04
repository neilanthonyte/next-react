import * as React from "react";

import { IFoyerMode } from "next-shared/src/types/IFoyerMode";

export interface IFoyerModesContextValue {
  modes: IFoyerMode[];
  activeMode: IFoyerMode;
  count: number;
  modeDuration: number;
}

export const FoyerModesContext = React.createContext<IFoyerModesContextValue>({
  modes: undefined,
  activeMode: undefined,
  count: undefined,
  modeDuration: undefined,
});
