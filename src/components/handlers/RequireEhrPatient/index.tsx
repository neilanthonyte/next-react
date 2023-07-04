import * as React from "react";
import { useMemo } from "react";

import { coverTransition } from "../../../helpers/cssTransitions";
import { PendingContent } from "../../structure/PendingContent";
import { HoldingScreen } from "../../views/HoldingScreen/index";
import { ScreenAttachmentBM } from "../../views/Screen";
import { useClient } from "../../../hooks/useClient";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

export interface IRequireEhrPatientProps {}

/**
 * Component rendering a holding screen if no ehr patient is present in session
 */
export const RequireEhrPatient: React.FC<IRequireEhrPatientProps> = ({
  children,
}) => {
  const client = useClient();

  const { ehrPatient } = useSyncedSessionData();

  const label = useMemo(() => {
    if (!client || !client.auth.session || !client.auth.session.app) {
      return "";
    }
    return client.auth.session.app.label;
  }, [client.auth.session]);

  return (
    <PendingContent
      check={!!ehrPatient}
      transition={coverTransition}
      fallback={() => (
        <HoldingScreen variant="alt">
          <ScreenAttachmentBM>{label}</ScreenAttachmentBM>
        </HoldingScreen>
      )}
    >
      {children}
    </PendingContent>
  );
};
