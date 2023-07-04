import * as React from "react";
import { useMemo } from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";
import { hubUrlPrefixHack } from "next-shared/src/helpers/constants";
import { useSyncedSessionData } from "next-react/src/hooks/core/useSyncedSessionData";

import { useAutoClearScopeAnatomyState } from "../../../../components/anatomy/AnatomyView";
import { ActiveFormHandler } from "../../../../components/forms/ActiveFormHandler";
import { ActiveTimeHandler } from "../../../../components/handlers/ActiveTimeHandler";
import { RequireConsent } from "../../../../components/handlers/RequireConsent";
import { RequireEhrPatient } from "../../../../components/handlers/RequireEhrPatient";
import { RequireAppSession } from "../../../../components/handlers/RequireSession";
import { MainView } from "../../../../components/structure/MainView";
import { CameraUploadContext } from "../../../../contexts/CameraUploadContext";
import { useClient } from "../../../../hooks/useClient";
import { useScopeUrlSync } from "../../../../hooks/useScopeUrlSync";
import { consultScreenRoutes } from "./consultScreenRoutes";
import { RequireNextPatient } from "../../../../components/handlers/RequireNextPatient";
import { ScopeMainViewDecoration } from "../../../../components/atoms/ScopeMainViewDecoration";

export interface IConsultScreenAppProps {}

export const ConsultScreenApp: React.FC<IConsultScreenAppProps> = ({}) => {
  const client = useClient();
  const { ehrPatient } = useSyncedSessionData();

  // keep the URL syncronised across clients
  useScopeUrlSync();
  // clear state based on the current system state
  useAutoClearScopeAnatomyState();

  const CameraUploadContextValue = {
    getSignedImageUrl: async (fileKey: string) => {
      const modifiedKey = fileKey.replace(hubUrlPrefixHack, "");
      return await client.files.requestSignedFileUrl(modifiedKey);
    },
    getUploadDetails: async () => {
      const details = await client.files.requestSignedUploadUrl(
        "profile-images",
        "image.jpeg",
        "image/jpeg",
      );
      details.fileKey = `${hubUrlPrefixHack}${details.fileKey}`;
      return details;
    },
  };

  // TODO: 'Provisional' is based on a Helix-specific property (and MD extension), do we want to get rid of it for multi-ehr?
  const patientIsProvisional = useMemo(() => {
    if (!ehrPatient?.fhir) return null;
    return fhirUtil<FhirPatientUtil>(ehrPatient.fhir).isProvisional();
  }, [ehrPatient]);

  return (
    <CameraUploadContext.Provider value={CameraUploadContextValue}>
      <RequireAppSession>
        <RequireEhrPatient>
          <RequireNextPatient>
            <RequireConsent>
              <ActiveFormHandler>
                <ActiveTimeHandler>
                  <MainView
                    routes={consultScreenRoutes}
                    allowNavigation={!patientIsProvisional}
                    supplement={SupplementWithAction}
                  />
                </ActiveTimeHandler>
              </ActiveFormHandler>
            </RequireConsent>
          </RequireNextPatient>
        </RequireEhrPatient>
      </RequireAppSession>
    </CameraUploadContext.Provider>
  );
};

const SupplementWithAction = () => {
  const client = useClient();
  return (
    <ScopeMainViewDecoration
      actions={[
        {
          icon: "logout",
          onClick: () =>
            client.scopes.setScopeUsers(client.auth.session.app.scopeId, {
              ehrPatientId: null,
            }),
        },
      ]}
    />
  );
};
