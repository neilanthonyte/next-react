import * as React from "react";

import { TDialogSizes } from "next-shared/src/types/dialogs";
import { TNextBarModeType } from "next-shared/src/types/types";

import { Modal, ModalHeader, ModalBody } from "../../structure/Modal";
import { NextLogin } from "../../auth/NextLogin";

export interface ILoginPromptProps {
  loginMode: TNextBarModeType;
  open: boolean;
  onClose: () => unknown;
}

export const NextBarLoginPromptModal: React.FC<ILoginPromptProps> = ({
  loginMode,
  open,
  onClose,
}) => {
  const loginText =
    loginMode === "app" ? "Connect to room" : "Login to Next Practice";

  return (
    <Modal open={open} onClose={onClose} size={TDialogSizes.Medium}>
      <ModalHeader>{loginText}</ModalHeader>
      <ModalBody>
        <NextLogin asApp={loginMode === "app"} />
      </ModalBody>
    </Modal>
  );
};
