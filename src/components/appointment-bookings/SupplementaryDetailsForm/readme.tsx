import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { SupplementaryDetailsForm } from ".";
import { BookingProvider } from "../BookingProvider";
import { EInclude } from "../../../types/IPersonalDetails";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "SupplementaryDetailsForm",
      scenario: "standard",
    },
  });

  return (
    <BookingProvider>
      <SupplementaryDetailsForm
        include={{
          medicare: EInclude.Required,
          address: EInclude.Required,
          emergencyContact: EInclude.Required,
        }}
        onSubmit={() => setOutput("successfully submitted")}
      />
    </BookingProvider>
  );
};
