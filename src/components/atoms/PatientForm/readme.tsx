import * as React from "react";
import { useEffect, useState } from "react";

import { ActiveFormHandler } from "../../forms/ActiveFormHandler";
import { FormSideBar } from "../../forms/FormSideBar";
import { HStack, Solid } from "../../structure/HStack";

import { PatientForm } from ".";
import { useDebug } from "../../../debug/DemoWrapper";

export const DemoStandard = () => {
  const { setOutput, setActions } = useDebug();

  const [formSlug, setFormSlug] = useState<string>("bookingForm");

  useEffect(() => {
    setActions([
      {
        action: () => setFormSlug("bookingForm"),
        label: "Booking Form",
      },
      {
        action: () => setFormSlug("creditCardRequired"),
        label: "Credit Card",
      },
    ]);
  }, []);

  return (
    <ActiveFormHandler>
      <HStack>
        <Solid>
          <div style={{ width: "240px" }}>
            <FormSideBar />
          </div>
        </Solid>
        <PatientForm onSuccess={setOutput} formSlug={formSlug} />
      </HStack>
    </ActiveFormHandler>
  );
};
