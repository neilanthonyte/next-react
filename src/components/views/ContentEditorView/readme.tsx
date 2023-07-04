import * as React from "react";
import { useMemo, useEffect, useRef, useState } from "react";
import { Route } from "react-router";
import { MemoryRouter } from "react-router-dom";

import { CameraUploadContext } from "../../../contexts/CameraUploadContext";
import { nextClientFactory } from "../../../client/nextClientFactory";

import { ContentEditorView } from "./";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { MockCameraUploadHandler } from "../../../handlers/MockCameraUploadHandler";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { useClient } from "../../../hooks/useClient";

export const DemoStandard = () => {
  const { config } = React.useContext(ConfigContext);

  if (!config.useRealClient) {
    return (
      <MemoryRouter initialIndex={0} initialEntries={["/cms/blog"]}>
        <NextAppHandlerWeb configOverride={{ useRealClient: false }}>
          <MockCameraUploadHandler>
            <Route
              path="/cms/:type/:slug?"
              render={() => <ContentEditorView backPath="/done" />}
            />
            <Route path="/done" render={() => <div>Done</div>} />
          </MockCameraUploadHandler>
        </NextAppHandlerWeb>
      </MemoryRouter>
    );
  }

  const [renderCount, setRenderCount] = useState<number>();
  const client = useClient();

  useEffect(() => {
    client.auth
      .loginAsStaffMember(env.testAuthEmail, env.testAuthPassword)
      .then(() => {
        setRenderCount(1);
      });
  }, []);

  const cameraContextValue = useMemo(
    () => ({
      getSignedImageUrl: async (fileKey: string) => {
        return await client.files.requestSignedFileUrl(fileKey);
      },
      getUploadDetails: async (
        uploadNameSpace: string,
        fileName = "image.jpeg",
      ) => {
        const details = await client.files.requestSignedUploadUrl(
          uploadNameSpace,
          fileName,
          "image/jpeg",
        );
        return details;
      },
    }),
    [],
  );

  return (
    <MemoryRouter initialIndex={0} initialEntries={["/cms/blog"]}>
      <>
        {client.auth.session && (
          <NextAppHandlerWeb configOverride={{ useRealClient: true }}>
            <CameraUploadContext.Provider value={cameraContextValue}>
              <Route
                path="/cms/:type/:slug?"
                render={() => <ContentEditorView backPath="/done" />}
              />
            </CameraUploadContext.Provider>
          </NextAppHandlerWeb>
        )}
      </>
    </MemoryRouter>
  );
};
