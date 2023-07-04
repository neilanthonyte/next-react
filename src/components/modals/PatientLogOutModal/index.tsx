import * as React from "react";

import {
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
} from "../../structure/Modal";
import { TDialogSizes } from "next-shared/src/types/dialogs";

interface IPatientLogOutModalProps {
  open: boolean;
  onLogOut: () => void;
  onDismiss: () => void;
}
export const PatientLogOutModal: React.FC<IPatientLogOutModalProps> = ({
  open,
  onLogOut,
  onDismiss,
}) => {
  return (
    <Modal open={open} onClose={onDismiss} size={TDialogSizes.Small}>
      <ModalHeader>Log out?</ModalHeader>
      <ModalBody>
        <p>Are you sure you wish to log out?</p>
      </ModalBody>
      <ModalFooter
        onAccept={onLogOut}
        acceptLabel="Log out"
        onCancel={onDismiss}
      ></ModalFooter>
    </Modal>
  );
};
