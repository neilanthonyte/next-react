import * as React from "react";
import { useState } from "react";

import {
  mockObservationsSmoking,
  mockObservationsAlcohol,
  mockObservationsWeight,
  mockObservationsBloodPressure,
} from "next-shared/src/mockData/mockFhirPatientResources";
import { PatientObservations } from ".";
import { MedicalResourceType } from "next-shared/src/types/types";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import { fhirUtil } from "next-shared/src/fhirUtil";

const lifestyle = {
  [MedicalResourceType.Alcohol]: [mockObservationsAlcohol],
  [MedicalResourceType.Smoking]: [mockObservationsSmoking],
};

const metrics = {
  [MedicalResourceType.Weight]: mockObservationsWeight,
  [MedicalResourceType.BloodPressure]: mockObservationsBloodPressure,
};

export const DemoStandard = () => {
  return <PatientObservations observationsByType={lifestyle} />;
};

export const DemoEmpty = () => {
  return <PatientObservations observationsByType={undefined} />;
};

export const DemoOnlyLatest = () => {
  return <PatientObservations observationsByType={metrics} />;
};

export const DemoAll = () => {
  return (
    <PatientObservations observationsByType={metrics} onlyShowLatest={false} />
  );
};

export const DemoFiltered = () => {
  return (
    <PatientObservations
      observationsByType={lifestyle}
      filter={[MedicalResourceType.Alcohol]}
    />
  );
};

export const DemoEditable = () => {
  const [result, setResult] = useState<string>();
  return (
    <>
      <PatientObservations
        onEdit={(obs) =>
          setResult(fhirUtil<FhirObservationUtil>(obs).getMedicalResourceType())
        }
        observationsByType={lifestyle}
      />
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};
