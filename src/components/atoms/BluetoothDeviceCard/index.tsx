import * as React from "react";

import { Button } from "../../generic/Button";
import { CardBody, Card } from "../../structure/Card";
import {
  CellDescription,
  CellHeader,
  CellType,
  Cell,
} from "../../structure/Cell";
import { Grid } from "../../structure/Grid";
import {
  IScopeBluetoothDevice,
  TScopeBluetoothDeviceType,
} from "next-shared/src/models/Scope";
import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { NextClient } from "../../../client/NextClient";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { useClient } from "../../../hooks/useClient";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

export interface IBluetoothDeviceCard {
  device: IScopeBluetoothDevice;
  // the scope Id that this device belongs to
  scopeId: string;
}

const getIconForBluetoothDeviceType = (type: TScopeBluetoothDeviceType) => {
  switch (type) {
    case "blood-pressure":
      return "blood-pressure";
    case "weight-scale":
      return "obs-weight";
    default: {
      console.warn(`Unknown bluetooth device type: ${type}`);
      return "bluetooth";
    }
  }
};

const getLabelForBluetoothDeviceType = (type: TScopeBluetoothDeviceType) => {
  switch (type) {
    case "blood-pressure":
      return "Blood Pressure Cuff";
    case "weight-scale":
      return "Weight Scale";
    default: {
      console.warn(`Unknown bluetooth device type: ${type}`);
      return type;
    }
  }
};

/**
 * Displays an overview of the bluetooth device, and onclick, enables the user to delete the device
 */
export const BluetoothDeviceCard: React.FC<IBluetoothDeviceCard> = ({
  device,
  scopeId,
}) => {
  if (!scopeId) {
    console.warn(
      "Scope id is required when removing a bluetooth device. Please include",
    );
  }
  const client = useClient();
  const [editing, setEditing] = React.useState(false);

  const removeBluetoothDeviceFromScope = React.useCallback(async () => {
    // HACK
    throw new Error("Bluetooth not currently supported");
    // const scope = await client.scopes.retrieveScope(scopeId);
    // scope.bleDevices = [
    //   ...scope.bleDevices.filter(
    //     (b: IScopeBluetoothDevice) => b.serial !== device.serial,
    //   ),
    // ];
    // await client.scopes.updateScope(scope);
    // // close modal, device is deleted
    // setEditing(false);
  }, [client, device]);

  return (
    <>
      <Modal
        size={TDialogSizes.Medium}
        onClose={() => setEditing(false)}
        open={editing}
      >
        <ModalHeader>{getLabelForBluetoothDeviceType(device.type)}</ModalHeader>
        <ModalBody>
          <Cell>
            <CellType>Serial Number</CellType>
            <CellDescription>{device.serial}</CellDescription>
          </Cell>
          <Cell>
            <CellType>Type</CellType>
            <CellDescription>Bluetooth Device</CellDescription>
          </Cell>
          <Cell>
            <CellType>Device Type</CellType>
            <CellDescription>
              {getLabelForBluetoothDeviceType(device.type)}
            </CellDescription>
          </Cell>
          <br />
          <Grid size="md">
            <Button
              onClick={removeBluetoothDeviceFromScope}
              shouldConfirm
              status={TColorVariants.Danger}
            >
              Delete
            </Button>
          </Grid>
        </ModalBody>
      </Modal>
      <Card onClick={() => setEditing(true)}>
        <CardBody>
          <Cell
            isLead
            decorationIcon={getIconForBluetoothDeviceType(device.type)}
          >
            <CellHeader>
              {getLabelForBluetoothDeviceType(device.type)}
            </CellHeader>
            <CellDescription>Bluetooth Device</CellDescription>
          </Cell>
        </CardBody>
      </Card>
    </>
  );
};
