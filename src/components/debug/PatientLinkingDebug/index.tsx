import * as React from "react";
import { useClient } from "../../../hooks/useClient";
import { useSyncedPatient } from "../../../hooks/patient/useSyncedPatient";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TextInput } from "../../inputs/TextInput";
import { Button } from "../../generic/Button";
import { Label } from "../../generic/Label";

export interface IPatientLinkingDebugProps {
  setOutput: (output: any) => void;
}

export const PatientLinkingDebug: React.FC<IPatientLinkingDebugProps> = ({
  setOutput,
}) => {
  const client = useClient();
  const [inviteCode, setInviteCode] = useState("");

  const patientId = client.auth.session?.patientId;
  const { patient } = useSyncedPatient(patientId);

  const ehrPatients = useMemo(() => patient?.ehrPatients ?? [], [patient]);
  useEffect(() => setOutput(ehrPatients), [ehrPatients]);

  const link = useCallback(() => {
    client.patients.linkEhrAccount(inviteCode);
  }, [client, inviteCode]);

  const unlink = useCallback(() => {
    if (ehrPatients.length > 0) {
      client.patients.unlinkEhrAccount(patientId, ehrPatients[0].ehrId);
    }
  }, [ehrPatients, client, patientId]);

  return (
    <div>
      <Label text="Invite Code">
        <TextInput
          value={inviteCode}
          onInputChange={(val) => setInviteCode(val)}
        />
      </Label>
      <p>{`Logged-in patientId: ${patientId}`}</p>
      <Button onClick={link} disabled={!patient || !inviteCode}>
        Link
      </Button>
      <Button onClick={unlink} disabled={!patient || ehrPatients.length == 0}>
        Unlink
      </Button>
    </div>
  );
};
