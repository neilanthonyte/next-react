import * as React from "react";
import { useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";

import { AppCard } from "../../atoms/AppCard";
import { Button } from "../../generic/Button";
import { Grid } from "../../structure/Grid";
import { Page, PageBody, PageHeader, PageTitle } from "../../structure/Page";
import {
  PageSection,
  PageSectionBody,
  PageSectionHeader,
  PageSectionTitle,
} from "../../structure/PageSection";
import { useClient } from "../../../hooks/useClient";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { BluetoothDeviceCard } from "../../atoms/BluetoothDeviceCard";
import { CreateNextAppModal } from "../../modals/CreateNextAppModal";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { PropertyGrid } from "../../generic/PropertyGrid";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { useQuery } from "react-query";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { nextSystemPaths } from "../../views/routes";
import { useSyncedScopesForLocation } from "../../../hooks/core/useSyncedScopesForLocation";
import { IScopeBluetoothDevice } from "next-shared/src/models/Scope";

export interface IRouteParams {
  scopeId: string;
}

export interface IScopesViewProps {}

export const ScopeView: React.FC<IScopesViewProps> = ({}) => {
  const history = useHistory();
  const client = useClient();
  const { scopes } = useSyncedScopesForLocation(
    client.auth.session?.locationId,
  );
  const { scopeId } = useParams<any>();

  const [newDeviceModalOpen, setNewDeviceModalOpen] = React.useState(false);
  const scope = useMemo(() => {
    return (scopes || []).find((s) => s.scopeId === scopeId);
  }, [scopes, scopeId]);

  const {
    data: apps,
    isLoading: appsIsLoading,
    error: appsError,
    refetch: refetchApps,
  } = useQuery(["roomApps", scopeId], () => {
    if (!scopeId) {
      return;
    }
    return client.apps.retrieveAppsForScope(scopeId);
  });

  const deleteRoom = React.useCallback(async () => {
    await client.scopes.deleteScope(scope.scopeId);
    // return to the main scope view
    history.push(
      `${nextSystemPaths.systemRoot}${nextSystemPaths.systemScopes}`,
    );
  }, [client, scope]);

  const onDismiss = () => setNewDeviceModalOpen(false);
  const onSuccess = () => {
    onDismiss();
    refetchApps();
  };

  const appActions = [
    {
      label: "Add",
      onClick: () => setNewDeviceModalOpen(true),
    },
  ];

  const isCompanion = scope?.type === "companion";

  const showDevices = !isCompanion;
  // provide the access code somewhere useful

  const companionAccessCode =
    isCompanion && (apps || []).length > 0 && apps[0].accessCode;

  const resetCompanionCredentials = React.useCallback(async () => {
    if (isCompanion) {
      await client.apps.resetAppAccessCode(apps[0].appId);
      await refetchApps();
    }
  }, [client, apps]);

  return (
    <>
      <CreateNextAppModal
        scopeId={scopeId}
        open={newDeviceModalOpen}
        onDismiss={onDismiss}
        onSuccess={onSuccess}
      />
      <LoadingBlock isLoading={!scope}>
        {!!scope && (
          <Page>
            <PageHeader>
              <PageTitle>{scope.label}</PageTitle>
            </PageHeader>
            <PageBody>
              <PageSection>
                <PageSectionBody>
                  <PropertyGrid
                    data={{
                      // Name: scope.label,
                      // ID: scope.scopeId,
                      Patient: scope.getPatientLabel() || "none",
                      Practitioner: scope.getPractitionerLabel() || "none",
                      "Access code": companionAccessCode,
                    }}
                  />
                  <br />
                  <Grid size="md">
                    <Button
                      onClick={deleteRoom}
                      shouldConfirm
                      status={TColorVariants.Danger}
                    >
                      Delete
                    </Button>

                    {isCompanion && (
                      <Button
                        onClick={resetCompanionCredentials}
                        disableOnSuccess={false}
                      >
                        Reset Code
                      </Button>
                    )}
                  </Grid>
                </PageSectionBody>
              </PageSection>
              {showDevices && (
                <PageSection>
                  <PageSectionHeader actions={appActions}>
                    <PageSectionTitle>Devices</PageSectionTitle>
                  </PageSectionHeader>
                  <LoadingBlock isLoading={!!appsIsLoading}>
                    <PageSectionBody>
                      {!!appsError && <ErrorPlaceholder retry={refetchApps} />}
                      {Array.isArray(apps) && (
                        <Grid size="lg">
                          {apps.map((a) => (
                            <AppCard app={a} key={a.appId} />
                          ))}
                          {scope.bleDevices.map(
                            (
                              bleDevice: IScopeBluetoothDevice,
                              index: number,
                            ) => (
                              <BluetoothDeviceCard
                                key={`bleDevice-${index}`}
                                device={bleDevice}
                                scopeId={scope.scopeId}
                              />
                            ),
                          )}
                        </Grid>
                      )}
                    </PageSectionBody>
                  </LoadingBlock>
                </PageSection>
              )}
            </PageBody>
          </Page>
        )}
      </LoadingBlock>
    </>
  );
};
