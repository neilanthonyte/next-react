import * as React from "react";

import { Modal, ModalBody } from "../../structure/Modal";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { TAppType, App } from "next-shared/src/models/App";
import { TScopeBluetoothDeviceType } from "next-shared/src/models/Scope";
import { useClient } from "../../../hooks/useClient";
import { Form } from "../../forms/Form";
import { queryCache } from "react-query";
import { nextAppSchema } from "./helpers/nextAppSchema";

type TAppTypeWithBluetoothDevice = TAppType & "bluetooth-device";

interface IFormResponse {
  type: TAppTypeWithBluetoothDevice;
  label?: string;
  deviceType?: TScopeBluetoothDeviceType;
  serial?: string;
}

export interface ICreateNextAppModalProps {
  open: boolean;
  scopeId: string;
  onDismiss: () => void;
  onSuccess: (app?: App) => void;
}

export const CreateNextAppModal: React.FC<ICreateNextAppModalProps> = ({
  open,
  scopeId,
  onDismiss,
  onSuccess,
}) => {
  const client = useClient();

  const createNewApp = async (data: IFormResponse) => {
    const { type, label, serial, deviceType } = data;
    if (type === "bluetooth-device") {
      // HACK not supported - need to provide an update route for this
      return;
    }

    const newApp = new App();
    newApp.label = label;
    newApp.type = type;
    newApp.scopeId = scopeId;
    const newServerApp = await client.apps.createApp(newApp);

    // invalidate retrieve query for retrieveAppsForScope
    await queryCache.invalidateQueries(["roomApps", scopeId]);
    onSuccess(newServerApp);
  };

  return (
    <Modal size={TDialogSizes.Medium} open={open} onClose={onDismiss}>
      <ModalBody>
        <Form
          title="New Device"
          submitLabel="Create"
          schema={nextAppSchema}
          onSuccess={createNewApp}
        />
      </ModalBody>
    </Modal>
  );
};
