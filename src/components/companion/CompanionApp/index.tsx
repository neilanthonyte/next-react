import { hubUrlPrefixHack } from "next-shared/src/helpers/constants";
import * as React from "react";

import { ScopeMainViewDecoration } from "../../atoms/ScopeMainViewDecoration";
import { ActiveFormHandler } from "../../forms/ActiveFormHandler";
import { RequireEhrPatient } from "../../handlers/RequireEhrPatient";
import { RequireAppSession } from "../../handlers/RequireSession";
import { MainView } from "../../structure/MainView";
import { CameraUploadContext } from "../../../contexts/CameraUploadContext";
import { useClient } from "../../../hooks/useClient";
import { companionRoutes } from "./helpers/companionRoutes";
import { useCompanionUrlSync } from "../../../hooks/companion/useCompanionUrlSync";
import { CompanionResolveIncompletePatient } from "../CompanionResolveIncompletePatient";

export interface ICompanionAppProps {}

export const CompanionApp: React.FC<ICompanionAppProps> = ({}) => {
  const client = useClient();

  // auto sync the URL
  useCompanionUrlSync();

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

  return (
    <CameraUploadContext.Provider value={CameraUploadContextValue}>
      <RequireAppSession>
        <RequireEhrPatient>
          <ActiveFormHandler>
            <CompanionResolveIncompletePatient>
              <MainView
                routes={companionRoutes}
                supplement={() => (
                  // set to true to always show a prompt for the patient linking
                  <ScopeMainViewDecoration showAppLink={false} />
                )}
              />
            </CompanionResolveIncompletePatient>
          </ActiveFormHandler>
        </RequireEhrPatient>
      </RequireAppSession>
    </CameraUploadContext.Provider>
  );
};
