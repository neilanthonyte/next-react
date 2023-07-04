import * as React from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

export interface ISessionPatientTypeDebugProps {}
/**
 * Debug component allowing to put different types of patient in session.
 * Predominantly used for debugging NextBar components
 */
export const SessionPatientTypeDebug: React.FC<
  ISessionPatientTypeDebugProps
> = () => {
  const { nextPatient, ehrPatient } = useSyncedSessionData();

  if (ehrPatient && !ehrPatient.fhir) {
    console.error("missing fhir patient");
  }

  return (
    <>
      <h4>Patient</h4>
      <div>
        EHR Patient:{" "}
        {ehrPatient?.fhir ? (
          <>
            {fhirUtil(ehrPatient.fhir).getDisplayName()} [ID:{" "}
            {ehrPatient.ehrPatientId}]
          </>
        ) : (
          "NA"
        )}
      </div>
      <div>
        Next Patient:{" "}
        {nextPatient ? (
          <>
            {fhirUtil(nextPatient.fhir).getDisplayName()} [ID:{" "}
            {nextPatient.patientId}]
          </>
        ) : (
          "NA"
        )}
      </div>
    </>
  );
};
