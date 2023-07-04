import * as React from "react";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { Scope } from "next-shared/src/models/Scope";
import { TDialogSizes } from "next-shared/src/types/dialogs";

import { App } from "next-shared/src/models/App";
import { Badge } from "../../generic/Badge";
import { Button } from "../../generic/Button";
import { CardBody, Card } from "../../structure/Card";
import {
  CellDescription,
  CellHeader,
  CellType,
  Cell,
} from "../../structure/Cell";
import { Grid } from "../../structure/Grid";
import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { useClient } from "../../../hooks/useClient";
import { getIconForAppType } from "../../../helpers/getIconForAppType";
import { getLabelForAppType } from "../../../helpers/getLabelForAppType";
import { useCachedSyncedData } from "../../../hooks/core/useCachedSyncedData";

export interface ICompanionAppCard {
  scope: Scope;
}

/**
 * The companion app card is a bespoke component due to the nature of "companions" in next practice.
 *
 * To a user the companion is an "app", however, its actually a scope,
 * which means multiple level of fetching are required to get data like the access code for app inside the companion scope
 */
export const CompanionAppCard: React.FC<ICompanionAppCard> = ({ scope }) => {
  const client = useClient();

  const [editing, setEditing] = React.useState(false);

  const { data: apps, error } = useCachedSyncedData(
    client.apps.retrieveSyncedAppsForScope(scope.scopeId),
  );

  const resetAppCredentials = React.useCallback(
    async (app: App) => {
      await client.apps.resetAppAccessCode(app.appId);
    },
    [client],
  );

  const removeCompanion = React.useCallback(async () => {
    await client.scopes.deleteScope(scope.scopeId);
    setEditing(false);
  }, [client]);

  return (
    <>
      <Modal
        size={TDialogSizes.Medium}
        onClose={() => setEditing(false)}
        open={editing}
      >
        <ModalHeader>{scope.label}</ModalHeader>
        <ModalBody>
          {(apps || []).map((app) => {
            return (
              <>
                <Cell>
                  <CellType>Unique Id</CellType>
                  <CellDescription>{app.appId}</CellDescription>
                </Cell>
                <Cell>
                  <CellType>Scope Id</CellType>
                  <CellDescription>{app.scopeId}</CellDescription>
                </Cell>
                <Cell>
                  <CellType>Type</CellType>
                  <CellDescription>
                    {getLabelForAppType(app.type)}
                  </CellDescription>
                </Cell>
                <Cell>
                  <CellType>Patient</CellType>
                  <CellDescription>
                    {(scope.patientId && scope.patient.getDisplayName()) ||
                      "N/A"}
                  </CellDescription>
                </Cell>
                <Cell>
                  <CellType>Patient Id</CellType>
                  <CellDescription>{scope.patientId || "N/A"}</CellDescription>
                </Cell>
                <Cell isLead>
                  <CellType>Access Code</CellType>
                  <CellDescription>
                    {app.accessCode ? <Badge>{app.accessCode}</Badge> : "N/A"}
                  </CellDescription>
                </Cell>
                <br />
                <Grid size="md">
                  <Button
                    onClick={removeCompanion}
                    shouldConfirm
                    status={TColorVariants.Danger}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => resetAppCredentials(app)}
                    disableOnSuccess={false}
                  >
                    Reset Code
                  </Button>
                </Grid>
              </>
            );
          })}
        </ModalBody>
      </Modal>
      <Card onClick={() => setEditing(true)}>
        <CardBody>
          <Cell isLead decorationIcon={getIconForAppType("companion")}>
            <CellHeader>{scope.label}</CellHeader>
            <Cell>
              <CellType>Patient</CellType>
              <CellDescription>
                {(scope.patientId && scope.patient.getDisplayName()) || "N/A"}
              </CellDescription>
            </Cell>
          </Cell>
        </CardBody>
      </Card>
    </>
  );
};
