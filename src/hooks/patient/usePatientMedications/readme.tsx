import * as React from "react";

import { LoadingBlock } from "../../../components/structure/LoadingBlock";
import { useDebug } from "../../../debug/DemoWrapper";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import MedicationRequestCard from "../../../components/atoms/MedicationRequestCard";
import { usePatientMedications } from ".";

export const DemoStandard = () => {
  useDebug({ requireSession: "patient", setSessionDebug: true });
  const { nextPatient } = useSyncedSessionData();

  const { patientMedications, ...rest } = usePatientMedications(
    nextPatient?.patientId,
  );

  return (
    <LoadingBlock {...rest}>
      {(patientMedications || []).map((medication, i) => (
        <MedicationRequestCard key={i} medication={medication} />
      ))}
    </LoadingBlock>
  );
};
