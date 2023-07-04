import * as React from "react";

import { App } from "next-shared/src/models/App";
import { AppCell } from "../AppCell";
import { Badge } from "../../generic/Badge";
import { Button } from "../../generic/Button";
import { CardBody, Card } from "../../structure/Card";
import { CellDescription, CellType, Cell } from "../../structure/Cell";
import { Grid } from "../../structure/Grid";
import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { useClient } from "../../../hooks/useClient";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { queryCache } from "react-query";
import { getLabelForAppType } from "../../../helpers/getLabelForAppType";

export interface IAppCard {
  app: App;
}

export const AppCard: React.FC<IAppCard> = ({ app }) => {
  const client = useClient();
  const [editing, setEditing] = React.useState(false);
  const resetAppCredentials = React.useCallback(async () => {
    await client.apps.resetAppAccessCode(app.appId);
    // invalidate retrieve query for retrieveAppsForScope
    queryCache.invalidateQueries(["roomApps", app.scopeId]);
  }, [client]);

  const removeApp = React.useCallback(async () => {
    await client.apps.deleteApp(app.appId);
    // invalidate retrieve query for retrieveAppsForScope
    queryCache.invalidateQueries(["roomApps", app.scopeId]);
    setEditing(false);
  }, [client]);

  return (
    <>
      <Modal
        size={TDialogSizes.Medium}
        onClose={() => setEditing(false)}
        open={editing}
      >
        <ModalHeader>{app.label}</ModalHeader>
        <ModalBody>
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
            <CellDescription>{getLabelForAppType(app.type)}</CellDescription>
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
              onClick={removeApp}
              shouldConfirm
              status={TColorVariants.Danger}
            >
              Delete
            </Button>
            <Button onClick={resetAppCredentials} disableOnSuccess={false}>
              Reset Code
            </Button>
          </Grid>
        </ModalBody>
      </Modal>
      <Card onClick={() => setEditing(true)}>
        <CardBody>
          <AppCell app={app} />
        </CardBody>
      </Card>
    </>
  );
};
