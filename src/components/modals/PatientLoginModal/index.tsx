import * as React from "react";
import { useEffect } from "react";

import { PatientLogin } from "../../atoms/PatientLogin";
import { Modal, ModalHeader, ModalBody } from "../../structure/Modal";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { NextClient } from "../../../client/NextClient";
import { useClient } from "../../../hooks/useClient";

export interface IPatientLoginModalProps {
  open: boolean;
  onClose: () => any;
  autoClose?: boolean;
}

export const PatientLoginModal: React.FC<IPatientLoginModalProps> = ({
  open,
  onClose,
  autoClose = true,
}) => {
  const client = useClient();

  useEffect(() => {
    if (autoClose && client.auth.session && client.auth.session.id) onClose();
  }, [client.auth.session]);

  return (
    <Modal open={open} onClose={onClose} size={TDialogSizes.Medium}>
      <ModalHeader>Login to Next</ModalHeader>
      <ModalBody>
        <PatientLogin />
      </ModalBody>
    </Modal>
  );
};
