import * as React from "react";
import { useEffect } from "react";

import { Modal, ModalHeader, ModalBody } from "../../structure/Modal";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { useClient } from "../../../hooks/useClient";
import { PatientLogin } from "../../atoms/PatientLogin";

const LOGIN_MODAL_MESSAGE =
  "You appear to already be a patient of this clinic. Please log in to continue.";

export interface IPromptExistingPatientLoginModal {
  open: boolean;
  onSkip: () => any;
  autoClose?: boolean;
}

export const PromptExistingPatientLoginModal: React.FC<
  IPromptExistingPatientLoginModal
> = ({ open, onSkip, autoClose = true }) => {
  const client = useClient();

  useEffect(() => {
    if (open && autoClose && client.auth.session && client.auth.session.id) {
      onSkip();
    }
  }, [client.auth.session]);

  return (
    <Modal
      open={open}
      onClose={onSkip}
      size={TDialogSizes.Medium}
      showCloseIcon={false}
    >
      <ModalHeader>Matching account</ModalHeader>
      <ModalBody>
        <PatientLogin message={LOGIN_MODAL_MESSAGE} onSkip={onSkip} />
      </ModalBody>
    </Modal>
  );
};
