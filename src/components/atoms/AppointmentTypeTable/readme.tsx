import * as React from "react";

import { AppointmentTypeTable } from ".";
import { VStack } from "../../structure/VStack";
import { mockAppointmentTypes } from "next-shared/src/mockData/mockAppointmentTypes";

export const DemoStandard = () => {
  return (
    <VStack>
      {mockAppointmentTypes.map((apptType) => (
        <>
          <h3>{apptType.label}</h3>
          <AppointmentTypeTable type={apptType} />
        </>
      ))}
    </VStack>
  );
};
