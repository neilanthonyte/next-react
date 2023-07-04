import * as React from "react";

import {
  PatientSectionForms,
  PatientSectionLifestyle,
  PatientSubmittedInformation,
} from ".";
import { VStack } from "../../structure/VStack";
import { useDebug } from "../../../debug/DemoWrapper";

export const DemoStandard = () => {
  useDebug({ setSessionDebug: true });
  return (
    <VStack>
      <div>
        <h3>Patient forms</h3>
        <PatientSectionForms />
      </div>
      <div>
        <h3>Lifestyle</h3>
        <PatientSectionLifestyle />
      </div>
      <div>
        <h3>All data</h3>
        <PatientSubmittedInformation />
      </div>
    </VStack>
  );
};
