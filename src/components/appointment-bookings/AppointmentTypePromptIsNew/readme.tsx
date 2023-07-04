import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { AppointmentTypePromptIsNew } from ".";
import { BookingProvider } from "../BookingProvider";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "AppointmentTypePromptIsNew",
      scenario: "standard",
    },
  });

  return (
    <>
      <BookingProvider>
        <div data-test="appointmentTypePrompt">
          <AppointmentTypePromptIsNew selected={null} onSelect={setOutput} />
        </div>
      </BookingProvider>
    </>
  );
};
