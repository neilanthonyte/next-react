import * as React from "react";

import { EFormSectionStatus } from "../MultiForm";

export interface IFormSectionState {
  label: string;
  status: EFormSectionStatus;
}

export interface IFormStateContextValue {
  sections: IFormSectionState[];
  activeSection: number;
  setActiveSection: (index: number) => any;
  reset: (sections: IFormSectionState[], activeSection?: number) => any;
  clear: () => any;
}

export const FormStateContext = React.createContext<IFormStateContextValue>({
  sections: undefined,
  activeSection: undefined,
  setActiveSection: undefined,
  reset: undefined,
  clear: undefined,
});
