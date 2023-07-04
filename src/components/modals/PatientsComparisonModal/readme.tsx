import * as React from "react";
import { useCallback, useState } from "react";

import { mockBareFhirPatient } from "next-shared/src/mockData/mockPatients";
import { defaultPatientDataSections } from "next-shared/src/helpers/defaultPatientDataSections";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";

import { Button } from "../../generic/Button";
import { delay } from "../../../helpers/delay";
import { useDebug } from "../../../debug/DemoWrapper";
import { PatientsComparisonModal } from ".";
import { mockPatient1Fhir } from "next-shared/src/mockData/mockFhirPatients";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: { componentName: "PatientsComparisonModal", scenario: "standard" },
  });

  const [isOpen, setIsOpen] = useState<boolean>(null);

  const handleOnSave = useCallback(async (patient: fhir3.Patient) => {
    await delay(2000);
    setOutput(patient);
    setIsOpen(false);
  }, []);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      {isOpen && (
        <PatientsComparisonModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleOnSave}
          sections={defaultPatientDataSections}
          nextPatient={mockPatient1Fhir}
          ehrPatient={mockBareFhirPatient}
          ehrId={mockNextLocations[0].ehrId}
        />
      )}
    </>
  );
};
