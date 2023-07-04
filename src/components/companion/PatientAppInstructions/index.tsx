import * as React from "react";

import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { AccessCode } from "../../atoms/AccessCode";
import { Resource, ResourceBody } from "../../generic/Resource";

export interface IPatientAppInstructionsProps {}

/**
 * Displays instructions and a QR code to encourage the patient to complete
 * the sign up on their phone.
 */
export const PatientAppInstructions: React.FC<
  IPatientAppInstructionsProps
> = ({}) => {
  const { ehrPatient } = useSyncedSessionData();
  if (!ehrPatient?.appAccessCode) return null;

  return (
    <Resource>
      <ResourceBody>
        <AccessCode
          size="sm"
          code={ehrPatient.appAccessCode}
          showAppStoreLinks={true}
          showTextCode={true}
        />
      </ResourceBody>
    </Resource>
  );
};
