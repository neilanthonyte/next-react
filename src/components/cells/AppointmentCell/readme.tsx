import * as React from "react";

import { mockAppointmentsSerialized } from "next-shared/src/mockData/mockAppointments";

import { VStack } from "../../structure/VStack";
import { delay } from "../../../helpers/delay";
import { useDebug } from "../../../debug/DemoWrapper";
import { AppointmentCell } from ".";

export const DemoStandard = () => {
  useDebug({
    test: { componentName: "AppointmentCell", scenario: "standard" },
  });
  return <AppointmentCell appointment={mockAppointmentsSerialized[0]} />;
};

export const DemoWithPayment = () => {
  useDebug({
    test: { componentName: "AppointmentCell", scenario: "standard" },
  });
  return (
    <AppointmentCell
      appointment={mockAppointmentsSerialized[0]}
      hasPayment={true}
    />
  );
};

export const DemoAction = () => {
  const { setOutput } = useDebug({
    test: { componentName: "AppointmentCell", scenario: "action" },
  });

  const handleSetResult = async () => {
    await delay(100);
    setOutput("transcribe");
  };
  return (
    <AppointmentCell
      appointment={mockAppointmentsSerialized[0]}
      onTranscribe={handleSetResult}
    />
  );
};

export const DemoPresentationForm = () => {
  useDebug({
    test: { componentName: "AppointmentCell", scenario: "form-status" },
  });
  return (
    <VStack>
      <AppointmentCell appointment={mockAppointmentsSerialized[0]} />
      <AppointmentCell
        appointment={mockAppointmentsSerialized[0]}
        hasPresentationForm={true}
      />
      <AppointmentCell
        appointment={mockAppointmentsSerialized[0]}
        hasPresentationForm={false}
      />
    </VStack>
  );
};
