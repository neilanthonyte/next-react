import React from "react";
import { EhrContext, IEhrContextValue } from "./EhrContext";
import { EEhrKey } from "next-shared/src/types/EEhrKey";

export interface IMockEhrProviderProps extends Partial<IEhrContextValue> {}

/**
 * Mock provider exposing EhrContext in demos
 * TODO consider integrating the EhrContext provider in the DemoWrapper component to make it work with mock/real client instead
 */
export const MockEhrProvider: React.FC<IMockEhrProviderProps> = ({
  children,
  ...rest
}) => {
  const value: IEhrContextValue = {
    underlyingEhr: EEhrKey.Helix,
    transcribeObservations: (obs) => {
      console.log("Observations", obs);
      return true;
    },
    ...rest,
  };
  return <EhrContext.Provider value={value}>{children}</EhrContext.Provider>;
};
