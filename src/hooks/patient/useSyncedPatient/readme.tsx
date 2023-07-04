import * as React from "react";
import { useEffect, useState } from "react";

import { mockPatients } from "next-shared/src/mockData/mockPatients";

import { LoadingBlock } from "../../../components/structure/LoadingBlock";
import { useClient } from "../../useClient";

import { useSyncedPatient } from ".";
import { useDebug } from "../../../debug/DemoWrapper";
import { SYNC_DATA } from "../../../types/sync";
import { useConfig } from "../../../entry/NextBarApp/useConfig";

const realPatientIds = ["19cd9008-fcae-43dc-a789-b76f88b4623f"];

export const DemoStandard = () => {
  const { setActions, setDebugElement } = useDebug({ setSessionDebug: true });
  const client = useClient();
  const config = useConfig();

  const [patientId, setPatientId] = useState<string>(
    config.useRealClient ? realPatientIds[0] : mockPatients[0].patientId,
  );

  const { patient, isLoading, error } = useSyncedPatient(patientId);

  useEffect(() => {
    if (config.useRealClient) {
      setActions(
        realPatientIds.map((id) => ({
          label: `Patient: ${id.substring(0, 6)}...`,
          action: () => {
            setPatientId(id);
          },
        })),
      );
      return;
    }
    setActions([
      {
        label: "Fake error",
        action: () => {
          const mockPatient = client.mockDataCacheModule.findPatient(patientId);
          mockPatient.emitter.emit(SYNC_DATA, new Error());
        },
      },
      {
        label: "Refetch patient",
        action: () => {
          const mockPatient = client.mockDataCacheModule.findPatient(patientId);
          mockPatient.emitter.emit(SYNC_DATA, { patient: mockPatient.data });
        },
      },
      {
        label: "Switch patient",
        action: () => {
          setPatientId(mockPatients[1].patientId);
        },
      },
    ]);
  }, [patientId]);

  useEffect(() => {
    setDebugElement(
      <input
        type="text"
        onBlur={(evt) => setPatientId(evt.target.value)}
        placeholder="Patient ID"
      />,
    );
  }, [setPatientId]);

  return (
    <LoadingBlock isLoading={isLoading} error={error}>
      {!!patient && <div>{patient.getDisplayName()}</div>}
    </LoadingBlock>
  );
};
