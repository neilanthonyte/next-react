import { MedicationAction } from "next-shared/src/models/Action";
import * as React from "react";
import { useEffect, useState } from "react";

import { LoadingBlock } from "../../../components/structure/LoadingBlock";
import { useDebug } from "../../../debug/DemoWrapper";
import { usePatientActions } from "../../actions/usePatientActions";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import MedicationRequestCard from "../../../components/atoms/MedicationRequestCard";
import { usePatientMedication } from ".";

export const DemoStandard = () => {
  const { setActions, setOutput } = useDebug({
    requireSession: "patient",
    setSessionDebug: true,
  });

  const [medicationAction, setMedicationAction] = useState<MedicationAction>();

  const { nextPatient } = useSyncedSessionData();
  const { medicationActions } = usePatientActions(nextPatient?.patientId);

  useEffect(() => {
    setActions(
      (medicationActions || []).map((medAction) => ({
        label: `Set medication id ${medAction.externalId}`,
        action: () => setMedicationAction(medAction),
      })),
    );
  }, [medicationActions]);

  const { patientMedication, ...rest } = usePatientMedication(
    nextPatient?.patientId,
    medicationAction?.externalId,
    medicationAction?.externalSource,
  );

  useEffect(() => {
    setOutput(patientMedication);
  }, [patientMedication]);

  return (
    <LoadingBlock {...rest}>
      {patientMedication && (
        <MedicationRequestCard medication={patientMedication} />
      )}
    </LoadingBlock>
  );
};
