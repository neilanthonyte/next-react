import * as React from "react";

import { coverTransition } from "../../../helpers/cssTransitions";
import { PendingContent } from "../../structure/PendingContent";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { PatientCurtainView } from "../../views/PatientCurtainView";

export interface IRequireNextPatientProps {}

/**
 * Component rendering a holding screen if no next patient is present in session
 */
export const RequireNextPatient: React.FC<IRequireNextPatientProps> = ({
  children,
}) => {
  const { nextPatient } = useSyncedSessionData();

  return (
    <PendingContent
      check={!!nextPatient}
      transition={coverTransition}
      fallback={PatientCurtainView}
    >
      {children}
    </PendingContent>
  );
};
