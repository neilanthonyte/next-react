import * as React from "react";

// TODO use proper definitions
export interface IFormProvider {
  setFieldValue: any;
  clearFieldValue: any;
  newGroupInstance: any;
  removeGroupInstance: any;
}

export const FormContext = React.createContext<IFormProvider>({
  setFieldValue: () => {
    throw new Error("setFieldValue not handled");
  },
  clearFieldValue: () => {
    throw new Error("clearFieldValue not handled");
  },
  newGroupInstance: () => {
    throw new Error("newGroupInstance not handled");
  },
  removeGroupInstance: () => {
    throw new Error("removeGroupInstance not handled");
  },
});
