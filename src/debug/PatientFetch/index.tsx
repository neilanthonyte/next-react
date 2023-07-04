import { urlParamsToObject } from "next-shared/src/helpers/urlParamsToObject";
import {
  MedicalResourceType,
  supportedResourceTypes,
} from "next-shared/src/types/types";
import * as React from "react";
import { LoadingBlock } from "../../components/structure/LoadingBlock";
import { useSyncedPatient } from "../../hooks/patient/useSyncedPatient";
import { useSyncedPatientMedicalResources } from "../../hooks/patient/useSyncedPatientMedicalResources";

export interface IPatientFetchProps {}

export const PatientFetch: React.FC<IPatientFetchProps> = ({}) => {
  const { patientId } = urlParamsToObject();
  if (!patientId)
    return (
      <p>
        Please specify a patient using the <code>patientId</code> param
      </p>
    );

  const { patient, ...rest } = useSyncedPatient(patientId as string);
  const resources = useSyncedPatientMedicalResources(patientId as string);

  return (
    <>
      <LoadingBlock isLoading={resources.isLoading} error={resources.error}>
        <LoadingBlock {...rest}>
          Loaded: {patient?.getDisplayName()}{" "}
          <ul>
            {supportedResourceTypes.map((r: MedicalResourceType) => (
              <li>
                {r}: {resources?.patientAllMedicalResources[r]?.length}
              </li>
            ))}
          </ul>
        </LoadingBlock>
      </LoadingBlock>
      <p>
        Example usage (replacing <code>PATIENT_ID</code>):
        <br />
        <code>
          http://localhost:6060/?useRealClient=true&patientId=PATIENT_ID#/Components/PatientFetch
        </code>
      </p>
    </>
  );
};
