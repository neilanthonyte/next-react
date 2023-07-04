import * as React from "react";
import { useMemo } from "react";

import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { INextBarContextValue, NextBarContext } from "../NextBarHandler";

export interface IMockNextBarHandlerProps {
  children: any;
}

export const MockNextBarHandler: React.FC<IMockNextBarHandlerProps> = ({
  children,
}) => {
  const value: INextBarContextValue = useMemo(
    () => ({
      loadingPatientDetails: {
        name: mockPatients[0].getDisplayName(),
        DOB: mockPatients[0].fhir.birthDate,
      },
      mode: undefined,
      // TODO mock these better (although do we still use the MockNextBarHandler?)
      isOutOfDate: false,
      pushToScope: () => {},
    }),
    [],
  );

  return (
    <NextBarContext.Provider value={value}>{children}</NextBarContext.Provider>
  );
};
