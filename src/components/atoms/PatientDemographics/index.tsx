import * as React from "react";

import { PendingContent } from "../../structure/PendingContent";
import { IPatientCardProps, PatientCard } from "../../resources/PatientCard";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

export interface IPatientDemographicsProps
  extends Omit<IPatientCardProps, "data"> {}

export const PatientDemographics: React.FC<IPatientDemographicsProps> = (
  props,
) => {
  const { nextPatient } = useSyncedSessionData();

  return (
    <PendingContent check={!!nextPatient}>
      {!!nextPatient && <PatientCard data={nextPatient.fhir} {...props} />}
    </PendingContent>
  );
};
