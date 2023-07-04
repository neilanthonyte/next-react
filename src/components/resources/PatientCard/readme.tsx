import * as React from "react";

import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { PatientCard } from ".";

export const DemoStandard = () => {
  return (
    <>
      <PatientCard data={mockPatients[0].fhir} />
      <PatientCard data={mockPatients[0].fhir} hideExtendedSections={true} />
    </>
  );
};
