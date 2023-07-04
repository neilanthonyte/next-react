import * as React from "react";

import { NextManagerDecoration } from "../../../../components/atoms/NextManagerDecoration";
import { AtlassianServiceDeskWidget } from "../../../../components/generic/AtlassianServiceDeskWidget";
import { ChecklistHandler } from "../../../../components/handlers/ChecklistHandler";
import { OpsActionsHandler } from "../../../../components/handlers/OpsActionsHandler";
import { RequireUserSession } from "../../../../components/handlers/RequireSession";
import { MainView } from "../../../../components/structure/MainView";
import {
  ICameraUploadContextValue,
  CameraUploadContext,
} from "../../../../contexts/CameraUploadContext";
import { useClient } from "../../../../hooks/useClient";
import { managerRoutes } from "./managerRoutes";

export interface INextManagerProps {}

export const NextManager: React.FC<INextManagerProps> = ({}) => {
  const client = useClient();

  const cameraContextValue: ICameraUploadContextValue = {
    getSignedImageUrl: async (fileKey: string) => {
      return await client.files.requestSignedFileUrl(fileKey);
    },
    getUploadDetails: async (
      uploadNameSpace: string,
      fileName: string = "image.jpeg",
    ) => {
      const details = await client.files.requestSignedUploadUrl(
        uploadNameSpace,
        fileName,
        "image/jpeg",
      );
      return details;
    },
  };

  return (
    <RequireUserSession>
      <ChecklistHandler>
        <OpsActionsHandler>
          <CameraUploadContext.Provider value={cameraContextValue}>
            <MainView
              routes={managerRoutes}
              noLogos={true}
              fixedPositionedPanels={true}
              supplement={NextManagerDecoration}
            />
            <AtlassianServiceDeskWidget />
          </CameraUploadContext.Provider>
        </OpsActionsHandler>
      </ChecklistHandler>
    </RequireUserSession>
  );
};
